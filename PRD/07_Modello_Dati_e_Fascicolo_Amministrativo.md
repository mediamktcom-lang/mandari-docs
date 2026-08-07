# PRD-007
# Modello Dati e Fascicolo Amministrativo

Versione: 1.0

Stato: FROZEN

Dipendenze:
- PRD-001 Visione del Prodotto
- PRD-002 Modello del Cittadino e Fascicolo Amministrativo
- PRD-003 Esperienza Utente
- PRD-004 Motori Funzionali
- PRD-005 Orchestratore Decisionale
- PRD-006 Architettura Tecnica

---

## Obiettivo del documento

Il presente documento definisce il modello logico delle informazioni gestite da Mandari.

Dopo aver descritto il comportamento dell'applicazione, dei motori, dell'Orchestratore e dell'architettura tecnica, questo PRD introduce la struttura della conoscenza del sistema.

L'obiettivo è descrivere come vengono rappresentate le informazioni del cittadino, come sono organizzate all'interno del Fascicolo Amministrativo e quali principi guidano la loro evoluzione.

Il documento definisce esclusivamente il modello logico dei dati.

Non vengono affrontate in questa sede le tecnologie di persistenza, i database o le modalità fisiche di archiviazione, che saranno oggetto dei documenti successivi.

# 1. Visione del Modello Informativo

## Missione

Mandari costruisce il proprio valore attraverso la conoscenza strutturata del cittadino.

Ogni decisione presa dall'Orchestratore, ogni risposta fornita dai motori e ogni suggerimento presentato all'utente dipendono dalla qualità e dall'organizzazione delle informazioni contenute nel Fascicolo Amministrativo.

Il modello informativo rappresenta quindi il fondamento dell'intera applicazione.

---

## Obiettivo

Definire i principi con cui Mandari rappresenta la realtà amministrativa del cittadino.

Le informazioni devono essere organizzate in modo coerente, comprensibile ed evolutivo, così da accompagnare il cittadino durante l'intero ciclo della propria vita amministrativa.

---

## Il Fascicolo come rappresentazione digitale

Il Fascicolo Amministrativo non costituisce un semplice archivio di documenti.

Rappresenta il modello digitale della situazione amministrativa del cittadino.

Ogni informazione acquisita contribuisce ad aggiornare questa rappresentazione, rendendola progressivamente più completa e accurata.

---

## Informazioni e Documenti

Mandari distingue chiaramente tra documenti e informazioni.

I documenti rappresentano le fonti originali.

Le informazioni rappresentano la conoscenza estratta, interpretata e organizzata a partire da tali documenti.

L'Orchestratore e i motori operano prevalentemente sulle informazioni, mantenendo sempre il collegamento con i documenti da cui esse derivano.

---

## Evoluzione del Fascicolo

Il Fascicolo evolve continuamente.

Ogni nuova informazione, documento o evento amministrativo può arricchire la conoscenza del cittadino.

L'evoluzione avviene senza alterare la storia delle informazioni precedentemente acquisite.

Mandari conserva sia lo stato attuale sia l'evoluzione della situazione amministrativa nel tempo.

---

## Centralità della Qualità

La qualità delle decisioni dipende direttamente dalla qualità delle informazioni disponibili.

Per questo motivo il modello informativo privilegia:

- completezza;
- coerenza;
- tracciabilità;
- aggiornamento;
- verificabilità.

---

## Principi Architetturali

Il modello informativo di Mandari si fonda sui seguenti principi.

- il Fascicolo rappresenta il cittadino e non i documenti;
- le informazioni sono distinte dalle loro fonti;
- ogni dato deve essere tracciabile;
- il modello deve poter evolvere nel tempo;
- la qualità della conoscenza determina la qualità delle decisioni.

---

## Decisioni Congelate

✓ Il Fascicolo Amministrativo rappresenta il modello digitale del cittadino.

✓ I documenti costituiscono le fonti della conoscenza e non la conoscenza stessa.

✓ Le informazioni derivate dai documenti alimentano il Fascicolo.

✓ Ogni informazione mantiene il collegamento con la propria origine.

✓ Il Fascicolo evolve nel tempo preservando la storia delle informazioni.

✓ La qualità della conoscenza rappresenta il fondamento dell'intero sistema.

# 2. Gli Atti del Fascicolo Amministrativo

## Missione

Il Fascicolo Amministrativo rappresenta la storia amministrativa del cittadino.

Questa storia non è composta da documenti, ma da **Atti**.

Ogni Atto rappresenta un evento amministrativo che interessa il cittadino e costituisce l'unità fondamentale della conoscenza di Mandari.

L'Atto diventa il punto di partenza attraverso cui il sistema costruisce, aggiorna e mantiene il Fascicolo Amministrativo.

---

## Obiettivo

Definire il modello logico con cui Mandari rappresenta gli eventi della vita amministrativa del cittadino.

Ogni Atto raccoglie tutte le informazioni necessarie per descrivere un evento amministrativo, indipendentemente dalla presenza o meno di uno o più documenti allegati.

---

## Dal Documento all'Atto

Nei sistemi documentali tradizionali il documento rappresenta l'elemento principale dell'archivio.

Mandari adotta un paradigma differente.

Il documento non costituisce il centro della conoscenza.

Il centro del sistema è l'**Atto**.

Il documento rappresenta una delle possibili evidenze dell'Atto, insieme alle informazioni estratte, ai metadati, ai collegamenti e agli effetti prodotti sul Fascicolo.

