# ARCH-006

# Anya, AI e Architettura Intelligente

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce l'architettura del sistema di Intelligenza Artificiale di Mandari.

L'obiettivo è garantire risposte affidabili, contestualizzate e personalizzate utilizzando uno o più modelli linguistici.

---

# 2. Principio Fondamentale

Anya rappresenta il sistema intelligente di orchestrazione di Mandari.

I modelli di Intelligenza Artificiale costituiscono strumenti utilizzati da Anya e non il sistema stesso.

Anya coordina i motori di dominio (SPETTA, DATA, CARTA, AFFIDO), ciascuno dei quali utilizza uno o più modelli AI attraverso il Backend. I modelli AI (LLM, OCR, classificazione, ricerca semantica, embedding) sono strumenti: non prendono decisioni e non comunicano direttamente tra loro. La tassonomia completa è definita in PRD-011.

---

# 3. Ruolo di Anya

Anya coordina tutte le attività intelligenti del sistema.

In particolare:

- interpreta le richieste del cittadino;
- recupera le informazioni necessarie;
- seleziona gli strumenti da utilizzare;
- decide quale modello AI impiegare;
- costruisce la risposta finale.

---

# 4. Modelli Linguistici

Mandari non dipende da un singolo modello linguistico.

L'architettura dovrà consentire l'utilizzo di differenti LLM.

La sostituzione o l'aggiunta di un modello non dovrà richiedere modifiche sostanziali al Backend.

---

# 5. Accesso ai Dati

Anya non accede direttamente ai Database o allo Storage.

Ogni accesso ai dati avviene esclusivamente tramite il Backend e le API ufficiali.

Questo garantisce sicurezza, controllo e tracciabilità.

---

# 6. Memoria

La memoria permanente di Mandari non risiede nel modello linguistico.

La memoria appartiene al sistema.

Le informazioni vengono recuperate dal Fascicolo Amministrativo, dagli Atti e dai dati strutturati prima della generazione della risposta.

---

# 7. Personalizzazione

Ogni risposta viene costruita utilizzando:

- identità del cittadino;
- Fascicolo Amministrativo;
- Atti disponibili;
- documenti elaborati;
- preferenze dell'utente;
- contesto della conversazione.

Le risposte devono essere personalizzate e coerenti con la situazione amministrativa del cittadino.

---

# 8. Sicurezza

I modelli AI non devono conservare dati permanenti del cittadino.

Le informazioni personali vengono utilizzate esclusivamente per la durata dell'elaborazione della richiesta.

La gestione dei dati rimane responsabilità del Backend.

---

# 9. Evoluzione

L'architettura AI dovrà consentire:

- sostituzione dei modelli;
- utilizzo contemporaneo di più modelli;
- introduzione di nuovi strumenti AI;
- evoluzione delle capacità di Anya senza modificare l'architettura generale.

---

# 10. Decisioni Tecniche Congelate

✓ Anya rappresenta il sistema intelligente di Mandari.

✓ I modelli linguistici sono strumenti utilizzati da Anya.

✓ Mandari supporta più LLM.

✓ L'accesso ai dati avviene esclusivamente tramite il Backend.

✓ La memoria appartiene al sistema e non ai modelli AI.

✓ Le risposte vengono costruite utilizzando il Fascicolo Amministrativo e gli Atti.

✓ I modelli AI non conservano dati permanenti del cittadino.

✓ L'architettura AI è indipendente dal singolo fornitore di modelli.

✓ L'architettura AI viene dichiarata congelata.
