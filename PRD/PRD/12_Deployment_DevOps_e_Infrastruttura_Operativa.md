
# PRD-012

# Deployment, DevOps e Infrastruttura Operativa

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce l'architettura operativa con cui Mandari viene distribuito, eseguito, aggiornato e mantenuto.

Non definisce le tecnologie specifiche (Docker, Kubernetes, Cloud Provider, ecc.), ma stabilisce i principi architetturali che dovranno guidare l'implementazione dell'infrastruttura.

---

# 2. Principi dell'Infrastruttura

L'infrastruttura deve garantire:

- continuità operativa;
- scalabilità;
- sicurezza;
- alta disponibilità;
- semplicità di manutenzione;
- possibilità di evoluzione senza interruzione del servizio.

Ogni scelta tecnica dovrà rispettare tali principi.

---

# 3. Separazione degli Ambienti

Mandari dovrà essere distribuito in ambienti distinti.

Almeno:

- Development
- Test
- Staging
- Produzione

Ogni ambiente dovrà essere completamente isolato dagli altri.

I dati di Produzione non dovranno essere utilizzati negli ambienti di sviluppo.

---

# 4. Distribuzione dei Componenti

Ogni componente dell'ecosistema dovrà poter essere distribuito indipendentemente.

Ad esempio:

- Backend API
- Orchestratore
- Motori AI
- Database
- Storage
- Servizi di supporto

L'aggiornamento di un componente non dovrà richiedere il rilascio dell'intero sistema.

---

# 5. Scalabilità

L'architettura dovrà consentire l'aumento delle risorse in funzione del carico.

Potranno essere aumentati indipendentemente:

- Backend;
- Motori AI;
- servizi di elaborazione;
- database;
- storage.

La crescita di un componente non dovrà obbligare la crescita dell'intera infrastruttura.

---

# 6. Alta Disponibilità

L'infrastruttura dovrà essere progettata per ridurre al minimo i tempi di indisponibilità.

L'eventuale guasto di un singolo componente non dovrà compromettere l'intero ecosistema.

Il sistema dovrà poter continuare ad operare anche in presenza di guasti parziali.

---

# 7. Aggiornamenti

Gli aggiornamenti software dovranno essere eseguibili senza perdita dei dati.

Quando possibile, il rilascio dovrà evitare interruzioni percepibili dal cittadino.

Ogni aggiornamento dovrà poter essere annullato in caso di problemi.

---

# 8. Gestione delle Configurazioni

Le configurazioni dell'infrastruttura non dovranno essere integrate nel codice sorgente.

Le informazioni di configurazione dovranno essere gestite separatamente.

Ad esempio:

- indirizzi dei servizi;
- chiavi di accesso;
- parametri di configurazione;
- variabili di ambiente.

Questo principio facilita la distribuzione nei diversi ambienti.


---

# 9. Continuous Integration

Ogni modifica al codice sorgente dovrà essere verificata automaticamente prima di poter essere distribuita.

La pipeline di integrazione continua dovrà almeno:

- compilare il progetto;
- eseguire i test automatici;
- verificare la qualità del codice;
- produrre gli artefatti di distribuzione.

Nessuna modifica dovrà raggiungere gli ambienti superiori senza aver superato tali controlli.

---

# 10. Continuous Deployment

La distribuzione del software dovrà essere automatizzata.

L'obiettivo è ridurre gli errori manuali e garantire che ogni rilascio segua sempre la stessa procedura.

Ogni rilascio dovrà essere:

- ripetibile;
- verificabile;
- tracciabile;
- reversibile.

---

# 11. Versionamento

Ogni componente software possiede una propria versione.

Devono essere versionati almeno:

- Backend API;
- Orchestratore;
- Motori AI;
- Client;
- API pubbliche.

La versione distribuita deve essere sempre identificabile.

---

# 12. Compatibilità dei Rilasci

L'aggiornamento di un componente non deve interrompere il funzionamento degli altri componenti compatibili.

Quando vengono introdotte modifiche incompatibili dovrà essere previsto un periodo di convivenza tra versioni.

Questo consente aggiornamenti progressivi senza interruzioni del servizio.

---

# 13. Backup Operativi

L'infrastruttura deve prevedere procedure automatiche di backup.

Devono essere protetti almeno:

- Database;
- Storage degli Atti;
- configurazioni;
- log essenziali.

Le procedure di backup devono essere periodicamente verificate mediante test di ripristino.

---

# 14. Disaster Recovery

Mandari deve poter essere ripristinato dopo eventi critici.

Devono essere definiti:

- procedure di ripristino;
- ordine di riattivazione dei componenti;
- verifiche successive al ripristino.

