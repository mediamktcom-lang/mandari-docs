# PRD-006
# Architettura Tecnica di Mandari

Versione: 1.0

Stato: FROZEN

Dipendenze:
- PRD-001 Visione del Prodotto
- PRD-002 Modello del Cittadino e Fascicolo Amministrativo
- PRD-003 Esperienza Utente
- PRD-004 Motori Funzionali
- PRD-005 Orchestratore Decisionale

---

## Obiettivo del documento

Il presente documento descrive l'architettura tecnica di Mandari.

Mandari nasce come un'applicazione personale destinata ad assistere il cittadino nella gestione della propria vita amministrativa.

L'applicazione sarà disponibile sia come App per smartphone sia come WebApp accessibile tramite browser.

Entrambe le modalità di accesso condividono lo stesso account, lo stesso Fascicolo Amministrativo e la stessa esperienza utente.

L'obiettivo è consentire al cittadino di accedere al proprio assistente digitale in qualsiasi momento e da qualsiasi dispositivo, senza differenze funzionali tra App e WebApp.

Questo documento definisce l'architettura logica che rende possibile tale esperienza.

# 1. Visione Architetturale

## Missione

Mandari è un'applicazione personale progettata per accompagnare il cittadino nella gestione della propria vita amministrativa.

L'utente può utilizzare Mandari attraverso l'App mobile oppure tramite la WebApp.

Indipendentemente dal dispositivo utilizzato, Mandari rappresenta sempre lo stesso assistente digitale, con lo stesso Fascicolo Amministrativo, lo stesso Orchestratore e le stesse funzionalità.

L'esperienza d'uso deve essere continua, coerente e indipendente dal canale di accesso.

---

## Obiettivo

L'architettura tecnica ha lo scopo di garantire che ogni cittadino possa accedere al proprio assistente digitale in qualsiasi momento, da qualsiasi dispositivo e con la certezza di ritrovare sempre il proprio stato, la propria cronologia e il proprio Fascicolo.

La separazione tra App e WebApp riguarda esclusivamente il canale di accesso.

L'intelligenza del sistema risiede nei servizi centrali condivisi.

---

## Un solo Mandari

App e WebApp non rappresentano due prodotti differenti.

Sono due interfacce dello stesso sistema.

Ogni informazione, documento, analisi o aggiornamento è immediatamente disponibile su entrambi i canali.

Il cittadino può iniziare un'attività da smartphone e proseguirla successivamente dalla WebApp senza alcuna interruzione.

---

## Principio di Continuità

Mandari deve accompagnare il cittadino e non il dispositivo.

L'identità del cittadino, il Fascicolo Amministrativo, il Contesto Decisionale e la Memoria Operativa appartengono all'account dell'utente e non al dispositivo utilizzato.

Qualunque dispositivo autorizzato rappresenta semplicemente un punto di accesso allo stesso assistente digitale.

---

## Decisioni Congelate

✓ Mandari nasce come applicazione personale.

✓ Mandari sarà disponibile come App e WebApp.

✓ App e WebApp condividono lo stesso account e gli stessi dati.

✓ L'esperienza utente deve essere continua e indipendente dal dispositivo.

✓ Il Fascicolo Amministrativo appartiene all'utente e non al dispositivo.

# 2. Architettura Logica del Sistema

## Missione

L'architettura logica di Mandari definisce i principali servizi che compongono il sistema e le rispettive responsabilità.

Ogni servizio è progettato per svolgere una funzione specifica e collaborare con gli altri attraverso l'Orchestratore, mantenendo una chiara separazione delle responsabilità.

L'obiettivo è costruire un sistema semplice da comprendere, facilmente evolvibile e indipendente dalle tecnologie utilizzate per l'implementazione.

---

## Obiettivo

Definire i macro-servizi che costituiscono Mandari e il ruolo di ciascuno all'interno dell'architettura complessiva.

Ogni evoluzione futura dovrà inserirsi all'interno di questa struttura senza alterarne i principi fondamentali.

---

## Visione Generale

Mandari è composto da un insieme di servizi cooperanti.

Ogni servizio possiede una responsabilità esclusiva.

Nessun servizio contiene l'intera logica applicativa.

L'intelligenza del sistema nasce dalla collaborazione tra i servizi coordinati dall'Orchestratore.

---

## Macro-servizi

L'architettura di Mandari è composta dai seguenti macro-servizi.

### Client

