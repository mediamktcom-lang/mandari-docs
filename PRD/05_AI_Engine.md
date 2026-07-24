
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

L'Orchestratore è il componente responsabile della trasformazione di un input del cittadino in un percorso decisionale strutturato.

Il suo compito non è rispondere immediatamente, ma comprendere il problema reale, individuare gli obiettivi da raggiungere e coordinare le capacità del sistema per costruire una risposta unica, coerente e contestualizzata.

Ogni risposta di Mandari nasce da questo processo.

---

## Obiettivo

Garantire che ogni richiesta venga elaborata attraverso un processo decisionale ripetibile, spiegabile e indipendente dai singoli motori che compongono il sistema.

L'Orchestratore ragiona sul problema del cittadino, non sui componenti software.

---

## Decision Flow

Per ogni nuovo evento ricevuto, l'Orchestratore applica sempre il seguente processo.

### 1. Acquisizione

L'Orchestratore identifica la natura dell'input ricevuto.

L'input può essere, ad esempio:

- una domanda;
- un messaggio;
- un documento;
- una fotografia;
- un PDF;
- una ricevuta;
- una risposta ad un questionario;
- un caricamento ISEE;
- un evento generato dal sistema.

---

### 2. Comprensione

L'Orchestratore interpreta il contenuto dell'input.

Comprende cosa il cittadino sta comunicando, senza formulare ancora conclusioni.

---

### 3. Interpretazione

L'Orchestratore individua l'intenzione immediata del cittadino.

Ad esempio:

- ottenere una spiegazione;
- chiedere un controllo;
- cercare un'informazione;
- richiedere un supporto.

L'intenzione rappresenta il motivo esplicito della richiesta.

---

### 4. Individuazione del Bisogno

Successivamente l'Orchestratore ricerca il bisogno reale che ha generato la richiesta.

Il bisogno può essere diverso dall'intenzione dichiarata.

L'obiettivo è comprendere quale problema il cittadino sta realmente cercando di risolvere.

---

### 5. Contestualizzazione

L'Orchestratore consulta il Fascicolo Amministrativo e costruisce il Contesto Decisionale.

Ogni richiesta viene interpretata alla luce delle informazioni già disponibili.

---

### 6. Definizione degli Obiettivi

Una volta compreso il bisogno, l'Orchestratore stabilisce cosa Mandari deve ottenere.

Gli obiettivi rappresentano il risultato da raggiungere, indipendentemente dai motori che lo realizzeranno.

---

### 7. Pianificazione

L'Orchestratore individua le capacità del sistema necessarie al raggiungimento degli obiettivi.

Solo successivamente vengono individuati i motori che possiedono tali capacità.

---

### 8. Coordinamento

L'Orchestratore coordina il lavoro dei motori coinvolti.

Ogni motore opera nel proprio dominio funzionale.

---

### 9. Validazione

I risultati vengono verificati.

L'Orchestratore controlla coerenza, completezza ed eventuali conflitti.

---

### 10. Comunicazione

L'Orchestratore costruisce una risposta unica e comprensibile.

Il cittadino percepisce un solo assistente digitale.

---

## Principi del Processo Decisionale

- Comprendere prima di rispondere.
- Individuare il bisogno reale.
- Utilizzare sempre il contesto.
- Definire gli obiettivi prima dei motori.
- Coordinare senza sostituire.
- Comunicare una sola risposta.

---

## Decisioni Congelate

✓ Ogni richiesta segue sempre il Decision Flow.

✓ Il bisogno prevale sull'intenzione.

✓ Gli obiettivi vengono definiti prima della scelta dei motori.

✓ Il cittadino interagisce sempre con un unico assistente.


# 4. Gestione del Contesto Decisionale

## Missione

L'Orchestratore non prende decisioni basandosi esclusivamente sulla richiesta ricevuta.

Ogni decisione viene costruita considerando il contesto complessivo del cittadino.

Il contesto rappresenta l'insieme delle informazioni disponibili che consentono all'Orchestratore di comprendere correttamente una situazione e scegliere il percorso operativo più appropriato.

---

## Obiettivo

L'obiettivo della gestione del contesto è garantire che ogni risposta sia coerente con la situazione amministrativa reale del cittadino.

Una stessa domanda può produrre risposte differenti se il contesto è diverso.