Questo approccio consente di descrivere anche eventi amministrativi che non possiedono un documento allegato, come richieste, promemoria, ricerche o attività generate direttamente dall'utente.

---

## Cos'è un Atto

Un Atto rappresenta qualsiasi evento amministrativo rilevante nella vita del cittadino.

Ad esempio:

- caricamento di un documento;
- ricezione di una PEC;
- ricezione di una comunicazione;
- presentazione di una domanda;
- pagamento di un tributo;
- richiesta di una spiegazione;
- creazione di un promemoria;
- apertura di una pratica;
- richiesta di supporto ad un professionista.

Ogni Atto contribuisce ad aggiornare il Fascicolo Amministrativo.

---

## Struttura Logica di un Atto

Ogni Atto può contenere:

- identificativo univoco;
- tipologia dell'evento;
- data di creazione;
- data dell'evento amministrativo;
- eventuale data di scadenza;
- soggetti coinvolti;
- ente o professionista coinvolto;
- informazioni estratte;
- riferimenti al Fascicolo;
- collegamenti con altri Atti;
- allegati originali;
- stato dell'Atto;
- cronologia delle modifiche.

La presenza dei singoli elementi dipende dalla natura dell'Atto.

---

## Indicizzazione degli Atti

Ogni Atto viene automaticamente indicizzato durante la sua acquisizione.

L'indicizzazione consente a Mandari di ritrovare rapidamente le informazioni senza duplicare gli allegati originali.

Gli indici vengono costruiti analizzando il contenuto dell'Atto e possono comprendere:

- ente di provenienza;
- professionista coinvolto;
- tipologia dell'Atto;
- persone interessate;
- argomento amministrativo;
- periodo temporale;
- scadenze;
- pratiche correlate;
- benefici collegati;
- parole chiave estratte automaticamente.

L'indicizzazione costituisce uno dei principali strumenti di consultazione del Fascicolo.

---

## Consultazione del Fascicolo

Il cittadino non interagisce direttamente con un archivio documentale.

L'accesso agli Atti avviene principalmente attraverso il linguaggio naturale.

Ad esempio:

- "Mostrami la lettera dell'Agenzia delle Entrate ricevuta alcuni mesi fa."

- "Trova la ricevuta del pagamento della rata Equitalia di ottobre."

- "Apri il mio ISEE del 2026."

Mandari utilizza gli indici per individuare rapidamente l'Atto richiesto e presentare le informazioni pertinenti.

L'organizzazione interna del Fascicolo rimane trasparente al cittadino.

---

## Evoluzione degli Atti

Un Atto può evolvere durante il proprio ciclo di vita.

Nuove informazioni possono essere associate senza alterarne l'identità.

Ad esempio:

- aggiunta di nuovi allegati;
- completamento di una pratica;
- aggiornamento dello stato;
- collegamento ad altri Atti;
- chiusura dell'evento amministrativo.

Il Fascicolo conserva la storia completa dell'evoluzione di ogni Atto.

---

## Principi Architetturali

Il modello degli Atti si basa sui seguenti principi.

- l'Atto rappresenta l'unità fondamentale del Fascicolo;
- il documento costituisce una possibile evidenza dell'Atto;
- ogni Atto possiede un'identità unica;
- gli allegati non vengono duplicati;
- ogni Atto viene indicizzato automaticamente;
- il cittadino consulta gli Atti mediante linguaggio naturale.

---

## Decisioni Congelate

✓ L'Atto rappresenta l'unità fondamentale del Fascicolo Amministrativo.

✓ Il documento non costituisce il centro della conoscenza, ma una possibile evidenza dell'Atto.

✓ Ogni Atto possiede un'identità unica e mantiene i collegamenti con il Fascicolo.

✓ Gli allegati originali non vengono duplicati.

✓ L'indicizzazione automatica costituisce il principale strumento di ricerca degli Atti.

✓ Il cittadino consulta il Fascicolo principalmente attraverso richieste in linguaggio naturale.

# 3. Ciclo di Vita degli Atti

## Missione

Ogni Atto presente nel Fascicolo Amministrativo attraversa un ciclo di vita definito.

Mandari non considera gli Atti come elementi statici, ma come entità che possono nascere, arricchirsi, evolvere e, quando necessario, concludere il proprio ciclo mantenendo comunque la propria storia.

L'obiettivo è garantire che il Fascicolo rappresenti sempre la situazione amministrativa più aggiornata del cittadino senza perdere la memoria delle attività svolte.

---

## Obiettivo

Definire le fasi attraverso cui un Atto viene acquisito, elaborato, aggiornato e conservato all'interno del Fascicolo Amministrativo.

Il ciclo di vita deve essere uniforme per tutti gli Atti, indipendentemente dalla loro origine.

---

## Nascita di un Atto

Un Atto nasce ogni volta che si verifica un evento amministrativo rilevante.

L'origine dell'Atto può essere diversa a seconda della situazione.

Ad esempio:

- caricamento di un documento da parte del cittadino;
- acquisizione automatica da un servizio esterno;
- ricezione di una comunicazione;
- creazione di un promemoria;
- richiesta effettuata dall'utente;
- generazione automatica da parte di Mandari.

L'origine dell'Atto viene sempre registrata.

---

## Acquisizione

Nel momento della creazione, Mandari acquisisce tutte le informazioni disponibili.

Quando presenti, vengono acquisiti anche gli eventuali allegati.

Durante questa fase il sistema identifica:

