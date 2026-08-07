# PRD-010

# API e Comunicazione tra i Servizi

Versione: 1.0

Stato: FROZEN

---

# 1. Scopo del documento

Il presente documento definisce il modello di comunicazione tra tutti i componenti software di Mandari.

L'obiettivo non è descrivere protocolli o tecnologie specifiche, ma stabilire le regole con cui i servizi collaborano mantenendo:

- basso accoppiamento;
- alta coesione;
- sicurezza;
- scalabilità;
- sostituibilità dei componenti.

Ogni comunicazione dovrà rispettare tali principi.

---

# 2. Principi fondamentali

L'architettura di Mandari è basata su servizi indipendenti.

Ogni servizio:

- possiede responsabilità ben definite;
- espone esclusivamente le proprie funzionalità;
- non accede direttamente alle responsabilità di altri servizi;
- comunica solo attraverso interfacce pubbliche.

Le API rappresentano il contratto ufficiale tra due componenti.

---

# 3. Architettura generale

La comunicazione segue il seguente schema logico.

                Client

      App Mobile
      WebApp
      Futuri Canali
      (WhatsApp, Telegram, ecc.)

                │
                ▼

            Backend API

                │
                ▼

          Orchestratore

        ┌───────┼─────────┐

        ▼       ▼         ▼

   Motore A  Motore B  Motore C

                │

                ▼

          Backend API

        ┌───────┼─────────┐

        ▼       ▼         ▼

     Database  Storage  Servizi

---

# 4. Il Backend API

Il Backend API rappresenta il punto di ingresso unico dell'intero ecosistema Mandari.

Nessun componente esterno comunica direttamente con:

- Database;
- Storage;
- Orchestratore;
- Motori.

Ogni richiesta attraversa obbligatoriamente il Backend.

Il Backend è responsabile di:

- autenticazione;
- autorizzazione;
- validazione delle richieste;
- gestione delle sessioni;
- accesso ai dati;
- esposizione delle API.

---

# 5. Responsabilità dell'Orchestratore

L'Orchestratore non rappresenta un database.

Non rappresenta un motore AI.

Non rappresenta un backend.

L'Orchestratore prende decisioni.

Riceve una richiesta dal Backend e costruisce il flusso necessario per soddisfarla.

Per ogni richiesta decide:

- quali servizi coinvolgere;
- in quale ordine;
- quali informazioni raccogliere;
- quando terminare il processo.

---

# 6. Responsabilità dei Motori

Ogni Motore esegue esclusivamente il proprio compito.

Un Motore non conosce gli altri Motori.

Non coordina altri servizi.

Non prende decisioni architetturali.

Riceve una richiesta.

Elabora.

Restituisce un risultato.

---

# 7. Accesso ai dati

L'accesso ai dati è centralizzato nel Backend.

Né l'Orchestratore né i Motori interrogano direttamente:

- Database;
- Storage.

Quando necessitano di informazioni, richiedono al Backend il dato necessario.

Il Backend recupera le informazioni e restituisce un oggetto già pronto all'utilizzo.

Questo principio garantisce:

- basso accoppiamento;
- maggiore sicurezza;
- sostituibilità del sistema di persistenza;
- uniformità nell'accesso ai dati.

---

# 8. Flusso di una richiesta

Esempio.

Antonio chiede:

"Quando scade il mio ISEE?"

Il flusso logico è il seguente.

1. Il Client invia la richiesta.

2. Il Backend autentica l'utente.

3. Il Backend autorizza l'operazione.

4. Il Backend inoltra la richiesta all'Orchestratore.

5. L'Orchestratore costruisce il piano di lavoro.

6. L'Orchestratore richiede al Backend gli Atti necessari.

7. Il Backend recupera gli Atti dal Database e dallo Storage.

8. L'Orchestratore coinvolge i Motori necessari.

9. I Motori restituiscono i risultati.

10. L'Orchestratore costruisce la risposta finale.

11. Il Backend restituisce la risposta al Client.

---

# 9. Nessun accesso diretto

Sono vietate le seguenti comunicazioni.

Client → Database

Client → Storage

Client → Motori

Motore → Database

Motore → Storage

Motore → Motore

Database → Client

Storage → Client

