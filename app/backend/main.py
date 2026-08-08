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
    crea_atto,
    crea_scadenze,
    elenco_atti,
    elenco_scadenze,
    estrai_token,
    salva_profilo,
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


@app.get("/api/scadenze")
async def scadenze(authorization: str | None = Header(default=None)) -> dict:
    """Restituisce le scadenze del Fascicolo (motore DATA)."""
    token = estrai_token(authorization)
    if not token:
        return {"scadenze": []}
    return {"scadenze": await elenco_scadenze(token)}


@app.post("/api/carta")
async def carta(file: UploadFile = File(...)) -> dict:
    """Riceve un documento (immagine o PDF) e restituisce la spiegazione di CARTA."""
    dati = await file.read()
    return spiega_documento(dati, file.content_type or "application/pdf")


@app.post("/api/assistant")
async def assistant(
    messaggio: str = Form(""),
    profilo: str = Form(""),
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

    risposta = rispondi(messaggio, dati, mime, prof)

    token = estrai_token(authorization)
    if token:
        await _persisti_interazione(token, messaggio, risposta)
    return risposta


async def _persisti_interazione(token: str, messaggio: str, risposta: dict) -> None:
    """Crea l'Atto (e le eventuali scadenze) corrispondente all'interazione."""
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
                "metadati": {"attendibilita": doc.get("attendibilita", "")},
                "testo_ricerca": " ".join(
                    [doc.get("tipo", ""), doc.get("riassunto", "")]
                ),
            },
        )
        await crea_scadenze(token, atto_id, doc.get("scadenze", []))
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
                "metadati": {"n_opportunita": len(opportunita)},
                "testo_ricerca": " ".join(
                    [messaggio] + [o.get("titolo", "") for o in opportunita]
                ),
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
                "metadati": {"n_soluzioni": len(soluzioni)},
                "testo_ricerca": " ".join(
                    [messaggio] + [s.get("titolo", "") for s in soluzioni]
                ),
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
                "metadati": {"motore": motore},
                "testo_ricerca": messaggio + " " + risposta.get("messaggio", ""),
            },
        )
