PRD-004
Core Features

Versione.............1.0
Stato................Frozen
Ultima modifica......20/07/2026
Progetto.............Mandari
Documento............Ufficiale

# PRD-004

# Core Features

**Documento:** PRD-004

**Versione:** 1.0

**Stato:** FROZEN (progressivo)

**Progetto:** Mandari

**Autori:** Team Mandari

**Documento correlato:**
- PRD-001 - Vision
- PRD-002 - User Model
- PRD-003 - User Journey

---

## Scopo del documento

Il presente documento definisce le Core Features di Mandari e descrive il comportamento dei motori che costituiscono il nucleo funzionale del prodotto.

Ogni motore rappresenta uno specialista responsabile di uno specifico dominio della vita amministrativa del cittadino.

Il documento stabilisce le responsabilità, le interazioni, i principi di funzionamento e le modalità di collaborazione tra i motori, utilizzando il Fascicolo Amministrativo come unica fonte ufficiale delle informazioni.

Il presente documento costituisce la specifica funzionale di riferimento per lo sviluppo dei motori applicativi di Mandari.

---

# Capitoli

1. Scopo
2. Architettura Funzionale
3. SPETTA
4. DATA
5. CARTA
6. AFFIDO
7. Il Fascicolo Amministrativo
8. Collaborazione tra i Motori
9. Principi Architetturali
10. Decisioni Congelate

# 1. Scopo

## Obiettivo

Il presente documento definisce le Core Features di Mandari e descrive il funzionamento dei componenti funzionali che costituiscono il nucleo del prodotto.

Dopo aver definito:

- la Vision del progetto (PRD-001);
- il modello utente (PRD-002);
- il percorso dell'utente (PRD-003);

questo documento descrive come Mandari realizza operativamente le proprie funzionalità attraverso un insieme di motori specializzati che collaborano tra loro.

---

## Finalità del documento

Il PRD-004 rappresenta la specifica funzionale dei principali componenti di Mandari.

Per ogni motore verranno definite:

- la missione;
- le responsabilità;
- il problema che risolve;
- gli input utilizzati;
- il processo decisionale;
- gli output prodotti;
- le interazioni con gli altri motori;
- l'impatto sul Fascicolo Amministrativo;
- i limiti operativi;
- i principi di funzionamento.

Il documento costituisce il riferimento ufficiale per la progettazione, lo sviluppo e l'evoluzione dei motori applicativi.

---

## I motori di Mandari

Mandari è composto da quattro motori specializzati.

Ogni motore è responsabile di uno specifico dominio della vita amministrativa del cittadino.

I motori sono:

### SPETTA

Responsabile dell'individuazione di bonus, agevolazioni, diritti, esenzioni e opportunità amministrative.

### DATA

Responsabile della gestione delle scadenze, dei reminder e della pianificazione amministrativa.

### CARTA

Responsabile della comprensione, classificazione e spiegazione dei documenti amministrativi ricevuti dal cittadino.

### AFFIDO

Responsabile dell'individuazione delle migliori soluzioni ai bisogni dell'utente, attraverso professionisti, partner, servizi o informazioni affidabili.

---

## Il Fascicolo Amministrativo

I quattro motori condividono un'unica base informativa: il Fascicolo Amministrativo.

Il Fascicolo rappresenta la memoria amministrativa del cittadino all'interno di Mandari ed è l'unica fonte ufficiale delle informazioni utilizzate dal sistema.

Ogni motore può consultare il Fascicolo e aggiornarlo esclusivamente nell'ambito delle proprie responsabilità.

Nessun motore mantiene copie autonome delle informazioni principali.

Questo principio garantisce coerenza, tracciabilità e affidabilità dell'intero sistema.

---

## Collaborazione tra i motori

I motori non operano in modo indipendente.

Ogni nuova informazione acquisita da un motore può generare attività negli altri.

Ad esempio:

- CARTA analizza un documento e aggiorna il Fascicolo Amministrativo.
- SPETTA verifica se il nuovo documento modifica i diritti o le opportunità del cittadino.
- DATA controlla se il documento introduce nuove scadenze o reminder.
- AFFIDO valuta se è opportuno suggerire un professionista, un partner o un'altra soluzione.