Rappresenta i punti di accesso del cittadino.

Comprende:

- App mobile;
- WebApp.

I client raccolgono gli input dell'utente e presentano le risposte elaborate dal sistema.

Non contengono logiche decisionali.

---

### Gateway Applicativo

Costituisce il punto di ingresso di tutte le richieste.

Si occupa di:

- autenticazione;
- autorizzazione;
- validazione delle richieste;
- instradamento verso i servizi interni.

---

### Orchestratore

Rappresenta il centro decisionale del sistema.

Riceve le richieste dal Gateway, costruisce il contesto decisionale, individua bisogni e obiettivi, coordina i motori e compone la risposta finale.

---

### Motori Specialistici

Implementano le competenze funzionali di Mandari.

Attualmente comprendono:

- SPETTA;
- DATA;
- CARTA;
- AFFIDO.

Ogni motore opera esclusivamente nel proprio dominio di competenza.

---

### Fascicolo Amministrativo

Rappresenta la conoscenza permanente del cittadino.

Costituisce la principale fonte informativa utilizzata dall'Orchestratore.

---

### Servizi Condivisi

Comprendono tutte le funzionalità comuni necessarie al funzionamento del sistema.

Ad esempio:

- autenticazione;
- notifiche;
- gestione documentale;
- OCR;
- logging;
- monitoraggio;
- configurazione.

Questi servizi non partecipano direttamente al processo decisionale.

---

## Relazioni tra i servizi

L'architettura segue una struttura gerarchica.

Il cittadino comunica esclusivamente con i Client.

I Client comunicano con il Gateway.

Il Gateway inoltra le richieste all'Orchestratore.

L'Orchestratore coordina i Motori Specialistici.

I Motori consultano il Fascicolo e i Servizi Condivisi quando necessario.

Le risposte seguono il percorso inverso fino al cittadino.

---

## Principi Architetturali

L'architettura logica di Mandari rispetta i seguenti principi.

- responsabilità unica;
- separazione dei ruoli;
- coordinamento centralizzato;
- indipendenza dei servizi;
- modularità;
- evoluzione incrementale.

---

## Decisioni Congelate

✓ Mandari è composto da servizi indipendenti.

✓ Il Gateway rappresenta l'unico punto di ingresso al sistema.

✓ L'Orchestratore costituisce il centro decisionale.

✓ I Motori implementano esclusivamente competenze specialistiche.

✓ Il Fascicolo Amministrativo rappresenta la fonte permanente della conoscenza.

✓ I Servizi Condivisi forniscono funzionalità trasversali senza partecipare al processo decisionale.

# 3. Comunicazione tra i Servizi

## Missione

L'architettura di Mandari si basa sulla collaborazione tra servizi indipendenti.

Ogni servizio svolge una responsabilità specifica e comunica con gli altri esclusivamente attraverso interfacce definite.

La comunicazione costituisce il meccanismo che consente ai servizi di cooperare senza creare dipendenze dirette tra le rispettive implementazioni.

---

## Obiettivo

Garantire una comunicazione semplice, controllata, osservabile ed evolutiva tra tutti i servizi dell'applicazione.

Ogni nuovo servizio dovrà poter essere integrato senza modificare il comportamento degli altri componenti del sistema.

---

## Principio di Comunicazione

Nessun servizio comunica direttamente con il cittadino.

L'unico punto di ingresso dell'applicazione è rappresentato dai Client (App e WebApp), attraverso il Gateway Applicativo.

All'interno del sistema, ogni comunicazione segue un percorso controllato e tracciabile.

---

## Comunicazione Sincrona

La comunicazione sincrona viene utilizzata quando il servizio chiamante necessita di una risposta immediata per poter proseguire l'elaborazione.

È tipicamente impiegata per:

- autenticazione;
- recupero di informazioni;
- interrogazioni del Fascicolo Amministrativo;
- richieste dell'Orchestratore ai Motori;
- restituzione della risposta al cittadino.

La comunicazione sincrona privilegia velocità e semplicità.

---

## Comunicazione Asincrona

Quando una richiesta non richiede una risposta immediata, Mandari privilegia un modello asincrono.

Esempi:

- invio di notifiche;
- aggiornamento di indici;
- elaborazioni documentali lunghe;
- analisi massive;
- sincronizzazioni;
- attività pianificate.

Il cittadino non deve attendere il completamento di tali operazioni.

---

## Eventi