Mandari deve comprendere la situazione del cittadino, non limitarsi ad interpretare il testo della richiesta.

---

## Fonti del Contesto

L'Orchestratore costruisce il contesto utilizzando esclusivamente informazioni affidabili.

Le principali fonti sono:

- il Fascicolo Amministrativo;
- i documenti acquisiti;
- le informazioni estratte da CARTA;
- le opportunità individuate da SPETTA;
- le scadenze gestite da DATA;
- i suggerimenti prodotti da AFFIDO;
- le informazioni fornite direttamente dal cittadino durante la conversazione.

Ogni informazione utilizzata deve poter essere ricondotta ad una fonte identificabile.

---

## Costruzione del Contesto

Per ogni nuova richiesta l'Orchestratore costruisce un contesto temporaneo.

Il contesto contiene esclusivamente le informazioni necessarie alla decisione corrente.

Non tutte le informazioni presenti nel Fascicolo vengono utilizzate.

L'Orchestratore seleziona soltanto gli elementi realmente rilevanti.

Questo principio riduce la complessità decisionale e migliora la qualità delle risposte.

---

## Aggiornamento del Contesto

Il contesto è dinamico.

Può modificarsi durante l'elaborazione della stessa richiesta.

Nuovi documenti, nuove informazioni o i risultati prodotti dai motori possono arricchirlo o modificarlo.

L'Orchestratore aggiorna continuamente il contesto fino alla costruzione della risposta finale.

---

## Contesto e Fascicolo

Il Fascicolo Amministrativo rappresenta la principale fonte di conoscenza permanente.

Il contesto decisionale rappresenta invece una vista temporanea costruita dall'Orchestratore utilizzando esclusivamente le informazioni utili per la richiesta corrente.

Il Fascicolo conserva la conoscenza.

Il contesto seleziona la conoscenza necessaria.

---

## Limiti

Il contesto non rappresenta una copia del Fascicolo.

Non modifica direttamente il Fascicolo.

Non introduce informazioni nuove.

Contiene esclusivamente una selezione temporanea delle informazioni disponibili.

Terminata la richiesta, il contesto viene eliminato.

Le informazioni permanenti rimangono esclusivamente nel Fascicolo Amministrativo.

---

## Principi di Prodotto

- Ogni decisione deve essere contestualizzata.
- Il Fascicolo rappresenta la principale fonte del contesto.
- Il contesto è temporaneo.
- Il contesto contiene esclusivamente le informazioni necessarie.
- Nessuna informazione viene utilizzata senza una fonte identificabile.

---

## Decisioni Congelate

✓ Ogni richiesta utilizza un contesto decisionale dedicato.

✓ Il contesto viene costruito dall'Orchestratore per ogni elaborazione.

✓ Il Fascicolo Amministrativo rappresenta la principale fonte del contesto.

✓ Il contesto contiene esclusivamente le informazioni rilevanti.

✓ Il contesto è temporaneo e viene eliminato al termine dell'elaborazione.

✓ Le informazioni permanenti risiedono esclusivamente nel Fascicolo Amministrativo.

# 5. Memoria Operativa

## Missione

La Memoria Operativa consente all'Orchestratore di mantenere la continuità durante una richiesta o una conversazione.

Il suo compito è conservare temporaneamente le informazioni necessarie affinché ogni nuova interazione possa essere interpretata correttamente senza richiedere al cittadino di ripetere continuamente il contesto.

La Memoria Operativa non rappresenta una memoria permanente del cittadino.

---

## Obiettivo

L'obiettivo della Memoria Operativa è permettere all'Orchestratore di gestire un'attività come un unico processo continuo.

Ogni nuovo messaggio, documento o domanda viene interpretato considerando ciò che è già avvenuto durante la sessione corrente.

---

## Contenuto della Memoria Operativa

La Memoria Operativa può contenere, ad esempio:

- l'argomento attualmente in discussione;
- il documento sul quale si sta lavorando;
- la pratica amministrativa in corso;
- eventuali chiarimenti richiesti al cittadino;
- le risposte già ricevute;
- i risultati temporanei prodotti dai motori;
- lo stato del processo decisionale.

Queste informazioni esistono esclusivamente per consentire la continuità della conversazione.

---

## Durata

La Memoria Operativa è temporanea.

