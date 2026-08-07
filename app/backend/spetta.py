"""
SPETTA — motore (demo) delle opportunità amministrative.

Riceve il profilo del questionario e produce una prima analisi indicativa di
possibili diritti/agevolazioni da approfondire, con i "prossimi passi"
(documenti utili e a chi rivolgersi).

- Se è presente una chiave Gemini (GEMINI_API_KEY), usa l'AI.
- Altrimenti funziona in modalità DEMO, con poche regole semplici.

NB: l'analisi è INDICATIVA e non costituisce consulenza.
"""

from __future__ import annotations

import json
import os

from pydantic import BaseModel, Field

# ----------------------------- Modello dei dati -----------------------------


class Profilo(BaseModel):
    """Le risposte del questionario demo (poche domande, tutte facoltative)."""

    regione: str = Field("", description="Regione di residenza")
    eta: int = Field(0, ge=0, le=120, description="Età dell'utente")
    cittadinanza: str = Field("", description="Italiana, UE o Extra-UE")
    composizione_nucleo: str = Field(
        "", description="Es. single, coppia, famiglia con figli"
    )
    numero_figli: int = Field(0, ge=0, le=20)
    figli_minori: bool = Field(False, description="Ci sono figli minorenni?")
    invalidita: bool = Field(
        False, description="L'utente o un familiare ha un'invalidità riconosciuta?"
    )
    anziani_a_carico: bool = Field(
        False, description="Ci sono anziani da assistere / a carico?"
    )
    situazione_lavorativa: str = Field(
        "", description="Es. dipendente, autonomo, disoccupato, pensionato, studente"
    )
    isee_indicativo: str = Field("", description="Fascia ISEE indicativa")
    situazione_abitativa: str = Field(
        "", description="Es. affitto, mutuo, casa di proprietà"
    )
    note: str = Field("", description="Eventuali note libere dell'utente")


AVVISO = (
    "Questa è un'analisi dimostrativa e indicativa, non una consulenza. "
    "L'accesso alle prestazioni dipende sempre dai requisiti previsti dalla "
    "normativa vigente: verifica ogni opportunità con un CAF, un Patronato o un "
    "professionista di fiducia."
)


# ------------------------------- Funzione principale -------------------------


def genera_analisi(profilo: Profilo) -> dict:
    """Restituisce l'analisi. Usa Gemini se disponibile, altrimenti la modalità demo."""
    chiave = os.getenv("GEMINI_API_KEY", "").strip()
    if chiave:
        try:
            return _analisi_con_gemini(profilo, chiave)
        except Exception as errore:
            demo = _analisi_demo(profilo)
            demo["nota_tecnica"] = f"Fallback demo (AI non disponibile: {errore})"
            return demo
    return _analisi_demo(profilo)


# ------------------------------- Analisi con AI ------------------------------


def _analisi_con_gemini(profilo: Profilo, chiave: str) -> dict:
    """Chiede a Gemini un elenco di possibili opportunità, in formato JSON."""
    from google import genai

    modello = os.getenv("GEMINI_MODEL", "gemini-flash-latest")
    client = genai.Client(api_key=chiave)

    prompt = _costruisci_prompt(profilo)
    risposta = client.models.generate_content(model=modello, contents=prompt)
    testo = (risposta.text or "").strip()

    dati = _estrai_json(testo)
    opportunita = dati.get("opportunita", []) if isinstance(dati, dict) else []

    return {"demo": False, "opportunita": opportunita, "avviso": AVVISO}


def _costruisci_prompt(profilo: Profilo) -> str:
    """Costruisce le istruzioni per l'AI. Chiede SOLO un JSON ben preciso."""
    return f"""Sei SPETTA, un assistente amministrativo italiano. In base al profilo
qui sotto, individua alcune possibili agevolazioni, bonus, esenzioni o contributi
ITALIANI (nazionali, regionali o comunali) che l'utente potrebbe approfondire.
Non garantire il diritto: indica solo opportunità plausibili da verificare.
Non inventare dati non desumibili dal profilo. Per ogni opportunità fornisci anche
i documenti utili da preparare e a chi rivolgersi.

Profilo (dati dichiarati dall'utente, possono essere incompleti):
- Regione: {profilo.regione or "non indicata"}
- Età: {profilo.eta or "non indicata"}
- Cittadinanza: {profilo.cittadinanza or "non indicata"}
- Nucleo: {profilo.composizione_nucleo or "non indicato"}
- Numero figli: {profilo.numero_figli}
- Figli minorenni: {"sì" if profilo.figli_minori else "no/non indicato"}
- Invalidità/disabilità in famiglia: {"sì" if profilo.invalidita else "no/non indicato"}
- Anziani a carico: {"sì" if profilo.anziani_a_carico else "no/non indicato"}
- Situazione lavorativa: {profilo.situazione_lavorativa or "non indicata"}
- ISEE indicativo: {profilo.isee_indicativo or "non indicato"}
- Abitazione: {profilo.situazione_abitativa or "non indicata"}
- Note: {profilo.note or "nessuna"}

Rispondi ESCLUSIVAMENTE con un JSON valido in questo formato, senza testo prima o dopo:
{{
  "opportunita": [
    {{
      "titolo": "Nome dell'agevolazione",
      "categoria": "Famiglia | Casa | Lavoro | Reddito | Salute | Disabilità | Anziani | Altro",
      "perche": "Perché potrebbe riguardare questo profilo (1 frase semplice)",
      "cosa_verificare": "Quale requisito principale controllare",
      "documenti": ["documento utile 1", "documento utile 2"],
      "a_chi_rivolgersi": "Es. CAF, Patronato, INPS, Comune, commercialista",
      "confidenza": "alta | media | bassa"
    }}
  ]
}}
Massimo 6 opportunità, in italiano semplice."""


