---
id: PRD-002
title: User Model
version: 2.0
status: FROZEN
owner: Founder
reviewed_by: CTO
approved_date: 2026-07-14
---

# User Model

## 1. Scopo

Questo documento definisce il modello utenti di Mandari.

Stabilisce chi acquista il servizio, quali persone possono essere gestite, come vengono organizzate e quali regole governano il modello di abbonamento.

Le regole contenute in questo documento costituiscono la base per la progettazione del database, del sistema di autenticazione, delle autorizzazioni e del modello di business.

---

# 2. Principi del modello

Mandari è un assistente amministrativo.

Non descrive le relazioni affettive delle persone.

Non rappresenta qualsiasi forma di convivenza.

Mandari organizza la vita amministrativa e documentale dell'Owner secondo criteri amministrativi e fiscali.

Per questo motivo il modello utenti si basa sul concetto di Nucleo Amministrativo.

---

# 3. Nucleo Amministrativo

Il Nucleo Amministrativo rappresenta il gruppo di persone comprese nell'abbonamento Family.

Come regola di prodotto, il Nucleo Amministrativo coincide con il nucleo familiare dell'Owner rilevante ai fini ISEE.

Questa scelta consente di mantenere il prodotto coerente con la maggior parte delle pratiche fiscali, amministrative e delle prestazioni agevolate gestite da Mandari.

Mandari utilizza questo riferimento esclusivamente come modello organizzativo del servizio.

---

# 4. Owner

L'Owner è il titolare dell'account.

L'Owner è l'unico soggetto che:

- acquista l'abbonamento;
- gestisce il pagamento;
- configura Mandari;
- aggiunge o rimuove persone;
- acquista slot aggiuntivi;
- autorizza la condivisione delle informazioni.

Ogni account possiede un solo Owner.

---

# 5. Persone comprese nell'abbonamento

L'abbonamento Family comprende tutte le persone appartenenti al Nucleo Amministrativo dell'Owner.

Indicativamente possono rientrare:

- Owner;
- coniuge o partner appartenente al nucleo ISEE;
- figli appartenenti al nucleo ISEE;
- altri componenti appartenenti al nucleo ISEE.

Mandari non determina autonomamente il nucleo familiare.

È l'Owner che dichiara la composizione del proprio Nucleo Amministrativo.

---

# 6. Profili Aggiunti

Qualsiasi persona che non appartiene al Nucleo Amministrativo viene definita Profilo Aggiunto.

Esempi:

- padre;
- madre;
- nonno;
- nonna;
- fratello;
- sorella;
- figlio non appartenente al nucleo ISEE;
- ex coniuge;
- qualsiasi altra persona autorizzata.

Ogni Profilo Aggiunto richiede uno slot dedicato.

Il grado di parentela non modifica questa regola.

---

# 7. Slot Aggiuntivi

Gli slot rappresentano la capacità dell'Owner di gestire persone esterne al proprio Nucleo Amministrativo.

Ogni slot consente di gestire una persona aggiuntiva.

Gli slot vengono acquistati annualmente.

Gli slot sono indipendenti dal motivo della gestione.

Mandari non distingue tra genitore, familiare, assistito o altra categoria.

Ai fini del prodotto esistono esclusivamente Profili Aggiunti.

---

# 8. Persona

Ogni persona gestita in Mandari possiede un proprio Profilo Amministrativo.

Ogni profilo contiene esclusivamente informazioni riferite a quella persona.

Tra queste:

- documenti;
- scadenze;
- bonus;
- pratiche;
- cronologia amministrativa;
- informazioni strutturate estratte dai documenti.

Ogni persona mantiene il proprio patrimonio documentale separato dagli altri componenti.

---

# 9. Documenti

Ogni documento appartiene sempre ad almeno una persona.

Un documento può produrre effetti amministrativi su più persone.

In questi casi Mandari mantiene un solo documento, collegandolo ai profili interessati.

Esempi:

- contratto di locazione;
- stato di famiglia;
- attestazione ISEE;
- certificazioni condivise.

---

# 10. Aggiornamento del Nucleo

La composizione del Nucleo Amministrativo può cambiare nel tempo.

Ad ogni rinnovo annuale dell'abbonamento Mandari invita l'Owner a verificare che il proprio Nucleo Amministrativo sia ancora corretto.

Qualora la composizione cambi, l'Owner può aggiornare il proprio spazio senza perdere la cronologia dei documenti.

---

# 11. Consenso

L'Owner è responsabile dell'inserimento delle persone gestite.

Quando previsto dalla normativa vigente, Mandari richiederà e registrerà i consensi necessari alla gestione, conservazione o condivisione dei dati personali.

Ogni autorizzazione dovrà poter essere revocata e ogni operazione dovrà essere tracciata.

---

# 12. Regole di Business

Le seguenti regole sono considerate fondamentali.

- Ogni account possiede un solo Owner.
- Ogni Owner possiede un solo Nucleo Amministrativo.
- Il piano Family comprende esclusivamente il Nucleo Amministrativo.
- Ogni persona esterna al Nucleo Amministrativo è un Profilo Aggiunto.
- Ogni Profilo Aggiunto occupa uno slot.
- Ogni persona possiede un solo Profilo Amministrativo.
- Ogni documento appartiene ad almeno una persona.
- Ogni documento deve appartenere ad una categoria documentale.
- L'Owner mantiene sempre il controllo delle autorizzazioni e delle condivisioni.

---

# 13. Principi progettuali

Il modello utenti di Mandari deve rispettare i seguenti principi.

- Semplicità.
- Chiarezza.
- Coerenza amministrativa.
- Separazione dei patrimoni documentali.
- Scalabilità.
- Nessuna distinzione basata sul grado di parentela.
- Nessuna logica costruita sulle relazioni affettive.
- Ogni regola deve essere facilmente comprensibile dall'utente finale.

---

# 14. Criteri di Accettazione

Il modello utenti sarà considerato corretto quando consentirà di rappresentare senza modifiche strutturali:

- una persona single;
- una coppia appartenente allo stesso nucleo amministrativo;
- una famiglia con figli;
- una famiglia con figli maggiorenni ancora appartenenti al nucleo;
- una persona che desidera gestire uno o più genitori;
- una persona che desidera gestire fratelli o sorelle;
- una persona che desidera gestire qualsiasi altro soggetto esterno al proprio nucleo.

In tutti questi casi il comportamento del sistema dovrà essere deterministico, semplice e coerente con le regole di business definite nel presente documento.