Viene mantenuta esclusivamente per il tempo necessario al completamento della richiesta o della conversazione.

Terminata l'attività, la Memoria Operativa viene eliminata.

---

## Rapporto con il Fascicolo

La Memoria Operativa non sostituisce il Fascicolo Amministrativo.

Il Fascicolo rappresenta la conoscenza permanente del cittadino.

La Memoria Operativa rappresenta esclusivamente lo stato temporaneo del lavoro in corso.

Quando durante una conversazione emerge una nuova informazione stabile, saranno i motori competenti a decidere se aggiornare il Fascicolo.

L'Orchestratore non aggiorna direttamente il Fascicolo.

---

## Continuità Conversazionale

Grazie alla Memoria Operativa il cittadino può comunicare in modo naturale.

Può utilizzare riferimenti come:

- "questa pratica";
- "quel documento";
- "quella lettera";
- "mia figlia";
- "la domanda di prima".

L'Orchestratore interpreta tali riferimenti utilizzando esclusivamente il contesto della sessione corrente.

---

## Limiti

La Memoria Operativa:

- non rappresenta un archivio permanente;
- non modifica direttamente il Fascicolo;
- non contiene logiche di business;
- non conserva informazioni oltre il tempo necessario;
- non sostituisce le responsabilità dei motori.

La conservazione permanente delle informazioni rimane competenza esclusiva del Fascicolo Amministrativo.

---

## Relazione tra i livelli di conoscenza

Mandari distingue tre livelli di conoscenza.

### Fascicolo Amministrativo

Conserva la conoscenza permanente del cittadino.

---

### Contesto Decisionale

Rappresenta la selezione temporanea delle informazioni necessarie per prendere una decisione.

---

### Memoria Operativa

Mantiene lo stato temporaneo della conversazione e dell'attività in corso.

I tre livelli collaborano tra loro ma svolgono responsabilità differenti.

---

## Principi di Prodotto

- La continuità della conversazione non implica una memoria permanente.
- Ogni informazione stabile appartiene esclusivamente al Fascicolo.
- La Memoria Operativa esiste solo per supportare il lavoro in corso.
- Il cittadino deve poter dialogare in modo naturale senza ripetere continuamente il contesto.
- La memoria temporanea viene eliminata al termine dell'attività.

---

## Decisioni Congelate

✓ La Memoria Operativa è esclusivamente temporanea.

✓ L'Orchestratore utilizza la Memoria Operativa per garantire la continuità della conversazione.

✓ Il Fascicolo rimane l'unica memoria permanente del sistema.

✓ Le informazioni permanenti vengono registrate esclusivamente dai motori competenti.

✓ La Memoria Operativa viene eliminata al termine della richiesta o della conversazione.

✓ Mandari distingue chiaramente Fascicolo Amministrativo, Contesto Decisionale e Memoria Operativa.

# 6. Dalle Esigenze alle Capacità Operative

## Missione

Una volta individuato il bisogno del cittadino e definiti gli obiettivi, l'Orchestratore deve stabilire quali capacità del sistema sono necessarie per raggiungerli.

L'Orchestratore non seleziona direttamente i motori.

Seleziona le capacità operative richieste.

Saranno successivamente i motori specializzati a soddisfare tali capacità.

---

## Obiettivo

Separare completamente il processo decisionale dall'implementazione tecnica.

L'Orchestratore ragiona in termini di risultati.

I motori rappresentano esclusivamente l'implementazione delle capacità del sistema.

---

## Capacità Operative

Una capacità rappresenta ciò che Mandari è in grado di fare.

Ad esempio:

- comprendere un documento;
- verificare una scadenza;
- individuare un'opportunità;
- ricercare una soluzione;
- suggerire un professionista.

Le capacità non coincidono con i motori.

Un motore può implementare una o più capacità.

In futuro una capacità potrà essere implementata anche da motori differenti.

---

## Pianificazione

Per ogni obiettivo l'Orchestratore:

1. individua le capacità necessarie;
2. verifica quali motori le implementano;
3. costruisce il piano di esecuzione.

---

## Coordinamento

Le capacità possono essere eseguite:

- singolarmente;
- contemporaneamente;
- in sequenza;
- in modo condizionato.

L'ordine viene deciso esclusivamente dall'Orchestratore.

---

