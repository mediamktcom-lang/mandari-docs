# ARCH — Documenti di Architettura Tecnica

I documenti ARCH definiscono **con quali tecnologie** viene implementato quanto
descritto nei [PRD](../PRD/README.md). Gli ARCH implementano i principi dei PRD e non
possono modificarli: ogni eventuale modifica ai principi richiede una revisione del PRD
corrispondente.

Stato: **Review** (Fase 2 in corso — da congelare).

| # | Documento | Contenuto |
|---|---|---|
| 001 | [Stack Tecnologico e Repository](01_Stack_Tecnologico_e_Repository.md) | Principi tecnici generali, repository unico, ambienti |
| 002 | [Backend, API e Architettura dei Servizi](02_Backend_Api_Architettura_dei_Servizi.md) | Python · FastAPI · Uvicorn · REST · JSON |
| 003 | [Database, Storage e Gestione Documentale](03_Database_e_Storage.md) | PostgreSQL/Supabase · storage ibrido · Storage Provider |
| 004 | [Frontend e Canali di Accesso](04_Frontend_e_Canali_di_Accesso.md) | Next.js · React Native · canali di messaggistica |
| 005 | [Identity, Client e Session Management](05_Identity_Client_Session_Management.md) | Identità unica, client, sessioni, abbonamento |
| 006 | [Anya, AI e Architettura Intelligente](06_Anya_AI_Architettura_Intelligente.md) | Orchestrazione AI, LLM multipli, memoria di sistema |

> **Nota di allineamento (da recepire nei PRD):** ARCH-003 introduce lo *Storage Provider*
> ibrido (documenti su cloud personale dell'utente). Questo estende il modello di
> persistenza descritto in PRD-008 e va formalizzato con una revisione di PRD-008.
