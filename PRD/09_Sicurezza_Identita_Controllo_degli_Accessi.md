
# PRD-009

# Sicurezza, Identità e Controllo degli Accessi

Versione: 1.0

Stato: FROZEN

---

# 1. Scopo del documento

Questo documento definisce il modello di sicurezza dell'intero ecosistema Mandari.

L'obiettivo non è scegliere le tecnologie che verranno utilizzate, ma stabilire le regole che ogni componente software dovrà rispettare per garantire:

- identificazione certa dell'utente;
- protezione del Fascicolo Amministrativo;
- riservatezza delle informazioni;
- controllo degli accessi;
- tracciabilità delle operazioni.

Le decisioni contenute in questo documento costituiscono requisiti architetturali.

---

# 2. Principi generali

La sicurezza è un requisito trasversale.

Non appartiene a un singolo modulo ma coinvolge:

- backend;
- frontend;
- applicazione mobile;
- API;
- database;
- storage;
- motori;
- orchestratore.

Ogni componente partecipa alla sicurezza complessiva del sistema.

---

# 3. Obiettivi della sicurezza

Mandari dovrà garantire:

• Identità certa dell'utente.

• Protezione dei dati.

• Integrità degli Atti.

• Disponibilità del Fascicolo.

• Tracciabilità completa.

• Protezione delle comunicazioni.

• Continuità operativa.

• Separazione delle responsabilità.

---

# 4. Il patrimonio da proteggere

L'asset principale di Mandari non è il software.

È il Fascicolo Amministrativo del cittadino.

Il Fascicolo contiene:

- Atti;
- dati personali;
- cronologia amministrativa;
- eventi;
- documenti caricati;
- informazioni estratte da Carta;
- conoscenze elaborate dai motori;
- notifiche;
- deleghe;
- autorizzazioni.

La sicurezza dell'intero sistema viene progettata per proteggere questo patrimonio.

---

# 5. Modello di sicurezza

Ogni operazione segue sempre il medesimo flusso.

```text

Utente

↓

Identificazione

↓

Autenticazione

↓

Autorizzazione

↓

Operazione

↓

Registrazione dell'evento

↓

Aggiornamento del Fascicolo

```

Nessuna operazione può saltare uno dei passaggi precedenti.

---

# 6. Identità digitale

L'identità digitale rappresenta una persona.

Non rappresenta:

- un dispositivo;
- un browser;
- una password;
- un indirizzo email;
- un numero di telefono.

Rappresenta esclusivamente il soggetto che utilizza Mandari.

Ogni persona possiede una sola identità digitale.

---

# 7. Account

L'account rappresenta il mezzo con cui una persona accede all'applicazione.

L'account può evolvere nel tempo.

Ad esempio possono cambiare:

- password;
- email;
- numero di telefono;
- metodo di autenticazione.

L'identità invece rimane immutata.

---

# 8. Relazione tra identità e account

Una identità può essere associata a uno o più strumenti di autenticazione.

L'elemento permanente rimane sempre l'identità.

Questo permette di mantenere invariato il Fascicolo anche quando cambiano le credenziali di accesso.

---

# 9. Identificatore permanente

Ogni identità possiede un identificatore interno permanente.

Questo identificatore viene utilizzato da tutti i componenti del sistema.

Esso collega:

- Atti;
- eventi;
- deleghe;
- cronologia;
- notifiche;
- autorizzazioni.

L'identificatore non viene mai modificato.

---

# 10. Ruoli

L'identità non determina automaticamente cosa un utente possa fare.

I permessi dipendono dal ruolo assunto in un determinato momento.

Una stessa persona può operare come:

- cittadino;
- genitore;
- caregiver;
- amministratore di sostegno;
- delegato;
- professionista;
- rappresentante legale.

L'identità rimane invariata.

Cambia esclusivamente il ruolo attivo.

---

# 11. Contesto operativo

Ogni operazione viene eseguita all'interno di un contesto.

Esempi.

Antonio consulta il proprio ISEE.

