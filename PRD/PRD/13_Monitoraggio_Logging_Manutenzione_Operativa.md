# PRD-013

# Monitoraggio, Logging e Manutenzione Operativa

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce come Mandari osserva il proprio funzionamento, registra gli eventi significativi, individua eventuali anomalie e supporta le attività di manutenzione.

L'obiettivo è garantire che ogni comportamento del sistema possa essere monitorato, analizzato e, se necessario, ricostruito.

---

# 2. Principi del Monitoraggio

Il monitoraggio costituisce una funzione permanente dell'ecosistema.

Ogni componente deve essere osservabile durante il proprio funzionamento.

L'assenza di errori non elimina la necessità di monitorare il sistema.

Monitorare significa conoscere in ogni momento lo stato operativo dell'ecosistema.

---

# 3. Principio del Logging

Ogni componente deve registrare gli eventi significativi prodotti durante il proprio funzionamento.

Un log rappresenta una registrazione tecnica di un evento.

I log consentono di comprendere:

- cosa è accaduto;
- quando è accaduto;
- quale componente era coinvolto;
- quale richiesta era in elaborazione;
- quale risultato è stato prodotto.

---

# 4. Tipologie di Eventi

Il sistema distingue differenti categorie di eventi.

A titolo esemplificativo:

- avvio dei servizi;
- arresto dei servizi;
- autenticazioni;
- errori;
- chiamate API;
- elaborazioni AI;
- accesso agli Atti;
- operazioni amministrative;
- integrazioni con servizi esterni.

Ogni categoria potrà essere monitorata indipendentemente.

---

# 5. Identificativo della Richiesta

Ogni richiesta possiede un identificativo univoco.

Tale identificativo accompagna la richiesta lungo l'intero percorso operativo.

Tutti gli eventi generati durante la stessa elaborazione devono essere riconducibili allo stesso identificativo.

Questo consente la ricostruzione completa del flusso operativo.

---

# 6. Livelli di Logging

Il sistema dovrà distinguere almeno differenti livelli di gravità.

Ad esempio:

- Debug;
- Informazione;
- Avviso;
- Errore;
- Errore Critico.

La classificazione facilita l'analisi operativa.

---

# 7. Tracciabilità

Ogni operazione significativa deve poter essere ricostruita.

La tracciabilità riguarda:

- le richieste ricevute;
- le decisioni dell'Orchestratore;
- i Motori coinvolti;
- gli Atti consultati;
- le risposte restituite;
- gli errori verificatisi.

---

# 8. Monitoraggio delle Prestazioni

Il sistema deve raccogliere informazioni sulle proprie prestazioni.

Tra queste:

- tempo di risposta;
- numero delle richieste;
- utilizzo delle risorse;
- tempi di elaborazione dei Motori AI;
- disponibilità dei servizi.

Queste informazioni consentono di individuare eventuali rallentamenti prima che diventino un problema per il cittadino.


---

# 9. Monitoraggio dei Componenti

Ogni componente dell'ecosistema deve comunicare periodicamente il proprio stato operativo.

Tra i componenti monitorati rientrano almeno:

- Backend API;
- Orchestratore;
- Motori AI;
- Database;
- Storage;
- servizi esterni;
- servizi di autenticazione.

L'obiettivo è individuare rapidamente eventuali anomalie.

---

# 10. Monitoraggio delle Integrazioni Esterne

Le comunicazioni con sistemi esterni devono essere monitorate separatamente.

Ad esempio:

- SPID;
- CIE;
- PagoPA;
- WhatsApp;
- Telegram;
- servizi ministeriali;
- servizi regionali.

Devono essere registrati:

- disponibilità;
- tempi di risposta;
- errori;
- interruzioni del servizio.

---

# 11. Rilevazione delle Anomalie

Il sistema deve essere in grado di individuare comportamenti anomali.

A titolo esemplificativo:

- aumento improvviso degli errori;
- rallentamento delle API;
- Motori AI non disponibili;
- crescita anomala delle richieste;
- problemi di accesso al Database;
- errori ripetuti di autenticazione.

L'individuazione precoce riduce l'impatto sul servizio.

---

# 12. Gestione degli Allarmi

Le anomalie significative devono generare allarmi.

Gli allarmi devono essere classificati secondo il livello di gravità.

Ogni allarme deve contenere almeno:

- componente coinvolto;
- data e ora;
- livello di gravità;
- descrizione sintetica;
- identificativo della richiesta, se presente.

---

# 13. Conservazione dei Log

I log costituiscono patrimonio operativo del sistema.

Devono essere conservati secondo politiche definite dall'infrastruttura.

La conservazione deve garantire:

- integrità;
- disponibilità;
- possibilità di consultazione;
- rispetto delle normative vigenti.