Ogni cambiamento significativo all'interno del sistema genera un evento.

Un evento rappresenta un fatto già avvenuto.

Ad esempio:

- Documento caricato.
- Fascicolo aggiornato.
- Nuova scadenza individuata.
- Analisi completata.
- Promemoria creato.
- Profilo aggiornato.

Gli eventi possono essere utilizzati da altri servizi per avviare nuove elaborazioni senza creare dipendenze dirette.

---

## Contratti di Comunicazione

Ogni servizio espone esclusivamente interfacce pubbliche documentate.

Le implementazioni interne rimangono private.

Questo principio consente di evolvere i singoli servizi senza modificare il comportamento degli altri componenti.

---

## Osservabilità

Ogni comunicazione deve poter essere:

- identificata;
- tracciata;
- monitorata;
- registrata.

L'obiettivo è rendere ogni flusso ricostruibile in caso di errore, manutenzione o attività di audit.

---

## Principi Architetturali

La comunicazione tra i servizi deve rispettare i seguenti principi.

- basso accoppiamento;
- alta coesione;
- interfacce stabili;
- comunicazioni osservabili;
- evoluzione indipendente dei servizi;
- nessuna conoscenza delle implementazioni interne.

---

## Decisioni Congelate

✓ Ogni servizio comunica esclusivamente tramite interfacce definite.

✓ La comunicazione può essere sincrona o asincrona in funzione delle esigenze operative.

✓ Gli eventi rappresentano il principale meccanismo di collaborazione tra servizi indipendenti.

✓ Ogni comunicazione deve essere tracciabile.

✓ Nessun servizio dipende dall'implementazione interna di un altro servizio.

# 4. Ciclo di Vita di una Richiesta

## Missione

Ogni interazione del cittadino con Mandari genera una richiesta che attraversa una sequenza di elaborazioni ben definite.

Il ciclo di vita della richiesta descrive il percorso completo seguito da un'informazione dal momento in cui viene generata fino alla restituzione della risposta al cittadino.

L'obiettivo è garantire uniformità, tracciabilità e prevedibilità del comportamento dell'intero sistema.

---

## Obiettivo

Definire il flusso logico seguito da ogni richiesta, indipendentemente dalla sua origine o dalla sua complessità.

Ogni richiesta deve seguire lo stesso percorso architetturale, variando esclusivamente le elaborazioni effettuate durante il processo.

---

## Origine della richiesta

Una richiesta può essere generata da diversi eventi.

Ad esempio:

- invio di una domanda;
- caricamento di un documento;
- acquisizione di una fotografia;
- risposta ad un questionario;
- caricamento dell'ISEE;
- apertura di una funzione dell'applicazione;
- evento interno generato dal sistema.

Qualunque sia la sua origine, tutte le richieste vengono gestite nello stesso modo.

---

## Acquisizione

La richiesta viene ricevuta dal Gateway Applicativo.

Il Gateway:

- autentica l'utente;
- verifica le autorizzazioni;
- valida la richiesta;
- assegna un identificativo univoco;
- inoltra la richiesta all'Orchestratore.

Da questo momento ogni elaborazione risulta tracciabile.

---

## Elaborazione

L'Orchestratore avvia il processo decisionale definito nel PRD-005.

In particolare:

- interpreta la richiesta;
- individua il bisogno del cittadino;
- costruisce il Contesto Decisionale;
- definisce gli obiettivi;
- identifica le capacità necessarie;
- coordina i motori specialistici.

L'Orchestratore mantiene il controllo dell'intero flusso fino al completamento della richiesta.

---

## Produzione dei risultati

Ogni motore restituisce esclusivamente il risultato della propria elaborazione.

I risultati vengono inviati all'Orchestratore.

I motori non costruiscono mai la risposta finale.

---

## Composizione della risposta

L'Orchestratore integra tutti i risultati ottenuti.

Verifica eventuali incoerenze.

Ordina le informazioni.

Elimina duplicazioni.

Costruisce un'unica risposta coerente con il contesto del cittadino.

---

## Restituzione

La risposta viene inviata al Gateway.

Il Gateway la restituisce al Client che l'ha originata.

Il Client si limita a rappresentare le informazioni ricevute, senza modificarne il contenuto o il significato.

---

## Tracciabilità

Durante tutto il ciclo di vita vengono registrati:

- identificativo della richiesta;
- servizi coinvolti;
- eventi generati;
- eventuali errori;
- tempi di elaborazione.