Ogni comunicazione deve rispettare il percorso architetturale definito.

---

# 10. Le API come Contratto

Ogni comunicazione tra due componenti dell'ecosistema Mandari avviene tramite API.

Le API rappresentano un contratto.

Il chiamante non conosce come il servizio lavora internamente.

Conosce solamente:

- cosa può richiedere;
- quali dati deve fornire;
- quale risposta riceverà;
- quali errori può ottenere.

Questo principio permette di modificare internamente un componente senza obbligare tutti gli altri a cambiare.

---

# 11. Richieste e Risposte

Ogni API deve essere progettata affinché una richiesta produca sempre una risposta ben definita.

Una risposta può contenere:

- il risultato richiesto;
- un errore;
- una richiesta incompleta;
- l'indicazione che l'operazione è stata presa in carico.

Le API non restituiscono mai dati ambigui.

---

# 12. Comunicazioni Sincrone

Una comunicazione sincrona è una richiesta nella quale il chiamante rimane in attesa della risposta.

Esempio.

Antonio chiede:

"Quando scade il mio ISEE?"

L'Orchestratore elabora immediatamente la richiesta.

Il risultato viene restituito durante la stessa conversazione.

Le richieste sincrone sono utilizzate per operazioni rapide.

---

# 13. Comunicazioni Asincrone

Alcune operazioni possono richiedere tempo.

Ad esempio:

- analisi di centinaia di documenti;
- importazione di un Fascicolo;
- elaborazioni AI molto complesse;
- sincronizzazioni con enti esterni.

In questi casi il Backend conferma la presa in carico della richiesta.

L'elaborazione continua in background.

Al termine il cittadino riceverà una notifica attraverso il canale utilizzato o uno dei canali disponibili.

---

# 14. Idempotenza

Le API devono essere progettate affinché la stessa richiesta non produca effetti duplicati.

Esempio.

Antonio preme due volte il pulsante "Carica ISEE".

Mandari deve essere in grado di riconoscere che si tratta della stessa operazione evitando la creazione di due Atti identici.

L'idempotenza costituisce un requisito fondamentale dell'architettura.

---

# 15. Gestione degli Errori

Ogni componente è responsabile dei propri errori.

Quando un errore si verifica:

- viene registrato;
- viene classificato;
- viene restituito al chiamante in forma comprensibile.

Gli errori tecnici non devono essere mostrati direttamente al cittadino.

L'utente riceve esclusivamente messaggi comprensibili e orientati alla risoluzione del problema.

---

# 16. Timeout

Ogni richiesta possiede un tempo massimo di elaborazione.

Se il servizio non risponde entro tale limite:

- la richiesta viene interrotta;
- viene registrato l'evento;
- il chiamante riceve una risposta controllata.

Questo impedisce che un componente blocchi l'intero sistema.

---

# 17. Versionamento delle API

Le API evolvono nel tempo.

Ogni modifica incompatibile con le versioni precedenti genera una nuova versione dell'interfaccia.

In questo modo componenti sviluppati in momenti differenti possono convivere durante il periodo di transizione.

Il versionamento garantisce l'evoluzione controllata del sistema.

---

# 18. Compatibilità

Le modifiche introdotte dovranno mantenere la compatibilità con le funzionalità esistenti ogni volta che sia possibile.

La rimozione di un'interfaccia dovrà avvenire solo dopo un periodo di migrazione controllato.

---

# 19. Comunicazione con Servizi Esterni

Mandari potrà dialogare con servizi appartenenti a soggetti terzi.

A titolo esemplificativo:

- INPS;
- Agenzia delle Entrate;
- PagoPA;
- SPID;
- CIE;
- WhatsApp;
- Telegram;
- servizi regionali;
- futuri partner.

Tali servizi sono considerati esterni all'ecosistema Mandari.

L'accesso avviene esclusivamente tramite il Backend API.

Nessun Motore comunica direttamente con servizi esterni.

---

# 20. Canali di Accesso

Mandari è progettato come un servizio indipendente dal canale di accesso.

L'App Mobile e la WebApp rappresentano i client principali.

In futuro potranno essere aggiunti ulteriori canali, quali piattaforme di messaggistica, assistenti vocali o altri sistemi di interazione.

