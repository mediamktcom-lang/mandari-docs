# PRD-011

# Intelligenza Artificiale e Integrazione dei Modelli

Versione: 1.0

Stato: Review

---

# 1. Scopo del documento

Il presente documento definisce il modello di funzionamento dell'Intelligenza Artificiale all'interno dell'ecosistema Mandari.

L'obiettivo non è scegliere uno specifico modello AI o un determinato fornitore tecnologico, ma stabilire le regole con cui l'Intelligenza Artificiale opera, riceve informazioni, produce risposte e collabora con gli altri componenti del sistema.

---

# 2. Principio fondamentale

L'Intelligenza Artificiale rappresenta uno strumento del sistema e non il sistema stesso.

Le responsabilità rimangono chiaramente separate.

- Il Backend gestisce i dati e la sicurezza.
- L'Orchestratore coordina il flusso operativo.
- I Motori AI elaborano esclusivamente il compito ricevuto.
- Il Database conserva i dati.
- Lo Storage conserva gli Atti.

L'AI non prende decisioni architetturali e non modifica direttamente i dati persistenti.

---

# 3. Modelli AI

Mandari non dipende da un singolo modello di Intelligenza Artificiale.

Ogni Motore può utilizzare il modello più adatto al proprio dominio operativo.

A titolo esemplificativo:

- modelli linguistici;
- modelli OCR;
- modelli di estrazione dati;
- modelli di classificazione;
- modelli di ricerca semantica;
- modelli di ragionamento.

La sostituzione di un modello non modifica l'architettura del sistema purché venga mantenuto il contratto funzionale del Motore.

---

# 4. Specializzazione dei Motori

Ogni Motore AI possiede una responsabilità precisa.

Un Motore non tenta di risolvere problemi appartenenti ad altri domini.

La specializzazione consente:

- maggiore precisione;
- minore complessità;
- migliore controllo della qualità;
- sostituibilità del modello;
- evoluzione indipendente dei Motori.

---

# 5. Contesto Operativo

Prima di elaborare una richiesta, ogni Motore riceve un Contesto Operativo costruito dall'Orchestratore.

Il Contesto rappresenta esclusivamente le informazioni necessarie allo svolgimento dello specifico compito.

Nessun Motore riceve automaticamente l'intero Fascicolo Amministrativo del cittadino.

Questo principio riduce:

- il consumo di risorse;
- l'esposizione dei dati;
- il rischio di errori;
- il rischio di allucinazioni.

---

# 6. Costruzione del Contesto

Per costruire il Contesto Operativo, l'Orchestratore richiede al Backend esclusivamente gli elementi necessari.

A titolo esemplificativo:

- Atti;
- informazioni estratte dagli Atti;
- dati strutturati;
- autorizzazioni;
- dati temporali;
- conoscenze già indicizzate.

Il Backend recupera tali informazioni dal Database e dallo Storage e restituisce all'Orchestratore un insieme coerente di dati.

L'Orchestratore costruisce quindi il Contesto da inviare al Motore AI interessato.

---

# 7. Sessione Operativa

Ogni richiesta viene elaborata all'interno di una Sessione Operativa.

La Sessione Operativa accompagna l'intero ciclo di elaborazione.

Essa può contenere:

- identità del cittadino;
- ruolo attivo;
- Fascicolo selezionato;
- deleghe attive;
- canale utilizzato;
- identificativo univoco della richiesta;
- stato dell'elaborazione.

La Sessione Operativa viene eliminata al termine della richiesta e non costituisce memoria permanente.

---

# 8. Isolamento dei Motori

I Motori AI non comunicano direttamente tra loro.

Ogni Motore riceve esclusivamente il proprio Contesto Operativo dall'Orchestratore.

Ogni risultato prodotto viene restituito all'Orchestratore, che decide i passi successivi.

Questo principio mantiene il basso accoppiamento tra i componenti e garantisce la sostituibilità dei Motori senza impatti sull'architettura complessiva.


---

# 9. Flusso di Elaborazione di una Richiesta

Ogni richiesta segue un flusso operativo ben definito.

1. Il Client invia una richiesta al Backend API.

2. Il Backend autentica il cittadino e verifica le autorizzazioni.

