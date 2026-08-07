"""
CARTA — motore di comprensione documentale (demo).

Riceve un documento (immagine o PDF) e ne produce una spiegazione semplice:
tipo di documento, riassunto, azioni da fare, scadenze, a chi rivolgersi.

- Con una chiave Gemini usa l'AI (Gemini legge direttamente immagini e PDF).
- Senza chiave funziona in modalità DEMO (spiegazione segnaposto).

NB: la spiegazione è indicativa e non sostituisce il documento originale.
"""

from __future__ import annotations

import os

from spetta import _estrai_json

AVVISO_CARTA = (
    "Spiegazione indicativa generata automaticamente: verifica sempre il "
    "documento originale e, in caso di dubbi, rivolgiti all'ente emittente o a "
    "un professionista."
)


def spiega_documento(dati: bytes, mime: str) -> dict:
    """Restituisce la spiegazione del documento. Usa Gemini se disponibile."""
    chiave = os.getenv("GEMINI_API_KEY", "").strip()
    if chiave:
        try:
            return _con_gemini(dati, mime, chiave)
        except Exception as errore:
            demo = _demo()
            demo["nota_tecnica"] = f"Fallback demo (AI non disponibile: {errore})"
            return demo
    return _demo()


def _con_gemini(dati: bytes, mime: str, chiave: str) -> dict:
    from google import genai
    from google.genai import types

    modello = os.getenv("GEMINI_MODEL", "gemini-flash-latest")
    client = genai.Client(api_key=chiave)

    parte = types.Part.from_bytes(data=dati, mime_type=mime or "application/pdf")
    risposta = client.models.generate_content(
        model=modello, contents=[_prompt(), parte]
    )
    d = _estrai_json((risposta.text or "").strip())

    return {
        "demo": False,
        "tipo": d.get("tipo", ""),
        "riassunto": d.get("riassunto", ""),
        "azioni": d.get("azioni", []),
        "scadenze": d.get("scadenze", []),
        "a_chi_rivolgersi": d.get("a_chi_rivolgersi", ""),
        "attendibilita": d.get("attendibilita", "media"),
        "avviso": AVVISO_CARTA,
    }


def _prompt() -> str:
    return """Sei CARTA, un assistente che spiega documenti amministrativi italiani
a un cittadino senza competenze tecniche. Leggi il documento allegato e spiega in
modo semplice cosa significa e cosa fare. Non inventare: se un'informazione non è
presente, ometterla.

Rispondi ESCLUSIVAMENTE con un JSON valido in questo formato, senza testo prima o dopo:
{
  "tipo": "Tipo di documento (es. Comunicazione INPS, Cartella di pagamento, Bolletta)",
  "riassunto": "Spiegazione semplice di cosa dice il documento (2-4 frasi)",
  "azioni": ["Cosa deve fare il cittadino, un passo per elemento"],
  "scadenze": [{"cosa": "adempimento", "quando": "data o termine"}],
  "a_chi_rivolgersi": "Es. ente emittente, CAF, Patronato",
  "attendibilita": "alta | media | bassa"
}
In italiano semplice."""


def _demo() -> dict:
    return {
        "demo": True,
        "tipo": "Documento (modalità demo)",
        "riassunto": (
            "In modalità dimostrativa non posso leggere il contenuto del "
            "documento. Con l'AI collegata, qui vedrai una spiegazione semplice di "
            "cosa dice, cosa fare e le eventuali scadenze."
        ),
        "azioni": ["Collega la chiave AI per attivare la lettura dei documenti."],
        "scadenze": [],
        "a_chi_rivolgersi": "",
        "attendibilita": "bassa",
        "avviso": AVVISO_CARTA,
    }