- la tipologia dell'Atto;
- il soggetto interessato;
- l'origine;
- la data dell'evento;
- le eventuali scadenze;
- gli elementi utili all'indicizzazione.

L'acquisizione rappresenta il primo livello di costruzione della conoscenza.

---

## Elaborazione

Una volta acquisito, l'Atto viene analizzato.

L'analisi consente di:

- estrarre le informazioni rilevanti;
- identificare eventuali collegamenti con altri Atti;
- aggiornare il Fascicolo Amministrativo;
- rendere disponibili nuove informazioni ai motori funzionali.

L'Atto mantiene sempre il collegamento con gli eventuali allegati originali.

---

## Evoluzione

Un Atto può evolvere nel tempo.

L'evoluzione può derivare, ad esempio, da:

- nuove informazioni;
- completamento di una pratica;
- aggiornamento dello stato;
- aggiunta di allegati;
- collegamento con nuovi eventi amministrativi.

L'identità dell'Atto rimane invariata.

Varia esclusivamente il suo stato informativo.

---

## Stato degli Atti

Ogni Atto possiede uno stato che descrive la propria situazione corrente.

A titolo esemplificativo uno stato può indicare che un Atto è:

- in elaborazione;
- attivo;
- completato;
- sostituito;
- annullato;
- archiviato.

La definizione dettagliata degli stati sarà oggetto della progettazione tecnica.

---

## Conservazione della Storia

Mandari non elimina la storia amministrativa del cittadino.

Ogni evoluzione significativa viene registrata.

Questo consente di ricostruire in qualsiasi momento l'evoluzione del Fascicolo e delle decisioni che ne sono derivate.

La cronologia rappresenta un elemento essenziale della conoscenza.

---

## Principi Architetturali

Il ciclo di vita degli Atti si basa sui seguenti principi.

- ogni Atto possiede un'origine identificabile;
- ogni Atto mantiene un'identità permanente;
- l'evoluzione non modifica la storia;
- gli allegati rimangono collegati all'Atto;
- il Fascicolo viene aggiornato attraverso gli Atti.

---

## Decisioni Congelate

✓ Ogni Atto attraversa un ciclo di vita definito.

✓ L'origine dell'Atto viene sempre registrata.

✓ L'elaborazione dell'Atto aggiorna il Fascicolo Amministrativo.

✓ Gli Atti possono evolvere senza perdere la propria identità.

✓ La storia amministrativa del cittadino viene sempre preservata.

✓ Il Fascicolo viene costruito e aggiornato esclusivamente attraverso gli Atti.

# 4. Indicizzazione e Metadati degli Atti

## Missione

Ogni Atto acquisito da Mandari viene automaticamente descritto attraverso un insieme strutturato di metadati.

I metadati costituiscono la memoria organizzata dell'Atto e consentono al sistema di comprenderne il significato, individuarne rapidamente il contenuto e collegarlo agli altri elementi del Fascicolo Amministrativo.

L'indicizzazione non rappresenta quindi un'attività accessoria, ma uno dei processi fondamentali attraverso cui Mandari costruisce la propria conoscenza.

---

## Obiettivo

Definire il modello di indicizzazione degli Atti e i principi con cui vengono costruiti i metadati che alimentano il Fascicolo Amministrativo.

L'obiettivo è consentire una ricerca naturale, una rapida correlazione delle informazioni e una continua evoluzione della conoscenza senza duplicare gli allegati.

---

## L'indicizzazione come costruzione della conoscenza

Quando un nuovo Atto viene acquisito, Mandari non si limita a conservarlo.

Analizza l'evento amministrativo e costruisce automaticamente un insieme di metadati che descrivono il contenuto dell'Atto.

Questa operazione trasforma un semplice allegato in un elemento pienamente integrato nel Fascicolo.

I metadati rappresentano quindi la descrizione strutturata dell'Atto e costituiscono la base di ogni successiva elaborazione.

---

## Categorie di Metadati

Ogni Atto può essere indicizzato attraverso differenti categorie di metadati.

### Metadati Identificativi

Descrivono l'identità dell'Atto.

Ad esempio:

- identificativo univoco;
- tipologia dell'Atto;
- data di creazione;
- origine dell'Atto.

---

### Metadati Temporali

Consentono la collocazione temporale dell'evento.

Ad esempio:

- data del documento;
- data del caricamento;
- data dell'evento amministrativo;
- data di validità;
- data di scadenza.

---

### Metadati dei Soggetti

Identificano le persone coinvolte.

Ad esempio:

- cittadino;
- componente del nucleo familiare;
- professionista;
- rappresentante;
- ente emittente.

---

### Metadati Amministrativi

Descrivono il contesto amministrativo dell'Atto.

Ad esempio:

- pratica collegata;
- beneficio interessato;
- procedimento amministrativo;
- tributo;
- categoria amministrativa.

---

### Metadati Semantici

Vengono generati automaticamente dall'analisi del contenuto.

Comprendono, ad esempio:

- argomenti trattati;
- concetti rilevanti;
- parole chiave;
- riferimenti normativi;
- relazioni con altri Atti.

Questi metadati consentono a Mandari di comprendere il significato dell'Atto oltre il suo contenuto testuale.

---

## Generazione dei Metadati

La costruzione dei metadati avviene automaticamente durante l'acquisizione dell'Atto.

L'analisi può utilizzare:

- informazioni fornite dal cittadino;
- contenuto degli allegati;
- OCR;
- informazioni già presenti nel Fascicolo;
- correlazioni con Atti esistenti.