3. Il Backend inoltra la richiesta all'Orchestratore.

4. L'Orchestratore interpreta l'obiettivo della richiesta.

5. L'Orchestratore costruisce il piano di elaborazione.

6. L'Orchestratore richiede al Backend esclusivamente gli elementi necessari.

7. Il Backend recupera gli Atti e le informazioni richieste.

8. L'Orchestratore costruisce il Contesto Operativo.

9. Il Contesto viene inviato ai Motori AI necessari.

10. I risultati vengono restituiti all'Orchestratore.

11. L'Orchestratore produce la risposta finale.

12. Il Backend restituisce la risposta al Client.

---

# 10. Interpretazione della Richiesta

L'Orchestratore non interpreta una richiesta sulla base delle parole utilizzate dal cittadino, ma sulla base dell'obiettivo.

Domande formulate in modi differenti ma con lo stesso significato devono produrre lo stesso piano operativo.

Ad esempio:

- "Quando scade il mio ISEE?"
- "Devo rifare l'ISEE?"
- "Il mio ISEE è ancora valido?"

rappresentano la medesima esigenza informativa.

---

# 11. Selezione dei Motori

L'Orchestratore seleziona dinamicamente i Motori AI da coinvolgere.

La selezione dipende esclusivamente dal tipo di richiesta.

Non esistono sequenze fisse.

Una richiesta può coinvolgere:

- un solo Motore;
- più Motori in sequenza;
- più Motori in parallelo.

L'ordine viene deciso dall'Orchestratore.

---

# 12. Cooperazione tra Motori

I Motori collaborano esclusivamente attraverso l'Orchestratore.

Nessun Motore conosce l'esistenza degli altri.

Ogni Motore riceve:

- il proprio Contesto Operativo;
- il compito da svolgere;
- gli eventuali risultati già prodotti da altri Motori, se autorizzati dall'Orchestratore.

Questo mantiene indipendenti i componenti.

---

# 13. Gestione dell'Incertezza

Un Motore AI non è obbligato a produrre una risposta.

Quando il Contesto Operativo non contiene informazioni sufficienti oppure il livello di affidabilità risulta insufficiente, il Motore deve dichiarare l'incertezza.

L'Orchestratore potrà:

- interrogare altri Motori;
- recuperare ulteriori Atti;
- richiedere informazioni aggiuntive al cittadino;
- interrompere l'elaborazione.

L'obiettivo è privilegiare l'affidabilità rispetto alla completezza.

---

# 14. Riduzione delle Allucinazioni

Per ridurre il rischio di generare informazioni errate, ogni Motore deve lavorare esclusivamente sulle informazioni presenti nel Contesto Operativo.

Il Motore non deve inventare dati mancanti.

Quando il dato non è disponibile deve dichiararlo esplicitamente.

La produzione di risposte plausibili ma non verificabili è considerata un comportamento non conforme.

---

# 15. Motivazione delle Risposte

Ogni risposta prodotta da Mandari deve poter essere ricondotta alle informazioni utilizzate.

Quando possibile, il sistema deve conoscere:

- quale Atto è stato utilizzato;
- quale conoscenza è stata estratta;
- quale regola normativa è stata applicata;
- quale Motore ha contribuito alla risposta.

Questo principio garantisce trasparenza e verificabilità.

---

# 16. Controllo della Qualità

L'Orchestratore valuta la coerenza complessiva dei risultati ricevuti.

Qualora emergano incongruenze tra i risultati dei diversi Motori, l'Orchestratore può:

- richiedere una nuova elaborazione;
- coinvolgere un ulteriore Motore;
- chiedere chiarimenti al cittadino;
- restituire una risposta parziale.

---

# 17. Evoluzione dei Motori

Ogni Motore può essere aggiornato o sostituito senza modificare gli altri componenti dell'ecosistema.

L'unico requisito è il rispetto del contratto funzionale definito dalle API.

L'evoluzione di un Motore non deve richiedere modifiche all'Orchestratore né agli altri Motori.

---

# 18. Indipendenza dal Modello AI

Mandari non dipende da uno specifico fornitore di Intelligenza Artificiale.

Nel tempo potranno convivere modelli differenti.