L'utente interagisce sempre con un unico assistente digitale.

La collaborazione tra i motori rimane completamente trasparente.

---

## Ambito del documento

Il presente documento descrive esclusivamente il comportamento funzionale dei motori.

Non definisce:

- l'interfaccia grafica;
- il design dell'esperienza utente;
- le tecnologie utilizzate;
- l'architettura software;
- il funzionamento dell'orchestratore AI.

Questi aspetti saranno trattati nei documenti successivi della suite PRD.

---

## Principi Fondanti

La progettazione dei motori di Mandari si basa sui seguenti principi:

- ogni motore possiede una responsabilità unica e ben definita;
- il Fascicolo Amministrativo rappresenta l'unica fonte di verità del sistema;
- nessun motore duplica informazioni già presenti nel Fascicolo;
- tutti i motori collaborano tra loro senza sovrapporre responsabilità;
- ogni suggerimento prodotto deve essere comprensibile, motivato e tracciabile;
- l'utente deve percepire Mandari come un unico assistente intelligente.

---

## Decisioni Congelate

✓ Mandari è composto da motori specializzati.

✓ Ogni motore possiede responsabilità esclusive.

✓ Il Fascicolo Amministrativo è l'unica fonte ufficiale delle informazioni.

✓ Tutti i motori collaborano attraverso il Fascicolo Amministrativo.

✓ Il comportamento dei motori è definito nel PRD-004.

✓ Il coordinamento tra i motori sarà definito nel PRD-005 (AI Engine).

✓ Le tecnologie implementative saranno definite nel PRD-006 (Technical Architecture).

  # 2. Architettura Funzionale

## Obiettivo

L'architettura funzionale di Mandari definisce il modo in cui i motori collaborano tra loro per assistere il cittadino.

Ogni motore è progettato per svolgere una responsabilità specifica.

Nessun motore opera in modo isolato.

L'intelligenza del sistema nasce dalla collaborazione continua tra componenti specializzati che condividono la stessa base informativa.

---

## L'ecosistema Mandari

Mandari è composto da cinque elementi fondamentali.

- Fascicolo Amministrativo
- SPETTA
- DATA
- CARTA
- AFFIDO

Il Fascicolo Amministrativo rappresenta il centro del sistema.

I quattro motori leggono e aggiornano continuamente il Fascicolo secondo le rispettive responsabilità.

L'utente interagisce con Mandari come se fosse un unico assistente digitale.

La complessità dell'architettura rimane completamente trasparente.

---

## Il Fascicolo Amministrativo come centro del sistema

Il Fascicolo Amministrativo rappresenta la memoria permanente di Mandari.

Ogni informazione rilevante viene registrata una sola volta.

Ogni motore utilizza sempre la stessa informazione.

Questo principio garantisce:

- coerenza;
- tracciabilità;
- aggiornamento continuo;
- eliminazione delle duplicazioni;
- affidabilità delle decisioni.

Il Fascicolo costituisce l'unica fonte ufficiale della conoscenza del sistema.

---

## Responsabilità dei motori

Ogni motore è responsabile esclusivamente del proprio dominio.

SPETTA individua opportunità.

DATA gestisce il tempo.

CARTA comprende la documentazione.

AFFIDO individua la soluzione migliore ad un bisogno.

Un motore non assume mai responsabilità appartenenti ad un altro motore.

Questa separazione riduce la complessità del sistema e rende ogni componente indipendente, evolvibile e facilmente manutenibile.

---

## Collaborazione tra i motori

I motori collaborano continuamente attraverso il Fascicolo Amministrativo.

Ogni nuova informazione può produrre effetti su più componenti.

Ad esempio.

Un cittadino fotografa una comunicazione.

CARTA:

- acquisisce il documento;
- lo classifica;
- ne comprende il contenuto;
- aggiorna il Fascicolo.

Successivamente:

SPETTA verifica eventuali nuovi diritti o agevolazioni.

DATA controlla la presenza di nuove scadenze.

AFFIDO valuta se suggerire il supporto di un professionista oppure altre soluzioni.

Ogni motore interviene esclusivamente quando la nuova informazione rientra nelle proprie responsabilità.

---

## Flusso delle informazioni

