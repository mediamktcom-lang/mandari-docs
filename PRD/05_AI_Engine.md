
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

# 2. Il Ruolo dell'Orchestratore

## Missione

L'Orchestratore è il componente centrale dell'AI Engine.

Il suo compito è analizzare ogni richiesta del cittadino, comprenderne il contesto, decidere quali motori coinvolgere, coordinarne l'esecuzione, raccogliere i risultati prodotti e costruire una risposta unica.

L'Orchestratore non svolge direttamente attività funzionali.

Coordina gli specialisti che le svolgono.

---

## Obiettivo

L'obiettivo dell'Orchestratore è garantire che ogni richiesta venga gestita nel modo più semplice, efficiente e coerente possibile.

L'utente non deve conoscere l'architettura interna di Mandari.

Ogni interazione deve apparire come una normale conversazione con un unico assistente intelligente.

---

## Responsabilità

L'Orchestratore è responsabile di:

- comprendere la richiesta dell'utente;
- identificare il contesto della conversazione;
- recuperare le informazioni necessarie dal Fascicolo Amministrativo;
- decidere quali motori coinvolgere;
- determinare l'ordine di esecuzione dei motori;
- coordinarne il lavoro;
- raccogliere i risultati prodotti dai motori;
- verificarne la coerenza;
- costruire una risposta unica e coerente;
- presentare il risultato finale al cittadino.

L'Orchestratore coordina il lavoro dei motori, raccoglie i risultati prodotti e costruisce una risposta unificata da presentare al cittadino.

Non interpreta documenti.

Non individua opportunità.

Non genera reminder.

Non propone direttamente soluzioni.

Queste responsabilità rimangono affidate ai motori specializzati.

---

## Modalità Operativa

Per ogni richiesta ricevuta l'Orchestratore segue sempre lo stesso processo.

### 1. Comprensione

Analizza la richiesta del cittadino.

Identifica:

- intenzione;
- contesto;
- eventuali riferimenti al Fascicolo;
- livello di ambiguità;
- eventuali informazioni mancanti.

---

### 2. Pianificazione

Stabilisce quali motori devono intervenire.

Può decidere, ad esempio, che:

- sia sufficiente un solo motore;
- siano necessari più motori;
- sia necessario chiedere ulteriori informazioni al cittadino prima di procedere.

---

### 3. Coordinamento

Attiva i motori individuati.

Ogni motore riceve esclusivamente le informazioni necessarie allo svolgimento del proprio compito.

---

### 4. Integrazione

Riceve i risultati dei motori.

Verifica che non esistano contraddizioni.

Organizza le informazioni in un'unica risposta.

---

### 5. Comunicazione

Presenta il risultato al cittadino utilizzando un linguaggio semplice, naturale e comprensibile.

L'utente non percepisce il lavoro svolto internamente dai singoli motori.

---

## Gestione dell'incertezza

L'Orchestratore non deve formulare ipotesi quando le informazioni disponibili non sono sufficienti.

In presenza di dati incompleti deve:

- chiedere chiarimenti;
- richiedere documenti aggiuntivi;
- proporre il completamento del Fascicolo;
- dichiarare esplicitamente i limiti dell'analisi.

La trasparenza prevale sempre sulla completezza apparente.

---

## Principi Operativi

L'Orchestratore deve essere:

- imparziale;
- prevedibile;
- spiegabile;
- prudente;
- coerente.

Ogni decisione deve poter essere ricostruita sulla base delle informazioni disponibili.

---

## Limiti

L'Orchestratore non contiene logica di business.

Tutte le regole funzionali appartengono esclusivamente ai motori specializzati.

L'Orchestratore non prende decisioni amministrative.

Non crea nuove informazioni.

Non modifica il Fascicolo senza il contributo dei motori competenti.

Non sostituisce il giudizio umano.

Il suo ruolo consiste esclusivamente nel coordinare il sistema.

---

## Principi di Prodotto

- Ogni richiesta viene gestita attraverso un processo decisionale uniforme.
- L'Orchestratore coordina ma non sostituisce i motori.
- La risposta finale deve apparire come il risultato di un unico assistente.
- In caso di incertezza, Mandari deve chiedere prima di concludere.
- La semplicità della risposta è più importante della complessità del ragionamento interno.

---

## Decisioni Congelate

✓ L'Orchestratore rappresenta il coordinatore dell'AI Engine.

✓ Ogni richiesta segue un processo composto da comprensione, pianificazione, coordinamento, integrazione e comunicazione.

✓ L'Orchestratore non svolge attività appartenenti ai motori funzionali.

✓ L'Orchestratore non implementa logiche di business; coordina, raccoglie e presenta esclusivamente i risultati prodotti dai motori.

✓ In presenza di informazioni insufficienti, l'Orchestratore richiede chiarimenti invece di formulare ipotesi.

✓ L'utente riceve sempre una risposta unica e coerente, indipendentemente dal numero di motori coinvolti.


# 3. Processo Decisionale dell'Orchestratore

## Missione

Prima di produrre qualsiasi risposta, l'Orchestratore deve comprendere il problema che il cittadino sta cercando di risolvere e determinare il percorso migliore per affrontarlo.

L'Orchestratore non risponde immediatamente ad una richiesta.

