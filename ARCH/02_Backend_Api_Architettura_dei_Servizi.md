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

JSON garantisce semplicità, leggibilità e compatibilità universale.

