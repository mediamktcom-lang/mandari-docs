"""
Embeddings — rappresentazione semantica del testo per la ricerca per similarità.

Usa il modello di embedding gratuito di Gemini. Best-effort: se non disponibile,
restituisce None e il sistema ripiega sulla ricerca per recenti.
"""

from __future__ import annotations

import os

MODELLO_EMBEDDING = "gemini-embedding-001"
DIMENSIONI = 768  # deve combaciare con la colonna vector(768) del database


def calcola_embedding(testo: str) -> str | None:
    """Restituisce l'embedding come stringa pgvector '[...]', oppure None."""
    chiave = os.getenv("GEMINI_API_KEY", "").strip()
    if not chiave or not (testo or "").strip():
        return None
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=chiave)
        r = client.models.embed_content(
            model=MODELLO_EMBEDDING,
            contents=testo,
            config=types.EmbedContentConfig(output_dimensionality=DIMENSIONI),
        )
        valori = r.embeddings[0].values
        return "[" + ",".join(str(x) for x in valori) + "]"
    except Exception:
        return None
