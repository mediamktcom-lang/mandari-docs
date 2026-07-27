# ARCH-005

# Identity, Client e Session Management

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce il modello di identificazione dell'utente, la gestione dei client collegati e delle sessioni di lavoro.

L'obiettivo è garantire che ogni cittadino disponga di una sola identità digitale all'interno di Mandari, indipendentemente dal canale utilizzato.

---

# 2. Principio Fondamentale

Ogni cittadino possiede una sola identità digitale.

L'identità è indipendente:

- dal dispositivo;
- dal browser;
- dall'applicazione;
- dal client di messaggistica.

Tutti i canali utilizzano la medesima identità.

---

# 3. Client

Mandari distingue l'utente dai client.

Un client rappresenta esclusivamente un punto di accesso.

Esempi:

- WebApp;
- Applicazione Mobile;
- WhatsApp;
- Telegram;
- Facebook Messenger;
- futuri canali compatibili.

Ogni client può essere collegato o scollegato senza modificare l'identità del cittadino.

---

# 4. Autenticazione

L'autenticazione identifica il cittadino.

Le modalità previste sono:

- SPID;
- Carta d'Identità Elettronica (CIE);
- e-mail e password;
- ulteriori sistemi approvati.

L'autenticazione avviene esclusivamente durante il collegamento iniziale di un nuovo client o quando richiesto per motivi di sicurezza.

---

# 5. Collegamento di un Client

Quando un nuovo client comunica con Mandari per la prima volta, il sistema richiede il collegamento all'identità digitale del cittadino.

Una volta completata la procedura, il client viene registrato come autorizzato.

Le comunicazioni successive potranno avvenire senza ripetere il processo di collegamento, salvo revoca o perdita della sessione.

---

# 6. Sessioni

Ogni client mantiene una propria sessione.

La chiusura della sessione di un client non influisce sulle sessioni degli altri client collegati.

Il Backend gestisce centralmente tutte le sessioni attive.

---

# 7. Sicurezza

Il cittadino potrà:

- visualizzare tutti i client collegati;
- revocare un client;
- scollegare tutti i dispositivi;
- autorizzare nuovi client.

Ogni operazione di sicurezza verrà registrata dal sistema.

---

# 8. Abbonamento

L'abbonamento appartiene esclusivamente all'identità digitale del cittadino.

Non appartiene:

- al dispositivo;
- all'applicazione;
- al client utilizzato.

Una volta attivato, l'abbonamento risulta disponibile su tutti i client autorizzati.

---

# 9. Gestione dei Pagamenti

I pagamenti vengono gestiti esclusivamente attraverso i canali ufficiali di Mandari.

I client di messaggistica non gestiscono direttamente il processo di pagamento.

Quando necessario, il cittadino viene indirizzato verso una pagina sicura del proprio account per completare l'operazione.

Una volta completato il pagamento, l'abilitazione viene propagata automaticamente a tutti i client collegati.

---

# 10. Decisioni Tecniche Congelate

✓ Una sola identità digitale per ogni cittadino.

✓ I client rappresentano esclusivamente punti di accesso.

✓ L'identità è indipendente dai dispositivi.

✓ L'abbonamento appartiene all'identità e non ai client.

✓ Il Backend gestisce centralmente identità, sessioni e autorizzazioni.

✓ I client di messaggistica utilizzano le stesse API degli altri canali.

✓ I pagamenti avvengono esclusivamente tramite i canali ufficiali di Mandari.

✓ Tutti i client autorizzati condividono lo stesso Fascicolo Amministrativo.

✓ L'architettura di Identity Management viene dichiarata congelata.