Ogni informazione segue sempre lo stesso ciclo di vita.

1. Acquisizione.

2. Comprensione.

3. Registrazione nel Fascicolo.

4. Analisi da parte dei motori interessati.

5. Produzione di suggerimenti.

6. Presentazione all'utente.

Questo processo garantisce uniformità di comportamento in tutto il sistema.

---

## Comunicazione interna

I motori non comunicano direttamente con l'utente.

Comunicano tra loro attraverso il Fascicolo Amministrativo.

Ogni aggiornamento diventa immediatamente disponibile agli altri motori.

Ogni suggerimento nasce sempre da informazioni ufficialmente registrate.

Questo approccio elimina incoerenze e garantisce una visione condivisa della situazione amministrativa del cittadino.

---

## Scalabilità

L'architettura è progettata per consentire l'introduzione di nuovi motori senza modificare quelli esistenti.

Ogni nuovo motore dovrà:

- avere una responsabilità esclusiva;
- leggere il Fascicolo Amministrativo;
- aggiornare il Fascicolo secondo le proprie competenze;
- collaborare con gli altri motori rispettandone le responsabilità.

L'evoluzione del sistema avviene attraverso l'aggiunta di nuovi specialisti, senza alterare l'equilibrio dell'architettura.

---

## Principi Architetturali

- Il Fascicolo Amministrativo rappresenta il centro del sistema.
- Ogni motore possiede una responsabilità esclusiva.
- Nessun motore duplica informazioni.
- Tutti i motori condividono la stessa conoscenza.
- Ogni decisione nasce da informazioni registrate nel Fascicolo.
- La collaborazione tra i motori è completamente trasparente per il cittadino.
- L'architettura deve poter evolvere senza compromettere i componenti esistenti.

---

## Decisioni Congelate

✓ Il Fascicolo Amministrativo è il centro dell'ecosistema Mandari.

✓ I motori collaborano esclusivamente attraverso il Fascicolo Amministrativo.

✓ Ogni motore possiede responsabilità esclusive.

✓ Nessun motore mantiene copie autonome delle informazioni.

✓ Ogni informazione segue un ciclo di vita standardizzato.

✓ L'architettura è progettata per essere estendibile attraverso nuovi motori specializzati.

✓ Il cittadino interagisce sempre con un unico assistente digitale, indipendentemente dai motori coinvolti.

  # 3. SPETTA

## Missione

SPETTA è il motore responsabile dell'individuazione delle opportunità amministrative del cittadino.

Analizza le informazioni contenute nel Fascicolo Amministrativo e individua bonus, agevolazioni, esenzioni, contributi, detrazioni, servizi e diritti che potrebbero essere applicabili alla situazione dell'utente.

SPETTA non sostituisce il professionista.

Supporta il cittadino nell'individuare opportunità che potrebbero altrimenti rimanere sconosciute.

---

## Problema che risolve

La normativa italiana è complessa, frammentata e in continua evoluzione.

Molti cittadini non conoscono le opportunità disponibili oppure non sanno di possedere i requisiti necessari per accedervi.

SPETTA riduce questo problema analizzando automaticamente il Fascicolo Amministrativo e confrontandolo con le informazioni disponibili.

L'obiettivo è diminuire il numero di opportunità non conosciute dal cittadino.

---

## Responsabilità

SPETTA è responsabile di:

- individuare opportunità amministrative;
- individuare bonus;
- individuare agevolazioni;
- individuare esenzioni;
- individuare contributi;
- individuare servizi pubblici disponibili;
- individuare possibili diritti amministrativi;
- monitorare eventuali variazioni che possono modificare le opportunità del cittadino.

Non è responsabile della presentazione delle pratiche.

Non è responsabile della verifica definitiva dei requisiti.

---

## Input

SPETTA utilizza esclusivamente informazioni presenti nel Fascicolo Amministrativo.

Ad esempio:

- composizione del nucleo amministrativo;
- dati derivanti dal questionario;
- informazioni estratte dai documenti;
- dati confermati dall'utente;
- eventi amministrativi registrati;
- cronologia delle pratiche;
- eventuali aggiornamenti inseriti dagli altri motori.

SPETTA non utilizza dati non confermati.

---

## Processo decisionale