## Integrazione

Ogni motore restituisce esclusivamente il proprio risultato.

L'integrazione finale è responsabilità dell'Orchestratore.

I motori non comunicano direttamente tra loro.

---

## Principi di Prodotto

- L'Orchestratore ragiona per capacità.
- I motori implementano capacità.
- Le capacità possono evolvere senza modificare il processo decisionale.
- L'integrazione è centralizzata.

---

## Decisioni Congelate

✓ Il processo decisionale è indipendente dai motori.

✓ Le capacità rappresentano il livello di astrazione tra obiettivi e motori.

✓ I motori non comunicano direttamente tra loro.

✓ L'Orchestratore coordina l'intero piano operativo.

# 7. Modello dei Bisogni del Cittadino

## Missione

Mandari non interpreta semplicemente le richieste del cittadino.

Il suo obiettivo è comprendere il bisogno reale che ha generato la richiesta.

Ogni decisione dell'Orchestratore nasce dalla corretta identificazione del bisogno.

---

## Obiettivo

Trasformare qualsiasi input in uno o più bisogni amministrativi che possano essere gestiti attraverso il processo decisionale di Mandari.

Una singola richiesta può esprimere più bisogni contemporaneamente.

---

## Famiglie di Bisogni

Mandari riconosce le seguenti famiglie principali.

### Comprensione

Il cittadino vuole capire.

Esempi:

- spiegami questo documento;
- cosa significa questa PEC;
- interpreta questa lettera.

---

### Verifica

Il cittadino desidera sapere se deve fare qualcosa o se ha diritto a qualcosa.

---

### Organizzazione

Il cittadino vuole ricordare, pianificare o monitorare scadenze.

---

### Azione

Il cittadino desidera svolgere una pratica amministrativa o prepararsi a svolgerla.

---

### Supporto

Il cittadino necessita dell'assistenza di un professionista.

---

### Ricerca di Soluzioni

Il cittadino cerca una soluzione ad un proprio bisogno.

Ad esempio:

- liquidità;
- asilo nido;
- babysitter;
- medico;
- automobile;
- assicurazione.

In questi casi AFFIDO ricerca possibili soluzioni, non esclusivamente professionisti.

---

### Aggiornamento del Fascicolo

Il cittadino comunica un cambiamento della propria situazione amministrativa.

---

## Profilo del Bisogno

Una richiesta può appartenere contemporaneamente a più famiglie.

L'Orchestratore costruisce un Profilo del Bisogno composto dall'insieme dei bisogni individuati.

Il Profilo del Bisogno costituisce il punto di partenza per la definizione degli obiettivi e delle capacità operative.

---

## Principi di Prodotto

- Mandari interpreta bisogni, non semplici intenti.
- Il bisogno prevale sempre sulla forma della richiesta.
- Più bisogni possono coesistere nella stessa richiesta.
- Il Profilo del Bisogno guida l'intero processo decisionale.

---

## Decisioni Congelate

✓ Mandari classifica i bisogni e non gli intenti.

✓ Una richiesta può contenere più bisogni.

✓ Il Profilo del Bisogno rappresenta l'input del processo decisionale.

✓ Ogni obiettivo deriva dal Profilo del Bisogno.

# 8. Composizione della Risposta

## Missione

L'Orchestratore ha la responsabilità di costruire una risposta unica, coerente e comprensibile per il cittadino.

La risposta rappresenta il risultato finale dell'intero processo decisionale e dell'elaborazione dei motori.

Il cittadino non deve percepire la complessità interna del sistema.

---

## Obiettivo

L'obiettivo della composizione è trasformare risultati tecnici, analisi e informazioni provenienti da più motori in una comunicazione semplice, utile e orientata all'azione.

Ogni risposta deve aiutare il cittadino a capire:

- cosa è successo;
- cosa significa;
- cosa deve fare;
- quando deve farlo;
- a chi può rivolgersi, se necessario.

---

## Principio Fondamentale

L'Orchestratore non si limita a unire i risultati dei motori.

Li organizza in una narrazione unica, eliminando ridondanze, risolvendo eventuali sovrapposizioni e presentando le informazioni secondo un ordine logico.

La risposta deve sembrare prodotta da un unico assistente, non dalla somma di più componenti.

---

## Struttura della Risposta