Queste informazioni consentono attività di monitoraggio, diagnostica e audit.

---

## Principi Architetturali

Il ciclo di vita di una richiesta deve rispettare i seguenti principi.

- un solo punto di ingresso;
- un solo coordinatore;
- elaborazioni indipendenti;
- una sola risposta finale;
- completa tracciabilità del processo.

---

## Decisioni Congelate

✓ Ogni richiesta segue un ciclo di vita unico.

✓ Tutte le richieste attraversano Gateway e Orchestratore.

✓ I motori producono risultati, non risposte.

✓ L'Orchestratore costruisce sempre la risposta finale.

✓ Ogni fase del processo deve essere tracciabile.

# 5. Modello della Persistenza e della Conoscenza

## Missione

Mandari gestisce informazioni di natura differente, ciascuna con un proprio ciclo di vita, un proprio livello di permanenza e una propria responsabilità.

L'architettura distingue chiaramente la conoscenza permanente del cittadino dalle informazioni temporanee generate durante l'elaborazione delle richieste.

Questa separazione garantisce coerenza, tracciabilità ed evoluzione del sistema.

---

## Obiettivo

Definire il modello logico con cui Mandari organizza, conserva e utilizza le informazioni necessarie al proprio funzionamento.

Ogni tipologia di dato deve possedere una responsabilità precisa e non sovrapporsi alle altre.

---

## Le quattro aree della conoscenza

La conoscenza di Mandari è organizzata in quattro aree principali.

### 1. Fascicolo Amministrativo

Il Fascicolo Amministrativo rappresenta la memoria permanente del cittadino.

Contiene tutte le informazioni che descrivono in modo stabile la situazione amministrativa dell'utente.

Ad esempio:

- dati anagrafici;
- composizione del nucleo familiare;
- documenti;
- eventi amministrativi;
- storico delle variazioni;
- preferenze dell'utente;
- informazioni validate.

Il Fascicolo costituisce la principale fonte di conoscenza del sistema.

---

### 2. Memoria Operativa

La Memoria Operativa contiene esclusivamente le informazioni necessarie all'elaborazione della richiesta corrente.

Ha carattere temporaneo.

Può contenere:

- contesto decisionale;
- risultati intermedi;
- informazioni estratte dai motori;
- stato della richiesta;
- dati di lavoro.

Al termine dell'elaborazione viene aggiornata o liberata secondo le regole definite dall'Orchestratore.

---

### 3. Base di Conoscenza

La Base di Conoscenza raccoglie informazioni non appartenenti al singolo cittadino ma utilizzate da tutto il sistema.

Ad esempio:

- normativa;
- bonus;
- agevolazioni;
- procedure amministrative;
- documentazione ufficiale;
- regole interpretative;
- contenuti informativi.

Questa base evolve indipendentemente dal Fascicolo del cittadino.

---

### 4. Configurazione di Sistema

Comprende tutte le informazioni necessarie al funzionamento tecnico dell'applicazione.

Ad esempio:

- configurazioni;
- parametri;
- modelli;
- versioni;
- regole operative;
- configurazioni dei servizi.

Queste informazioni non fanno parte della conoscenza del cittadino.

---

## Separazione delle responsabilità

Ogni area della conoscenza ha una responsabilità esclusiva.

Nessuna informazione deve essere duplicata senza una motivazione architetturale.

L'Orchestratore utilizza contemporaneamente più aree della conoscenza per costruire il contesto decisionale, ma non ne altera le responsabilità.

---

## Evoluzione della conoscenza

Le quattro aree evolvono in modo indipendente.

Un aggiornamento della Base di Conoscenza non modifica automaticamente il Fascicolo del cittadino.

Allo stesso modo, un cambiamento nel Fascicolo non altera la Base di Conoscenza.

L'Orchestratore è responsabile di integrare le informazioni provenienti dalle diverse aree quando necessario.

---

## Principi Architetturali

La gestione della conoscenza deve rispettare i seguenti principi.

- una responsabilità per ogni area;
- separazione tra dati permanenti e temporanei;
- conoscenza condivisa separata dalla conoscenza personale;
- assenza di duplicazioni non necessarie;
- evoluzione indipendente delle diverse aree.

---

## Decisioni Congelate

✓ Il Fascicolo Amministrativo rappresenta la memoria permanente del cittadino.

✓ La Memoria Operativa esiste esclusivamente durante l'elaborazione delle richieste.

