"""
Fascicolo Amministrativo — persistenza su Supabase.

Salva profilo, Atti e scadenze nel database, usando il token dell'utente
(inoltrato dal frontend): la sicurezza per-riga (RLS) garantisce che ogni utente
veda e scriva solo i propri dati. Il campo user_id viene compilato
automaticamente dal database (default auth.uid()).

Ogni operazione è "best effort": se il salvataggio fallisce, non blocca la
risposta all'utente.
"""

from __future__ import annotations

import os

import httpx

_CAMPI_PROFILO = [
    "regione",
    "eta",
    "cittadinanza",
    "composizione_nucleo",
    "numero_figli",
    "figli_minori",
    "invalidita",
    "anziani_a_carico",
    "situazione_lavorativa",
    "isee_indicativo",
    "situazione_abitativa",
    "note",
]


def estrai_token(authorization: str | None) -> str | None:
    """Ricava il token dall'header Authorization: Bearer <token>."""
    if authorization and authorization.lower().startswith("bearer "):
        return authorization.split(" ", 1)[1].strip()
    return None


def _base() -> str:
    return os.getenv("SUPABASE_URL", "").rstrip("/")


def _headers(token: str, prefer: str) -> dict:
    return {
        "apikey": os.getenv("SUPABASE_ANON_KEY", ""),
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": prefer,
    }


async def salva_profilo(token: str, profilo: dict) -> None:
    """Salva/aggiorna il profilo amministrativo dell'utente (una riga per utente)."""
    dati = {c: profilo.get(c) for c in _CAMPI_PROFILO if profilo.get(c) not in (None,)}
    if not dati:
        return
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(
                f"{_base()}/rest/v1/profili?on_conflict=user_id",
                headers=_headers(token, "return=minimal,resolution=merge-duplicates"),
                json=dati,
            )
    except Exception:
        pass


async def crea_atto(token: str, atto: dict) -> str | None:
    """Crea un Atto nel Fascicolo. Restituisce l'id se disponibile."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.post(
                f"{_base()}/rest/v1/atti",
                headers=_headers(token, "return=representation"),
                json=atto,
            )
            if r.status_code < 300:
                dati = r.json()
                if isinstance(dati, list) and dati:
                    return dati[0].get("id")
    except Exception:
        pass
    return None


async def crea_scadenze(token: str, atto_id: str | None, scadenze: list) -> None:
    """Registra le scadenze trovate (motore DATA)."""
    righe = []
    for s in scadenze or []:
        cosa = (s.get("cosa") or "").strip()
        if not cosa:
            continue
        riga = {"cosa": cosa, "quando_testo": s.get("quando", "")}
        if atto_id:
            riga["atto_id"] = atto_id
        righe.append(riga)
    if not righe:
        return
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(
                f"{_base()}/rest/v1/scadenze",
                headers=_headers(token, "return=minimal"),
                json=righe,
            )
    except Exception:
        pass
