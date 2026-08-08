"""
Anya — l'orchestratore di Mandari.

È l'unico punto di ingresso dell'esperienza "assistente unico": riceve un
messaggio dell'utente e/o un documento, capisce di cosa si tratta e instrada al
motore competente (CARTA per i documenti, SPETTA per i diritti, ecc.),
restituendo una risposta unica e conversazionale.

L'utente non sceglie il motore: lo fa Anya, in modo trasparente (come da PRD-005).
Prima versione pragmatica; verrà arricchita nel tempo.
"""

from __future__ import annotations

import os

from carta import spiega_documento
from spetta import _estrai_json

AVVISO_GENERALE = (
    "Le informazioni fornite sono indicative e non costituiscono consulenza: "
    "per i casi concreti rivolgiti a un CAF, un Patronato o un professionista."
)


def rispondi(
    messaggio: str,
    dati_file: bytes | None,
    mime: str | None,
    profilo: dict | None,
    contesto: str = "",
) -> dict:
    """Punto di ingresso unico: instrada e costruisce la risposta."""
    messaggio = (messaggio or "").strip()

    # 1) C'è un documento → motore CARTA
    if dati_file:
        doc = spiega_documento(dati_file, mime or "application/pdf")
        tipo = doc.get("tipo") or "un documento"
        testo = f"Ho letto il tuo documento: sembra {tipo}. {doc.get('riassunto', '')}".strip()
        return {
            "motore": "CARTA",
            "messaggio": testo,
            "documento": doc,
            "opportunita": [],
            "soluzioni": [],
            "demo": doc.get("demo", False),
            "avviso": doc.get("avviso", ""),
        }

    # 2) Solo testo → Anya instrada e risponde (una sola chiamata all'AI)
    if messaggio:
        chiave = os.getenv("GEMINI_API_KEY", "").strip()
        if chiave:
            try:
                return _anya(messaggio, profilo, chiave, contesto)
            except Exception as errore:
                demo = _demo_testo()
                demo["nota_tecnica"] = f"Fallback demo (AI non disponibile: {errore})"
                return demo
        return _demo_testo()

    # 3) Nessun input
    return {
        "motore": "GENERALE",
        "messaggio": "Scrivimi una domanda oppure carica un documento: ci penso io.",
        "documento": None,
        "opportunita": [],
        "soluzioni": [],
        "demo": False,
        "avviso": "",
    }


def _anya(
    messaggio: str, profilo: dict | None, chiave: str, contesto: str = ""
) -> dict:
    from google import genai

    modello = os.getenv("GEMINI_MODEL", "gemini-flash-latest")
    client = genai.Client(api_key=chiave)
    risposta = client.models.generate_content(
        model=modello, contents=_prompt(messaggio, profilo, contesto)
    )
    d = _estrai_json((risposta.text or "").strip())
    return {
        "motore": d.get("motore", "GENERALE"),
        "messaggio": d.get("messaggio", ""),
        "documento": None,
        "opportunita": d.get("opportunita", []),
        "soluzioni": d.get("soluzioni", []),
        "demo": False,
        "avviso": d.get("avviso", ""),
    }


def _prompt(messaggio: str, profilo: dict | None, contesto: str = "") -> str:
    profilo_txt = _profilo_testo(profilo)
    memoria = contesto.strip() or "Nessun elemento ancora nel Fascicolo."
    return f"""Sei Anya, l'assistente unico di Mandari, che aiuta i cittadini italiani
con la burocrazia. L'utente NON sa che esistono motori interni: percepisce un solo
assistente. Capisci la sua richiesta e rispondi in modo utile, semplice e concreto.

Memoria del Fascicolo (cosa Mandari ha già raccolto per questo utente; usala per
contestualizzare e collegare, senza ripeterla inutilmente):
{memoria}

Classifica internamente quale competenza stai usando:
- SPETTA: diritti, bonus, agevolazioni, esenzioni ("cosa mi spetta", "ho diritto a…")
- DATA: scadenze, promemoria, calendario ("quando scade", "ricordami")
- AFFIDO: trovare un professionista o un servizio ("a chi mi rivolgo", "cerco un…")
- GENERALE: spiegazioni e tutto il resto

Cosa sappiamo dell'utente:
{profilo_txt}

Messaggio dell'utente:
"{messaggio}"

Rispondi ESCLUSIVAMENTE con un JSON valido in questo formato, senza testo prima o dopo:
{{
  "motore": "SPETTA | DATA | AFFIDO | GENERALE",
  "messaggio": "la tua risposta conversazionale, in italiano semplice",
  "opportunita": [
    {{
      "titolo": "…",
      "categoria": "Famiglia | Casa | Lavoro | Reddito | Salute | Disabilità | Anziani | Altro",
      "perche": "…",
      "cosa_verificare": "…",
      "documenti": ["…"],
      "a_chi_rivolgersi": "…",
      "confidenza": "alta | media | bassa"
    }}
  ],
  "soluzioni": [
    {{
      "titolo": "Nome della soluzione (es. CAF, commercialista, asilo nido comunale)",
      "tipo": "Professionista | Servizio pubblico | Ente | Partner | Informazione",
      "perche": "Perché è adatta al bisogno (1 frase)",
      "come_procedere": "Il primo passo concreto da fare",
      "documenti": ["eventuali documenti utili da preparare"]
    }}
  ],
  "avviso": "eventuale avviso se pertinente (es. non è consulenza), altrimenti stringa vuota"
}}

Regole:
- Compila "opportunita" SOLO quando la competenza è SPETTA (altrimenti lista vuota).
- Compila "soluzioni" SOLO quando la competenza è AFFIDO, cioè quando l'utente cerca
  a chi rivolgersi o una soluzione a un bisogno (professionista, servizio, ente,
  asilo nido, medico, ecc.). Altrimenti lista vuota. Massimo 5 soluzioni.
- Non inventare dati non desumibili dal profilo o dal messaggio. Massimo 5 opportunità."""


def _profilo_testo(profilo: dict | None) -> str:
    if not profilo:
        return "- Nessuna informazione ancora raccolta."
    etichette = {
        "regione": "Regione",
        "eta": "Età",
        "cittadinanza": "Cittadinanza",
        "composizione_nucleo": "Nucleo",
        "numero_figli": "Numero figli",
        "figli_minori": "Figli minorenni",
        "invalidita": "Invalidità in famiglia",
        "anziani_a_carico": "Anziani a carico",
        "situazione_lavorativa": "Situazione lavorativa",
        "isee_indicativo": "ISEE indicativo",
        "situazione_abitativa": "Abitazione",
        "note": "Note",
    }
    righe = []
    for chiave, etichetta in etichette.items():
        valore = profilo.get(chiave)
        if valore in (None, "", 0, False):
            continue
        if isinstance(valore, bool):
            valore = "sì"
        righe.append(f"- {etichetta}: {valore}")
    return "\n".join(righe) if righe else "- Nessuna informazione ancora raccolta."


def _demo_testo() -> dict:
    return {
        "motore": "GENERALE",
        "messaggio": (
            "In modalità dimostrativa non posso ancora elaborare la richiesta. "
            "Con l'AI collegata, qui ti risponderò capendo da solo di cosa hai "
            "bisogno."
        ),
        "documento": None,
        "opportunita": [],
        "soluzioni": [],
        "demo": True,
        "avviso": AVVISO_GENERALE,
    }
