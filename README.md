# Mandari — Documentazione di Progetto

**Mandari** è il sistema operativo della vita amministrativa personale e familiare:
un assistente che acquisisce documenti, li interpreta, costruisce e mantiene aggiornato
il **Fascicolo Amministrativo** del cittadino e lo assiste attraverso quattro motori
specializzati coordinati da un orchestratore intelligente.

> Questo repository (`mandari-docs`) contiene **esclusivamente la documentazione** del
> progetto. Il codice sorgente dell'applicazione è mantenuto in un repository software
> dedicato e separato.

---

## Concetti chiave

- **Fascicolo Amministrativo** — la memoria permanente e unica fonte di verità del cittadino.
- **Atto** — l'unità fondamentale della conoscenza (un evento amministrativo). Il documento
  è solo una possibile evidenza dell'Atto.
- **Motori** — quattro specialisti di dominio:
  - **SPETTA** — diritti, bonus, agevolazioni, esenzioni.
  - **DATA** — scadenze, reminder, tempo amministrativo.
  - **CARTA** — comprensione e spiegazione dei documenti.
  - **AFFIDO** — ricerca di soluzioni, professionisti e servizi.
- **Orchestratore (Anya)** — coordina i motori e costruisce una risposta unica.
- **Backend** — unico componente autorizzato ad accedere a Database e Storage.

## Stack tecnologico (dai documenti ARCH)

| Livello | Tecnologia |
|---|---|
| Backend | Python · FastAPI · Uvicorn |
| API | REST · JSON · OpenAPI/Swagger |
| Database | PostgreSQL (Supabase) |
| Storage | Ibrido (Supabase Storage + provider esterni) |
| Web | Next.js |
| Mobile | React Native |
| Cloud | GitHub · Supabase · Vercel |

---

## Struttura del repository

```
mandari/
├── PRD/       # Product Requirements — cosa fa il prodotto e perché (Fase 1)
├── ARCH/      # Architettura tecnica — con quali tecnologie (Fase 2)
├── ROADMAP/   # Percorso ufficiale e stato di avanzamento
└── SPRINTS/   # Pianificazione operativa dello sviluppo (Fase 3)
```

- [PRD/](PRD/README.md) — 16 documenti di prodotto (PRD-000 … PRD-015).
- [ARCH/](ARCH/README.md) — 6 documenti tecnici (ARCH-001 … ARCH-006).
- [ROADMAP/](ROADMAP/Architettura_di_Percorso.md) — percorso e stato del progetto.
- [SPRINTS/](SPRINTS/README.md) — sprint di sviluppo.

## Governance della documentazione

Ogni documento segue il ciclo di vita **Draft → Review → FROZEN**. Il percorso ufficiale è:

```
IDEA → PRD → ARCH → SPRINT → SOURCE → TEST → BETA → PRODUZIONE
```

Le decisioni progettuali si prendono nei PRD e negli ARCH, mai nel codice. In caso di
conflitto prevale sempre il documento congelato di livello superiore
(PRD → ARCH → Sprint → Codice).

## Stato attuale

- **Fase 1 — PRD:** completata (PRD-000 … PRD-015, FROZEN).
- **Fase 2 — ARCH:** in corso (ARCH-001 … ARCH-006 in revisione).
- **Fase 3 — Sprint:** in avvio (SPR-001 redatto).

Lo stato ufficiale è mantenuto in [ROADMAP/Architettura_di_Percorso.md](ROADMAP/Architettura_di_Percorso.md).
