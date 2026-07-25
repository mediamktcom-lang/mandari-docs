# PRD-008
# Architettura Fisica e Persistenza

Versione: 1.0 (Frozen)

Stato: IN LAVORAZIONE

Progetto: Mandari

Documenti correlati:

PRD-001 — Visione del Prodotto

PRD-002 — Modello del Cittadino e Fascicolo

PRD-003 — Esperienza Utente

PRD-004 — Motori Funzionali

PRD-005 — Orchestratore Decisionale

PRD-006 — Architettura Tecnica

PRD-007 — Modello Dati e Fascicolo Amministrativo

---

# Obiettivo del Documento

Il presente documento definisce l'architettura fisica di Mandari.

Dopo aver definito nei PRD precedenti il modello concettuale del sistema, il Fascicolo Amministrativo, gli Atti, la conoscenza e il comportamento dell'Orchestratore, il PRD-008 descrive come tali elementi verranno concretamente persistiti, organizzati, sincronizzati e resi disponibili ai diversi componenti dell'applicazione.

Il documento non introduce nuovi concetti funzionali, ma traduce i principi già congelati nei PRD precedenti in una struttura tecnica implementabile.

Le decisioni contenute nel presente documento costituiranno il riferimento architetturale per tutti i successivi sviluppi relativi a database, storage, motori di ricerca, sincronizzazione e infrastruttura.

---

# Struttura del Documento

1. Visione dell'Architettura Fisica

2. Principi di Persistenza dei Dati

3. Storage degli Atti e degli Allegati

4. Database e Modello di Persistenza

5. Motore di Indicizzazione e Ricerca

6. Sincronizzazione tra App, WebApp e Backend

7. Gestione dello Stato e della Cache

8. Scalabilità e Prestazioni

9. Principi Architetturali dell'Infrastruttura

10. Decisioni Congelate

# 1. Visione dell'Architettura Fisica

## Problema da risolvere

Nei documenti precedenti sono stati definiti il comportamento di Mandari, il modello del Fascicolo Amministrativo, gli Atti, la conoscenza e le modalità con cui il sistema ragiona.

Tali elementi descrivono **cosa** Mandari deve fare, ma non **dove** vivono le informazioni, **come** vengono conservate e **come** vengono rese disponibili ai diversi componenti della piattaforma.

È quindi necessario progettare un'architettura fisica che traduca il modello concettuale in una struttura tecnica solida, scalabile e indipendente dal dispositivo utilizzato dal cittadino.

---

## Principio Architetturale

Mandari è un unico sistema distribuito composto da più componenti specializzati.

App, WebApp, servizi backend, motori funzionali, database, sistemi di indicizzazione e storage costituiscono un'unica architettura logica pur essendo fisicamente separati.

Ogni componente possiede responsabilità precise e comunica con gli altri attraverso interfacce controllate.

---

## La piattaforma vista dal cittadino

Per il cittadino Mandari è un'unica applicazione.

L'utente può accedere indifferentemente tramite:

- App per smartphone;
- WebApp;
- futuri client compatibili.

L'esperienza d'uso deve risultare identica indipendentemente dal dispositivo utilizzato.

Il Fascicolo Amministrativo, la cronologia, gli Atti e le conversazioni devono essere sempre disponibili e sincronizzati.

---

## La piattaforma vista dall'architettura

Dal punto di vista tecnico, Mandari è composta da più livelli indipendenti.

Tra questi:

- interfacce utente;
- orchestratore;
- motori funzionali;
- servizi applicativi;
- motore di indicizzazione;
- database;
- sistemi di storage;
- sistemi di autenticazione;
- sistemi di monitoraggio.

Ogni livello svolge esclusivamente il proprio compito.

---

## Separazione delle responsabilità

L'architettura fisica adotta il principio della responsabilità unica.

Ogni componente deve avere uno scopo chiaramente definito.

Ad esempio:

- lo storage conserva gli allegati;
- il database conserva i dati strutturati;
- il motore di indicizzazione individua gli Atti;
- l'Orchestratore coordina il ragionamento;
- i motori eseguono competenze specialistiche.

Nessun componente deve assumere responsabilità appartenenti ad altri livelli.

---

## Indipendenza dei componenti

Ogni componente deve poter evolvere senza richiedere modifiche sostanziali agli altri.

L'aggiornamento di un database, di un motore AI o di uno storage non deve alterare il comportamento funzionale di Mandari.

Questa indipendenza garantisce evoluzione tecnologica, facilità di manutenzione e riduzione del rischio.

---

## Scalabilità come principio progettuale

L'architettura viene progettata per crescere progressivamente.

L'aumento del numero di cittadini, Atti, interrogazioni o motori funzionali non deve richiedere una riprogettazione dell'intero sistema.

La scalabilità rappresenta un requisito architetturale fin dalla prima versione.

---