✓ La Base di Conoscenza contiene esclusivamente informazioni condivise dall'intero sistema.

✓ La Configurazione di Sistema è separata dalla conoscenza del cittadino.

✓ L'Orchestratore integra le diverse aree della conoscenza senza modificarne le responsabilità.

# 6. Estensibilità dell'Architettura

## Missione

Mandari è progettato per evolvere nel tempo.

L'architettura deve consentire l'introduzione di nuove funzionalità, nuovi motori, nuovi servizi e nuovi domini amministrativi senza richiedere modifiche sostanziali ai componenti già esistenti.

L'evoluzione rappresenta un requisito architetturale e non una conseguenza dello sviluppo futuro.

---

## Obiettivo

Garantire che ogni nuova funzionalità possa essere integrata rispettando i principi definiti nei PRD precedenti.

L'espansione del sistema deve avvenire per aggiunta di capacità e non mediante modifica delle responsabilità esistenti.

---

## Estensione dei Motori

Nuovi motori specialistici possono essere introdotti in qualsiasi momento.

Ogni nuovo motore dovrà:

- possedere una responsabilità ben definita;
- implementare capacità specifiche;
- rispettare i contratti di comunicazione;
- essere coordinato esclusivamente dall'Orchestratore.

L'introduzione di un nuovo motore non deve modificare il comportamento dei motori già esistenti.

---

## Estensione dei Servizi

Anche i servizi condivisi possono evolvere.

Nuovi servizi possono essere aggiunti per soddisfare esigenze tecniche o funzionali senza alterare l'architettura complessiva.

Ogni servizio deve mantenere una responsabilità unica e un'interfaccia pubblica stabile.

---

## Evoluzione del Fascicolo

Il Fascicolo Amministrativo è progettato per accogliere nuove tipologie di informazioni.

L'aggiunta di nuove sezioni, documenti o categorie informative non deve compromettere la struttura esistente.

Il Fascicolo cresce insieme alla vita amministrativa del cittadino.

---

## Evoluzione delle Capacità

Le capacità rappresentano il livello di astrazione tra gli obiettivi individuati dall'Orchestratore e le implementazioni dei motori.

Nuove capacità possono essere introdotte senza modificare il processo decisionale definito nel PRD-005.

L'Orchestratore continua a ragionare per bisogni, obiettivi e capacità, indipendentemente dal numero di motori disponibili.

---

## Compatibilità Evolutiva

Ogni evoluzione del sistema deve preservare la compatibilità con le funzionalità già esistenti.

L'introduzione di nuove componenti non deve modificare il comportamento delle richieste già supportate.

Questo principio garantisce continuità per il cittadino e stabilità per l'intero ecosistema di Mandari.

---

## Principi Architetturali

L'estensione dell'architettura si basa sui seguenti principi.

- evoluzione incrementale;
- aggiunta di capacità anziché modifica delle responsabilità;
- basso accoppiamento;
- compatibilità con il passato;
- modularità;
- indipendenza dei servizi.

---

## Decisioni Congelate

✓ Mandari è progettato per evolvere senza modificare la propria architettura fondamentale.

✓ Nuovi motori possono essere aggiunti senza alterare quelli esistenti.

✓ Le capacità costituiscono il principale punto di estensione del sistema.

✓ Il Fascicolo Amministrativo può evolvere mantenendo la compatibilità con le informazioni già presenti.

✓ Ogni nuova funzionalità deve rispettare i principi architetturali definiti nei PRD precedenti.

# 7. Osservabilità e Tracciabilità

## Missione

Mandari deve essere un sistema completamente osservabile.

Ogni richiesta, evento, elaborazione e risposta deve poter essere monitorata, ricostruita e analizzata durante l'intero ciclo di vita.

L'osservabilità rappresenta un requisito architetturale fondamentale per garantire affidabilità, qualità del servizio e miglioramento continuo.

---

## Obiettivo

Consentire agli sviluppatori, agli amministratori di sistema e ai servizi di monitoraggio di comprendere in qualsiasi momento:

- cosa è accaduto;
- quando è accaduto;
- quali servizi sono stati coinvolti;
- quale risultato è stato prodotto;
- perché è stata presa una determinata decisione.

---

## Tracciabilità delle Richieste

Ogni richiesta deve essere identificata in modo univoco.

L'identificativo accompagna la richiesta durante tutto il suo percorso all'interno dell'applicazione.