L'obiettivo è ridurre il tempo necessario per riportare il sistema in condizioni operative.

---

# 15. Gestione dei Segreti

Password, chiavi crittografiche, token e credenziali non devono essere salvati nel codice sorgente.

Essi devono essere conservati attraverso meccanismi dedicati alla gestione sicura delle credenziali.

Ogni componente riceve esclusivamente i segreti necessari al proprio funzionamento.

---

# 16. Servizi Esterni

L'infrastruttura deve consentire l'integrazione controllata con servizi esterni.

A titolo esemplificativo:

- SPID;
- CIE;
- PagoPA;
- WhatsApp;
- Telegram;
- servizi regionali;
- servizi ministeriali;
- sistemi di pagamento;
- futuri partner.

Ogni integrazione esterna deve poter essere aggiornata senza modificare il resto dell'ecosistema.

---

# 17. Osservabilità

Ogni componente deve produrre informazioni utili al monitoraggio operativo.

Devono essere raccolti almeno:

- stato del servizio;
- errori;
- tempi di risposta;
- utilizzo delle risorse;
- eventi critici.

Le informazioni raccolte devono consentire l'identificazione rapida delle anomalie.

---

# 18. Indipendenza dall'Infrastruttura

L'architettura di Mandari non deve dipendere da un singolo fornitore di infrastruttura.

Il sistema dovrà poter essere distribuito, con opportuni adattamenti tecnici, su differenti ambienti di esecuzione.

Questa scelta riduce il rischio di dipendenza tecnologica e facilita l'evoluzione futura dell'ecosistema.


---

# 19. Manutenzione dell'Infrastruttura

L'infrastruttura deve poter essere mantenuta senza interrompere inutilmente i servizi.

Le attività di manutenzione dovranno essere pianificate e documentate.

Quando possibile dovranno essere eseguite senza impatti percepibili dal cittadino.

---

# 20. Aggiornabilità dell'Architettura

Mandari dovrà poter evolvere nel tempo.

L'aggiunta di nuovi componenti infrastrutturali non dovrà richiedere modifiche sostanziali ai componenti esistenti.

L'infrastruttura dovrà supportare la crescita funzionale del progetto.

---

# 21. Automazione Operativa

Le attività ripetitive dovranno essere automatizzate.

A titolo esemplificativo:

- distribuzione delle nuove versioni;
- esecuzione dei backup;
- verifiche di salute dei servizi;
- riavvio controllato dei componenti;
- raccolta dei log;
- monitoraggio delle prestazioni.

L'automazione riduce il rischio di errore umano e migliora la continuità operativa.

---

# 22. Gestione dei Guasti

Ogni componente deve essere progettato assumendo che, prima o poi, possa verificarsi un guasto.

L'infrastruttura deve essere in grado di:

- rilevare il problema;
- isolarlo;
- limitarne gli effetti;
- consentire il ripristino del servizio.

Il guasto di un componente non deve compromettere l'intero ecosistema Mandari.

---

# 23. Crescita dell'Infrastruttura

L'infrastruttura deve poter supportare la crescita del numero di:

- cittadini;
- Atti archiviati;
- richieste simultanee;
- Motori AI;
- servizi esterni;
- canali di comunicazione.

La crescita deve avvenire in maniera progressiva senza richiedere riprogettazioni dell'architettura.

---

# 24. Relazione con i Documenti ARCH

Il presente documento definisce esclusivamente i principi architetturali dell'infrastruttura.

Le decisioni implementative saranno sviluppate nei documenti ARCH.

Tra queste:

- scelta del Cloud Provider;
- scelta del Database;
- scelta dello Storage;
- orchestrazione dei container;
- strumenti DevOps;
- sistemi di monitoraggio;
- sistemi di backup;
- sistemi di distribuzione.

---

# 25. Decisioni Congelate

✓ Gli ambienti Development, Test, Staging e Produzione sono completamente separati.

✓ Ogni componente può essere distribuito indipendentemente.

✓ L'architettura supporta la scalabilità orizzontale dei componenti.

✓ Gli aggiornamenti devono essere reversibili.

✓ Ogni rilascio deve essere tracciabile e versionato.

✓ Database, Storage e configurazioni devono essere protetti da backup periodici.

✓ L'infrastruttura deve prevedere procedure di Disaster Recovery.

✓ Password, token e credenziali non devono essere memorizzati nel codice sorgente.

✓ Le attività operative devono essere automatizzate quando possibile.

✓ L'infrastruttura deve essere osservabile attraverso log, metriche ed eventi.

✓ L'ecosistema deve poter evolvere senza dipendere da uno specifico fornitore di infrastruttura.

✓ Le scelte tecnologiche saranno formalizzate successivamente nei documenti ARCH.