## Tecnologia come dettaglio implementativo

Le tecnologie utilizzate costituiscono una scelta implementativa.

I principi architetturali definiti nel presente documento devono rimanere validi anche qualora, nel tempo, vengano sostituiti:

- database;
- sistemi di storage;
- provider cloud;
- modelli di intelligenza artificiale;
- framework applicativi.

L'architettura di Mandari deve sopravvivere all'evoluzione tecnologica.

---

## Motivazioni della scelta

Questa architettura consente di:

- separare chiaramente le responsabilità;
- facilitare l'evoluzione futura;
- ridurre il rischio di dipendenze tecnologiche;
- aumentare la manutenibilità del sistema;
- migliorare scalabilità e affidabilità;
- garantire uniformità dell'esperienza utente.

---

## Decisioni Congelate

✓ Mandari viene progettata come un sistema distribuito composto da componenti indipendenti.

✓ App e WebApp rappresentano differenti punti di accesso allo stesso ecosistema.

✓ Ogni componente possiede una responsabilità esclusiva.

✓ La comunicazione tra componenti avviene attraverso interfacce definite.

✓ L'architettura è indipendente dalle tecnologie utilizzate.

✓ Scalabilità, modularità e basso accoppiamento costituiscono principi fondanti dell'intero sistema.

# 2. Principi di Persistenza dei Dati

## Problema da risolvere

Mandari gestisce una grande quantità di informazioni eterogenee:

- Atti;
- allegati;
- metadati;
- indici;
- relazioni;
- conversazioni;
- configurazioni;
- cronologia degli eventi.

Tali informazioni devono rimanere disponibili nel tempo, indipendentemente dal dispositivo utilizzato dal cittadino, dalle evoluzioni tecnologiche e dagli aggiornamenti dell'infrastruttura.

È quindi necessario definire un modello di persistenza che garantisca continuità, affidabilità e integrità della conoscenza.

---

## Principio Architetturale

La persistenza di Mandari non ha come obiettivo principale la conservazione dei dati.

Ha come obiettivo la conservazione della conoscenza amministrativa del cittadino.

Ogni componente del sistema deve contribuire a preservare tale conoscenza senza introdurre duplicazioni, incoerenze o perdita di informazioni.

---

## Ogni informazione possiede una propria natura

Non tutte le informazioni vengono persistite nello stesso modo.

Ad esempio:

- gli Atti rappresentano eventi amministrativi;
- gli allegati rappresentano evidenze degli Atti;
- gli indici rappresentano strumenti di accesso;
- le relazioni descrivono il contesto;
- le conversazioni rappresentano interazioni;
- la configurazione rappresenta lo stato del sistema.

Ogni categoria richiederà un meccanismo di persistenza adeguato alla propria funzione.

---

## Persistenza separata per responsabilità

Ogni servizio conserva esclusivamente le informazioni di propria competenza.

Ad esempio:

- il Servizio Storage conserva gli allegati;
- il Servizio Database conserva i dati strutturati;
- il Servizio di Indicizzazione conserva gli indici;
- il Servizio Conversazionale conserva la cronologia delle conversazioni;
- il Servizio Orchestratore non diventa proprietario permanente dei dati, ma utilizza le informazioni messe a disposizione dagli altri servizi.

La persistenza segue quindi il principio della responsabilità unica.

---

## La conoscenza non viene duplicata

Una stessa informazione deve avere un solo punto di verità.

Gli altri servizi possono utilizzare riferimenti, identificativi o rappresentazioni temporanee, ma non devono creare copie permanenti della stessa conoscenza.

Questo principio riduce il rischio di inconsistenze e semplifica l'evoluzione del sistema.

---

## Persistenza indipendente dai dispositivi

Il cittadino può utilizzare Mandari da smartphone, tablet o WebApp.

Nessun dispositivo rappresenta il luogo di conservazione della conoscenza.

I dispositivi costituiscono esclusivamente punti di accesso all'ecosistema.

La perdita o la sostituzione di un dispositivo non deve compromettere il Fascicolo Amministrativo né la conoscenza costruita nel tempo.

---

## Persistenza orientata alla continuità

Ogni modifica apportata al Fascicolo deve poter essere ricostruita.

Il sistema mantiene la continuità della storia amministrativa del cittadino, preservando l'evoluzione degli Atti e delle informazioni nel tempo.

L'obiettivo non è soltanto conservare lo stato corrente, ma anche garantire la possibilità di comprenderne l'evoluzione.

---

## Persistenza come fondamento dell'ecosistema

Tutti i servizi di Mandari si basano sul medesimo principio.

La conoscenza appartiene all'ecosistema e non ai singoli componenti.

I servizi collaborano per costruire, aggiornare e utilizzare tale conoscenza senza appropriarsene.

Questo consente di sostituire o aggiornare singoli servizi senza compromettere il patrimonio informativo del cittadino.

