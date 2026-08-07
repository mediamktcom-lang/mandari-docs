# PRD-014

# Linee Guida di Sviluppo

Versione: 1.0

Stato: FROZEN

---

# 1. Scopo del documento

Il presente documento definisce i principi che dovranno guidare lo sviluppo del software Mandari.

Non introduce nuove funzionalità.

Stabilisce invece le regole che ogni sviluppo futuro dovrà rispettare per mantenere il sistema coerente, evolvibile e facilmente manutenibile.

---

# 2. Principio Fondamentale

Ogni riga di codice deve rappresentare una decisione architetturale già approvata.

Il codice non costituisce il luogo in cui si prendono decisioni progettuali.

Le decisioni vengono definite nei PRD e nei documenti ARCH.

Lo sviluppo ha il compito di implementarle.

---

# 3. Coerenza Architetturale

Ogni nuovo componente deve rispettare l'architettura definita.

Non sono ammesse implementazioni che introducano percorsi alternativi o eccezioni non documentate.

L'evoluzione del sistema deve avvenire senza compromettere la coerenza dell'ecosistema.

---

# 4. Responsabilità Unica

Ogni componente software deve possedere una responsabilità chiaramente identificabile.

Un componente non deve svolgere attività appartenenti ad altri livelli dell'architettura.

Questa regola facilita:

- manutenzione;
- test;
- riutilizzo;
- evoluzione.

---

# 5. Modularità

Il software deve essere organizzato in moduli indipendenti.

Ogni modulo deve poter evolvere senza richiedere modifiche agli altri moduli, salvo i contratti definiti dalle API.

La modularità costituisce uno dei principi fondamentali dell'ecosistema Mandari.

---

# 6. Riutilizzo

Prima di introdurre nuovo codice occorre verificare se esista già una soluzione riutilizzabile.

La duplicazione della logica deve essere evitata.

Le funzionalità comuni devono essere centralizzate.

---

# 7. Semplicità

Tra due soluzioni funzionalmente equivalenti deve essere preferita quella più semplice.

La semplicità riduce:

- errori;
- costi di manutenzione;
- tempi di sviluppo;
- difficoltà di comprensione.

---

# 8. Leggibilità

Il codice deve essere scritto per essere letto prima ancora che eseguito.

La leggibilità costituisce un requisito di qualità.

Nomi, strutture e organizzazione devono favorire la comprensione del sistema da parte di altri sviluppatori.


---

# 9. Convenzioni di Codifica

Il progetto dovrà adottare convenzioni di codifica uniformi.

Tutti i componenti dovranno rispettare lo stesso stile di sviluppo.

Le convenzioni riguardano almeno:

- nomenclatura;
- struttura delle cartelle;
- organizzazione dei moduli;
- documentazione del codice;
- gestione degli errori.

La standardizzazione riduce la complessità del progetto.

---

# 10. Gestione degli Errori

Ogni errore deve essere gestito.

Gli errori non devono produrre comportamenti imprevedibili.

Ogni componente deve:

- intercettare gli errori;
- registrarli nei log;
- restituire informazioni coerenti;
- consentire il recupero quando possibile.

---

# 11. Testabilità

Ogni componente deve essere progettato per poter essere testato in modo indipendente.

Le dipendenze devono essere ridotte al minimo.

La progettazione deve facilitare:

- test unitari;
- test di integrazione;
- test end-to-end.

La qualità del software dipende anche dalla facilità con cui può essere verificato.

---

# 12. Documentazione del Codice

Il codice deve essere autoesplicativo.

La documentazione aggiuntiva deve descrivere:

- motivazioni delle scelte;
- comportamento dei componenti;
- contratti delle API;
- casi particolari.

La documentazione non deve sostituire un codice scritto correttamente.

---

# 13. Compatibilità

Le modifiche devono preservare la compatibilità con i componenti esistenti, salvo esplicite decisioni architetturali.

Quando una modifica rompe la compatibilità dovrà essere pianificata una strategia di migrazione.

---

# 14. Sicurezza nello Sviluppo

Ogni nuova funzionalità deve essere progettata considerando la sicurezza fin dall'inizio.

La sicurezza non rappresenta una fase successiva dello sviluppo.

Ogni componente deve rispettare:

- autenticazione;
- autorizzazione;
- protezione dei dati;
- validazione degli input;
- gestione sicura degli errori.

---

# 15. Evoluzione Controllata

L'introduzione di nuove funzionalità deve avvenire senza compromettere la stabilità del sistema.

Ogni evoluzione deve essere:

- progettata;
- documentata;
- verificata;
- approvata.

L'architettura deve crescere senza perdere coerenza.

---

# 16. Debito Tecnico

Il debito tecnico deve essere ridotto al minimo.

Quando, per esigenze progettuali, viene introdotto debito tecnico, esso deve essere:

- documentato;
- motivato;
- pianificato per la successiva rimozione.

Il debito tecnico non può diventare parte permanente dell'architettura.

---

# 17. Revisione del Codice

Ogni modifica significativa deve essere sottoposta a revisione.

La revisione verifica almeno:

- rispetto dell'architettura;
- qualità del codice;
- sicurezza;
- semplicità;
- conformità agli standard del progetto.

---

# 18. Principio di Estensibilità

Ogni componente deve essere progettato assumendo che in futuro verrà esteso.

Le nuove funzionalità devono poter essere aggiunte senza modificare pesantemente il codice esistente.

L'estensibilità rappresenta un requisito permanente dell'ecosistema.

---

# 19. Relazione con i Documenti ARCH

I presenti principi guidano lo sviluppo del software.

Le tecnologie, i framework, i linguaggi e gli strumenti utilizzati saranno definiti nei documenti ARCH.

I documenti ARCH dovranno rispettare integralmente le linee guida definite nel presente PRD.

---

# 20. Decisioni Congelate

✓ Le decisioni progettuali vengono prese nei PRD e negli ARCH, non nel codice.

✓ Ogni componente possiede una responsabilità unica.

✓ Il software è organizzato in moduli indipendenti.

✓ Il riutilizzo del codice prevale sulla duplicazione.

✓ La semplicità rappresenta un principio progettuale.

✓ Il codice deve essere leggibile e facilmente manutenibile.

✓ Ogni componente deve essere testabile.

✓ Ogni errore deve essere gestito in modo controllato.

✓ La sicurezza deve essere considerata fin dalla progettazione.

✓ L'evoluzione del sistema deve preservare la coerenza architetturale.

✓ Il debito tecnico deve essere limitato, documentato e pianificato.

✓ Ogni modifica significativa deve essere revisionata.

✓ Le scelte implementative saranno formalizzate nei documenti ARCH.