Ogni volta che il Fascicolo Amministrativo viene aggiornato, SPETTA verifica se la nuova informazione modifica le opportunità disponibili.

L'analisi viene eseguita automaticamente.

L'utente non deve formulare domande specifiche.

È Mandari ad individuare le possibili opportunità sulla base delle informazioni disponibili.

---

## Output

SPETTA produce:

- elenco delle opportunità individuate;
- descrizione sintetica;
- motivazione della proposta;
- livello di attendibilità della valutazione;
- eventuali informazioni mancanti;
- invito alla verifica presso CAF, Patronato o professionista qualificato;
- eventuale collegamento con AFFIDO per richiedere assistenza.

---

## Collaborazione con gli altri motori

SPETTA collabora costantemente con gli altri motori.

Riceve nuove informazioni da:

- CARTA;
- DATA;
- AFFIDO;
- aggiornamenti del cittadino.

Quando individua un'opportunità può:

- richiedere a DATA la gestione delle relative scadenze;
- suggerire ad AFFIDO il contatto con un professionista;
- aggiornare il Fascicolo Amministrativo.

---

## Aggiornamento del Fascicolo

SPETTA registra nel Fascicolo:

- opportunità individuate;
- opportunità già visualizzate;
- opportunità approfondite;
- opportunità scadute;
- opportunità non applicabili;
- storico delle valutazioni effettuate.

Ogni analisi rimane tracciata.

---

## Limiti

SPETTA non certifica il diritto ad ottenere un beneficio.

Non presenta pratiche.

Non sostituisce CAF, Patronati o professionisti.

Non interpreta norme in modo vincolante.

Non prende decisioni amministrative.

Il suo ruolo è esclusivamente informativo e di supporto decisionale.

---

## Principi di Prodotto

- L'utente non deve conoscere i bonus per poterli trovare.
- È SPETTA a cercare le opportunità.
- Ogni suggerimento deve essere motivato.
- Ogni suggerimento deve essere verificabile.
- Ogni suggerimento deve indicare chiaramente eventuali informazioni mancanti.
- Ogni opportunità deve poter essere approfondita attraverso AFFIDO.

---

## Decisioni Congelate

✓ SPETTA rappresenta il motore delle opportunità amministrative.

✓ Analizza esclusivamente il Fascicolo Amministrativo.

✓ Ogni suggerimento deve essere spiegabile e motivato.

✓ SPETTA non certifica diritti.

✓ SPETTA non sostituisce il professionista.

✓ Ogni opportunità può essere approfondita attraverso AFFIDO.

✓ Ogni analisi viene registrata nel Fascicolo Amministrativo.

  # 4. DATA

## Missione

DATA è il motore responsabile della gestione del tempo amministrativo del cittadino.

Il suo compito è individuare, organizzare, monitorare e ricordare tutte le scadenze rilevanti presenti nel Fascicolo Amministrativo, evitando dimenticanze e aiutando il cittadino a pianificare i propri adempimenti.

DATA non si limita a generare promemoria.

Organizza il calendario amministrativo personale dell'utente.

---

## Problema che risolve

Molti adempimenti amministrativi devono essere eseguiti entro termini precisi.

La loro dimenticanza può comportare la perdita di benefici, l'applicazione di sanzioni o ritardi nella gestione delle pratiche.

Il cittadino è spesso costretto ad utilizzare strumenti separati, come calendari, agende o promemoria, senza una visione unitaria della propria situazione amministrativa.

DATA elimina questa frammentazione centralizzando tutte le scadenze in un unico motore.

---

## Responsabilità

DATA è responsabile di:

- individuare le scadenze amministrative;
- creare reminder automatici;
- consentire la creazione di reminder personali;
- monitorare eventi ricorrenti;
- aggiornare il calendario amministrativo del cittadino;
- avvisare l'utente prima delle scadenze;
- aggiornare lo stato delle attività.

DATA non è responsabile della gestione delle pratiche.

DATA non sostituisce il cittadino nell'esecuzione degli adempimenti.

---

## Input

DATA utilizza esclusivamente informazioni provenienti dal Fascicolo Amministrativo.

Le scadenze possono derivare da:

