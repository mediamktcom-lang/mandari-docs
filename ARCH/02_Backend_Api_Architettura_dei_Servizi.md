# ARCH-002

# Backend, API e Architettura dei Servizi

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce l'architettura del Backend di Mandari.

Vengono stabilite le tecnologie utilizzate, il modello di comunicazione tra i componenti e le regole che governano tutti i servizi applicativi.

Il Backend costituisce il punto centrale dell'intero ecosistema.

---

# 2. Backend

Tecnologia scelta

Python

Framework

FastAPI

Server applicativo

Uvicorn

Motivazione

Python rappresenta lo standard de facto nello sviluppo di piattaforme AI.

FastAPI garantisce elevate prestazioni, semplicità di sviluppo e piena integrazione con l'ecosistema Python.

Alternative valutate

- Node.js
- NestJS
- Spring Boot
- ASP.NET Core

Motivazione dell'esclusione

Pur essendo tecnologie mature, risultano meno integrate con l'attuale ecosistema AI e richiederebbero maggiore complessità nell'integrazione dei modelli linguistici.

---

# 3. API

Tecnologia scelta

REST API

Documentazione automatica

OpenAPI (Swagger)

Formato dati

JSON

Motivazione

REST rappresenta lo standard più diffuso per la comunicazione tra servizi.

---

# 4. Architettura dei Servizi

Il Backend di Mandari sarà organizzato come un insieme di servizi specializzati.

Ogni servizio avrà una responsabilità ben definita e comunicherà esclusivamente tramite API interne.

La separazione dei servizi consente di migliorare la manutenzione, la scalabilità e la sicurezza del sistema.

---

# 5. Organizzazione del Backend

Il Backend sarà suddiviso in moduli funzionali.

Ogni modulo gestirà un'area specifica dell'applicazione, ad esempio:

- autenticazione;
- gestione utenti;
- fascicolo amministrativo;
- gestione degli Atti;
- orchestrazione delle richieste;
- notifiche;
- integrazione con i motori AI.

Nessun modulo dovrà accedere direttamente alle responsabilità di un altro modulo senza utilizzare le API interne.

---

# 6. Sicurezza del Backend

Il Backend rappresenta il punto centrale di controllo dell'intero ecosistema.

Ogni richiesta dovrà essere:

- autenticata;
- autorizzata;
- validata;
- registrata nei log.

Il Backend non dovrà mai esporre direttamente database o servizi interni all'esterno.

---

# 7. Scalabilità

L'architettura del Backend dovrà consentire la crescita progressiva del sistema.

L'aumento del numero di utenti non dovrà richiedere modifiche sostanziali all'architettura.

Nuovi moduli e nuovi servizi dovranno poter essere aggiunti mantenendo la compatibilità con quelli esistenti.

La scalabilità rappresenta un requisito permanente del progetto.

---

# 8. Tecnologie escluse

Per garantire uniformità tecnologica vengono escluse, salvo futura revisione architetturale, le seguenti soluzioni come tecnologia principale del Backend:

- Node.js
- NestJS
- Spring Boot
- ASP.NET Core
- Ruby on Rails
- Laravel

Tali tecnologie sono considerate valide, ma non rappresentano la scelta più adatta per una piattaforma AI come Mandari.

La loro eventuale introduzione dovrà essere approvata tramite revisione dei documenti ARCH.

---

# 9. Relazione con gli altri documenti ARCH

Il presente documento definisce esclusivamente l'architettura generale del Backend.

I documenti successivi descriveranno nel dettaglio:

- il Database;
- lo Storage documentale;
- l'architettura AI;
- il Frontend;
- il Deployment;
- l'infrastruttura.

Ogni documento dovrà rispettare integralmente le decisioni contenute nel presente ARCH.

---

# 10. Decisioni Tecniche Congelate

✓ Il Backend di Mandari sarà sviluppato in Python.

✓ Il framework ufficiale sarà FastAPI.

✓ Il server applicativo sarà Uvicorn.

✓ La comunicazione utilizzerà REST API.

✓ Il formato dati ufficiale sarà JSON.

✓ La documentazione delle API sarà generata tramite OpenAPI (Swagger).

✓ Il Backend sarà organizzato in moduli con responsabilità ben definite.

✓ Tutte le comunicazioni tra i componenti dovranno avvenire tramite API.

✓ Il Backend costituirà il punto centrale di accesso ai servizi dell'intero ecosistema.

✓ Ogni futura evoluzione dovrà mantenere la compatibilità con questa architettura.


JSON garantisce semplicità, leggibilità e compatibilità universale.

