"""
Backend di Mandari (FastAPI).

Espone gli endpoint dell'assistente e, quando l'utente è identificato, salva
tutto nel Fascicolo Amministrativo (Supabase).

Avvio locale (dalla cartella app/backend):
    uvicorn main:app --reload
"""

import json

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, Header, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from carta import spiega_documento
from fascicolo import (
    QUOTA_BYTE,
    crea_atto,
    crea_persona,
    crea_scadenze,
    elenco_atti,
    elenco_audit,
    elenco_persone,
    elenco_scadenze,
    estrai_token,
    leggi_piano,
    persona_self,
    recupera_contesto,
    registra_audit,
    salva_allegato,
    salva_profilo,
    spazio_usato,
    user_id_da_token,
)
from orchestratore import rispondi
from spetta import Profilo, genera_analisi

# Carica le variabili dal file .env (se presente).
load_dotenv()

app = FastAPI(title="Mandari API", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict:
    """Controllo rapido: serve solo a sapere che il backend è vivo."""
    return {"stato": "ok"}


@app.post("/api/analyze")
async def analyze(
    profilo: Profilo, authorization: str | None = Header(default=None)
) -> dict:
    """Analisi SPETTA dell'onboarding; salva profilo e Atto nel Fascicolo."""
    analisi = genera_analisi(profilo)

    token = estrai_token(authorization)
    if token:
        await salva_profilo(token, profilo.model_dump())
        titoli = [o.get("titolo", "") for o in analisi.get("opportunita", [])]
        await crea_atto(
            token,
            {
                "tipo": "analisi_spetta",
                "titolo": "Prima analisi SPETTA",
                "origine": "SPETTA",
                "contenuto": analisi,
                "metadati": {
                    "categoria": "onboarding",
                    "n_opportunita": len(titoli),
                },
                "testo_ricerca": "prima analisi spetta " + " ".join(titoli),
            },
        )
    return analisi


@app.get("/api/fascicolo")
async def fascicolo(
    q: str = "", authorization: str | None = Header(default=None)
) -> dict:
    """Restituisce gli Atti del Fascicolo dell'utente (con ricerca opzionale)."""
    token = estrai_token(authorization)
    if not token:
        return {"atti": []}
    return {"atti": await elenco_atti(token, q or None)}


@app.get("/api/account")
async def account(authorization: str | None = Header(default=None)) -> dict:
    """Informazioni account: piano (free/pro)."""
    token = estrai_token(authorization)
    piano = await leggi_piano(token) if token else "free"
    return {"piano": piano}


@app.get("/api/persone")
async def persone(authorization: str | None = Header(default=None)) -> dict:
    """Elenco delle persone gestite (crea 'sé stesso' se manca)."""
    token = estrai_token(authorization)
    if not token:
        return {"persone": []}
    await persona_self(token)
    return {"persone": await elenco_persone(token)}


@app.post("/api/persone")
async def aggiungi_persona(
    nome: str = Form(...),
    relazione: str = Form(""),
    authorization: str | None = Header(default=None),
) -> dict:
    """Aggiunge un profilo (una persona di cui l'utente si occupa). Richiede piano Pro."""
    token = estrai_token(authorization)
    if not token:
        return {"errore": "Devi avere una sessione attiva."}
    if await leggi_piano(token) != "pro":
        return {
            "errore": "Aggiungere profili è una funzione del piano Pro.",
            "serve_pro": True,
        }
    pid = await crea_persona(token, nome.strip() or "Persona", relazione.strip())
    if pid:
        await registra_audit(
            token, "profilo_aggiunto", {"nome": nome.strip(), "relazione": relazione.strip()}
        )
        return {"id": pid}
    return {"errore": "Impossibile creare il profilo."}


@app.get("/api/audit")
async def audit(authorization: str | None = Header(default=None)) -> dict:
    """Registro delle attività recenti dell'utente."""
    token = estrai_token(authorization)
    if not token:
        return {"attivita": []}
    return {"attivita": await elenco_audit(token)}


@app.get("/api/spazio")
async def spazio(authorization: str | None = Header(default=None)) -> dict:
    """Spazio usato dagli allegati e quota inclusa (in byte)."""
    token = estrai_token(authorization)
    usato = await spazio_usato(token) if token else 0
    return {"usato": usato, "quota": QUOTA_BYTE}


@app.get("/api/scadenze")
async def scadenze(
    persona: str = "", authorization: str | None = Header(default=None)
) -> dict:
    """Restituisce le scadenze del Fascicolo (motore DATA) per la persona attiva."""
    token = estrai_token(authorization)
    if not token:
        return {"scadenze": []}
    pid = persona or await persona_self(token)
    return {"scadenze": await elenco_scadenze(token, pid)}


@app.post("/api/carta")
async def carta(file: UploadFile = File(...)) -> dict:
    """Riceve un documento (immagine o PDF) e restituisce la spiegazione di CARTA."""
    dati = await file.read()
    return spiega_documento(dati, file.content_type or "application/pdf")


@app.post("/api/assistant")
async def assistant(
    messaggio: str = Form(""),
    profilo: str = Form(""),
    persona: str = Form(""),
    file: UploadFile | None = File(None),
    authorization: str | None = Header(default=None),
) -> dict:
    """Assistente unico (Anya): instrada al motore giusto e salva nel Fascicolo."""
    dati = await file.read() if file is not None else None
    mime = file.content_type if file is not None else None
    try:
        prof = json.loads(profilo) if profilo else None
    except json.JSONDecodeError:
        prof = None

    token = estrai_token(authorization)
    persona_id = None
    contesto = ""
    fonti: list = []
    if token:
        persona_id = persona or await persona_self(token)
        contesto, fonti = await recupera_contesto(token, persona_id, messaggio)

    risposta = rispondi(messaggio, dati, mime, prof, contesto)

    # Storage del file originale (con quota 500 MB per utente)
    allegato_url = None
    dimensione = 0
    if token and dati and risposta.get("documento"):
        dimensione = len(dati)
        user_id = user_id_da_token(token)
        usato = await spazio_usato(token)
        if user_id and usato + dimensione <= QUOTA_BYTE:
            allegato_url = await salva_allegato(token, user_id, dati, mime)
        elif usato + dimensione > QUOTA_BYTE:
            risposta["messaggio"] = risposta.get("messaggio", "") + (
                "\n\n(Hai superato i 500 MB di spazio incluso: ho salvato la "
                "spiegazione ma non il file originale. Per conservare gli originali "
                "oltre questo limite, collega il tuo spazio personale dalle "
                "Impostazioni.)"
            )

    if token:
        await _persisti_interazione(
            token, messaggio, risposta, allegato_url, dimensione, persona_id, fonti
        )
        await registra_audit(
            token,
            _azione_da(risposta),
            {
                "motore": risposta.get("motore", ""),
                "persona": persona_id,
                "fonti_usate": len(fonti),
            },
        )
    return risposta


def _azione_da(risposta: dict) -> str:
    if risposta.get("documento"):
        return "documento_caricato"
    if risposta.get("opportunita"):
        return "analisi_diritti"
    if risposta.get("soluzioni"):
        return "ricerca_soluzioni"
    return "richiesta"


async def _persisti_interazione(
    token: str,
    messaggio: str,
    risposta: dict,
    allegato_url: str | None = None,
    dimensione: int = 0,
    persona_id: str | None = None,
    fonti: list | None = None,
) -> None:
    """Crea l'Atto (e le eventuali scadenze) corrispondente all'interazione."""
    fonti = fonti or []
    doc = risposta.get("documento")
    opportunita = risposta.get("opportunita") or []
    soluzioni = risposta.get("soluzioni") or []
    motore = risposta.get("motore", "")

    if doc:
        atto_id = await crea_atto(
            token,
            {
                "tipo": "documento",
                "titolo": doc.get("tipo") or "Documento",
                "origine": "CARTA",
                "contenuto": doc,
                "metadati": {
                    "attendibilita": doc.get("attendibilita", ""),
                    "dimensione": dimensione,
                    "fonti": fonti,
                },
                "testo_ricerca": " ".join(
                    [doc.get("tipo", ""), doc.get("riassunto", "")]
                ),
                "allegato_url": allegato_url,
                "persona_id": persona_id,
            },
        )
        await crea_scadenze(token, atto_id, doc.get("scadenze", []), persona_id)
    elif opportunita:
        await crea_atto(
            token,
            {
                "tipo": "analisi_spetta",
                "titolo": (messaggio[:80] or "Analisi SPETTA"),
                "origine": "SPETTA",
                "contenuto": {
                    "messaggio": risposta.get("messaggio", ""),
                    "opportunita": opportunita,
                },
                "metadati": {"n_opportunita": len(opportunita), "fonti": fonti},
                "testo_ricerca": " ".join(
                    [messaggio] + [o.get("titolo", "") for o in opportunita]
                ),
                "persona_id": persona_id,
            },
        )
    elif soluzioni:
        await crea_atto(
            token,
            {
                "tipo": "affido",
                "titolo": (messaggio[:80] or "Ricerca soluzioni"),
                "origine": "AFFIDO",
                "contenuto": {
                    "messaggio": risposta.get("messaggio", ""),
                    "soluzioni": soluzioni,
                },
                "metadati": {"n_soluzioni": len(soluzioni), "fonti": fonti},
                "testo_ricerca": " ".join(
                    [messaggio] + [s.get("titolo", "") for s in soluzioni]
                ),
                "persona_id": persona_id,
            },
        )
    else:
        await crea_atto(
            token,
            {
                "tipo": "conversazione",
                "titolo": (messaggio[:80] or "Conversazione"),
                "origine": motore or "ANYA",
                "contenuto": {
                    "domanda": messaggio,
                    "risposta": risposta.get("messaggio", ""),
                },
                "metadati": {"motore": motore, "fonti": fonti},
                "testo_ricerca": messaggio + " " + risposta.get("messaggio", ""),
                "persona_id": persona_id,
            },
        )
