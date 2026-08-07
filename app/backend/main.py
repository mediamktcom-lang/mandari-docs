"""
Backend di Mandari (FastAPI) — Fetta 1.

Espone un'unica funzione utile: ricevere le risposte del questionario demo e
restituire la prima analisi di SPETTA.

Avvio locale (dalla cartella app/backend):
    uvicorn main:app --reload
"""

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