Prima osserva, comprende, contestualizza, pianifica e solo successivamente coordina il lavoro dei motori.

Il processo decisionale precede sempre la risposta.

---

## Obiettivo

L'obiettivo del processo decisionale è garantire che ogni richiesta venga gestita nel modo più appropriato, utilizzando il contesto disponibile, coinvolgendo i motori realmente necessari e producendo una risposta coerente, completa e comprensibile.

Ogni risposta deve derivare da un processo controllato e ripetibile.

---

## Processo Decisionale

Per ogni nuovo evento ricevuto l'Orchestratore segue sempre lo stesso workflow.

---

### 1. Acquisizione

L'Orchestratore riceve un nuovo input.

L'input può essere, ad esempio:

- una domanda;
- un messaggio;
- una fotografia;
- un documento;
- un PDF;
- una ricevuta;
- una risposta ad un questionario;
- un caricamento dell'ISEE;
- una modifica del Fascicolo Amministrativo;
- un evento generato automaticamente dal sistema.

L'Orchestratore identifica la natura dell'input prima di qualsiasi elaborazione.

---

### 2. Comprensione

Successivamente interpreta il significato dell'input.

Determina:

- quale bisogno sta esprimendo il cittadino;
- quale risultato desidera ottenere;
- il livello di urgenza;
- eventuali riferimenti già presenti nel Fascicolo;
- le informazioni eventualmente mancanti.

L'obiettivo non è comprendere solamente la domanda, ma il problema che il cittadino sta cercando di risolvere.

---

### 3. Contestualizzazione

L'Orchestratore consulta il Fascicolo Amministrativo.

Ogni richiesta viene interpretata considerando la situazione amministrativa complessiva del cittadino.

Il contesto prevale sempre sulla singola domanda.

---

### 4. Pianificazione

L'Orchestratore definisce il percorso operativo.

Può decidere di:

- rispondere direttamente quando non è necessario coinvolgere alcun motore;
- attivare uno o più motori specializzati;
- richiedere ulteriori informazioni;
- chiedere il caricamento di documenti;
- suggerire il ricorso ad un professionista.

L'Orchestratore coinvolge esclusivamente i motori necessari alla risoluzione del problema.

---

### 5. Coordinamento

L'Orchestratore attiva i motori selezionati.

Ogni motore riceve esclusivamente le informazioni necessarie allo svolgimento del proprio compito.

I motori operano in autonomia nel rispetto delle responsabilità definite nel PRD-004.

---

### 6. Validazione

Al termine dell'elaborazione l'Orchestratore raccoglie i risultati prodotti dai motori.

Verifica:

- la coerenza delle informazioni;
- l'assenza di contraddizioni;
- la completezza della risposta;
- l'eventuale presenza di elementi ancora incerti.

---

### 7. Comunicazione

Solo al termine del processo decisionale viene costruita la risposta finale.

La risposta deve essere:

- semplice;
- comprensibile;
- coerente;
- contestualizzata;
- spiegabile.

Il cittadino percepisce una sola risposta, indipendentemente dal numero di motori coinvolti.

---

## Principi del Processo Decisionale

Durante ogni elaborazione l'Orchestratore applica sempre i seguenti principi.

1. Comprendere il bisogno reale del cittadino prima di costruire una risposta.

2. Contestualizzare ogni richiesta utilizzando il Fascicolo Amministrativo.

3. Coinvolgere esclusivamente i motori necessari alla risoluzione del problema.

4. Evitare di richiedere informazioni già disponibili.

5. Richiedere chiarimenti soltanto quando realmente indispensabili.

6. Costruire una risposta unica, coerente e facilmente comprensibile.

7. Dichiarare sempre eventuali limiti o incertezze dell'analisi.

---

## Gestione dell'incertezza

Quando le informazioni disponibili non consentono una risposta affidabile, l'Orchestratore interrompe il processo decisionale.

In tali situazioni può:

- richiedere ulteriori informazioni;
- chiedere nuovi documenti;
- suggerire l'aggiornamento del Fascicolo;
- proporre il coinvolgimento di un professionista;
- dichiarare esplicitamente i limiti dell'analisi.

Mandari non formula conclusioni basate su dati insufficienti.

---

## Principi di Prodotto

- Ogni risposta nasce da un processo decisionale controllato.
- Il contesto prevale sempre sulla domanda isolata.
- Ogni decisione utilizza il Fascicolo Amministrativo come riferimento principale.
- I motori vengono coinvolti esclusivamente quando necessario.
- L'incertezza deve essere dichiarata e mai nascosta.
- La semplicità della risposta è il risultato del corretto coordinamento del sistema.

---

## Decisioni Congelate

✓ Ogni richiesta segue un processo decisionale standardizzato.

✓ Il primo passo del processo è sempre l'acquisizione dell'input.

✓ Il Fascicolo Amministrativo costituisce il principale contesto decisionale.

✓ L'Orchestratore coinvolge esclusivamente i motori necessari.

✓ Le informazioni mancanti vengono richieste al cittadino e non dedotte automaticamente.

✓ Ogni risposta deve essere coerente, contestualizzata e spiegabile.

✓ Il processo decisionale precede sempre la costruzione della risposta.
