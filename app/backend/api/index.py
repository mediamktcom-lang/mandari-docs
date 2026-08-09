"""Punto d'ingresso per Vercel (funzione serverless).

Vercel esegue le funzioni Python trovate nella cartella `api/`. Qui importiamo
l'app FastAPI definita in `main.py` (nella cartella superiore) e la esponiamo:
Vercel riconosce l'app ASGI e le inoltra tutte le richieste.
"""

import os
import sys

# Rende importabili i moduli del backend (main, fascicolo, orchestratore, ...)
# che si trovano nella cartella superiore rispetto a questo file.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # noqa: E402  (import dopo la modifica del path)

# `app` è l'oggetto ASGI che Vercel serve.
