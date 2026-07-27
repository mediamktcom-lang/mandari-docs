# ARCH-003

# Database, Storage e Gestione Documentale

Versione: 2.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce l'architettura di persistenza delle informazioni di Mandari.

L'obiettivo è stabilire come vengono conservati:

- dati strutturati;
- conoscenza amministrativa;
- documenti originali.

Le decisioni contenute nel presente documento hanno l'obiettivo di garantire:

- scalabilità;
- sicurezza;
- riduzione dei costi;
- rispetto della privacy;
- indipendenza tecnologica.

---

# 2. Principio Fondamentale

Mandari distingue chiaramente:

- informazioni;
- conoscenza;
- documenti.

Le informazioni e la conoscenza costituiscono il patrimonio del sistema.

I documenti originali rimangono proprietà del cittadino.

Mandari non richiede necessariamente la conservazione permanente dei documenti originali.

---

# 3. Database

Tecnologia scelta

PostgreSQL

Piattaforma

Supabase

Funzione

Il Database conserva esclusivamente dati strutturati.

Ad esempio:

- utenti;
- fascicoli;
- atti;
- notifiche;
- scadenze;
- cronologia;
- configurazioni;
- autorizzazioni.

Il Database non conserva documenti PDF.

---

# 4. Conoscenza Estratta

Durante il caricamento di un documento, Mandari esegue automaticamente:

- OCR;
- estrazione delle informazioni;
- classificazione;
- indicizzazione;
- generazione degli Atti;
- creazione degli Embedding.

La conoscenza estratta diventa patrimonio permanente del Fascicolo Amministrativo.

La disponibilità della conoscenza non dipende dalla presenza del documento originale.

---

# 5. Storage Documentale

Mandari utilizza un modello di Storage Ibrido.

Il documento originale può essere conservato:

- nello Storage di Mandari;
- nel cloud personale dell'utente;
- su un dispositivo dell'utente;
- presso futuri provider compatibili.

Mandari non impone una posizione fisica unica dei documenti.

---

# 6. Storage Provider

Mandari introduce il concetto di Storage Provider.

Uno Storage Provider rappresenta il sistema fisico che ospita i documenti.

Esempi di Storage Provider:

- Mandari Storage;
- Google Drive;
- Apple iCloud;
- Microsoft OneDrive;
- Dropbox;
- NAS personale;
- memoria locale del dispositivo.

Il Backend comunica esclusivamente con il Provider selezionato.

L'architettura rimane indipendente dalla posizione fisica dei documenti.

---

# 7. Gestione del Documento

Il ciclo di vita di un documento è il seguente.

Caricamento

↓

OCR

↓

Estrazione dati

↓

Creazione degli Atti

↓

Indicizzazione

↓

Generazione Embedding

↓

Aggiornamento Fascicolo

↓

Memorizzazione presso lo Storage Provider scelto.

Il documento originale rappresenta l'origine della conoscenza.

La conoscenza estratta diventa invece parte permanente del sistema.

---

# 8. Vantaggi Architetturali

Il modello adottato consente:

- riduzione dei costi di storage;
- minore responsabilità nella conservazione dei documenti;
- maggiore libertà per l'utente;
- possibilità di cambiare Storage Provider senza modificare il Backend;
- elevata scalabilità.

Il patrimonio informativo di Mandari rimane costituito dagli Atti e dalla conoscenza amministrativa.

---

# 9. Tecnologie Scelte

Database

PostgreSQL

Backend Database

Supabase

Storage Mandari

Supabase Storage

Storage esterni supportati (inizialmente)

- Google Drive
- Apple iCloud
- Microsoft OneDrive
- Dropbox

L'architettura prevede l'aggiunta futura di ulteriori Storage Provider senza modificare il modello dati.

---

# 10. Decisioni Tecniche Congelate

✓ PostgreSQL costituisce il database ufficiale del progetto.

✓ Supabase rappresenta la piattaforma iniziale del Database.

✓ Mandari distingue Database e Storage.

✓ Il Database conserva esclusivamente dati strutturati.

✓ La conoscenza amministrativa viene estratta e conservata indipendentemente dal documento originale.

✓ Il documento originale può essere conservato presso Storage Provider differenti.

✓ Lo Storage rappresenta un componente sostituibile dell'architettura.

✓ Mandari non è proprietario dei documenti del cittadino, ma della conoscenza amministrativa che da essi deriva.

✓ Ogni futuro Storage Provider dovrà rispettare l'interfaccia definita dal Backend.

✓ L'architettura di persistenza del progetto viene dichiarata congelata.