Ogni nuova acquisizione può arricchire i metadati già esistenti senza modificare la storia dell'Atto.

---

## Utilizzo dei Metadati

I metadati vengono utilizzati da Mandari per:

- individuare rapidamente gli Atti;
- aggiornare il Fascicolo;
- correlare eventi amministrativi;
- supportare il ragionamento dell'Orchestratore;
- alimentare i motori funzionali;
- ricostruire la storia amministrativa del cittadino.

L'allegato originale viene consultato solo quando necessario.

Nella maggior parte dei casi Mandari opera direttamente sui metadati e sulle informazioni già estratte.

---

## Ricerca Naturale

Il cittadino non è tenuto a conoscere i metadati.

Può esprimere richieste in linguaggio naturale.

Ad esempio:

- "Mostrami l'ISEE del 2026."

- "Trova la PEC ricevuta dall'INPS a marzo."

- "Fammi vedere la ricevuta del pagamento IMU."

Mandari interpreta la richiesta, utilizza i metadati per individuare gli Atti più pertinenti e presenta il risultato richiesto.

---

## Principi Architetturali

Il modello di indicizzazione si basa sui seguenti principi.

- ogni Atto possiede metadati propri;
- i metadati rappresentano la memoria strutturata dell'Atto;
- l'indicizzazione è automatica e incrementale;
- gli allegati non vengono duplicati;
- la ricerca avviene principalmente attraverso i metadati;
- la consultazione avviene mediante linguaggio naturale.

---

## Decisioni Congelate

✓ I metadati appartengono all'Atto e non agli allegati.

✓ L'indicizzazione viene generata automaticamente durante l'acquisizione.

✓ I metadati possono evolvere senza modificare l'identità dell'Atto.

✓ Gli allegati originali vengono conservati una sola volta.

✓ Il cittadino ricerca informazioni mediante linguaggio naturale.

✓ I metadati costituiscono il principale strumento di consultazione del Fascicolo Amministrativo.

# 5. Relazioni tra gli Atti

## Missione

Il Fascicolo Amministrativo non è costituito da una semplice raccolta di Atti indipendenti.

Ogni Atto può essere collegato ad altri Atti attraverso relazioni che descrivono la continuità della vita amministrativa del cittadino.

Le relazioni consentono a Mandari di comprendere il contesto di ogni evento, ricostruire la storia amministrativa e supportare il ragionamento dell'Orchestratore.

---

## Obiettivo

Definire i principi con cui gli Atti vengono correlati all'interno del Fascicolo.

Le relazioni permettono di rappresentare una realtà amministrativa composta da eventi connessi tra loro, evitando duplicazioni e mantenendo la coerenza della conoscenza.

---

## Gli Atti non vivono isolati

Ogni nuovo Atto viene analizzato non solo individualmente, ma anche rispetto agli Atti già presenti nel Fascicolo.

L'obiettivo non è creare copie delle informazioni, ma individuare eventuali collegamenti che arricchiscono la conoscenza del cittadino.

Le relazioni diventano quindi parte integrante del Fascicolo.

---

## Tipologie di Relazione

Le relazioni possono nascere per differenti motivi.

### Relazioni Cronologiche

Collegano Atti appartenenti alla stessa sequenza temporale.

Ad esempio:

- richiesta → risposta;
- domanda → esito;
- comunicazione → pagamento.

---

### Relazioni Amministrative

Collegano Atti che appartengono allo stesso procedimento.

Ad esempio:

- domanda di bonus;
- documentazione integrativa;
- provvedimento finale.

---

### Relazioni per Soggetto

Collegano Atti riferiti alla stessa persona o agli stessi componenti del nucleo familiare.

Questo permette di ricostruire rapidamente la storia amministrativa di ciascun soggetto.

---

### Relazioni per Oggetto

Più Atti possono riguardare il medesimo elemento amministrativo.

Ad esempio:

- lo stesso immobile;
- lo stesso veicolo;
- la stessa posizione previdenziale;
- la stessa pratica.

---

### Relazioni Semantiche

Mandari può individuare collegamenti tra Atti che trattano argomenti correlati anche quando tali collegamenti non sono esplicitamente dichiarati.

Queste relazioni arricchiscono la comprensione del Fascicolo e supportano il ragionamento dell'Orchestratore.

---

## Costruzione delle Relazioni

Le relazioni possono essere generate:

- automaticamente durante l'acquisizione di un nuovo Atto;
- durante l'analisi effettuata da CARTA;
- attraverso il ragionamento dell'Orchestratore;
- mediante conferma o integrazione da parte del cittadino.

Ogni nuova relazione viene registrata senza modificare gli Atti esistenti.

---

## Evoluzione delle Relazioni

Le relazioni possono crescere nel tempo.

Nuovi Atti possono rafforzare, estendere o integrare relazioni già presenti.

Il Fascicolo mantiene la storia dei collegamenti senza perdere le informazioni precedentemente acquisite.

---

## Benefici delle Relazioni

La presenza di relazioni tra gli Atti consente a Mandari di:

- comprendere meglio il contesto amministrativo;
- evitare duplicazioni informative;
- ricostruire la storia degli eventi;
- supportare il ragionamento dell'Orchestratore;
- migliorare la qualità delle risposte;
- fornire suggerimenti più pertinenti.

---

## Principi Architetturali

Il modello delle relazioni si basa sui seguenti principi.