L'introduzione di nuovi canali non dovrà richiedere modifiche all'Orchestratore, ai Motori o al modello dati.

Ogni nuovo canale comunicherà esclusivamente attraverso il Backend API.


---

# 21. Resilienza della Comunicazione

L'architettura di Mandari deve essere progettata affinché il malfunzionamento di un componente non comprometta l'intero sistema.

Ogni servizio deve essere in grado di:

- rilevare l'indisponibilità di un altro servizio;
- interrompere correttamente la richiesta;
- restituire un errore controllato;
- consentire eventuali tentativi successivi.

Il fallimento di un servizio non deve propagarsi in modo incontrollato agli altri componenti.

---

# 22. Disponibilità dei Servizi

Ogni componente dell'ecosistema deve poter essere:

- avviato;
- arrestato;
- aggiornato;
- sostituito;

senza richiedere modifiche agli altri componenti, purché continui a rispettare il contratto definito dalle proprie API.

Questa proprietà garantisce l'evoluzione indipendente dei servizi.

---

# 23. Monitoraggio delle Comunicazioni

Ogni chiamata tra servizi deve poter essere monitorata.

Il sistema dovrà registrare almeno:

- servizio chiamante;
- servizio destinatario;
- istante della richiesta;
- durata della chiamata;
- esito della comunicazione;
- eventuali errori.

Queste informazioni permettono di diagnosticare anomalie e misurare le prestazioni del sistema.

---

# 24. Tracciabilità delle Richieste

Ogni richiesta ricevuta da Mandari deve essere identificabile in modo univoco.

Tutte le operazioni eseguite durante l'elaborazione della richiesta devono poter essere ricondotte allo stesso identificativo.

In questo modo sarà possibile ricostruire l'intero percorso seguito da una richiesta attraverso i diversi componenti del sistema.

---

# 25. Comunicazione Basata su Responsabilità

Ogni componente deve richiedere esclusivamente le informazioni necessarie allo svolgimento del proprio compito.

Nessun servizio deve ottenere dati che non siano indispensabili alla propria elaborazione.

Questo principio riduce:

- accoppiamento;
- esposizione dei dati;
- complessità delle comunicazioni.

---

# 26. Evoluzione delle Comunicazioni

L'architettura delle comunicazioni dovrà consentire l'aggiunta di nuovi servizi senza modificare quelli esistenti.

Un nuovo Motore, un nuovo canale o un nuovo servizio esterno dovrà poter essere integrato attraverso nuove API o nuove implementazioni delle API esistenti, mantenendo invariato il comportamento degli altri componenti.

L'obiettivo è consentire una crescita progressiva dell'ecosistema Mandari.

---

# 27. Relazione con gli altri PRD

Il presente documento definisce esclusivamente le regole con cui i componenti comunicano tra loro.

Le modalità tecniche di implementazione saranno definite nei documenti successivi.

In particolare:

PRD-011 descriverà il funzionamento dei Motori di Intelligenza Artificiale.

PRD-012 definirà l'infrastruttura di esecuzione e distribuzione dei servizi.

I documenti ARCH descriveranno successivamente:

- protocolli;
- framework;
- tecnologie;
- strumenti;
- configurazioni.

---

# 28. Decisioni Congelate

✓ Tutte le comunicazioni transitano attraverso il Backend API.

✓ Il Backend API rappresenta l'unico punto di ingresso dell'ecosistema Mandari.

✓ L'Orchestratore coordina i servizi ma non accede direttamente al Database né allo Storage.

✓ Il Backend è l'unico componente autorizzato ad accedere ai dati persistenti.

✓ I Motori comunicano esclusivamente con l'Orchestratore.

✓ I Motori non comunicano direttamente tra loro.

✓ Ogni servizio espone esclusivamente API pubbliche ben definite.

✓ Le API costituiscono un contratto stabile tra i componenti.

✓ Le comunicazioni devono essere monitorabili e tracciabili.

✓ Ogni richiesta possiede un identificativo univoco.

✓ L'aggiunta di nuovi canali di accesso non modifica il cuore dell'architettura.

✓ I servizi esterni comunicano esclusivamente attraverso il Backend API.

✓ L'evoluzione dell'architettura deve preservare il basso accoppiamento tra i componenti.