Quando applicabile, la risposta segue il seguente schema.

### 1. Comprensione

Una breve spiegazione di ciò che Mandari ha compreso.

Esempio:

"Hai ricevuto una comunicazione relativa a..."

---

### 2. Analisi

Presentazione dei risultati prodotti dai motori.

Solo le informazioni realmente utili vengono mostrate.

---

### 3. Impatto

Spiegazione delle conseguenze pratiche.

Ad esempio:

- obblighi;
- opportunità;
- rischi;
- diritti;
- scadenze.

---

### 4. Azioni consigliate

Mandari suggerisce i passi successivi.

Le azioni possono includere:

- attendere;
- raccogliere documenti;
- aggiornare il Fascicolo;
- attivare un promemoria;
- approfondire con un professionista;
- utilizzare AFFIDO per individuare un supporto.

---

### 5. Livello di affidabilità

Quando opportuno, Mandari indica il livello di certezza della risposta.

Può inoltre specificare se sono necessarie verifiche ulteriori o informazioni aggiuntive.

---

## Adattamento al Cittadino

La risposta deve essere proporzionata.

Una richiesta semplice produce una risposta sintetica.

Una situazione complessa richiede una spiegazione più articolata.

L'Orchestratore adatta il livello di dettaglio al contesto e al bisogno individuato.

---

## Gestione dell'incertezza

Quando le informazioni disponibili non consentono una conclusione affidabile, Mandari lo comunica in modo esplicito.

L'Orchestratore non nasconde dubbi o limiti.

Può richiedere ulteriori dati o suggerire il coinvolgimento di un professionista.

---

## Principi di Prodotto

- Una risposta deve sembrare scritta da un unico assistente.
- La chiarezza prevale sulla completezza tecnica.
- Le azioni consigliate devono essere concrete e realizzabili.
- L'incertezza deve essere comunicata con trasparenza.
- Ogni risposta deve aiutare il cittadino a prendere una decisione.

---

## Decisioni Congelate

✓ L'Orchestratore produce sempre una risposta unica.

✓ I risultati dei motori vengono integrati prima della presentazione.

✓ La risposta privilegia chiarezza e utilità.

✓ Le azioni consigliate fanno parte integrante della risposta.

✓ Quando necessario, Mandari dichiara il livello di affidabilità e i limiti dell'analisi.

✓ Il cittadino non deve percepire l'esistenza dei singoli motori.

# 9. Limiti Operativi dell'Orchestratore

## Missione

L'Orchestratore rappresenta il centro decisionale di Mandari.

Per garantire affidabilità, prevedibilità e controllo del sistema, il suo comportamento è limitato da un insieme di regole architetturali che ne definiscono il perimetro operativo.

Questi limiti costituiscono una parte integrante del progetto e non possono essere aggirati dai singoli motori.

---

## Obiettivo

Garantire che ogni decisione dell'Orchestratore sia coerente con la filosofia di Mandari e che nessun componente del sistema possa assumere responsabilità non previste.

---

## Limiti Funzionali

L'Orchestratore non può:

- modificare direttamente il Fascicolo Amministrativo;
- prendere decisioni amministrative al posto del cittadino;
- sostituire il giudizio di un professionista;
- eseguire elaborazioni specialistiche appartenenti ai motori;
- generare informazioni non supportate dai dati disponibili.

---

## Limiti Decisionali

L'Orchestratore non formula conclusioni quando il livello di affidabilità è insufficiente.

In tali casi deve:

- richiedere informazioni aggiuntive;
- richiedere nuovi documenti;
- suggerire il coinvolgimento di un professionista;
- dichiarare esplicitamente l'incertezza.

---

## Limiti di Contesto

L'Orchestratore utilizza esclusivamente:

- il Fascicolo Amministrativo;
- il Contesto Decisionale;
- la Memoria Operativa;
- le informazioni fornite dal cittadino;
- i risultati prodotti dai motori.

Non utilizza conoscenze prive di una fonte identificabile.

---

## Limiti di Autonomia

L'Orchestratore non esegue autonomamente attività che comportino effetti amministrativi o giuridici.

Ogni azione che produce effetti verso l'esterno deve essere confermata dal cittadino oppure delegata ad un professionista.

---

## Principi di Prodotto

