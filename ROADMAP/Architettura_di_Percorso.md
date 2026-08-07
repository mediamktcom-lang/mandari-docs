# ROADMAP

Versione: 1.0

Stato: Attivo

---

# 1. Scheme

Il presente capitolo rappresenta il percorso ufficiale di sviluppo del progetto Mandari.

Ogni fase produce uno o più documenti che devono essere approvati (Frozen) prima di poter accedere alla fase successiva.

Nessuna fase può essere saltata.

Lo stato di avanzamento dell'intero progetto viene aggiornato esclusivamente al completamento di una fase prevista dal presente documento.

---

## Percorso Ufficiale

IDEA

↓

PRD
(Product Requirements Document)

↓

ARCH
(Technical Architecture)

↓

SPRINT
(Pianificazione dello sviluppo)

↓

SOURCE
(Codice sorgente)

↓

TEST
(Verifica tecnica e funzionale)

↓

BETA
(Test con utenti reali)

↓

PRODUZIONE
(Rilascio ufficiale)

---

## Regole del Percorso

- Ogni fase inizia esclusivamente dopo la chiusura della fase precedente.

- Ogni documento approvato viene congelato (Frozen).

- Eventuali modifiche ai documenti congelati devono essere motivate e approvate.

- Lo stato di avanzamento viene aggiornato solamente nel presente documento.

- Il presente documento costituisce l'unico riferimento ufficiale dello stato del progetto.

---

# 2. Stato di Avanzamento

## Fase 0 — Ideazione

Stato

✓ Completata

Output

- Visione iniziale del progetto Mandari.

---

## Fase 1 — PRD

Stato

✓ Completata

Output

- PRD-000
- PRD-001
- PRD-002
- PRD-003
- PRD-004
- PRD-005
- PRD-006
- PRD-007
- PRD-008
- PRD-009
- PRD-010
- PRD-011
- PRD-012
- PRD-013
- PRD-014
- PRD-015

---

## Fase 2 — ARCH

Stato

🔄 In corso

Output prodotti (Stato: Review — da congelare)

- ARCH-001
- ARCH-002
- ARCH-003
- ARCH-004
- ARCH-005
- ARCH-006

---

## Fase 3 — Sprint

Stato

🔄 Avvio — in attesa del congelamento dei documenti ARCH

Sprint redatti

- SPR-001 — Setup Ambiente di Sviluppo (Stato: Review)

Attività di setup ambiente già svolte (vedi WORKSTATION.md)

✔ Configurazione workstation
✔ Git
✔ GitHub
✔ Node.js
✔ Python
✔ VS Code

Nota: il codice sorgente dell'applicazione è mantenuto in un repository software dedicato, distinto da `mandari-docs` (questo repository contiene esclusivamente la documentazione). Il bootstrap del progetto software (Next.js / FastAPI) e i relativi commit sono tracciati in quel repository.

---

## Fase 4 — Source

Stato

Non iniziata

---

## Fase 5 — Test

Stato

Non iniziata

---

## Fase 6 — Beta

Stato

Non iniziata

---

## Fase 7 — Produzione

Stato

Non iniziata

---

# 3. Stato Corrente

Fase attiva

ARCH (Fase 2)

Documenti correnti

ARCH-001 … ARCH-006 (redatti, Stato: Review)

Stato

Documenti ARCH in revisione.

Prossimo passo

Congelamento dei documenti ARCH, quindi avvio formale della Fase 3 (Sprint di sviluppo).

---

# 4. Registro delle Revisioni

Versione | Data | Descrizione
---------|------|------------
1.0 | Prima emissione | Creazione della Roadmap ufficiale del progetto.