Ogni servizio coinvolto utilizza lo stesso identificativo per registrare la propria attività.

Questo consente di ricostruire integralmente il flusso di elaborazione.

---

## Tracciabilità delle Decisioni

L'Orchestratore registra le principali decisioni assunte durante il processo di elaborazione.

Ad esempio:

- bisogni individuati;
- obiettivi definiti;
- capacità selezionate;
- motori coinvolti;
- eventuali richieste di informazioni aggiuntive.

L'obiettivo non è registrare ogni dettaglio interno, ma rendere comprensibile il percorso decisionale.

---

## Monitoraggio dei Servizi

Ogni servizio rende disponibili informazioni sul proprio stato operativo.

Tra queste:

- disponibilità;
- tempi medi di risposta;
- errori;
- elaborazioni completate;
- richieste in corso.

Queste informazioni consentono di individuare rapidamente anomalie e degradi prestazionali.

---

## Gestione degli Errori

Gli errori devono essere registrati, classificati e correlati alla richiesta che li ha generati.

Il sistema deve distinguere tra:

- errori tecnici;
- errori applicativi;
- dati insufficienti;
- eventi inattesi.

Questa classificazione facilita la diagnosi e la risoluzione dei problemi.

---

## Audit

Le operazioni rilevanti devono poter essere ricostruite anche a posteriori.

L'audit ha lo scopo di garantire trasparenza, verificabilità e conformità alle normative applicabili.

Le informazioni di audit devono essere conservate separatamente dai dati operativi dell'applicazione.

---

## Principi Architetturali

L'osservabilità di Mandari si basa sui seguenti principi.

- ogni richiesta è identificabile;
- ogni decisione è ricostruibile;
- ogni servizio è monitorabile;
- ogni errore è classificabile;
- ogni operazione rilevante è verificabile.

---

## Decisioni Congelate

✓ Ogni richiesta possiede un identificativo univoco.

✓ Le decisioni principali dell'Orchestratore devono essere tracciabili.

✓ Tutti i servizi devono esporre informazioni utili al monitoraggio.

✓ Gli errori devono essere registrati e classificati.

✓ Le informazioni di audit sono separate dai dati operativi.

# 8. Governance dell'Evoluzione

## Missione

Mandari è un sistema in continua evoluzione.

Nuove funzionalità, nuovi motori, aggiornamenti normativi, miglioramenti dell'Orchestratore e nuove fonti informative verranno introdotti durante l'intero ciclo di vita del prodotto.

L'architettura deve garantire che tale evoluzione avvenga in modo controllato, prevedibile e compatibile con i principi definiti nei PRD precedenti.

---

## Obiettivo

Definire le regole attraverso cui il sistema può evolvere senza compromettere stabilità, coerenza e qualità del servizio.

Ogni modifica deve poter essere introdotta, verificata e, se necessario, annullata senza alterare il comportamento complessivo di Mandari.

---

## Evoluzione Incrementale

Ogni nuova funzionalità deve essere introdotta come estensione del sistema esistente.

L'evoluzione deve privilegiare l'aggiunta di nuove capacità rispetto alla modifica delle responsabilità già definite.

Questo principio riduce il rischio di regressioni e facilita la manutenzione del sistema.

---

## Versionamento

I principali elementi dell'architettura devono essere versionabili.

Tra questi:

- Orchestratore;
- Motori;
- Contratti di comunicazione;
- Modelli decisionali;
- Base di Conoscenza;
- Configurazioni operative.

Il versionamento consente di ricostruire il comportamento del sistema in un determinato momento storico.

---

## Compatibilità

Ogni nuova versione deve mantenere la compatibilità con le funzionalità già rilasciate, salvo modifiche esplicitamente pianificate.

L'introduzione di nuovi servizi o capacità non deve interrompere il funzionamento delle richieste esistenti.

---

## Verificabilità

Prima di essere resa disponibile ai cittadini, ogni evoluzione deve poter essere verificata.

Le modifiche devono essere sottoposte a controlli funzionali, tecnici e architetturali per garantire il rispetto dei principi definiti nei PRD.

---

## Reversibilità

Ogni modifica significativa deve poter essere annullata qualora produca effetti indesiderati.

La possibilità di ripristinare rapidamente una versione stabile rappresenta un requisito architetturale della piattaforma.

---

## Evoluzione Guidata