- L'Orchestratore coordina ma non sostituisce.
- Ogni decisione deve essere spiegabile.
- Ogni informazione deve avere una fonte.
- L'incertezza viene sempre dichiarata.
- Il cittadino mantiene il controllo delle decisioni.

---

## Decisioni Congelate

✓ L'Orchestratore non modifica direttamente il Fascicolo.

✓ L'Orchestratore non sostituisce il professionista.

✓ Ogni informazione deve essere riconducibile ad una fonte.

✓ Le decisioni amministrative rimangono sempre sotto il controllo del cittadino.

# 10. Principi Fondamentali dell'Orchestratore

## Missione

Questo capitolo raccoglie i principi architetturali permanenti che definiscono il comportamento dell'Orchestratore di Mandari.

Essi rappresentano le regole fondamentali che guidano ogni decisione, indipendentemente dall'evoluzione tecnologica del sistema.

Qualsiasi futura implementazione dovrà rispettare tali principi.

---

## Principi Fondamentali

### 1. Il cittadino è il centro del sistema

Ogni decisione viene presa con l'obiettivo di aiutare il cittadino a comprendere, organizzare e gestire la propria vita amministrativa.

La tecnologia rappresenta un mezzo, non il fine.

---

### 2. Comprendere prima di rispondere

Ogni risposta nasce dalla comprensione del problema reale del cittadino.

Mandari non risponde semplicemente alle domande.

Cerca di comprendere il bisogno che le ha generate.

---

### 3. Il contesto prevale sulla richiesta

Ogni richiesta viene interpretata utilizzando il Fascicolo Amministrativo, il Contesto Decisionale e la Memoria Operativa.

Una domanda non viene mai interpretata in modo isolato.

---

### 4. Il bisogno precede gli obiettivi

L'Orchestratore identifica prima il bisogno del cittadino.

Successivamente definisce gli obiettivi.

Solo dopo individua le capacità operative ed i motori necessari.

---

### 5. I motori sono strumenti

I motori rappresentano competenze specialistiche.

Non prendono decisioni.

Le decisioni appartengono esclusivamente all'Orchestratore.

---

### 6. Una sola risposta

Il cittadino interagisce sempre con un unico assistente digitale.

L'Orchestratore integra il lavoro dei motori e presenta una risposta unica, coerente e comprensibile.

---

### 7. Ogni informazione deve avere una fonte

Mandari utilizza esclusivamente informazioni riconducibili a fonti identificabili.

L'incertezza viene dichiarata.

Le ipotesi non vengono presentate come fatti.

---

### 8. L'essere umano mantiene il controllo

Mandari assiste il cittadino.

Non sostituisce la sua volontà.

Le decisioni amministrative rimangono sempre sotto il controllo del cittadino o del professionista eventualmente coinvolto.

---

### 9. Modularità

Ogni componente del sistema può evolvere indipendentemente.

L'Orchestratore coordina capacità e responsabilità, non implementazioni specifiche.

Questo garantisce la possibilità di sostituire o ampliare i motori senza modificare il processo decisionale.

---

### 10. Evoluzione continua

Mandari è progettato per evolvere.

Nuovi motori, nuove capacità e nuovi servizi potranno essere integrati senza modificare i principi fondamentali definiti in questo documento.

---

## Sintesi Architetturale

Il funzionamento dell'Orchestratore può essere riassunto nel seguente modello.

```text
INPUT
        ↓
COMPRENSIONE
        ↓
INTERPRETAZIONE
        ↓
BISOGNI
        ↓
CONTESTO
        ↓
OBIETTIVI
        ↓
CAPACITÀ
        ↓
MOTORI
        ↓
INTEGRAZIONE
        ↓
RISPOSTA
```

Questo rappresenta il modello decisionale ufficiale dell'Orchestratore di Mandari.

---

## Decisioni Congelate

✓ L'Orchestratore costituisce il centro decisionale di Mandari.

✓ Il processo decisionale è indipendente dai motori.

✓ Il bisogno del cittadino rappresenta il punto di partenza di ogni elaborazione.

✓ Le capacità costituiscono il livello di astrazione tra obiettivi e motori.

✓ Ogni risposta nasce dall'integrazione coordinata delle competenze del sistema.

✓ I principi definiti in questo capitolo rappresentano l'architettura permanente dell'Orchestratore.