La scelta del modello migliore costituisce una decisione implementativa e non modifica il comportamento architetturale definito nel presente documento.


---

# 19. Apprendimento del Sistema

Mandari non modifica autonomamente le proprie regole decisionali.

L'Intelligenza Artificiale non apprende automaticamente dalle conversazioni con i cittadini.

Ogni evoluzione delle capacità del sistema avviene esclusivamente attraverso:

- aggiornamenti dei modelli;
- aggiornamenti delle basi di conoscenza;
- aggiornamenti delle regole applicative;
- nuove versioni dei Motori AI.

In questo modo il comportamento del sistema rimane controllabile e verificabile.

---

# 20. Utilizzo della Memoria

I Motori AI non possiedono memoria permanente.

Ogni elaborazione viene eseguita esclusivamente sul Contesto Operativo ricevuto.

Le informazioni permanenti appartengono esclusivamente al Fascicolo Amministrativo e alle basi dati gestite dal Backend.

L'eventuale memoria conversazionale è limitata alla Sessione Operativa e termina con la conclusione della richiesta.

---

# 21. Spiegabilità delle Decisioni

Ogni risposta prodotta da Mandari deve poter essere spiegata.

Il sistema deve essere in grado di ricostruire:

- gli Atti consultati;
- le informazioni utilizzate;
- i Motori coinvolti;
- il percorso logico seguito dall'Orchestratore.

La spiegabilità costituisce un requisito fondamentale per garantire fiducia e trasparenza.

---

# 22. Limiti dell'Intelligenza Artificiale

L'Intelligenza Artificiale rappresenta uno strumento di supporto.

Essa non sostituisce:

- il cittadino;
- il professionista;
- l'ente pubblico;
- il legislatore.

Le decisioni aventi effetti giuridici rimangono di competenza dei soggetti autorizzati.

Mandari assiste il cittadino nella comprensione, nell'organizzazione e nell'esecuzione delle attività amministrative.

---

# 23. Sicurezza delle Elaborazioni

I Motori AI ricevono esclusivamente le informazioni strettamente necessarie alla richiesta.

I dati non indispensabili non vengono trasmessi.

L'Orchestratore applica il principio del minimo privilegio nella costruzione del Contesto Operativo.

Ogni elaborazione deve rispettare le regole di sicurezza e riservatezza definite nei documenti precedenti.

---

# 24. Scalabilità dell'Intelligenza Artificiale

L'architettura deve consentire l'aggiunta di nuovi Motori AI senza modificare quelli esistenti.

Nuove competenze potranno essere introdotte attraverso:

- nuovi Motori;
- nuove strategie dell'Orchestratore;
- nuovi modelli di Intelligenza Artificiale.

L'evoluzione delle capacità cognitive di Mandari non deve richiedere modifiche all'architettura generale del sistema.

---

# 25. Relazione con gli altri PRD

Il presente documento definisce il comportamento dell'Intelligenza Artificiale.

Non definisce:

- i modelli utilizzati;
- i fornitori AI;
- le tecnologie implementative;
- l'infrastruttura di esecuzione.

Tali aspetti saranno descritti nei documenti ARCH della fase tecnica.

---

# 26. Decisioni Congelate

✓ L'Intelligenza Artificiale rappresenta uno strumento operativo e non il centro decisionale del sistema.

✓ L'Orchestratore costruisce il Contesto Operativo per ogni richiesta.

✓ I Motori AI operano esclusivamente sul Contesto ricevuto.

✓ I Motori non comunicano direttamente tra loro.

✓ Il Backend rimane l'unico responsabile dell'accesso ai dati persistenti.

✓ Ogni richiesta viene elaborata all'interno di una Sessione Operativa temporanea.

✓ L'Intelligenza Artificiale non apprende automaticamente dalle conversazioni.

✓ Le risposte devono essere spiegabili e riconducibili agli Atti utilizzati.

✓ In presenza di informazioni insufficienti il sistema privilegia l'incertezza rispetto all'invenzione di dati.

✓ L'architettura deve consentire la sostituzione dei modelli AI senza modificare il comportamento complessivo del sistema.

✓ L'aggiunta di nuovi Motori AI non deve richiedere modifiche agli altri componenti dell'ecosistema.

