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
import re

import httpx


def _parse_data(testo: str | None) -> str | None:
    """Prova a estrarre una data (ISO) da un testo libero, es. '15/10/2026'."""
    if not testo:
        return None
    m = re.search(r"(\d{1,2})[/-](\d{1,2})[/-](\d{4})", testo)
    if m:
        g, me, a = m.groups()
        try:
            return f"{int(a):04d}-{int(me):02d}-{int(g):02d}"
        except ValueError:
            return None
    m2 = re.search(r"\d{4}-\d{2}-\d{2}", testo)
    return m2.group(0) if m2 else None

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


def _get_headers(token: str) -> dict:
    return {
        "apikey": os.getenv("SUPABASE_ANON_KEY", ""),
        "Authorization": f"Bearer {token}",
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
        testo_quando = s.get("quando", "")
        riga = {"cosa": cosa, "quando_testo": testo_quando}
        data = _parse_data(testo_quando)
        if data:
            riga["quando"] = data
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


async def elenco_atti(token: str, q: str | None = None) -> list:
    """Restituisce gli Atti del Fascicolo (più recenti prima), con ricerca opzionale."""
    params = {
        "select": "id,tipo,titolo,origine,created_at,metadati,contenuto",
        "order": "created_at.desc",
    }
    if q:
        params["or"] = f"(titolo.ilike.*{q}*,testo_ricerca.ilike.*{q}*)"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{_base()}/rest/v1/atti", headers=_get_headers(token), params=params
            )
            if r.status_code < 300:
                return r.json()
    except Exception:
        pass
    return []


async def recupera_contesto(token: str) -> str:
    """Riepilogo compatto degli Atti recenti dell'utente, per contestualizzare Anya."""
    atti = await elenco_atti(token)
    righe = []
    for a in atti[:8]:
        c = a.get("contenuto")
        snippet = ""
        if isinstance(c, dict):
            snippet = (c.get("riassunto") or c.get("messaggio") or "")[:160]
        riga = f"- [{a.get('origine', '')}] {a.get('titolo', '')}"
        if snippet:
            riga += f": {snippet}"
        righe.append(riga)
    return "\n".join(righe)


async def elenco_scadenze(token: str) -> list:
    """Restituisce le scadenze del Fascicolo (motore DATA)."""
    params = {
        "select": (
            "id,cosa,quando,quando_testo,stato,created_at,"
            "atti(id,titolo,tipo,origine,contenuto)"
        ),
        "order": "quando.asc.nullslast",
    }
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{_base()}/rest/v1/scadenze",
                headers=_get_headers(token),
                params=params,
            )
            if r.status_code < 300:
                return r.json()
    except Exception:
        pass
    return []