---

## Motivazioni della scelta

Questo modello di persistenza permette di:

- preservare la conoscenza nel lungo periodo;
- evitare duplicazioni informative;
- mantenere una singola fonte autorevole per ogni informazione;
- semplificare la manutenzione;
- facilitare la sostituzione dei componenti tecnologici;
- garantire continuità tra App, WebApp e futuri client.

---

## Decisioni Congelate

✓ La persistenza ha come obiettivo la conservazione della conoscenza e non dei soli dati.

✓ Ogni categoria di informazione utilizza il meccanismo di persistenza più adatto alla propria natura.

✓ Ogni servizio è proprietario esclusivamente delle informazioni di propria competenza.

✓ La conoscenza possiede un'unica fonte autorevole.

✓ I dispositivi dell'utente non costituiscono il luogo di persistenza del Fascicolo.

✓ La continuità storica rappresenta un requisito fondamentale della persistenza.

✓ L'ecosistema mantiene la conoscenza indipendentemente dall'evoluzione dei singoli servizi.

# 3. Storage degli Atti e degli Allegati

## Problema da risolvere

Ogni giorno Mandari acquisisce nuovi Atti.

Ogni Atto può essere accompagnato da uno o più allegati, quali ad esempio:

- PDF;
- fotografie;
- scansioni;
- immagini;
- ricevute;
- documenti firmati;
- file generati automaticamente dal sistema.

È necessario definire come tali elementi vengano memorizzati garantendo affidabilità, sicurezza, disponibilità e possibilità di crescita nel tempo.

---

## Principio Architetturale

L'Atto e il suo allegato sono due elementi distinti.

L'Atto rappresenta l'evento amministrativo.

L'allegato rappresenta l'evidenza materiale dell'evento.

Di conseguenza non devono necessariamente essere conservati nello stesso sistema.

---

## Separazione tra dati e file

Mandari separa completamente:

- le informazioni strutturate dell'Atto;
- i file allegati.

L'Atto verrà gestito dal sistema informativo.

Gli allegati verranno conservati da un servizio specializzato nello storage dei file.

Questa separazione permette di ottimizzare ogni componente per il proprio compito.

---

## Gli allegati sono immutabili

Una volta acquisito un allegato, esso non deve essere modificato.

Qualora il cittadino carichi una nuova versione dello stesso documento, Mandari non sostituisce il file precedente.

Viene invece creato un nuovo Atto oppure una nuova evidenza collegata all'Atto esistente, preservando la cronologia completa.

---

## Identificatore univoco

Ogni allegato riceve un identificatore univoco permanente.

L'Atto non contiene il file, ma esclusivamente il riferimento all'allegato.

Questo consente di:

- evitare duplicazioni;
- recuperare rapidamente il file;
- sostituire in futuro il sistema di storage senza modificare il Fascicolo.

---

## Lo storage non interpreta i contenuti

Il servizio di storage ha una sola responsabilità:

conservare i file.

Non interpreta documenti.

Non costruisce indici.

Non comprende il contenuto.

Non partecipa al ragionamento dell'Orchestratore.

Tutta la logica applicativa rimane esterna allo storage.

---

## Lo storage è trasparente

Gli altri servizi non devono conoscere dove il file venga fisicamente conservato.

Essi richiedono semplicemente un allegato mediante il suo identificatore.

Sarà il Servizio Storage a recuperarlo.

Questo principio rende possibile cambiare tecnologia di storage senza modificare il resto dell'ecosistema.

---

## Ridondanza e disponibilità

Lo storage dovrà garantire:

- elevata disponibilità;
- protezione dalla perdita dei file;
- possibilità di replica;
- procedure di backup e ripristino.

Le modalità tecniche saranno definite nei documenti dedicati all'infrastruttura.

---

## Motivazioni della scelta

La separazione tra Atti e allegati consente di:

- ridurre il carico sul database;
- gestire file di grandi dimensioni;
- aumentare la scalabilità;
- semplificare i backup;
- migliorare la sicurezza;
- sostituire facilmente il sistema di storage in futuro.

---

## Decisioni Congelate

✓ L'Atto e l'allegato rappresentano due entità distinte.

✓ Gli allegati vengono conservati in un servizio dedicato allo storage.

✓ Lo storage conserva esclusivamente file.

✓ Gli allegati sono immutabili.

✓ Ogni allegato possiede un identificatore permanente.

✓ Gli altri servizi accedono agli allegati esclusivamente attraverso tale identificatore.

✓ La tecnologia utilizzata per lo storage rimane indipendente dal modello informativo.

# 4. Database e Modello di Persistenza

## Problema da risolvere

Mandari deve conservare una grande quantità di dati strutturati necessari al funzionamento dell'intero ecosistema.

Tra questi rientrano, ad esempio:

- gli Atti;
- i metadati;
- le relazioni;
- i riferimenti agli allegati;
- gli utenti;
- i nuclei familiari;
- le configurazioni;
- gli eventi;
- le autorizzazioni.

È necessario definire un modello di persistenza che consenta di organizzare tali informazioni in modo coerente, efficiente ed estensibile.

---

## Principio Architetturale

Il database rappresenta il sistema di persistenza delle informazioni strutturate.

Esso non contiene il Fascicolo Amministrativo.

Contiene esclusivamente i dati necessari affinché il Fascicolo possa essere costruito, aggiornato e consultato dai servizi dell'ecosistema.

---

## Il database non contiene la conoscenza

La conoscenza nasce dalla collaborazione tra diversi componenti.

Il database conserva dati strutturati.

Lo storage conserva gli allegati.

Il motore di indicizzazione costruisce gli indici.

L'Orchestratore coordina il ragionamento.

La conoscenza emerge dalla collaborazione di tali servizi.

---

## Persistenza normalizzata

Ogni informazione viene memorizzata una sola volta.

Le diverse entità vengono collegate mediante riferimenti logici.

Questo approccio riduce:

- duplicazioni;
- inconsistenze;
- difficoltà di manutenzione;
- problemi di aggiornamento.

---

## Separazione delle entità

Il modello dati dovrà prevedere entità indipendenti per rappresentare, ad esempio:

- cittadini;
- profili;
- Atti;
- allegati;
- eventi;
- relazioni;
- deleghe;
- notifiche;
- configurazioni.

Ogni entità possiede un proprio ciclo di vita e viene gestita dal servizio competente.

---

## Il database non contiene logica applicativa

Le regole decisionali di Mandari non appartengono al database.

Il database conserva informazioni.

L'elaborazione viene eseguita dai servizi applicativi.

Questa separazione permette di mantenere il database semplice, affidabile e facilmente sostituibile.

---

## Identificatori permanenti

Ogni entità persistita possiede un identificatore stabile e univoco.

I servizi comunicano tra loro utilizzando tali identificatori e non facendo riferimento alla posizione fisica dei dati.

Questo principio garantisce indipendenza tra i componenti dell'ecosistema.

---

## Evoluzione del modello dati

Il modello di persistenza dovrà poter evolvere nel tempo.

L'aggiunta di nuove funzionalità non dovrà richiedere la riprogettazione completa del database.

Le nuove entità dovranno poter essere introdotte mantenendo la compatibilità con il modello esistente.

---

## Motivazioni della scelta

Questo modello permette di:

- separare dati e logica applicativa;
- ridurre le duplicazioni;
- semplificare la manutenzione;
- facilitare l'evoluzione futura;
- garantire maggiore affidabilità;
- mantenere il database indipendente dagli altri servizi.

---

## Decisioni Congelate

✓ Il database conserva esclusivamente informazioni strutturate.

✓ Il Fascicolo Amministrativo non coincide con il database.

✓ Ogni informazione viene memorizzata una sola volta.

✓ Ogni entità possiede un identificatore permanente.

✓ Il database non contiene logica applicativa.

✓ Le regole decisionali appartengono ai servizi dell'ecosistema.

✓ Il modello dati deve poter evolvere senza compromettere le informazioni già esistenti.

# 5. Motore di Indicizzazione e Ricerca

## Problema da risolvere

Con il passare del tempo il Fascicolo Amministrativo conterrà migliaia di Atti.

Una ricerca sequenziale sugli Atti risulterebbe lenta, inefficiente e incompatibile con un'esperienza conversazionale.

È quindi necessario progettare un servizio specializzato che consenta di individuare rapidamente gli Atti pertinenti senza analizzarne ogni volta il contenuto.

---

## Principio Architetturale

Il Motore di Indicizzazione rappresenta il punto di accesso alla conoscenza del Fascicolo.

Esso non conserva gli Atti.

Non conserva gli allegati.

Conserva esclusivamente gli indici necessari a localizzare gli Atti che contengono le conoscenze richieste.

---

## Costruzione degli indici

Ogni volta che viene acquisito un nuovo Atto, il sistema genera automaticamente un insieme di indici.

Gli indici possono riguardare, ad esempio:

- soggetti coinvolti;
- enti;
- professionisti;
- tipologia dell'Atto;
- periodo temporale;
- eventi amministrativi;
- parole chiave;
- relazioni;
- stato dell'Atto;
- scadenze;
- altri elementi individuati durante l'elaborazione.

L'obiettivo è costruire molteplici punti di accesso allo stesso Atto.

---

## Una rete di indicizzazione

Uno stesso Atto può essere raggiunto attraverso decine di percorsi differenti.

Allo stesso modo, uno stesso indice può individuare più Atti.

La ricerca non è quindi uno schema uno-a-uno, ma una rete dinamica di collegamenti tra indici e Atti.

---

## Flusso della ricerca