- documenti analizzati da CARTA;
- opportunità individuate da SPETTA;
- attività create dall'utente;
- pratiche seguite tramite AFFIDO;
- informazioni registrate nel Fascicolo.

Ogni nuova informazione viene valutata per verificare la presenza di eventi temporali rilevanti.

---

## Processo decisionale

Ogni aggiornamento del Fascicolo viene analizzato da DATA.

Quando individua una scadenza, il motore:

- determina la data di riferimento;
- identifica eventuali preavvisi;
- stabilisce la priorità;
- aggiorna il calendario amministrativo;
- prepara i reminder.

Il cittadino non deve ricordare le proprie scadenze.

È Mandari che costruisce automaticamente il piano temporale.

---

## Output

DATA produce:

- calendario amministrativo personale;
- reminder automatici;
- reminder creati dall'utente;
- notifiche preventive;
- elenco delle attività imminenti;
- storico delle attività concluse;
- stato delle attività (da svolgere, completate, scadute).

---

## Collaborazione con gli altri motori

DATA riceve informazioni da:

- SPETTA;
- CARTA;
- AFFIDO;
- Fascicolo Amministrativo;
- utente.

Può inoltre:

- informare SPETTA della scadenza di un'opportunità;
- suggerire ad AFFIDO il contatto con un professionista in prossimità di una scadenza;
- aggiornare il Fascicolo con lo stato delle attività.

---

## Aggiornamento del Fascicolo

DATA registra:

- nuove scadenze;
- reminder creati;
- reminder completati;
- reminder annullati;
- attività concluse;
- cronologia delle notifiche;
- storico amministrativo degli eventi.

Ogni evento rimane tracciato.

---

## Limiti

DATA non prende decisioni amministrative.

Non interpreta documenti.

Non individua opportunità.

Non presenta pratiche.

Il suo ruolo è esclusivamente quello di organizzare e monitorare il tempo amministrativo del cittadino.

---

## Principi di Prodotto

- Il cittadino non deve ricordare le scadenze.
- Ogni evento amministrativo deve poter generare un reminder.
- Le notifiche devono essere utili e non invasive.
- Ogni reminder deve avere una motivazione chiara.
- DATA organizza il tempo amministrativo, non il calendario personale del cittadino.

---

## Decisioni Congelate

✓ DATA rappresenta il motore del tempo amministrativo.

✓ Ogni scadenza nasce da informazioni registrate nel Fascicolo Amministrativo.

✓ DATA crea automaticamente reminder quando individua eventi rilevanti.

✓ L'utente può creare reminder personali.

✓ DATA non sostituisce il cittadino nell'esecuzione degli adempimenti.

✓ Ogni attività rimane registrata nel Fascicolo Amministrativo.

# 5. CARTA

## Missione

CARTA è il motore responsabile della comprensione documentale di Mandari.

Il suo compito è acquisire, leggere, comprendere, classificare e spiegare i documenti amministrativi ricevuti dal cittadino, trasformando un documento spesso complesso in informazioni semplici, comprensibili e utilizzabili dagli altri motori del sistema.

Per il cittadino, CARTA non è un lettore OCR.

È l'assistente che risponde alla domanda:

"Ho ricevuto questo documento. Cosa significa e cosa devo fare?"

---

## Problema che risolve

Ogni anno il cittadino riceve comunicazioni provenienti da enti pubblici, aziende, professionisti e amministrazioni.

Molti documenti sono scritti con linguaggio tecnico e risultano difficili da comprendere.

Il cittadino spesso non sa:

- cosa contiene il documento;
- se richiede un'azione;
- entro quando deve intervenire;
- quali conseguenze comporta;
- a chi rivolgersi.

CARTA elimina questa incertezza traducendo il linguaggio amministrativo in informazioni comprensibili.

---

## Responsabilità

CARTA è responsabile di:

- acquisire documenti tramite immagini o file;
- estrarre il contenuto testuale;
- comprendere il significato del documento;
- classificare automaticamente il documento;
- produrre una spiegazione comprensibile;
- individuare eventuali azioni richieste;
- individuare eventuali scadenze;
- aggiornare il Fascicolo Amministrativo.

CARTA non prende decisioni amministrative.

Non sostituisce il parere di un professionista.

---

## Input

CARTA riceve:

