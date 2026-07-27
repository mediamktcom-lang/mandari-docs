# ARCH-004

# Frontend e Canali di Accesso

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce l'architettura dei punti di accesso al sistema Mandari.

L'obiettivo è consentire al cittadino di utilizzare il servizio attraverso differenti strumenti mantenendo un'esperienza coerente e un unico Backend centrale.

---

# 2. Principio Fondamentale

Mandari non viene progettato come una semplice App.

Mandari viene progettato come una piattaforma di servizi accessibile attraverso molteplici canali.

Il Frontend rappresenta solamente uno dei possibili punti di accesso.

---

# 3. Canali di Accesso

Il sistema dovrà supportare progressivamente:

- WebApp;
- Applicazione Mobile;
- WhatsApp;
- Telegram;
- Facebook Messenger;
- futuri canali compatibili.

Ogni canale dovrà utilizzare gli stessi servizi centrali.

Le differenze tra i canali dovranno riguardare esclusivamente l'interfaccia utente.

---

# 4. Backend Unificato

Tutti i canali dovranno comunicare con un unico Backend.

Il Backend non dovrà contenere logiche differenti in funzione del canale utilizzato.

Ogni richiesta dovrà essere elaborata secondo le stesse regole.

---

# 5. Esperienza Utente

L'esperienza utente dovrà risultare coerente indipendentemente dal canale utilizzato.

Le principali funzionalità dovranno essere disponibili su ogni piattaforma, compatibilmente con le caratteristiche tecniche del canale.

---

# 6. Gestione delle Sessioni

L'identità digitale del cittadino dovrà essere unica.

L'utente potrà utilizzare canali differenti mantenendo lo stesso Fascicolo Amministrativo, la stessa cronologia e le stesse autorizzazioni.

---

# 7. Evoluzione dei Canali

L'aggiunta di un nuovo canale di accesso non dovrà richiedere modifiche sostanziali al Backend.

Ogni nuovo canale dovrà integrarsi utilizzando le API ufficiali del sistema.

---

# 8. Tecnologie Previste

Web

Next.js

Applicazione Mobile

React Native

Canali di messaggistica

API ufficiali dei rispettivi provider.

L'adozione di nuovi framework dovrà essere approvata tramite revisione dei documenti ARCH.

---

# 9. Relazione con gli altri ARCH

Il presente documento definisce esclusivamente i punti di accesso al sistema.

Le logiche applicative rimangono interamente gestite dal Backend.

Le tecnologie AI rimangono definite nel documento ARCH-005.

---

# 10. Decisioni Tecniche Congelate

✓ Mandari è una piattaforma multi-canale.

✓ Il Backend è unico.

✓ Tutti i canali utilizzano le stesse API.

✓ Il Fascicolo Amministrativo è condiviso tra tutti i canali.

✓ L'aggiunta di nuovi canali non modifica l'architettura centrale.

✓ WebApp e App costituiscono i canali principali del progetto.

✓ I canali di messaggistica rappresentano estensioni ufficiali della piattaforma.

