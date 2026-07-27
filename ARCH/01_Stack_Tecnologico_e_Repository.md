# ARCH-001

# Stack Tecnologico e Repository

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce le tecnologie ufficiali adottate per lo sviluppo di Mandari.

L'obiettivo è eliminare qualsiasi ambiguità tecnica, garantendo che tutti gli sviluppatori utilizzino gli stessi strumenti e le stesse convenzioni.

Le decisioni contenute nel presente documento costituiscono lo standard tecnico dell'intero progetto.

---

# 2. Principi di progettazione tecnica

Le tecnologie selezionate devono rispettare i principi definiti nei documenti PRD.

In particolare dovranno garantire:

- modularità;
- scalabilità;
- sicurezza;
- semplicità;
- manutenibilità;
- elevata disponibilità di documentazione;
- ampia diffusione nella comunità di sviluppo.

Le scelte tecnologiche devono privilegiare soluzioni mature e consolidate.

---

# 3. Stack Tecnologico

Mandari adotterà uno stack tecnologico moderno, stabile e ampiamente diffuso.

Le tecnologie selezionate dovranno garantire:

- affidabilità;
- semplicità di manutenzione;
- elevata documentazione;
- ampia disponibilità di sviluppatori;
- elevata compatibilità con l'ecosistema AI.

Le tecnologie ufficiali saranno definite nei paragrafi successivi del presente documento.

---

# 4. Repository

L'intero progetto sarà mantenuto all'interno di un repository Git centralizzato.

Il repository rappresenta l'unica fonte ufficiale del codice e della documentazione.

Tutti gli sviluppi dovranno transitare attraverso il repository.

La struttura delle cartelle dovrà rispettare l'organizzazione definita nei documenti ARCH.

---

# 5. Convenzioni di sviluppo

Tutto il codice dovrà rispettare convenzioni comuni.

In particolare dovranno essere uniformi:

- nomenclatura dei file;
- organizzazione delle cartelle;
- struttura dei moduli;
- stile del codice;
- documentazione tecnica.

L'obiettivo è garantire uniformità tra tutti i componenti del progetto.

---

# 6. Gestione delle dipendenze

Ogni libreria utilizzata dovrà essere dichiarata esplicitamente.

Le dipendenze dovranno essere:

- versionate;
- documentate;
- facilmente aggiornabili;
- compatibili con lo stack tecnologico adottato.

L'utilizzo di librerie non documentate non è consentito.

---

# 7. Gestione degli ambienti

Il progetto dovrà distinguere chiaramente gli ambienti di lavoro.

Saranno previsti almeno:

- ambiente di sviluppo;
- ambiente di test;
- ambiente di produzione.

Ogni ambiente dovrà essere configurato indipendentemente.

Le modifiche effettuate durante lo sviluppo non dovranno influenzare l'ambiente di produzione.

---

# 8. Versionamento

Ogni modifica al progetto dovrà essere tracciata.

Il versionamento consentirà di:

- ricostruire la storia del progetto;
- recuperare versioni precedenti;
- lavorare contemporaneamente su nuove funzionalità;
- garantire la stabilità del software.

Il repository Git rappresenta lo strumento ufficiale di versionamento.

---

# 9. Relazione con gli altri documenti ARCH

Il presente documento definisce esclusivamente lo stack tecnologico generale.

I documenti ARCH successivi definiranno nel dettaglio:

- Backend;
- Database;
- Frontend;
- AI;
- DevOps;
- Deployment.

---

# 10. Decisioni Tecniche Congelate

✓ Il progetto utilizza un unico repository Git.

✓ Lo stack tecnologico deve essere uniforme per tutto il progetto.

✓ Tutte le dipendenze devono essere documentate e versionate.

✓ Gli ambienti di sviluppo, test e produzione sono separati.

✓ Tutto il codice deve rispettare convenzioni comuni.

✓ I documenti ARCH costituiscono il riferimento tecnico ufficiale del progetto.

