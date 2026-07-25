# PRD-009 — Sicurezza, Identità e Controllo degli Accessi

# 1. Visione della Sicurezza

## Scopo del documento

Il presente documento definisce i principi di sicurezza che regolano l'intero ecosistema Mandari.

L'obiettivo non è descrivere singole tecnologie o prodotti, ma stabilire le regole progettuali che dovranno essere rispettate durante lo sviluppo dell'applicazione.

Le decisioni contenute in questo PRD costituiscono il riferimento per tutti i componenti che trattano dati, documenti, Atti, identità e comunicazioni.

---

## Obiettivi

Mandari dovrà garantire:

- protezione dell'identità digitale degli utenti;
- riservatezza delle informazioni;
- integrità dei dati e degli Atti;
- disponibilità dei servizi;
- tracciabilità delle operazioni;
- protezione contro accessi non autorizzati;
- conformità alle normative applicabili.

---

## La sicurezza come requisito trasversale

La sicurezza non rappresenta una funzionalità separata dell'applicazione.

Ogni componente di Mandari dovrà essere progettato considerando i requisiti di sicurezza fin dalle prime fasi dello sviluppo.

Le decisioni relative alla sicurezza dovranno accompagnare tutte le scelte architetturali e funzionali.

---

## Fiducia del cittadino

Il patrimonio informativo custodito da Mandari appartiene esclusivamente al cittadino.

L'applicazione ha il compito di proteggerlo, conservarlo e renderlo disponibile esclusivamente ai soggetti autorizzati.

Ogni decisione tecnica dovrà essere orientata a preservare questa fiducia.

---

## Difesa multilivello

La sicurezza del sistema verrà ottenuta attraverso la collaborazione di più livelli di protezione.

Tra questi:

- identificazione dell'utente;
- autenticazione;
- autorizzazione;
- protezione dei dati;
- controllo degli accessi;
- registrazione delle operazioni;
- monitoraggio degli eventi di sicurezza.

Nessun singolo meccanismo dovrà essere considerato sufficiente da solo.

---

## Sicurezza e usabilità

Mandari dovrà mantenere un equilibrio tra semplicità d'uso e protezione delle informazioni.

Le misure di sicurezza dovranno essere proporzionate al rischio e progettate per non rendere complessa l'esperienza dell'utente.

---

## Evoluzione continua

Le minacce informatiche evolvono nel tempo.

L'architettura dovrà consentire l'aggiornamento dei meccanismi di sicurezza senza richiedere modifiche sostanziali ai componenti dell'applicazione.

---

## Motivazioni della scelta

Questo approccio permette di:

- proteggere il Fascicolo Amministrativo;
- garantire la riservatezza dei dati;
- aumentare la fiducia del cittadino;
- facilitare la conformità normativa;
- mantenere elevato il livello di sicurezza nel tempo.

---

## Decisioni Congelate

✓ La sicurezza rappresenta un requisito trasversale dell'intera architettura.

✓ Tutti i componenti devono essere progettati secondo il principio della Security by Design.

✓ La protezione del patrimonio informativo del cittadino costituisce l'obiettivo principale del sistema.

✓ Mandari adotta una strategia di difesa multilivello.

✓ Sicurezza e usabilità devono mantenere un equilibrio costante.

✓ L'architettura deve poter evolvere per rispondere alle nuove minacce informatiche.