- fotografie;
- PDF;
- documenti digitali;
- scansioni;
- immagini.

Ogni documento viene acquisito e collegato al Fascicolo Amministrativo.

---

## Processo decisionale

Per ogni documento acquisito, CARTA esegue il seguente processo:

1. Acquisizione del documento.
2. Estrazione del contenuto.
3. Comprensione del testo.
4. Classificazione automatica.
5. Individuazione delle informazioni rilevanti.
6. Aggiornamento del Fascicolo Amministrativo.
7. Attivazione degli altri motori interessati.

L'utente non deve interpretare il documento.

Mandari lo interpreta per lui e presenta una spiegazione semplice, evidenziando gli elementi realmente importanti.

---

## Output

CARTA produce:

- spiegazione in linguaggio semplice;
- classificazione del documento;
- informazioni principali;
- eventuali azioni richieste;
- eventuali scadenze;
- livello di attendibilità dell'analisi;
- eventuali informazioni mancanti;
- aggiornamento del Fascicolo Amministrativo.

---

## Collaborazione con gli altri motori

Dopo aver aggiornato il Fascicolo:

- SPETTA verifica nuove opportunità;
- DATA individua eventuali scadenze;
- AFFIDO valuta se suggerire il supporto di un professionista o altre soluzioni.

CARTA rappresenta uno dei principali punti di ingresso delle nuove informazioni nel sistema.

---

## Aggiornamento del Fascicolo

Per ogni documento vengono registrati:

- documento originale;
- categoria;
- data di acquisizione;
- sintesi;
- spiegazione;
- informazioni estratte;
- collegamenti con pratiche esistenti;
- eventuali attività generate.

Ogni documento entra a far parte della memoria amministrativa del cittadino.

---

## Limiti

CARTA non certifica l'interpretazione giuridica di un documento.

Non sostituisce un professionista.

Non prende decisioni amministrative.

Non modifica il contenuto dei documenti acquisiti.

Il suo ruolo è quello di comprendere, organizzare e spiegare.

---

## Principi di Prodotto

- L'utente non deve interpretare documenti amministrativi complessi.
- Ogni spiegazione deve utilizzare un linguaggio semplice.
- Ogni documento deve essere classificato automaticamente.
- Ogni informazione utile deve aggiornare il Fascicolo Amministrativo.
- CARTA non lavora per sé stessa: rende più intelligenti tutti gli altri motori.

---

## Decisioni Congelate

✓ CARTA è il motore della comprensione documentale.

✓ Il cittadino utilizza CARTA per capire un documento, non per eseguire un OCR.

✓ Ogni documento aggiornato entra nel Fascicolo Amministrativo.

✓ CARTA attiva automaticamente gli altri motori quando individua informazioni rilevanti.

✓ Ogni spiegazione deve essere comprensibile anche a un cittadino privo di competenze amministrative.

✓ CARTA non sostituisce il parere di un professionista.

  # 6. AFFIDO

## Missione

AFFIDO è il motore responsabile dell'individuazione delle migliori soluzioni ai bisogni del cittadino.

Il suo compito è accompagnare l'utente dalla comprensione di un problema fino all'individuazione della soluzione più adatta, suggerendo professionisti, servizi, enti, aziende o informazioni affidabili.

AFFIDO non gestisce le pratiche.

AFFIDO aiuta il cittadino a scegliere il percorso migliore.

---

## Problema che risolve

Dopo aver compreso un documento, individuato un'opportunità o ricevuto un promemoria, il cittadino si trova spesso davanti alla domanda:

**"A chi mi rivolgo?"**

Oppure:

**"Come posso risolvere questo problema?"**

Molte persone non conoscono il professionista corretto, il servizio più adatto o il percorso da seguire.

AFFIDO riduce questa incertezza proponendo le soluzioni più coerenti con il bisogno espresso.

---

## Responsabilità

AFFIDO è responsabile di:

- individuare professionisti competenti;
- individuare CAF e Patronati;
- individuare servizi pubblici e privati;
- individuare partner della rete Mandari;
- ricercare soluzioni a bisogni espressi direttamente dall'utente;
- suggerire il percorso più appropriato;
- indicare la documentazione utile da preparare prima dell'appuntamento.

