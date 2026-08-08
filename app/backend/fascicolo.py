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

import asyncio
import base64
import json
import os
import re
import uuid

import httpx

# Spazio incluso per utente su Mandari (oltre, si passa allo storage dell'utente).
QUOTA_BYTE = 500 * 1024 * 1024  # 500 MB


def user_id_da_token(token: str) -> str | None:
    """Estrae l'id utente (sub) dal token, solo per costruire il percorso file."""
    try:
        payload = token.split(".")[1]
        payload += "=" * (-len(payload) % 4)
        dati = json.loads(base64.urlsafe_b64decode(payload))
        return dati.get("sub")
    except Exception:
        return None


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
    # Indicizzazione semantica: calcola l'embedding del testo dell'Atto
    if atto.get("testo_ricerca") and "embedding" not in atto:
        from intelligenza import calcola_embedding

        emb = await asyncio.to_thread(calcola_embedding, atto["testo_ricerca"])
        if emb:
            atto["embedding"] = emb
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


async def crea_scadenze(
    token: str,
    atto_id: str | None,
    scadenze: list,
    persona_id: str | None = None,
) -> None:
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
        if persona_id:
            riga["persona_id"] = persona_id
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


async def elenco_atti(
    token: str, q: str | None = None, persona_id: str | None = None
) -> list:
    """Restituisce gli Atti del Fascicolo (più recenti prima), con ricerca opzionale."""
    params = {
        "select": "id,tipo,titolo,origine,created_at,metadati,contenuto",
        "order": "created_at.desc",
    }
    if q:
        params["or"] = f"(titolo.ilike.*{q}*,testo_ricerca.ilike.*{q}*)"
    if persona_id:
        params["persona_id"] = f"eq.{persona_id}"
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


async def elenco_persone(token: str) -> list:
    """Le persone gestite dall'utente (sé stesso + profili aggiunti)."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{_base()}/rest/v1/persone?select=*&order=is_self.desc,created_at.asc",
                headers=_get_headers(token),
            )
            if r.status_code < 300:
                return r.json()
    except Exception:
        pass
    return []


async def crea_persona(
    token: str, nome: str, relazione: str = "", is_self: bool = False
) -> str | None:
    """Crea una persona gestita. Restituisce l'id."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.post(
                f"{_base()}/rest/v1/persone",
                headers=_headers(token, "return=representation"),
                json={"nome": nome, "relazione": relazione, "is_self": is_self},
            )
            if r.status_code < 300:
                d = r.json()
                if isinstance(d, list) and d:
                    return d[0].get("id")
    except Exception:
        pass
    return None


async def persona_self(token: str) -> str | None:
    """Restituisce (creandola se serve) la persona 'sé stesso' dell'utente."""
    for p in await elenco_persone(token):
        if p.get("is_self"):
            return p.get("id")
    pid = await crea_persona(token, "Tu", "", True)
    if pid:
        # Collega al profilo personale gli Atti/scadenze creati prima dei profili
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                for tab in ("atti", "scadenze"):
                    await client.patch(
                        f"{_base()}/rest/v1/{tab}?persona_id=is.null",
                        headers=_headers(token, "return=minimal"),
                        json={"persona_id": pid},
                    )
        except Exception:
            pass
    return pid


async def crea_delega(token: str, email: str) -> str | None:
    """Autorizza (per email) un'altra persona a consultare il proprio Fascicolo."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.post(
                f"{_base()}/rest/v1/deleghe",
                headers=_headers(token, "return=representation"),
                json={"delegato_email": email},
            )
            if r.status_code < 300:
                d = r.json()
                if isinstance(d, list) and d:
                    return d[0].get("id")
    except Exception:
        pass
    return None


async def elenco_deleghe(token: str) -> list:
    """Le deleghe concesse dall'utente."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{_base()}/rest/v1/deleghe?select=id,delegato_email,stato,created_at"
                f"&order=created_at.desc",
                headers=_get_headers(token),
            )
            if r.status_code < 300:
                return r.json()
    except Exception:
        pass
    return []