- gli Atti rappresentano eventi autonomi;
- il valore del Fascicolo cresce attraverso le relazioni tra gli Atti;
- le relazioni non duplicano le informazioni;
- ogni relazione mantiene la tracciabilità della propria origine;
- nuove relazioni possono essere aggiunte senza modificare gli Atti esistenti.

---

## Decisioni Congelate

✓ Il Fascicolo è costituito da Atti tra loro correlati.

✓ Le relazioni rappresentano parte integrante della conoscenza amministrativa.

✓ Gli Atti non vengono duplicati per creare collegamenti.

✓ Le relazioni possono essere automatiche o confermate dal cittadino.

✓ Il valore informativo del Fascicolo cresce con l'evoluzione delle relazioni.

✓ Ogni relazione mantiene la propria tracciabilità.

# 6. Costruzione del Fascicolo Amministrativo

## Missione

Il Fascicolo Amministrativo non viene compilato manualmente né costruito in un'unica fase.

Esso si forma progressivamente attraverso gli Atti che descrivono la vita amministrativa del cittadino.

Ogni nuovo Atto contribuisce ad arricchire la conoscenza già presente, consentendo a Mandari di costruire nel tempo una rappresentazione sempre più completa e coerente della situazione amministrativa dell'utente.

---

## Obiettivo

Definire il principio attraverso cui il Fascicolo Amministrativo prende forma.

Il Fascicolo rappresenta il risultato dell'evoluzione continua degli Atti e delle relazioni che essi generano.

Non costituisce un archivio statico, ma una conoscenza dinamica in costante aggiornamento.

---

## Un Fascicolo che cresce nel tempo

Alla prima installazione di Mandari il Fascicolo contiene poche o nessuna informazione.

Ogni nuova interazione del cittadino produce nuovi Atti.

Ogni Atto contribuisce ad arricchire il patrimonio informativo del Fascicolo.

La crescita della conoscenza è quindi progressiva e continua.

---

## Ogni Atto modifica il Fascicolo

Quando un nuovo Atto viene acquisito, Mandari può:

- aggiungere nuove informazioni;
- aggiornare informazioni già presenti;
- creare nuove relazioni;
- arricchire l'indicizzazione;
- generare nuove scadenze;
- migliorare la comprensione del contesto amministrativo.

Il Fascicolo evolve attraverso l'insieme di questi aggiornamenti.

---

## La conoscenza è incrementale

Mandari non ricostruisce il Fascicolo ad ogni nuova acquisizione.

Ogni Atto aggiunge esclusivamente ciò che è realmente nuovo.

Le informazioni già conosciute vengono riutilizzate e, quando necessario, aggiornate mantenendo la tracciabilità della loro evoluzione.

Questo approccio garantisce efficienza, coerenza e continuità della conoscenza.

---

## Coerenza del Fascicolo

Durante la costruzione del Fascicolo, Mandari verifica costantemente la coerenza delle informazioni.

Quando emergono dati apparentemente in conflitto, il sistema:

- mantiene la tracciabilità delle diverse informazioni;
- evidenzia eventuali incongruenze;
- ricerca ulteriori elementi utili alla loro interpretazione;
- può coinvolgere il cittadino per ottenere chiarimenti.

L'obiettivo non è eliminare automaticamente le informazioni discordanti, ma rappresentare fedelmente la realtà amministrativa disponibile.

---

## Un Fascicolo sempre vivo

Il Fascicolo non raggiunge mai uno stato definitivo.

Ogni nuova attività amministrativa può modificarne la struttura informativa.

Anche dopo anni di utilizzo, il Fascicolo continua ad evolversi insieme al cittadino.

La crescita della conoscenza accompagna l'intero ciclo di vita amministrativo della persona.

---

## Il Fascicolo come rappresentazione della realtà

Mandari non conserva semplicemente Atti.

Attraverso gli Atti costruisce una rappresentazione digitale della realtà amministrativa del cittadino.

Gli Atti costituiscono le evidenze.

Le relazioni collegano tali evidenze.

L'insieme delle informazioni rappresenta il Fascicolo Amministrativo.

Il valore del Fascicolo non dipende dalla quantità degli Atti conservati, ma dalla qualità della conoscenza che essi consentono di costruire.

---

## Principi Architetturali

La costruzione del Fascicolo si basa sui seguenti principi.

- il Fascicolo nasce dall'insieme degli Atti;
- la conoscenza cresce progressivamente;
- ogni Atto contribuisce ad aggiornare il Fascicolo;
- le informazioni vengono integrate senza perdere la loro storia;
- la rappresentazione del cittadino evolve nel tempo;
- il Fascicolo descrive la realtà amministrativa e non un semplice archivio documentale.

---

## Decisioni Congelate

✓ Il Fascicolo Amministrativo viene costruito progressivamente attraverso gli Atti.

✓ Ogni nuovo Atto contribuisce ad arricchire la conoscenza del cittadino.

✓ Il Fascicolo evolve senza perdere la tracciabilità delle informazioni.

✓ Le eventuali incongruenze vengono rappresentate e non eliminate automaticamente.

✓ Il Fascicolo rappresenta una conoscenza dinamica e in continua evoluzione.

✓ Il valore del Fascicolo deriva dalla qualità della conoscenza costruita e non dalla quantità degli Atti archiviati.

# 7. Evoluzione della Conoscenza

## Missione

Il Fascicolo Amministrativo non conserva solamente informazioni.

Attraverso gli Atti e le relazioni costruisce una conoscenza che evolve insieme al cittadino.