Quando il cittadino formula una richiesta:

1. l'Orchestratore interpreta l'intenzione;
2. costruisce una richiesta di ricerca;
3. interroga il Motore di Indicizzazione;
4. il Motore restituisce gli identificatori degli Atti candidati;
5. l'Orchestratore recupera gli Atti dai servizi competenti;
6. i motori funzionali elaborano le informazioni necessarie;
7. viene costruita la risposta per il cittadino.

Il Motore di Indicizzazione non costruisce mai direttamente la risposta.

---

## Ricerca progressiva

La ricerca avviene per raffinamenti successivi.

Un primo insieme di indici individua un gruppo di Atti.

Successivi livelli di indicizzazione riducono progressivamente il numero dei candidati fino ad ottenere gli Atti realmente pertinenti.

Questo approccio mantiene elevate prestazioni anche in presenza di Fascicoli molto estesi.

---

## Il Motore non interpreta il significato

Il Motore di Indicizzazione non prende decisioni.

Non interpreta il contenuto amministrativo.

Non valuta la correttezza delle informazioni.

Si limita ad individuare gli Atti potenzialmente pertinenti in base agli indici disponibili.

L'interpretazione rimane responsabilità dell'Orchestratore e dei motori funzionali.

---

## Evoluzione continua

Ogni nuovo Atto può generare nuovi indici o aggiornare quelli esistenti.

Il Motore evolve continuamente insieme al Fascicolo.

La qualità delle ricerche migliora con l'aumento della conoscenza disponibile, senza modificare il comportamento dell'utente.

---

## Motivazioni della scelta

L'adozione di un Motore di Indicizzazione dedicato permette di:

- eliminare ricerche sequenziali;
- ridurre i tempi di risposta;
- gestire Fascicoli di grandi dimensioni;
- separare ricerca e ragionamento;
- rendere indipendenti il database e il sistema di ricerca;
- consentire future evoluzioni delle tecnologie di indicizzazione senza modificare il resto dell'ecosistema.

---

## Decisioni Congelate

✓ Il Motore di Indicizzazione conserva esclusivamente gli indici.

✓ Gli Atti rimangono conservati nei rispettivi servizi.

✓ Ogni Atto genera automaticamente molteplici indici.

✓ Uno stesso indice può individuare più Atti.

✓ La ricerca avviene attraverso raffinamenti progressivi.

✓ Il Motore di Indicizzazione non interpreta il significato degli Atti.

✓ La costruzione della risposta rimane responsabilità dell'Orchestratore e dei motori funzionali.

✓ Il Motore di Indicizzazione rappresenta il punto di accesso principale alla conoscenza del Fascicolo.

# 6. Sincronizzazione tra App, WebApp e Backend

## Problema da risolvere

Mandari sarà disponibile come App per dispositivi mobili e come WebApp.

Il cittadino potrà utilizzare indifferentemente uno o più dispositivi nel corso della giornata.

È quindi necessario garantire che ogni accesso rappresenti sempre lo stesso Fascicolo Amministrativo, senza creare copie indipendenti delle informazioni.

---

## Principio Architetturale

App e WebApp non rappresentano archivi autonomi.

Entrambe costituiscono semplicemente punti di accesso allo stesso ecosistema centrale.

La conoscenza amministrativa del cittadino viene mantenuta esclusivamente dai servizi backend.

---

## Un'unica fonte della verità

Il Fascicolo Amministrativo esiste una sola volta.

Non esiste un Fascicolo sull'App e uno sulla WebApp.

Esiste un unico Fascicolo condiviso da tutti i client autorizzati.

Ogni modifica viene registrata una sola volta e diventa immediatamente disponibile all'intero ecosistema.

---

## I client non comunicano tra loro

L'App non invia informazioni alla WebApp.

La WebApp non aggiorna direttamente l'App.

Entrambe comunicano esclusivamente con i servizi backend.

Questo principio elimina problemi di sincronizzazione diretta tra dispositivi.

---

## Aggiornamento dello stato

Quando un cittadino esegue un'azione:

- viene aggiornato il Fascicolo;
- vengono aggiornati gli Atti interessati;
- vengono aggiornati gli indici eventualmente coinvolti;
- gli altri servizi ricevono gli eventi necessari.

I client recuperano il nuovo stato dal backend senza dover conoscere le operazioni eseguite dagli altri dispositivi.

---

## Continuità dell'esperienza

Il cittadino deve poter:

- iniziare un'attività sullo smartphone;
- proseguirla dal computer;
- riprenderla successivamente da un altro dispositivo.

L'esperienza deve risultare continua e coerente.

Il cambio di dispositivo non deve modificare il contesto operativo.

---

## Gestione delle interruzioni

Eventuali interruzioni della connessione non devono compromettere la consistenza del Fascicolo.

Le operazioni verranno gestite secondo le politiche di affidabilità definite dai servizi applicativi.

