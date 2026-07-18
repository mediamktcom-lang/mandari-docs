# PRD-004 - Core Features

## 1. Scopo

### Obiettivo del documento

Questo documento descrive l'architettura funzionale di Mandari e definisce il comportamento dei motori che costituiscono il prodotto.

L'obiettivo non è descrivere l'interfaccia grafica o i flussi utente, già trattati nei documenti precedenti, ma stabilire con precisione le responsabilità, le relazioni e il funzionamento dei componenti fondamentali del sistema.

Ogni motore rappresenta uno specialista in un preciso ambito della vita amministrativa del cittadino.

L'insieme dei motori costituisce il sistema intelligente di Mandari.

---

## I motori di Mandari

Mandari è composto da quattro motori principali:

- **SPETTA** - Responsabile dell'individuazione di opportunità, agevolazioni, bonus, diritti ed esenzioni.

- **DATA** - Responsabile della gestione delle scadenze, dei reminder e della pianificazione amministrativa.

- **CARTA** - Responsabile della comprensione, classificazione e spiegazione della documentazione amministrativa.

- **AFFIDO** - Responsabile della ricerca delle migliori soluzioni ai bisogni espressi o individuati durante l'utilizzo di Mandari.

Ogni motore possiede responsabilità ben definite e non svolge attività appartenenti agli altri moduli.

---

## Il Fascicolo Amministrativo

I quattro motori condividono un'unica base informativa: il Fascicolo Amministrativo.

Il Fascicolo rappresenta la memoria ufficiale del cittadino all'interno di Mandari.

Ogni informazione rilevante viene archiviata, aggiornata e resa disponibile agli altri motori.

Il Fascicolo costituisce l'unica fonte di verità del sistema.

Nessun motore mantiene copie indipendenti delle informazioni principali.

---

## Collaborazione tra i motori

I motori non operano in modo indipendente.

Collaborano costantemente.

Una nuova informazione acquisita da un motore può generare attività negli altri.

Ad esempio:

- CARTA analizza un documento e aggiorna il Fascicolo.
- SPETTA verifica se il nuovo documento modifica i diritti del cittadino.
- DATA controlla se il documento introduce nuove scadenze.
- AFFIDO valuta se è opportuno suggerire il supporto di un professionista o un'altra soluzione.

L'utente percepisce un'unica esperienza.

Internamente Mandari coordina il lavoro di specialisti differenti.

---

## Principi Architetturali

L'architettura di Mandari si basa sui seguenti principi fondamentali.

- Ogni motore ha una responsabilità unica e chiaramente definita.
- Nessun motore duplica informazioni già presenti nel Fascicolo Amministrativo.
- Tutti i motori leggono e aggiornano il Fascicolo secondo le proprie responsabilità.
- Ogni suggerimento prodotto da Mandari deve poter essere spiegato all'utente.
- Ogni decisione deve essere tracciabile.
- La collaborazione tra i motori deve essere completamente trasparente per il cittadino.

---

## Decisioni Congelate

✓ Mandari è un ecosistema di motori specializzati.

✓ Il Fascicolo Amministrativo rappresenta l'unica fonte ufficiale di conoscenza del sistema.

✓ Ogni motore possiede responsabilità ben definite.

✓ I motori collaborano continuamente tra loro.

✓ Nessun motore può duplicare o mantenere copie autonome delle informazioni principali.

✓ L'utente interagisce con un unico assistente, anche se internamente operano più motori specializzati.