AFFIDO non gestisce la pratica.

AFFIDO non segue il rapporto tra cittadino e professionista.

---

## Input

AFFIDO riceve informazioni da:

- SPETTA;
- DATA;
- CARTA;
- Fascicolo Amministrativo;
- richieste dirette dell'utente.

Le richieste possono riguardare sia esigenze amministrative sia bisogni della vita quotidiana.

---

## Processo decisionale

AFFIDO opera in due modalità.

### Modalità Assistita

Gli altri motori suggeriscono l'intervento di AFFIDO quando individuano una situazione nella quale può essere utile il supporto di un soggetto esterno.

Ad esempio:

- è necessario rivolgersi ad un CAF;
- è opportuno consultare un commercialista;
- è consigliabile contattare un Patronato;
- è utile richiedere assistenza ad uno specialista.

In questi casi AFFIDO propone le soluzioni più coerenti con il contesto.

---

### Modalità Diretta

L'utente può accedere direttamente ad AFFIDO ed esprimere un bisogno.

Ad esempio:

- ho bisogno di liquidità;
- cerco un asilo nido;
- cerco una babysitter;
- cerco un medico;
- cerco un'assicurazione;
- cerco un professionista.

AFFIDO ricerca le possibili soluzioni utilizzando partner, servizi e fonti informative affidabili.

---

## Output

AFFIDO produce:

- elenco delle possibili soluzioni;
- professionisti consigliati;
- partner della rete Mandari;
- servizi pubblici e privati;
- informazioni utili;
- documentazione consigliata;
- eventuali passaggi preparatori prima dell'appuntamento.

L'utente sceglie liberamente come procedere.

---

## Collaborazione con gli altri motori

AFFIDO riceve richieste da:

- SPETTA;
- DATA;
- CARTA;
- utente.

Può inoltre suggerire la documentazione da preparare utilizzando le informazioni presenti nel Fascicolo Amministrativo.

AFFIDO non interviene successivamente nella gestione della pratica.

---

## Aggiornamento del Fascicolo

AFFIDO registra esclusivamente:

- bisogni espressi dal cittadino;
- ricerche effettuate;
- soluzioni suggerite;
- eventuali preferenze salvate dall'utente.

Non registra lo svolgimento delle pratiche.

Non monitora il lavoro dei professionisti.

Non mantiene relazioni operative con soggetti esterni.

---

## Limiti

AFFIDO non impone una soluzione.

Non obbliga l'utente a scegliere partner della rete Mandari.

Non segue l'evoluzione delle pratiche.

Non sostituisce il rapporto tra cittadino e professionista.

Non interviene nelle modalità operative dei soggetti coinvolti.

Il suo ruolo termina quando il cittadino dispone delle informazioni necessarie per scegliere consapevolmente come procedere.

---

## Principi di Prodotto

- Ogni bisogno deve poter trovare una possibile soluzione.
- Il cittadino mantiene sempre la libertà di scelta.
- Le partnership devono migliorare il lavoro dei professionisti senza modificarne l'organizzazione.
- AFFIDO può suggerire sia partner della rete Mandari sia soggetti esterni.
- Mandari prepara il cittadino al rapporto con il professionista, ma non gestisce tale rapporto.

---

## Decisioni Congelate

✓ AFFIDO rappresenta il motore delle soluzioni.

✓ Può essere attivato automaticamente oppure direttamente dall'utente.

✓ Le partnership Mandari hanno lo scopo di semplificare il lavoro dei professionisti, senza modificarne il metodo operativo.

✓ L'utente mantiene sempre la libertà di scegliere il professionista o il servizio preferito.

✓ AFFIDO termina il proprio compito nel momento in cui il cittadino dispone delle informazioni necessarie per scegliere come procedere.

✓ Mandari non gestisce il rapporto tra cittadino e professionista.

✓ AFFIDO può ricercare sia soluzioni amministrative sia soluzioni a bisogni della vita quotidiana.

  # 7. Il Fascicolo Amministrativo

## Missione

Il Fascicolo Amministrativo rappresenta la memoria ufficiale e permanente di Mandari.

Raccoglie, organizza e conserva tutte le informazioni amministrative rilevanti del cittadino, costituendo l'unica fonte di conoscenza utilizzata dai motori del sistema.