Il ripristino della connessione consentirà il riallineamento dello stato senza perdita delle informazioni.

---

## Evoluzione futura

Nuovi client potranno essere aggiunti senza modificare il funzionamento dell'ecosistema.

Ad esempio:

- tablet;
- desktop application;
- assistenti vocali;
- dispositivi indossabili;
- futuri canali di accesso.

Tutti utilizzeranno gli stessi servizi centrali.

---

## Motivazioni della scelta

Questo modello consente di:

- mantenere un'unica fonte della verità;
- eliminare conflitti tra dispositivi;
- semplificare la gestione delle modifiche;
- garantire continuità dell'esperienza utente;
- facilitare l'aggiunta di nuovi client;
- ridurre la complessità dell'architettura.

---

## Decisioni Congelate

✓ Il Fascicolo Amministrativo esiste una sola volta nell'ecosistema.

✓ App e WebApp rappresentano esclusivamente client di accesso.

✓ I client non comunicano direttamente tra loro.

✓ Tutte le modifiche transitano attraverso i servizi backend.

✓ Ogni client visualizza sempre lo stato più aggiornato del Fascicolo.

✓ Nuovi client potranno essere integrati senza modificare il modello di sincronizzazione.

✓ La coerenza del Fascicolo prevale sempre sulla sincronizzazione tra dispositivi.

# 7. Gestione dello Stato e della Cache

## Problema da risolvere

Mandari deve garantire tempi di risposta rapidi anche in presenza di un numero elevato di utenti, Atti e interrogazioni.

Interrogare continuamente il database, lo storage o il motore di indicizzazione per ogni operazione comporterebbe un carico eccessivo sul sistema e un peggioramento dell'esperienza utente.

È quindi necessario definire una strategia per la gestione dello stato dell'applicazione e per l'utilizzo della cache.

---

## Principio Architetturale

Lo stato permanente dell'applicazione risiede esclusivamente nei sistemi di persistenza.

La cache rappresenta una copia temporanea di alcune informazioni utilizzata esclusivamente per migliorare le prestazioni.

La cache non costituisce mai la fonte ufficiale dei dati.

---

## Stato del sistema

Mandari distingue chiaramente due tipologie di stato:

- **stato persistente**, conservato nel database e negli altri sistemi di persistenza;
- **stato temporaneo**, mantenuto in memoria per velocizzare le operazioni.

Lo stato persistente rappresenta sempre la fonte autorevole.

---

## Utilizzo della cache

La cache può essere utilizzata per memorizzare temporaneamente informazioni frequentemente richieste, ad esempio:

- dati del profilo utente;
- configurazioni;
- risultati di interrogazioni ripetitive;
- metadati di Atti recentemente consultati;
- informazioni necessarie all'interfaccia utente.

L'utilizzo della cache deve essere trasparente per il resto dell'applicazione.

---

## Aggiornamento della cache

Ogni modifica ai dati persistenti deve comportare l'aggiornamento o l'invalidazione delle relative informazioni presenti nella cache.

In questo modo si evita che il sistema restituisca dati non aggiornati.

---

## Gestione lato client

App e WebApp possono mantenere una cache locale per migliorare la fluidità dell'interfaccia.

Tale cache deve contenere esclusivamente informazioni temporanee.

In caso di conflitto, prevalgono sempre i dati restituiti dal backend.

---

## Recupero dopo un riavvio

La perdita della cache non deve compromettere il funzionamento del sistema.

In caso di riavvio del backend, dell'App o della WebApp, tutte le informazioni necessarie devono poter essere ricostruite utilizzando i dati persistenti.

La cache rappresenta quindi un'ottimizzazione e non un requisito funzionale.

---

## Motivazioni della scelta

Questa architettura consente di:

- ridurre il numero di interrogazioni al database;
- diminuire il carico sul backend;
- migliorare i tempi di risposta;
- mantenere la coerenza dei dati;
- garantire il corretto funzionamento anche in caso di svuotamento della cache.

---

## Decisioni Congelate

✓ Lo stato persistente rappresenta sempre la fonte ufficiale dei dati.

✓ La cache contiene esclusivamente copie temporanee delle informazioni.

✓ La perdita della cache non comporta perdita di dati.

✓ Ogni modifica ai dati persistenti deve aggiornare o invalidare la cache.

✓ App e WebApp possono utilizzare una cache locale esclusivamente per migliorare le prestazioni.

✓ In caso di conflitto prevalgono sempre i dati del backend.

# 8. Scalabilità e Prestazioni

## Problema da risolvere

Mandari dovrà essere in grado di gestire una crescita progressiva del numero di utenti, degli Atti, delle interrogazioni e delle integrazioni senza compromettere le prestazioni del sistema.

L'architettura deve quindi poter aumentare la propria capacità operativa senza richiedere modifiche sostanziali al software.