Contesto:

- Identità: Antonio
- Ruolo: Cittadino
- Fascicolo: Antonio

---

Antonio consulta il Fascicolo della madre.

Contesto:

- Identità: Antonio
- Ruolo: Delegato
- Fascicolo: Maria Rossi

---

Antonio opera come consulente.

Contesto:

- Identità: Antonio
- Ruolo: Professionista
- Fascicolo: Cliente

Il cambio di contesto modifica i permessi disponibili ma non modifica l'identità.

---

# 12. Principi architetturali

Il modello di sicurezza si basa sui seguenti principi.

• Una persona → una identità.

• Una identità → più ruoli.

• Un ruolo → un insieme di permessi.

• Ogni operazione appartiene a un contesto.

• Ogni operazione viene registrata.

• Ogni operazione è verificabile.

# 13. Autenticazione

L'autenticazione è il processo mediante il quale Mandari verifica che il soggetto che sta tentando di accedere corrisponda realmente all'identità dichiarata.

L'autenticazione non assegna permessi.

Essa risponde esclusivamente alla domanda:

> "Sei davvero chi dichiari di essere?"

Solo dopo una risposta positiva il sistema procede alle verifiche successive.

---

# 14. Separazione tra autenticazione e autorizzazione

Autenticazione e autorizzazione rappresentano due processi distinti.

Autenticazione:

Verifica l'identità.

Autorizzazione:

Verifica cosa quella identità può fare.

Questa separazione costituisce uno dei principi fondamentali dell'architettura di Mandari.

---

# 15. Sessione utente

Dopo l'autenticazione viene aperta una sessione applicativa.

La sessione rappresenta il contesto temporaneo nel quale l'utente interagisce con Mandari.

Durante la sessione vengono mantenute le informazioni necessarie al funzionamento dell'applicazione, senza modificare l'identità dell'utente.

La chiusura della sessione non altera in alcun modo il Fascicolo Amministrativo.

---

# 16. Cambio di ruolo

Durante una stessa sessione un utente può cambiare ruolo.

Ad esempio.

Antonio accede come cittadino.

Successivamente decide di operare come delegato della madre.

L'identità rimane invariata.

Cambiano esclusivamente:

- ruolo attivo;
- Fascicolo selezionato;
- autorizzazioni disponibili.

Ogni cambio di ruolo costituisce un evento registrato.

---

# 17. Cambio del Fascicolo attivo

Mandari non modifica mai il proprietario dei dati.

L'utente cambia esclusivamente il Fascicolo sul quale sta operando.

Schema logico.

```text

Antonio

↓

Ruolo

↓

Fascicolo selezionato

↓

Permessi disponibili

```

Questo principio evita contaminazioni tra Fascicoli differenti.

---

# 18. Autorizzazione

Ogni operazione richiede una verifica preventiva dei permessi.

Il sistema valuta:

- identità;
- ruolo;
- contesto;
- Fascicolo attivo;
- deleghe;
- permessi specifici.

Solo dopo tale verifica l'operazione può essere eseguita.

---

# 19. Principio del minimo privilegio

Ogni ruolo dispone esclusivamente dei permessi strettamente necessari.

Nessun ruolo possiede autorizzazioni superiori a quelle realmente richieste.

Questo principio riduce il rischio di utilizzi impropri e limita gli effetti di eventuali errori.

---

# 20. Modello delle deleghe

Le deleghe rappresentano autorizzazioni temporanee o permanenti con cui un soggetto abilita un'altra identità a operare sul proprio Fascicolo.

La delega non trasferisce la proprietà del Fascicolo.

La delega concede esclusivamente specifici diritti operativi.

---

# 21. Proprietà del Fascicolo

Ogni Fascicolo possiede un solo proprietario.

Il proprietario coincide sempre con il cittadino cui appartengono gli Atti.

Anche quando un altro soggetto opera sul Fascicolo, la proprietà non cambia mai.

Questo principio garantisce la coerenza dell'intero sistema.

