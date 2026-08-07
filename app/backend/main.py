"""
Backend di Mandari (FastAPI) — Fetta 1.

Espone un'unica funzione utile: ricevere le risposte del questionario demo e
restituire la prima analisi di SPETTA.

Avvio locale (dalla cartella app/backend):
    uvicorn main:app --reload
"""

import json

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from carta import spiega_documento
from orchestratore import rispondi
from spetta import Profilo, genera_analisi

# Carica le variabili dal file .env (se presente), es. la chiave AI.
load_dotenv()

app = FastAPI(title="Mandari API", version="0.1.0")

# Permette al sito web (frontend) di parlare con questo backend durante lo sviluppo.
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
def analyze(profilo: Profilo) -> dict:
    """Riceve il profilo del questionario e restituisce l'analisi di SPETTA."""
    return genera_analisi(profilo)


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
) -> dict:
    """Assistente unico (Anya): capisce la richiesta e instrada al motore giusto."""
    dati = await file.read() if file is not None else None
    mime = file.content_type if file is not None else None
    try:
        prof = json.loads(profilo) if profilo else None
    except json.JSONDecodeError:
        prof = None
    return rispondi(messaggio, dati, mime, prof)