Ogni nuova attività amministrativa contribuisce ad arricchire la comprensione della situazione personale, familiare ed economica dell'utente, consentendo a Mandari di offrire risposte sempre più pertinenti e contestualizzate.

---

## Obiettivo

Definire i principi attraverso cui la conoscenza del Fascicolo cresce nel tempo.

L'evoluzione della conoscenza rappresenta un processo continuo che trasforma singoli eventi amministrativi in una rappresentazione sempre più completa della realtà del cittadino.

---

## La conoscenza cresce con l'esperienza

Ogni nuovo Atto aggiunge un elemento alla conoscenza esistente.

Il valore del Fascicolo non aumenta esclusivamente per il numero di Atti acquisiti, ma per la capacità di collegare, interpretare e contestualizzare le informazioni già disponibili.

La crescita della conoscenza è quindi qualitativa oltre che quantitativa.

---

## Contestualizzazione progressiva

Un'informazione acquisita oggi può assumere un significato diverso quando viene correlata ad Atti futuri.

Mandari rivaluta continuamente il contesto amministrativo del cittadino.

Nuove informazioni possono chiarire, integrare o completare eventi già presenti nel Fascicolo senza alterarne la storia.

---

## Apprendimento del contesto amministrativo

Con il passare del tempo il Fascicolo acquisisce una conoscenza sempre più precisa delle caratteristiche amministrative del cittadino.

Ad esempio può comprendere:

- la composizione del nucleo familiare;
- le relazioni tra persone e pratiche;
- la ricorrenza di determinati adempimenti;
- la continuità di specifici rapporti con enti o professionisti;
- la presenza di situazioni amministrative ricorrenti.

Questa conoscenza deriva esclusivamente dagli Atti registrati e dalle loro relazioni.

---

## Coerenza nel tempo

L'evoluzione della conoscenza non sostituisce automaticamente le informazioni già presenti.

Mandari conserva sempre la cronologia delle modifiche.

Quando emergono nuove evidenze, il Fascicolo aggiorna la rappresentazione del cittadino mantenendo la possibilità di ricostruire le situazioni precedenti.

---

## Una conoscenza sempre verificabile

Ogni informazione presente nel Fascicolo deve poter essere ricondotta agli Atti che l'hanno generata.

La conoscenza non nasce da deduzioni prive di fondamento, ma dall'elaborazione di eventi amministrativi documentati.

Questo principio garantisce trasparenza, verificabilità e affidabilità.

---

## Il ruolo dell'Orchestratore

L'Orchestratore utilizza la conoscenza costruita dal Fascicolo per coordinare i motori funzionali.

La conoscenza non appartiene quindi ad un singolo motore, ma costituisce un patrimonio condiviso che può essere utilizzato da tutto il sistema secondo le rispettive competenze.

---

## Principi Architetturali

L'evoluzione della conoscenza si basa sui seguenti principi.

- la conoscenza cresce progressivamente;
- ogni nuova informazione viene contestualizzata;
- il Fascicolo mantiene la storia delle informazioni;
- ogni conoscenza deve essere riconducibile agli Atti che l'hanno generata;
- la conoscenza costituisce un patrimonio condiviso dell'intero sistema.

---

## Decisioni Congelate

✓ Il Fascicolo evolve continuamente insieme al cittadino.

✓ La crescita della conoscenza è sia quantitativa sia qualitativa.

✓ Ogni informazione deve essere riconducibile agli Atti che l'hanno generata.

✓ La cronologia delle informazioni viene sempre preservata.

✓ La conoscenza del Fascicolo rappresenta il patrimonio condiviso utilizzato dall'Orchestratore e dai motori funzionali.

✓ Mandari costruisce la propria comprensione del cittadino attraverso l'evoluzione progressiva del Fascicolo Amministrativo.

# 8. Consultazione del Fascicolo

## Missione

Il Fascicolo Amministrativo deve essere facilmente consultabile senza richiedere al cittadino la conoscenza della propria organizzazione interna.

Mandari assume il ruolo di intermediario tra il cittadino e la conoscenza contenuta nel Fascicolo, trasformando richieste espresse in linguaggio naturale in ricerche strutturate sugli Atti e sulle informazioni disponibili.

---

## Obiettivo

Definire i principi attraverso cui il cittadino accede alle informazioni del proprio Fascicolo Amministrativo.

L'accesso deve privilegiare semplicità, naturalezza e comprensione del contesto, lasciando a Mandari il compito di individuare gli Atti più pertinenti.

---

## La consultazione è conversazionale

Il cittadino non è chiamato a conoscere:

- dove è stato salvato un Atto;
- come è stato classificato;
- quali metadati possiede;
- quali relazioni sono state costruite.

Il cittadino formula semplicemente la propria richiesta.

Mandari interpreta l'intenzione, consulta il Fascicolo e restituisce le informazioni più pertinenti.

---

## Linguaggio naturale

Le richieste possono essere formulate in modo spontaneo.

Ad esempio:

- "Mostrami l'ultimo ISEE."

- "Trova la lettera dell'Agenzia delle Entrate ricevuta questa primavera."

- "Fammi vedere la ricevuta del pagamento della rata Equitalia di ottobre."

- "Qual è il certificato di nascita di mio figlio?"

Il cittadino non deve ricordare nomi di file, cartelle o classificazioni.

---

## Comprensione del contesto

Durante la consultazione Mandari interpreta il significato della richiesta considerando:

- il contesto della conversazione;
- la storia amministrativa del cittadino;
- gli Atti presenti nel Fascicolo;
- le relazioni tra gli Atti;
- le informazioni già conosciute.

Questo consente di ottenere risultati pertinenti anche quando la richiesta è incompleta o non perfettamente precisa.

---

## Risultati della consultazione

La consultazione può produrre differenti tipologie di risposta.

Ad esempio:

- individuazione di uno o più Atti;
- riepilogo delle informazioni contenute negli Atti;
- spiegazione del contenuto di un Atto;
- confronto tra Atti correlati;
- individuazione di eventuali informazioni mancanti;
- suggerimento di azioni successive.

La consultazione non si limita quindi al recupero degli Atti, ma supporta la comprensione della situazione amministrativa.

---

## Ricerca progressiva

Quando la richiesta del cittadino risulta ambigua o insufficiente, Mandari può avviare un dialogo per raccogliere ulteriori informazioni.

Ad esempio:

- chiedere a quale periodo si riferisce la richiesta;
- chiarire il soggetto interessato;
- distinguere tra Atti simili;
- confermare il documento desiderato.

L'obiettivo è individuare con precisione l'informazione richiesta evitando interpretazioni errate.

---

## Una consultazione indipendente dalla struttura interna

Il cittadino non interagisce con archivi, cartelle o sistemi di classificazione.

La struttura interna del Fascicolo rimane una responsabilità esclusiva di Mandari.

L'esperienza dell'utente rimane orientata esclusivamente al dialogo e alla risoluzione del proprio bisogno informativo.

---

## Principi Architetturali

La consultazione del Fascicolo si basa sui seguenti principi.

- il cittadino utilizza il linguaggio naturale;
- Mandari interpreta l'intenzione dell'utente;
- la ricerca avviene sugli Atti e sulla conoscenza costruita dal Fascicolo;
- la struttura interna del Fascicolo rimane trasparente;
- il dialogo può evolvere per chiarire richieste ambigue;
- la consultazione restituisce informazioni contestualizzate e comprensibili.

---

## Decisioni Congelate

✓ Il Fascicolo viene consultato principalmente mediante linguaggio naturale.

✓ Il cittadino non interagisce direttamente con la struttura interna del Fascicolo.

✓ Mandari interpreta il contesto della richiesta prima di effettuare la ricerca.

✓ La consultazione può comprendere Atti, informazioni, spiegazioni e suggerimenti.

✓ In caso di ambiguità Mandari avvia un dialogo di chiarimento.

✓ La semplicità dell'esperienza utente prevale sempre sulla complessità dell'organizzazione interna del Fascicolo.

# 9. Principi del Modello Informativo

## Missione

Il modello informativo di Mandari definisce i principi fondamentali attraverso cui il Fascicolo Amministrativo viene costruito, organizzato, consultato ed evoluto.

Questi principi rappresentano le regole che garantiscono coerenza, affidabilità e continuità dell'intero sistema, indipendentemente dalle future scelte tecnologiche.

---

## Obiettivo

Raccogliere in un insieme organico i principi che governano il modello informativo di Mandari e che dovranno essere rispettati da tutti i componenti del sistema.

---

## Il Fascicolo rappresenta la realtà amministrativa

Il Fascicolo Amministrativo non rappresenta un archivio di documenti.

Rappresenta la realtà amministrativa del cittadino.

Gli Atti costituiscono le evidenze attraverso cui tale realtà viene costruita e aggiornata nel tempo.

---

## L'Atto è l'unità fondamentale della conoscenza

Ogni informazione presente nel Fascicolo deriva da uno o più Atti.

L'Atto rappresenta l'elemento minimo sul quale Mandari costruisce la propria conoscenza.

Gli allegati costituiscono eventuali evidenze dell'Atto, ma non ne rappresentano l'unità informativa.

---

## La conoscenza è sempre tracciabile

Ogni conoscenza presente nel Fascicolo deve poter essere ricondotta agli Atti che l'hanno generata.

Questo principio garantisce trasparenza, verificabilità e affidabilità delle informazioni.

---

## Gli indici rappresentano il punto di accesso alla conoscenza

La consultazione del Fascicolo non avviene mediante la navigazione degli Atti.

Mandari interroga gli indici costruiti durante l'acquisizione e l'evoluzione degli Atti.

Gli indici consentono di individuare rapidamente gli Atti che contengono le conoscenze necessarie a soddisfare la richiesta del cittadino.

Più Atti possono condividere la stessa indicizzazione.

L'approfondimento progressivo dell'indicizzazione consente di circoscrivere il sottoinsieme di Atti più pertinenti, riducendo progressivamente l'ambito della ricerca fino ad individuare le informazioni realmente necessarie alla costruzione della risposta.

---

## Le relazioni aumentano il valore della conoscenza

Le relazioni tra gli Atti permettono di ricostruire il contesto amministrativo del cittadino.

Il valore del Fascicolo non dipende esclusivamente dalle informazioni contenute nei singoli Atti, ma anche dalla rete di relazioni che li collega.

---

## La conoscenza evolve senza perdere la storia

Ogni nuova informazione arricchisce il Fascicolo senza eliminare la memoria delle situazioni precedenti.

L'evoluzione della conoscenza mantiene sempre la tracciabilità degli eventi amministrativi.

---

## Il cittadino dialoga con Mandari

L'interfaccia principale del Fascicolo è il dialogo naturale.

Il cittadino esprime il proprio bisogno informativo.

