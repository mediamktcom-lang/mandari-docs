
# PRD-000

# Guida alla Documentazione del Progetto Mandari

Versione: 1.0

Stato: FROZEN

---

# Scopo del documento

Il presente documento costituisce il punto di ingresso della documentazione tecnica e funzionale del progetto Mandari.

Ha lo scopo di descrivere come è organizzata la documentazione, quale ruolo svolge ogni PRD e in quale ordine devono essere letti.

Questo documento non descrive funzionalità dell'applicazione.

Definisce invece le regole di consultazione dell'intero progetto.

---

# Obiettivi

La documentazione di Mandari è stata progettata per:

- descrivere completamente il prodotto;
- documentare tutte le decisioni progettuali;
- mantenere la tracciabilità delle scelte effettuate;
- consentire l'ingresso di nuovi sviluppatori senza perdita di conoscenza;
- ridurre le ambiguità durante lo sviluppo.

---

# Filosofia della documentazione

Ogni PRD affronta un solo argomento.

Ogni decisione viene descritta una sola volta.

I PRD successivi fanno riferimento ai documenti precedenti senza duplicarne il contenuto.

La documentazione rappresenta la fonte ufficiale delle decisioni progettuali.

In caso di conflitto tra implementazione software e documentazione, prevale sempre il PRD congelato più recente.

---

# Stato dei documenti

Ogni documento può assumere uno dei seguenti stati.

## Draft

Documento in fase di scrittura.

Può essere modificato liberamente.

---

## Review

Documento completo sottoposto a revisione.

Le modifiche vengono discusse ma non ancora approvate.

---

## Frozen

Documento approvato.

Le decisioni contenute vengono considerate definitive.

Eventuali modifiche future dovranno essere documentate attraverso una nuova revisione.

---

# Organizzazione della documentazione

La documentazione è organizzata nella cartella:

```
PRD/
```

Ogni documento utilizza la seguente nomenclatura:

```
PRD-000
PRD-001
PRD-002
...
PRD-015
```

I numeri identificano esclusivamente l'ordine logico della documentazione.

Non rappresentano priorità di sviluppo.

---

# Roadmap della documentazione

## Documenti completati (FROZEN)

- PRD-000 — Guida alla Documentazione
- PRD-001 — Visione del Prodotto
- PRD-002 — Modello del Cittadino e del Fascicolo
- PRD-003 — Esperienza Utente
- PRD-004 — Motori Funzionali
- PRD-005 — Orchestratore / AI Engine
- PRD-006 — Architettura Tecnica della Piattaforma
- PRD-007 — Modello dei Dati e del Fascicolo
- PRD-008 — Architettura Fisica e Persistenza
- PRD-009 — Sicurezza, Identità e Controllo degli Accessi
- PRD-010 — API e Comunicazione tra i Servizi
- PRD-011 — Intelligenza Artificiale e Integrazione dei Modelli
- PRD-012 — Deployment, DevOps e Infrastruttura Operativa
- PRD-013 — Monitoraggio, Logging e Manutenzione
- PRD-014 — Linee Guida di Sviluppo
- PRD-015 — Revisione Finale dell'Architettura

La fase PRD è conclusa: tutti i documenti sono in stato FROZEN.

---

# Ordine di lettura

Per comprendere correttamente il progetto si raccomanda il seguente ordine di lettura.

1. PRD-000
2. PRD-001
3. PRD-002
4. PRD-003
5. PRD-004
6. PRD-005
7. PRD-006
8. PRD-007
9. PRD-008
10. PRD-009
11. PRD-010
12. PRD-011
13. PRD-012
14. PRD-013
15. PRD-014
16. PRD-015

Ogni documento assume la conoscenza dei precedenti.

---

# Convenzioni adottate

All'interno della documentazione vengono utilizzate le seguenti convenzioni.

- I termini tecnici mantengono la denominazione standard dell'ingegneria del software.
- Ogni concetto viene definito una sola volta.
- Le decisioni approvate vengono riportate nella sezione "Decisioni Congelate".
- Le modifiche ai documenti congelati devono essere motivate e revisionate.

---

# Metodo di sviluppo della documentazione

Ogni PRD segue il medesimo ciclo di vita.

1. Stesura completa del documento.
2. Revisione tecnica.
3. Discussione delle modifiche.
4. Aggiornamento del documento.
5. Approvazione.
6. Stato Frozen.
7. Commit nel repository GitHub.

Questo processo garantisce la tracciabilità delle decisioni e la coerenza dell'intero progetto.

---

# Obiettivo finale

L'obiettivo della documentazione non è produrre una raccolta di documenti, ma costruire una base di conoscenza completa che descriva Mandari dal punto di vista funzionale, architetturale e tecnico.

La documentazione dovrà consentire a qualsiasi sviluppatore di comprendere il progetto, contribuire al suo sviluppo e motivare ogni scelta progettuale effettuata.

---

# Decisioni Congelate

✓ PRD-000 rappresenta il punto di ingresso ufficiale della documentazione.

✓ Ogni decisione progettuale deve essere documentata all'interno di un PRD.

✓ I documenti seguono il ciclo Draft → Review → Frozen.

✓ Ogni PRD tratta un solo argomento.

✓ I documenti successivi fanno riferimento ai precedenti senza duplicarne il contenuto.

✓ La documentazione costituisce la fonte ufficiale delle decisioni progettuali del progetto Mandari.

