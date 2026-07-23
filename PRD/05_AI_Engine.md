
# PRD-005
# AI Engine

Versione: 1.0

Stato: DRAFT

Ultimo aggiornamento: Luglio 2026

---

# Obiettivo del Documento

Il presente documento descrive il funzionamento dell'AI Engine di Mandari.

A differenza del PRD-004, che definisce le responsabilità funzionali dei singoli motori, questo documento descrive come tali motori vengono coordinati per fornire al cittadino un'esperienza unificata.

L'AI Engine rappresenta il livello di orchestrazione del sistema.

Il suo compito non è svolgere direttamente attività amministrative, ma comprendere il contesto, decidere quali motori coinvolgere, coordinarne l'esecuzione e costruire una risposta coerente.

Il documento non descrive l'implementazione tecnica dell'AI Engine.

Gli aspetti tecnologici saranno trattati nel PRD-006 (Technical Architecture).

---

## Obiettivi del PRD

Il presente documento definisce:

- il ruolo dell'AI Engine;
- i principi di orchestrazione;
- il modello decisionale;
- la collaborazione tra i motori;
- il processo di ragionamento;
- la costruzione delle risposte;
- la gestione del contesto;
- la memoria operativa;
- i principi di affidabilità dell'AI.

---

## Documenti correlati

PRD-001 — Vision

PRD-002 — User Model

PRD-003 — User Journey

PRD-004 — Core Features

PRD-006 — Technical Architecture

---

# 1. Missione dell'AI Engine

## Missione

L'AI Engine rappresenta il livello di intelligenza e coordinamento di Mandari.

Il suo compito è comprendere il contesto del cittadino, interpretare le richieste ricevute, individuare le informazioni rilevanti presenti nel Fascicolo Amministrativo, coordinare i motori del sistema e costruire una risposta unica, coerente e comprensibile.

L'AI Engine non sostituisce i motori funzionali.

Ne coordina il lavoro.

---

## Obiettivo

L'obiettivo dell'AI Engine è permettere al cittadino di interagire con Mandari come se stesse dialogando con un unico assistente intelligente.

Il cittadino non deve conoscere l'esistenza dei singoli motori né decidere quale utilizzare.

Ogni richiesta viene analizzata dall'AI Engine, che determina autonomamente il percorso più appropriato.

---

## Responsabilità

L'AI Engine è responsabile di:

- comprendere la richiesta del cittadino;
- interpretare il contesto della conversazione;
- consultare il Fascicolo Amministrativo;
- decidere quali motori coinvolgere;
- coordinarne l'esecuzione;
- integrare i risultati ricevuti;
- costruire una risposta unica e coerente.

L'AI Engine non produce direttamente opportunità, reminder, interpretazioni documentali o soluzioni.

Tali responsabilità appartengono esclusivamente ai motori definiti nel PRD-004.

---

## Principio fondamentale

L'AI Engine rappresenta il direttore d'orchestra di Mandari.

I motori rappresentano gli specialisti.

Il cittadino percepisce un'unica esperienza, anche quando la risposta deriva dal contributo coordinato di più motori.

---

## Limiti

L'AI Engine non modifica le responsabilità dei motori.

Non prende decisioni amministrative.

Non sostituisce il giudizio dei professionisti.

Non genera informazioni prive di fondamento nel Fascicolo Amministrativo o nei risultati prodotti dai motori.

---

## Principi di Prodotto

- L'AI coordina, non sostituisce.
- Ogni risposta nasce dalla collaborazione dei motori.
- Il cittadino dialoga con un unico assistente.
- Le decisioni dell'AI devono essere coerenti con le informazioni disponibili.
- L'orchestrazione deve essere invisibile all'utente.

---

## Decisioni Congelate

✓ L'AI Engine rappresenta il livello di orchestrazione di Mandari.

✓ I motori mantengono integralmente le responsabilità definite nel PRD-004.

✓ Il cittadino interagisce con un unico assistente digitale.

✓ L'AI Engine coordina i motori senza modificarne il comportamento.

✓ Ogni risposta è costruita integrando i risultati dei motori coinvolti.

Il presente documento è soggetto al processo di congelamento progressivo ("Frozen") adottato per tutti i PRD di Mandari.
