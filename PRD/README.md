# PRD — Product Requirements Documents

I PRD definiscono **cosa** fa Mandari e **perché**. Descrivono prodotto, esperienza
utente, motori funzionali, orchestratore, modello dati, sicurezza e principi
architetturali — indipendentemente dalla tecnologia (definita nei documenti [ARCH](../ARCH/README.md)).

Ordine di lettura consigliato: dal PRD-000 al PRD-015. Ogni documento assume la
conoscenza dei precedenti. Stato: tutti **FROZEN** (Fase 1 conclusa).

| # | Documento | Contenuto |
|---|---|---|
| 000 | [Guida alla Documentazione](00_Guida_alla_Documentazione.md) | Come è organizzata e va letta la documentazione |
| 001 | [Product Vision](01_Product_Vision.md) | Perché esiste Mandari, mission, posizionamento |
| 002 | [User Model](02_User_Model.md) | Owner, Nucleo Amministrativo, Profili Aggiunti, slot |
| 003 | [User Journey](03_User_Journey.md) | Il percorso dell'utente, dalla scoperta al rinnovo |
| 004 | [Core Features](04_Core_Features.md) | I motori SPETTA, DATA, CARTA, AFFIDO e il Fascicolo |
| 005 | [AI Engine](05_AI_Engine.md) | L'Orchestratore e il processo decisionale |
| 006 | [Architettura Tecnica della Piattaforma](06_Architettura_Tecnica_della_Piattaforma.md) | Servizi, gateway, ciclo di vita della richiesta |
| 007 | [Modello Dati e Fascicolo Amministrativo](07_Modello_Dati_e_Fascicolo_Amministrativo.md) | Atti, metadati, indicizzazione, relazioni |
| 008 | [Architettura Fisica e Persistenza](08_Architettura_Fisica_e_Persistenza.md) | Storage, database, indicizzazione, sincronizzazione |
| 009 | [Sicurezza, Identità e Controllo degli Accessi](09_Sicurezza_Identita_Controllo_degli_Accessi.md) | Identità, ruoli, deleghe, audit |
| 010 | [API e Comunicazioni tra Servizi](10_API_e_Comunicazioni_tra_Servizi.md) | Backend come unico punto di accesso ai dati |
| 011 | [Intelligenza Artificiale e Integrazione](11_Intelligenza_Artificiale_e_Integrazione_tra_Sistemi.md) | Motori AI, Contesto Operativo, spiegabilità |
| 012 | [Deployment, DevOps e Infrastruttura](12_Deployment_DevOps_e_Infrastruttura_Operativa.md) | Ambienti, CI/CD, backup, disaster recovery |
| 013 | [Monitoraggio, Logging e Manutenzione](13_Monitoraggio_Logging_Manutenzione_Operativa.md) | Osservabilità, log, allarmi, manutenzione |
| 014 | [Linee Guida di Sviluppo](14_Linee_Guida_di_Sviluppo.md) | Principi per la scrittura del software |
| 015 | [Revisione Finale dell'Architettura](15_Revisione_Finale_dell_Architettura.md) | Consolidamento e chiusura della fase PRD |