---

# 22. Tipologie di autorizzazioni

Le autorizzazioni possono riguardare differenti categorie operative.

Ad esempio.

- consultazione;

- caricamento di Atti;

- modifica di informazioni;

- firma;

- invio di pratiche;

- eliminazione di dati;

- gestione delle deleghe.

Ogni categoria viene verificata separatamente.

---

# 23. Revoca delle autorizzazioni

Una delega può essere revocata.

La revoca produce effetto immediato.

Dal momento della revoca il soggetto perde ogni diritto operativo precedentemente concesso.

Gli Atti già eseguiti rimangono validi e continuano a far parte della cronologia del Fascicolo.

---

# 24. Protezione degli Atti

Gli Atti rappresentano il patrimonio informativo di Mandari.

Ogni Atto deve garantire:

- autenticità;

- integrità;

- reperibilità;

- tracciabilità;

- storicità.

Un Atto non perde mai la propria identità.

Anche nel caso di aggiornamenti o sostituzioni, rimane sempre possibile ricostruire la sua evoluzione.

---

# 25. Immutabilità della cronologia

La cronologia rappresenta la memoria amministrativa del cittadino.

Le registrazioni storiche non vengono eliminate.

Eventuali modifiche generano nuovi eventi senza alterare quelli precedenti.

Questo principio rende possibile ricostruire qualsiasi operazione eseguita nel sistema.

---

# 26. Protezione delle comunicazioni

Ogni comunicazione tra i componenti dell'ecosistema Mandari dovrà garantire:

- riservatezza;

- autenticità;

- integrità.

Questo principio vale per tutte le comunicazioni:

- App ↔ Backend

- WebApp ↔ Backend

- Backend ↔ Database

- Backend ↔ Storage

- Backend ↔ Motori

- Motori ↔ Orchestratore

La protezione delle comunicazioni rappresenta un requisito obbligatorio dell'architettura.

---

# 27. Separazione dei dati

Ogni Fascicolo viene gestito come un dominio informativo indipendente.

I dati appartenenti a Fascicoli differenti non possono essere mescolati durante le elaborazioni.

L'accesso contemporaneo a più Fascicoli è consentito esclusivamente nei casi previsti dal modello delle deleghe.

---

# 28. Principi operativi

Ogni operazione deve poter rispondere alle seguenti domande.

Chi l'ha eseguita?

Su quale Fascicolo?

Con quale ruolo?

Con quali autorizzazioni?

Quando?

Per quale motivo?

Se una di queste informazioni non è disponibile, l'operazione non può essere considerata completamente tracciabile.


# 29. Audit Log

Ogni operazione eseguita all'interno di Mandari deve essere registrata.

L'Audit Log rappresenta il registro storico delle attività del sistema.

La sua finalità non è ricostruire il Fascicolo del cittadino, ma consentire la ricostruzione completa delle operazioni effettuate sul sistema.

---

# 30. Informazioni registrate

Ogni evento di Audit dovrà contenere almeno:

- identificativo dell'evento;
- data e ora;
- identità dell'operatore;
- ruolo utilizzato;
- Fascicolo interessato;
- tipo di operazione;
- esito dell'operazione;
- componente che ha eseguito l'operazione.

Eventuali informazioni aggiuntive potranno essere registrate in funzione del tipo di evento.

---

# 31. Differenza tra Fascicolo e Audit

Il Fascicolo Amministrativo contiene la storia amministrativa del cittadino.

L'Audit Log contiene la storia operativa del sistema.

Esempio.

Antonio carica il proprio ISEE.

Nel Fascicolo verrà registrato:

- nuovo Atto;
- nuova conoscenza;
- nuovi indici.

Nell'Audit Log verrà registrato:

- Antonio ha caricato un Atto;
- data;
- dispositivo;
- esito;
- servizi coinvolti.

Le due informazioni hanno finalità differenti.

---

# 32. Eventi di sicurezza