L'evoluzione di Mandari non è guidata esclusivamente dalla tecnologia.

Ogni cambiamento deve rispondere ad almeno uno dei seguenti obiettivi:

- migliorare l'esperienza del cittadino;
- aumentare la qualità delle decisioni;
- ampliare le capacità del sistema;
- semplificare l'architettura;
- migliorare affidabilità, sicurezza o prestazioni.

---

## Principi Architetturali

L'evoluzione dell'architettura deve rispettare i seguenti principi.

- continuità del servizio;
- compatibilità con il passato;
- modifiche incrementali;
- versionamento delle componenti principali;
- verificabilità delle modifiche;
- possibilità di ripristino.

---

## Decisioni Congelate

✓ Mandari evolve in modo incrementale.

✓ Le principali componenti del sistema devono essere versionabili.

✓ Ogni modifica deve essere verificabile prima del rilascio.

✓ Le evoluzioni devono preservare la compatibilità con il comportamento già consolidato.

✓ Ogni modifica significativa deve poter essere ripristinata.

# 9. Sicurezza e Protezione delle Informazioni

## Missione

Mandari gestisce informazioni amministrative personali di elevato valore e sensibilità.

L'architettura deve garantire che tali informazioni siano protette durante l'intero ciclo di vita: acquisizione, elaborazione, conservazione, consultazione e condivisione.

La sicurezza rappresenta un requisito trasversale dell'intero sistema e deve essere considerata fin dalla progettazione di ogni componente.

---

## Obiettivo

Definire i principi architetturali che garantiscono la protezione dei dati del cittadino e l'affidabilità complessiva dell'applicazione.

Ogni componente del sistema deve contribuire alla sicurezza senza demandarla esclusivamente ai servizi dedicati.

---

## Protezione del Cittadino

Ogni informazione appartenente al Fascicolo Amministrativo deve essere accessibile esclusivamente ai soggetti autorizzati.

Il cittadino mantiene sempre il controllo sulle proprie informazioni e sulle eventuali autorizzazioni concesse a terzi.

---

## Sicurezza per Progettazione

La sicurezza deve essere integrata nella progettazione dell'architettura e non aggiunta successivamente.

Ogni nuovo servizio, motore o funzionalità deve rispettare i principi di sicurezza definiti da questo documento.

---

## Minimo Privilegio

Ogni servizio deve poter accedere esclusivamente alle informazioni necessarie allo svolgimento della propria responsabilità.

L'accesso ai dati deve essere limitato al minimo indispensabile.

Questo principio riduce il rischio di accessi impropri e limita l'impatto di eventuali anomalie.

---

## Separazione delle Responsabilità

L'accesso ai dati, l'elaborazione delle informazioni e la gestione delle autorizzazioni devono rimanere responsabilità distinte.

Nessun componente deve concentrare competenze che appartengono ad altri livelli dell'architettura.

---

## Tracciabilità degli Accessi

Gli accessi alle informazioni rilevanti devono poter essere ricostruiti.

Il sistema deve essere in grado di identificare:

- chi ha effettuato un accesso;
- quando è avvenuto;
- quale informazione è stata consultata;
- per quale finalità applicativa.

---

## Continuità Operativa

L'architettura deve essere progettata per garantire la disponibilità del servizio anche in presenza di errori, guasti o manutenzioni.

La protezione dei dati comprende anche la capacità di preservarli e renderli disponibili quando necessario.

---

## Privacy

La gestione delle informazioni personali deve rispettare i principi di minimizzazione, proporzionalità e trasparenza.

Mandari utilizza esclusivamente le informazioni necessarie per fornire il servizio richiesto dal cittadino.

---

## Principi Architetturali

La sicurezza dell'applicazione si fonda sui seguenti principi.

- sicurezza per progettazione;
- minimo privilegio;
- separazione delle responsabilità;
- protezione dei dati;
- tracciabilità degli accessi;
- tutela della privacy;
- continuità operativa.

---

## Decisioni Congelate

✓ La sicurezza rappresenta un requisito architetturale dell'intero sistema.

✓ Ogni componente deve applicare il principio del minimo privilegio.

✓ Il cittadino mantiene il controllo delle proprie informazioni.

✓ Gli accessi ai dati devono essere tracciabili.

✓ La privacy costituisce un principio progettuale e non un requisito aggiuntivo.

✓ La protezione dei dati deve essere garantita durante tutto il loro ciclo di vita.