async def revoca_delega(token: str, delega_id: str) -> None:
    """Revoca una delega (effetto immediato)."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.patch(
                f"{_base()}/rest/v1/deleghe?id=eq.{delega_id}",
                headers=_headers(token, "return=minimal"),
                json={"stato": "revocata"},
            )
    except Exception:
        pass


async def leggi_piano(token: str) -> str:
    """Restituisce il piano dell'utente ('free' o 'pro')."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{_base()}/rest/v1/profili?select=piano&limit=1",
                headers=_get_headers(token),
            )
            if r.status_code < 300:
                d = r.json()
                if isinstance(d, list) and d:
                    return d[0].get("piano") or "free"
    except Exception:
        pass
    return "free"


async def spazio_usato(token: str) -> int:
    """Somma le dimensioni degli allegati già conservati su Mandari (in byte)."""
    atti = await elenco_atti(token)
    tot = 0
    for a in atti:
        if a.get("tipo") == "documento":
            m = a.get("metadati") or {}
            try:
                tot += int(m.get("dimensione", 0) or 0)
            except (TypeError, ValueError):
                pass
    return tot


async def salva_allegato(
    token: str, user_id: str, dati: bytes, mime: str | None
) -> str | None:
    """Carica il file originale nello storage di Mandari. Restituisce il percorso."""
    path = f"{user_id}/{uuid.uuid4().hex}"
    url = f"{_base()}/storage/v1/object/documenti/{path}"
    headers = {
        "apikey": os.getenv("SUPABASE_ANON_KEY", ""),
        "Authorization": f"Bearer {token}",
        "Content-Type": mime or "application/octet-stream",
        "x-upsert": "false",
    }
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            r = await client.post(url, headers=headers, content=dati)
            if r.status_code < 300:
                return f"documenti/{path}"
    except Exception:
        pass
    return None


def _riepiloga_atti(atti: list) -> str:
    righe = []
    for a in atti:
        c = a.get("contenuto")
        snippet = ""
        if isinstance(c, dict):
            snippet = (c.get("riassunto") or c.get("messaggio") or "")[:160]
        riga = f"- [{a.get('origine', '')}] {a.get('titolo', '')}"
        if snippet:
            riga += f": {snippet}"
        righe.append(riga)
    return "\n".join(righe)


async def _cerca_simili(
    token: str, embedding: str, persona_id: str | None, k: int = 6
) -> list:
    """Chiama la ricerca semantica (RPC) sugli Atti dell'utente."""
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            r = await client.post(
                f"{_base()}/rest/v1/rpc/cerca_atti_simili",
                headers=_headers(token, "return=representation"),
                json={
                    "query_embedding": embedding,
                    "p_persona": persona_id,
                    "k": k,
                },
            )
            if r.status_code < 300:
                return r.json()
    except Exception:
        pass
    return []


async def recupera_contesto(
    token: str, persona_id: str | None = None, messaggio: str = ""
) -> tuple[str, list]:
    """Contesto per Anya (testo, fonti). Prima ricerca semantica, poi recenti."""
    from intelligenza import calcola_embedding

    emb = calcola_embedding(messaggio) if messaggio else None
    atti: list = []
    if emb:
        atti = await _cerca_simili(token, emb, persona_id)
    if not atti:
        recenti = await elenco_atti(token, persona_id=persona_id)
        atti = recenti[:8]

    fonti = [a.get("id") for a in atti if a.get("id")]
    return _riepiloga_atti(atti), fonti


async def registra_audit(token: str, azione: str, dettaglio: dict | None = None) -> None:
    """Registra un'operazione nell'audit log (best-effort)."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(
                f"{_base()}/rest/v1/audit_log",
                headers=_headers(token, "return=minimal"),
                json={"azione": azione, "dettaglio": dettaglio or {}},
            )
    except Exception:
        pass


async def elenco_audit(token: str, limite: int = 20) -> list:
    """Restituisce le ultime operazioni registrate."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{_base()}/rest/v1/audit_log?select=azione,dettaglio,created_at"
                f"&order=created_at.desc&limit={limite}",
                headers=_get_headers(token),
            )
            if r.status_code < 300:
                return r.json()
    except Exception:
        pass
    return []


async def elenco_scadenze(token: str, persona_id: str | None = None) -> list:
    """Restituisce le scadenze del Fascicolo (motore DATA)."""
    params = {
        "select": (
            "id,cosa,quando,quando_testo,stato,created_at,"
            "atti(id,titolo,tipo,origine,contenuto)"
        ),
        "order": "quando.asc.nullslast",
    }
    if persona_id:
        params["persona_id"] = f"eq.{persona_id}"
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