---

## Principio Architetturale

Ogni componente dell'architettura deve poter essere scalato in modo indipendente.

Database, backend, motore di indicizzazione, storage e servizi specializzati devono poter aumentare le proprie risorse senza influenzare il funzionamento degli altri componenti.

---

## Scalabilità orizzontale

Quando possibile, Mandari privilegia la scalabilità orizzontale.

Questo significa che, in caso di aumento del carico, sarà possibile aggiungere nuove istanze di uno stesso servizio invece di sostituire l'infrastruttura esistente con macchine più potenti.

Questa scelta migliora la disponibilità del sistema e riduce il rischio di interruzioni.

---

## Separazione dei carichi

Le attività con caratteristiche differenti devono essere gestite da componenti differenti.

Ad esempio:

- il backend gestisce le richieste dei client;
- il database gestisce i dati strutturati;
- lo storage gestisce i file;
- il motore di indicizzazione gestisce le ricerche;
- i motori funzionali eseguono le elaborazioni specialistiche.

Questa separazione evita che un componente venga sovraccaricato da attività che non gli competono.

---

## Elaborazioni asincrone

Le operazioni che non richiedono una risposta immediata al cittadino devono essere eseguite in modo asincrono.

Ad esempio:

- analisi di documenti;
- generazione degli indici;
- notifiche;
- aggiornamento di statistiche;
- attività di manutenzione.

Questo permette di mantenere l'interfaccia utente reattiva anche durante elaborazioni complesse.

---

## Monitoraggio delle prestazioni

Il sistema dovrà raccogliere informazioni sul proprio funzionamento.

Tra gli indicatori da monitorare:

- tempi di risposta;
- utilizzo delle risorse;
- errori;
- disponibilità dei servizi;
- tempi di elaborazione.

Il monitoraggio consentirà di individuare tempestivamente eventuali criticità.

---

## Crescita senza riprogettazione

L'aumento del numero di utenti o dei dati non deve comportare una revisione dell'architettura.

L'obiettivo è consentire una crescita progressiva intervenendo esclusivamente sui componenti interessati.

---

## Motivazioni della scelta

Questa architettura consente di:

- supportare un numero crescente di utenti;
- mantenere elevate prestazioni;
- ridurre i tempi di risposta;
- limitare i punti di congestione;
- semplificare gli interventi di manutenzione;
- contenere i costi, aumentando le risorse solo dove necessario.

---

## Decisioni Congelate

✓ Ogni componente deve poter scalare indipendentemente dagli altri.

✓ Mandari privilegia la scalabilità orizzontale quando tecnicamente possibile.

✓ Le attività vengono distribuite tra componenti specializzati.

✓ Le elaborazioni non critiche vengono eseguite in modo asincrono.

✓ Le prestazioni del sistema devono essere costantemente monitorate.

✓ La crescita dell'ecosistema non deve richiedere la riprogettazione dell'architettura.

# 9. Principi Architetturali dell'Infrastruttura

## Problema da risolvere

L'infrastruttura di Mandari dovrà evolvere nel tempo.

Potranno cambiare:

- tecnologie;
- provider cloud;
- linguaggi di sviluppo;
- database;
- sistemi di storage;
- servizi di intelligenza artificiale.

È quindi necessario definire principi architetturali stabili che rimangano validi indipendentemente dalle scelte implementative.

---

## Principio Architetturale

L'infrastruttura deve essere progettata affinché ogni componente possa evolvere senza compromettere il funzionamento complessivo del sistema.

Le dipendenze tra i componenti devono essere ridotte al minimo indispensabile.

---

## Modularità

Ogni componente svolge una funzione ben definita.

Le responsabilità non devono sovrapporsi.

Ogni modulo deve poter essere sviluppato, testato e aggiornato in maniera indipendente.

---

## Basso accoppiamento

I componenti devono conoscere il meno possibile del funzionamento interno degli altri componenti.

Ogni comunicazione deve avvenire attraverso interfacce pubbliche chiaramente definite.

In questo modo è possibile sostituire un componente senza modificare tutti gli altri.

---

## Alta coesione

Ogni componente deve contenere esclusivamente funzionalità appartenenti al proprio dominio di responsabilità.

Una funzione non deve essere distribuita su più componenti senza una reale necessità.

Questo rende il sistema più semplice da comprendere e mantenere.

---

## Interfacce stabili

Le modalità di comunicazione tra i componenti devono rimanere il più possibile stabili nel tempo.

L'evoluzione interna di un componente non deve richiedere modifiche ai client che lo utilizzano.

---

## Separazione tra logica e infrastruttura

Le regole di business di Mandari devono essere indipendenti dalle tecnologie utilizzate.

La sostituzione di un database, di uno storage o di un provider cloud non deve modificare il comportamento funzionale dell'applicazione.

---

## Osservabilità