Oltre alle normali operazioni, Mandari registra gli eventi rilevanti dal punto di vista della sicurezza.

Ad esempio:

- accessi riusciti;
- accessi falliti;
- cambio password;
- modifica dei metodi di autenticazione;
- attivazione di deleghe;
- revoca di deleghe;
- operazioni amministrative critiche.

Questo permette di individuare comportamenti anomali e ricostruire eventuali incidenti.

---

# 33. Gestione degli incidenti

Un incidente di sicurezza rappresenta qualsiasi evento che possa compromettere:

- riservatezza;
- integrità;
- disponibilità;
- autenticità.

Mandari dovrà essere progettato affinché ogni incidente possa essere:

- individuato;
- registrato;
- analizzato;
- contenuto;
- risolto.

---

# 34. Continuità operativa

Il sistema dovrà minimizzare il rischio di perdita del patrimonio informativo.

Per questo motivo l'architettura dovrà prevedere:

- meccanismi di backup;
- procedure di ripristino;
- ridondanza dei componenti critici;
- controllo dell'integrità dei dati.

Le modalità tecniche verranno definite nei documenti dedicati all'infrastruttura.

---

# 35. Sicurezza dell'infrastruttura

La sicurezza applicativa non è sufficiente.

Anche l'infrastruttura dovrà rispettare gli stessi principi.

Rientrano in questo ambito:

- server;
- database;
- storage;
- reti;
- servizi interni;
- sistemi di monitoraggio.

Ogni componente dovrà essere progettato secondo il principio del minimo privilegio.

---

# 36. Responsabilità dei componenti

Ogni componente dell'ecosistema Mandari è responsabile esclusivamente delle proprie funzioni.

Nessun componente dovrà assumere responsabilità appartenenti ad altri servizi.

Questa separazione migliora:

- sicurezza;
- manutenibilità;
- testabilità;
- scalabilità.

---

# 37. Principio della fiducia minima

I componenti del sistema non devono considerarsi reciprocamente affidabili per definizione.

Ogni richiesta deve essere verificata.

Ogni autorizzazione deve essere controllata.

Ogni dato ricevuto deve essere validato.

La sicurezza non deriva dalla fiducia tra i componenti, ma dalle verifiche eseguite ad ogni interazione.

---

# 38. Evoluzione del modello di sicurezza

Il modello di sicurezza dovrà poter evolvere senza modificare l'architettura fondamentale dell'applicazione.

Nuove modalità di autenticazione.

Nuovi ruoli.

Nuove autorizzazioni.

Nuovi requisiti normativi.

Dovranno poter essere introdotti senza compromettere la compatibilità con il resto del sistema.

---

# 39. Relazione con gli altri PRD

Il presente documento definisce esclusivamente i principi architetturali della sicurezza.

L'implementazione concreta verrà descritta nei documenti successivi.

In particolare:

PRD-010 definirà come i componenti comunicano in modo sicuro.

PRD-011 descriverà le modalità con cui i modelli di Intelligenza Artificiale operano rispettando il modello di sicurezza.

PRD-012 definirà le misure di sicurezza dell'infrastruttura durante il deployment.

---

# 40. Decisioni Congelate

✓ Ogni persona possiede una sola identità digitale.

✓ L'identità è distinta dall'account.

✓ Una identità può assumere ruoli differenti.

✓ Le autorizzazioni dipendono dal contesto operativo.

✓ Ogni Fascicolo possiede un solo proprietario.

✓ Le deleghe concedono permessi ma non trasferiscono la proprietà del Fascicolo.

✓ Ogni operazione deve essere autorizzata prima dell'esecuzione.

✓ Ogni operazione deve essere registrata.

✓ Fascicolo Amministrativo e Audit Log rappresentano archivi distinti.

✓ Gli Atti mantengono integrità e tracciabilità per l'intero ciclo di vita.

✓ Tutti i componenti applicano il principio del minimo privilegio.

✓ La sicurezza costituisce un requisito architetturale trasversale dell'intero ecosistema Mandari.