def _estrai_json(testo: str) -> dict:
    """Estrae il JSON dalla risposta dell'AI, anche se circondato da altro testo."""
    try:
        return json.loads(testo)
    except json.JSONDecodeError:
        inizio = testo.find("{")
        fine = testo.rfind("}")
        if inizio != -1 and fine != -1 and fine > inizio:
            try:
                return json.loads(testo[inizio : fine + 1])
            except json.JSONDecodeError:
                pass
    return {"opportunita": []}


# ------------------------------- Analisi demo --------------------------------


def _opportunita(
    titolo, categoria, perche, cosa_verificare, documenti, a_chi, confidenza
) -> dict:
    return {
        "titolo": titolo,
        "categoria": categoria,
        "perche": perche,
        "cosa_verificare": cosa_verificare,
        "documenti": documenti,
        "a_chi_rivolgersi": a_chi,
        "confidenza": confidenza,
    }


def _analisi_demo(profilo: Profilo) -> dict:
    """Regole semplici, solo per mostrare l'esperienza senza chiave AI."""
    opportunita: list[dict] = []

    isee_basso = any(
        s in profilo.isee_indicativo.lower()
        for s in ["meno", "0-10", "sotto", "basso", "10.000", "15.000"]
    )

    if profilo.figli_minori or profilo.numero_figli > 0:
        opportunita.append(
            _opportunita(
                "Assegno Unico e Universale per i figli",
                "Famiglia",
                "Hai indicato la presenza di figli nel nucleo.",
                "Presentazione domanda INPS e ISEE aggiornato.",
                ["ISEE in corso di validità", "Documento d'identità", "IBAN"],
                "Patronato o sito INPS",
                "alta",
            )
        )

    if profilo.invalidita:
        opportunita.append(
            _opportunita(
                "Agevolazioni per invalidità/disabilità (Legge 104)",
                "Disabilità",
                "Hai indicato un'invalidità o disabilità in famiglia.",
                "Verbale di riconoscimento e percentuale di invalidità.",
                ["Verbale INPS di invalidità", "Documentazione sanitaria"],
                "Patronato o INPS",
                "alta",
            )
        )

    if profilo.anziani_a_carico:
        opportunita.append(
            _opportunita(
                "Indennità di accompagnamento e agevolazioni per anziani",
                "Anziani",
                "Hai indicato anziani da assistere o a carico.",
                "Requisiti sanitari e reddituali dell'anziano.",
                ["Documentazione sanitaria", "ISEE dell'anziano"],
                "Patronato o INPS",
                "media",
            )
        )

    if isee_basso:
        opportunita.append(
            _opportunita(
                "Bonus sociale per bollette (luce, gas, acqua)",
                "Reddito",
                "Hai indicato un ISEE indicativo basso.",
                "Soglia ISEE prevista per l'anno in corso.",
                ["ISEE in corso di validità"],
                "CAF (è automatico con l'ISEE)",
                "media",
            )
        )

    if "affitto" in profilo.situazione_abitativa.lower():
        opportunita.append(
            _opportunita(
                "Detrazioni/contributi per l'affitto",
                "Casa",
                "Hai indicato di vivere in affitto.",
                "Tipo di contratto e requisiti di reddito.",
                ["Contratto di locazione registrato", "Ricevute di pagamento"],
                "CAF o commercialista",
                "media",
            )
        )

    if "disoccup" in profilo.situazione_lavorativa.lower():
        opportunita.append(
            _opportunita(
                "NASpI (indennità di disoccupazione)",
                "Lavoro",
                "Hai indicato una situazione di disoccupazione.",
                "Requisiti contributivi e termini di domanda.",
                ["Ultime buste paga", "Lettera di licenziamento/cessazione"],
                "Patronato o INPS",
                "media",
            )
        )

    if not opportunita:
        opportunita.append(
            _opportunita(
                "Verifica generale delle agevolazioni ISEE",
                "Altro",
                "Con più informazioni l'analisi diventa più precisa.",
                "Aggiorna il questionario o carica l'ISEE.",
                ["ISEE in corso di validità"],
                "CAF",
                "bassa",
            )
        )

    return {"demo": True, "opportunita": opportunita, "avviso": AVVISO}