Mandari interpreta la richiesta, consulta gli indici, individua gli Atti pertinenti e costruisce una risposta utilizzando esclusivamente la conoscenza presente nel Fascicolo.

---

## Indipendenza dalla tecnologia

Il modello informativo definito nel presente documento è indipendente dalla tecnologia utilizzata per implementarlo.

Le future scelte relative a database, sistemi di archiviazione, motori di ricerca, intelligenza artificiale e infrastruttura non modificano i principi fondamentali qui descritti.

---

## Principi Architetturali

Il modello informativo di Mandari si basa sui seguenti principi.

- il Fascicolo rappresenta la realtà amministrativa del cittadino;
- gli Atti costituiscono l'unità fondamentale della conoscenza;
- gli allegati rappresentano eventuali evidenze degli Atti;
- gli indici costituiscono il principale strumento di accesso alla conoscenza;
- le relazioni arricchiscono il valore informativo del Fascicolo;
- ogni conoscenza mantiene la propria tracciabilità;
- il modello informativo è indipendente dalla tecnologia.

---

## Decisioni Congelate

✓ Il Fascicolo rappresenta la realtà amministrativa del cittadino.

✓ L'Atto costituisce l'unità fondamentale della conoscenza.

✓ Gli allegati rappresentano evidenze degli Atti.

✓ Gli indici rappresentano il principale punto di accesso agli Atti e alla conoscenza.

✓ La consultazione del Fascicolo avviene attraverso gli indici e non mediante la navigazione diretta degli Atti.

✓ Più Atti possono condividere la stessa indicizzazione.

✓ L'approfondimento progressivo dell'indicizzazione consente di individuare gli Atti realmente pertinenti.

✓ Il modello informativo è indipendente dalle future scelte tecnologiche.

# 10. Decisioni Congelate

## Missione

Il presente capitolo raccoglie le decisioni architetturali consolidate nel PRD-007.

Tali decisioni definiscono il modello informativo di Mandari e costituiscono il riferimento obbligatorio per tutti i documenti tecnici successivi.

Ogni futura implementazione dovrà rispettare i principi qui descritti.

---

## Decisioni Congelate

### 1. L'Atto è l'unità fondamentale del Fascicolo

Il Fascicolo Amministrativo è costruito esclusivamente attraverso gli Atti.

Ogni conoscenza presente nel sistema deriva direttamente o indirettamente da uno o più Atti.

---

### 2. Il documento non rappresenta la conoscenza

Il documento costituisce una possibile evidenza dell'Atto.

La conoscenza appartiene all'Atto e non all'allegato.

---

### 3. Il Fascicolo rappresenta la realtà amministrativa

Il Fascicolo non è un archivio documentale.

Rappresenta la situazione amministrativa del cittadino attraverso Atti, relazioni e conoscenza strutturata.

---

### 4. La conoscenza evolve progressivamente

Il Fascicolo cresce insieme al cittadino.

Ogni nuovo Atto arricchisce la rappresentazione della realtà amministrativa senza cancellarne la storia.

---

### 5. Gli Atti vengono indicizzati automaticamente

Ogni Atto acquisito genera automaticamente metadati e indici.

L'indicizzazione costituisce il principale strumento di accesso alla conoscenza.

---

### 6. Gli indici conducono agli Atti

La ricerca non avviene direttamente sugli allegati.

Mandari consulta gli indici.

Gli indici individuano gli Atti pertinenti.

Gli Atti forniscono la conoscenza necessaria alla costruzione della risposta.

---

### 7. Più Atti possono condividere gli stessi indici

Uno stesso insieme di indici può individuare più Atti.

L'approfondimento progressivo dell'indicizzazione consente di restringere progressivamente il campo della ricerca fino agli Atti realmente pertinenti.

---

### 8. Le relazioni costituiscono conoscenza

Le relazioni tra gli Atti rappresentano parte integrante del Fascicolo.

Il valore della conoscenza cresce attraverso tali relazioni.

---

### 9. Ogni conoscenza è tracciabile

Ogni informazione presente nel Fascicolo deve poter essere ricondotta agli Atti che l'hanno generata.

La tracciabilità rappresenta un principio fondamentale del sistema.

---

### 10. Il cittadino dialoga con Mandari

L'interfaccia principale del Fascicolo è il linguaggio naturale.

Il cittadino non gestisce archivi, cartelle o classificazioni.

Espone il proprio bisogno.

Mandari interpreta la richiesta e costruisce la risposta utilizzando esclusivamente la conoscenza presente nel Fascicolo.

---

### 11. Il modello informativo è indipendente dalla tecnologia

Le decisioni contenute nel presente documento sono indipendenti dalla tecnologia utilizzata.

Database, infrastruttura, motori AI, sistemi di storage e componenti software potranno evolvere senza modificare il modello concettuale definito nel PRD-007.

---

## Vincolo per i PRD successivi

Tutti i documenti successivi dovranno considerare il presente PRD come riferimento architetturale.

Ogni scelta tecnica dovrà implementare il modello informativo qui definito senza alterarne i principi fondamentali.

Eventuali modifiche a tali principi potranno essere introdotte esclusivamente mediante una revisione architetturale esplicita del PRD-007.

---

## Chiusura del Documento

Con il presente documento viene congelato il modello informativo di Mandari.

A partire dal PRD-008 l'attività progettuale si concentrerà sull'implementazione tecnica del modello qui definito, mantenendo invariati i principi concettuali che governano Atti, Fascicolo, conoscenza, indicizzazione e relazioni.