L'infrastruttura deve consentire il monitoraggio continuo del proprio stato.

Devono essere disponibili strumenti per:

- registrare errori;
- monitorare le prestazioni;
- analizzare i log;
- verificare la disponibilità dei servizi;
- individuare rapidamente eventuali anomalie.

---

## Sicurezza come principio trasversale

Ogni componente deve essere progettato considerando la sicurezza fin dall'inizio.

Autenticazione, autorizzazione, protezione dei dati e tracciabilità delle operazioni non rappresentano funzionalità aggiuntive, ma requisiti strutturali dell'intera architettura.

---

## Motivazioni della scelta

Questi principi consentono di:

- facilitare la manutenzione;
- ridurre il rischio di regressioni;
- semplificare l'evoluzione tecnologica;
- migliorare la qualità del software;
- aumentare l'affidabilità del sistema;
- ridurre la dipendenza da specifiche tecnologie.

---

## Decisioni Congelate

✓ L'architettura di Mandari deve essere modulare.

✓ I componenti devono mantenere un basso accoppiamento.

✓ Ogni componente deve avere un'elevata coesione interna.

✓ Le interfacce tra i componenti devono essere stabili.

✓ La logica applicativa deve essere indipendente dall'infrastruttura.

✓ L'infrastruttura deve essere progettata per essere osservabile.

✓ La sicurezza rappresenta un requisito trasversale dell'intero sistema.

# 10. Decisioni Congelate

## Scopo del capitolo

Questo capitolo raccoglie tutte le decisioni architetturali definite nel PRD-008.

Le decisioni qui riportate sono considerate approvate e rappresentano i principi di riferimento per la progettazione dei successivi PRD e per lo sviluppo dell'applicazione.

Ogni futura modifica dovrà essere motivata e documentata.

---

# Architettura Generale

✓ Mandari sarà sviluppata come App mobile e WebApp.

✓ App e WebApp utilizzeranno lo stesso account utente e accederanno allo stesso Fascicolo Amministrativo.

✓ Il backend rappresenta il punto centrale di accesso ai dati e ai servizi.

---

# Persistenza

✓ Il Fascicolo Amministrativo è un'entità logica e non coincide con il database.

✓ Il database conserva esclusivamente dati strutturati.

✓ Gli allegati vengono conservati in un sistema di storage dedicato.

✓ Database e storage sono componenti distinti.

✓ Ogni informazione viene memorizzata una sola volta.

---

# Atti e Allegati

✓ Ogni Atto rappresenta un evento amministrativo.

✓ Gli allegati costituiscono evidenze collegate agli Atti.

✓ Gli allegati sono immutabili.

✓ Ogni allegato possiede un identificatore univoco e permanente.

✓ L'Atto mantiene esclusivamente il riferimento all'allegato.

---

# Indicizzazione

✓ Ogni nuovo Atto genera automaticamente gli indici necessari alla ricerca.

✓ Il motore di indicizzazione conserva esclusivamente gli indici.

✓ Gli Atti non vengono duplicati nel sistema di ricerca.

✓ La ricerca restituisce gli Atti candidati, mentre l'elaborazione della risposta rimane responsabilità dell'Orchestratore e dei motori funzionali.

---

# Sincronizzazione

✓ Esiste un solo Fascicolo Amministrativo per ogni cittadino.

✓ App e WebApp non comunicano direttamente tra loro.

✓ Tutte le modifiche transitano attraverso il backend.

✓ Tutti i client visualizzano sempre lo stesso stato del Fascicolo.

---

# Cache

✓ Lo stato persistente rappresenta sempre la fonte ufficiale dei dati.

✓ La cache contiene esclusivamente copie temporanee delle informazioni.

✓ La perdita della cache non comporta perdita di dati.

✓ La cache deve essere aggiornata o invalidata quando cambiano i dati persistenti.

---

# Scalabilità

✓ Ogni componente deve poter scalare indipendentemente.

✓ L'architettura privilegia la scalabilità orizzontale.

✓ Le elaborazioni non critiche vengono eseguite in modalità asincrona.

✓ Le prestazioni del sistema devono essere monitorate costantemente.

---

# Principi Architetturali

✓ L'architettura è modulare.

✓ I componenti devono mantenere basso accoppiamento ed elevata coesione.

✓ Le interfacce devono essere stabili.

✓ La logica applicativa deve rimanere indipendente dall'infrastruttura.

✓ La sicurezza rappresenta un requisito trasversale dell'intero sistema.

---

# Stato del Documento

Con la chiusura del PRD-008 vengono congelati i principi fondamentali relativi alla persistenza dei dati, all'organizzazione dell'infrastruttura e ai criteri architetturali generali di Mandari.

I successivi PRD potranno fare riferimento a queste decisioni senza ridefinirle, concentrandosi esclusivamente sui rispettivi ambiti funzionali e tecnici.