---

# 14. Protezione dei Log

I log non devono contenere informazioni non necessarie.

I dati personali devono essere registrati esclusivamente quando indispensabili.

Le informazioni sensibili devono essere adeguatamente protette.

L'accesso ai log è consentito esclusivamente ai soggetti autorizzati.

---

# 15. Audit Operativo

Il sistema deve consentire la ricostruzione delle attività amministrative.

A titolo esemplificativo:

- caricamento di un Atto;
- eliminazione di un Atto;
- modifica delle deleghe;
- accesso ai Fascicoli;
- modifiche alle configurazioni.

Ogni operazione deve risultare verificabile nel tempo.

---

# 16. Analisi delle Prestazioni

Le informazioni raccolte devono consentire di valutare l'evoluzione del sistema.

Ad esempio:

- crescita degli utenti;
- numero degli Atti archiviati;
- utilizzo dei Motori AI;
- consumo delle risorse;
- tempi medi di risposta.

Queste informazioni supportano le decisioni evolutive dell'infrastruttura.

---

# 17. Manutenzione Preventiva

Il monitoraggio non deve limitarsi alla rilevazione dei guasti.

Le informazioni raccolte devono permettere di individuare situazioni potenzialmente critiche prima che provochino interruzioni del servizio.

La manutenzione preventiva costituisce parte integrante dell'ecosistema Mandari.


---

# 18. Diagnostica del Sistema

L'infrastruttura deve consentire la diagnosi dei problemi senza interrompere il servizio.

Le informazioni raccolte attraverso monitoraggio, log ed eventi devono permettere di individuare rapidamente:

- origine del problema;
- componente coinvolto;
- impatto sul sistema;
- possibili azioni correttive.

La diagnostica rappresenta uno strumento operativo permanente.

---

# 19. Manutenzione Correttiva

Quando viene individuata un'anomalia, il sistema deve consentire un intervento rapido e controllato.

Ogni intervento correttivo deve essere:

- documentato;
- tracciabile;
- verificabile;
- reversibile quando possibile.

L'obiettivo è ripristinare il corretto funzionamento riducendo al minimo l'impatto sugli utenti.

---

# 20. Manutenzione Evolutiva

Mandari dovrà evolvere continuamente.

Le attività evolutive comprendono, a titolo esemplificativo:

- introduzione di nuovi Motori AI;
- nuove integrazioni;
- miglioramento delle prestazioni;
- nuove funzionalità;
- aggiornamenti normativi;
- ottimizzazioni dell'infrastruttura.

L'architettura deve facilitare tali evoluzioni senza compromettere la stabilità del sistema.

---

# 21. Indicatori Operativi

L'infrastruttura deve permettere la misurazione continua delle prestazioni del sistema.

Tra gli indicatori monitorati potranno rientrare:

- disponibilità dei servizi;
- tempo medio di risposta;
- numero di richieste elaborate;
- tasso di errore;
- utilizzo dei Motori AI;
- utilizzo dello Storage;
- crescita del Fascicolo Amministrativo.

Gli indicatori costituiscono uno strumento di governo dell'ecosistema.

---

# 22. Continuità Operativa

Le attività di manutenzione devono essere pianificate in modo da garantire la continuità del servizio.

Quando possibile:

- gli aggiornamenti devono essere progressivi;
- i servizi devono rimanere disponibili;
- eventuali interruzioni devono essere limitate e controllate.

La continuità operativa rappresenta un obiettivo permanente.

---

# 23. Relazione con i Documenti ARCH

Il presente documento definisce esclusivamente i principi di monitoraggio e manutenzione.

Le modalità implementative saranno descritte nei documenti ARCH.

Tra queste:

- piattaforme di monitoraggio;
- sistemi di raccolta log;
- dashboard operative;
- strumenti di alerting;
- strumenti di osservabilità;
- procedure automatiche di manutenzione.

---

# 24. Decisioni Congelate

✓ Tutti i componenti devono essere monitorabili.

✓ Ogni richiesta possiede un identificativo univoco utilizzato lungo l'intero flusso operativo.

✓ Il sistema registra gli eventi significativi mediante log strutturati.

✓ I log devono essere protetti e accessibili esclusivamente ai soggetti autorizzati.

✓ Le integrazioni esterne sono monitorate indipendentemente.

✓ Le anomalie devono generare allarmi classificati per gravità.

✓ Il monitoraggio supporta sia la manutenzione correttiva sia quella preventiva.

✓ L'infrastruttura deve consentire la completa tracciabilità delle operazioni.

✓ Gli indicatori operativi costituiscono uno strumento permanente di governo del sistema.

✓ Le scelte tecnologiche relative agli strumenti di monitoraggio saranno definite nei documenti ARCH.