Il Fascicolo non è un semplice archivio documentale.

È la rappresentazione digitale della situazione amministrativa del cittadino in un determinato momento della sua vita.

---

## Obiettivo

L'obiettivo del Fascicolo è fornire ai motori una base informativa unica, coerente e sempre aggiornata.

Ogni decisione presa da Mandari deve derivare esclusivamente dalle informazioni contenute nel Fascicolo.

Questo garantisce uniformità, tracciabilità e coerenza nell'intero sistema.

---

## Contenuto del Fascicolo

Il Fascicolo può contenere, a titolo esemplificativo:

- dati identificativi dell'utente;
- composizione del nucleo familiare amministrativo (come definito dall'ISEE o da altre dichiarazioni ufficiali);
- documenti caricati;
- informazioni estratte dai documenti;
- risposte ai questionari;
- opportunità individuate da SPETTA;
- scadenze generate da DATA;
- spiegazioni prodotte da CARTA;
- bisogni e soluzioni suggerite da AFFIDO;
- storico delle attività svolte all'interno di Mandari.

Il Fascicolo cresce e si aggiorna nel tempo, accompagnando l'evoluzione della situazione amministrativa del cittadino.

---

## Fonte Unica di Verità

Il Fascicolo Amministrativo costituisce la Single Source of Truth dell'intero ecosistema Mandari.

Tutti i motori leggono le informazioni dal Fascicolo.

Tutti i motori aggiornano il Fascicolo esclusivamente nell'ambito delle proprie responsabilità.

Nessun motore mantiene copie autonome delle informazioni principali.

Questo principio evita incoerenze e duplicazioni.

---

## Aggiornamento continuo

Il Fascicolo è un sistema dinamico.

Ogni nuova informazione può modificarne il contenuto.

Gli aggiornamenti possono derivare da:

- documenti caricati;
- nuove risposte dell'utente;
- variazioni della situazione familiare;
- nuovi eventi amministrativi;
- analisi effettuate dai motori;
- modifiche confermate dal cittadino.

Ogni aggiornamento viene registrato in modo da mantenere la cronologia delle evoluzioni.

---

## Collaborazione con i motori

Il Fascicolo non prende decisioni.

Non interpreta informazioni.

Non genera suggerimenti.

Il suo ruolo è quello di fornire una base informativa condivisa ai motori.

SPETTA consulta il Fascicolo per individuare opportunità.

DATA consulta il Fascicolo per organizzare le scadenze.

CARTA aggiorna il Fascicolo dopo aver compreso un documento.

AFFIDO consulta il Fascicolo per suggerire le soluzioni più coerenti.

Il Fascicolo rappresenta il punto di incontro dell'intero sistema.

---

## Principi di Prodotto

- Esiste un solo Fascicolo Amministrativo per ogni account owner.
- Il Fascicolo rappresenta la situazione amministrativa dell'owner e del suo nucleo familiare amministrativo, come definito dalla documentazione ufficiale.
- Tutti i motori utilizzano il Fascicolo come unica fonte di conoscenza.
- Ogni modifica deve essere tracciabile.
- Il Fascicolo evolve insieme al cittadino.
- Le informazioni devono essere coerenti, aggiornate e verificabili.

---

## Limiti

Il Fascicolo non sostituisce i documenti originali.

Non certifica la situazione giuridica del cittadino.

Non sostituisce gli archivi della Pubblica Amministrazione.

Rappresenta esclusivamente la base informativa utilizzata da Mandari per assistere il cittadino.

---

## Decisioni Congelate

✓ Il Fascicolo Amministrativo è la memoria ufficiale di Mandari.

✓ Esiste un solo Fascicolo per ogni account owner.

✓ Il Fascicolo rappresenta la situazione amministrativa dell'owner e del suo nucleo familiare amministrativo.

✓ Il Fascicolo costituisce l'unica fonte ufficiale delle informazioni utilizzate dai motori.

✓ Tutti i motori leggono e aggiornano il Fascicolo nel rispetto delle proprie responsabilità.

✓ Ogni aggiornamento è tracciato.

✓ Il Fascicolo evolve insieme alla vita amministrativa del cittadino.