# 10. Principi Architetturali Permanenti

## Missione

Questo capitolo raccoglie i principi architetturali permanenti che definiscono la struttura tecnica di Mandari.

Essi rappresentano le regole fondamentali che dovranno guidare ogni futura evoluzione dell'applicazione, indipendentemente dalle tecnologie adottate o dalle modalità di implementazione.

Ogni decisione tecnica dovrà essere compatibile con i principi qui definiti.

---

## Principi Fondamentali

### 1. Un solo Mandari

Mandari costituisce un'unica applicazione accessibile attraverso App e WebApp.

Entrambi i canali condividono lo stesso account, il medesimo Fascicolo Amministrativo e le stesse capacità operative.

---

### 2. Separazione delle responsabilità

Ogni servizio possiede una responsabilità esclusiva.

Le responsabilità non devono sovrapporsi né duplicarsi.

L'evoluzione dell'applicazione avviene aggiungendo nuovi servizi o nuove capacità, senza modificare il ruolo dei servizi esistenti.

---

### 3. L'Orchestratore coordina

L'Orchestratore rappresenta il centro decisionale dell'applicazione.

Coordina il lavoro dei servizi e dei motori, ma non implementa direttamente le competenze specialistiche.

---

### 4. I motori implementano competenze

Ogni motore implementa esclusivamente il proprio dominio funzionale.

I motori non conoscono il funzionamento interno degli altri motori e non costruiscono mai la risposta finale destinata al cittadino.

---

### 5. Il Fascicolo rappresenta la memoria permanente

Il Fascicolo Amministrativo costituisce la fonte principale della conoscenza relativa al cittadino.

Le altre aree della conoscenza collaborano con il Fascicolo senza sostituirlo.

---

### 6. Evoluzione incrementale

Mandari cresce mediante l'aggiunta di nuove capacità, nuovi servizi e nuovi motori.

Le evoluzioni devono preservare la compatibilità con l'architettura esistente.

---

### 7. Basso accoppiamento

I servizi devono comunicare esclusivamente attraverso interfacce definite.

Ogni componente deve conoscere il minimo indispensabile degli altri componenti.

Questo principio favorisce indipendenza, manutenzione ed evoluzione del sistema.

---

### 8. Osservabilità

Ogni richiesta deve poter essere monitorata, tracciata e ricostruita.

L'architettura deve consentire di comprendere il comportamento del sistema in qualsiasi momento.

---

### 9. Sicurezza per progettazione

La sicurezza rappresenta un requisito trasversale dell'intera architettura.

Ogni nuovo servizio dovrà essere progettato secondo i principi di protezione dei dati, minimo privilegio e tracciabilità.

---

### 10. Centralità del cittadino

Ogni scelta architetturale deve perseguire un unico obiettivo:

migliorare la capacità di Mandari di assistere il cittadino nella gestione della propria vita amministrativa.

La tecnologia costituisce uno strumento.

Il cittadino rappresenta il fine ultimo del sistema.

---

## Sintesi Architetturale

L'architettura di Mandari può essere riassunta nel seguente modello logico.

```text
                CITTADINO
                     │
          App Mobile / WebApp
                     │
           Gateway Applicativo
                     │
             Orchestratore
                     │
        ┌──────┬──────┬──────┬──────┐
        │      │      │      │
      SPETTA  DATA  CARTA  AFFIDO
        │      │      │      │
        └──────┴──────┴──────┘
                     │
      Fascicolo • Base di Conoscenza
      Memoria Operativa • Servizi Condivisi
```

Questo modello rappresenta la struttura logica ufficiale dell'architettura di Mandari.

Ogni futura evoluzione dovrà rispettarne i principi fondamentali.

---

## Decisioni Congelate

✓ Mandari è un'unica applicazione accessibile da App e WebApp.

✓ L'Orchestratore rappresenta il centro decisionale dell'architettura.

✓ I motori implementano competenze specialistiche indipendenti.

✓ Il Fascicolo Amministrativo costituisce la memoria permanente del cittadino.

✓ L'architettura si basa su servizi indipendenti, basso accoppiamento e responsabilità uniche.

✓ L'evoluzione del sistema avviene mediante l'aggiunta di nuove capacità e nuovi servizi.

✓ Ogni richiesta deve essere osservabile e tracciabile.

✓ La sicurezza è un principio architetturale permanente.

✓ Il cittadino rappresenta il centro dell'intera architettura.




