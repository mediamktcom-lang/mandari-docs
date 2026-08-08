"use client";

import { useEffect, useState } from "react";
import {
  analizza,
  chiediAssistente,
  elencoAtti,
  elencoScadenze,
  type Analisi,
  type Atto,
  type Opportunita,
  type Profilo,
  type ScadenzaRow,
  type Soluzione,
  type SpiegazioneDoc,
} from "./lib/api";
import { assicuraSessione } from "./lib/supabase";

type Vista = "onboarding" | "assistente" | "archivio" | "scadenze";

const PROFILO_INIZIALE: Profilo = {
  regione: "",
  eta: 0,
  cittadinanza: "",
  composizione_nucleo: "",
  numero_figli: 0,
  figli_minori: false,
  invalidita: false,
  anziani_a_carico: false,
  situazione_lavorativa: "",
  isee_indicativo: "",
  situazione_abitativa: "",
  note: "",
};

function coloreLivello(livello: string): string {
  const l = livello.toLowerCase();
  if (l.includes("alta")) return "bg-emerald-100 text-emerald-800";
  if (l.includes("media")) return "bg-amber-100 text-amber-800";
  return "bg-slate-200 text-slate-700";
}

/* ================================ App ================================ */

export default function App() {
  const [vista, setVista] = useState<Vista>("onboarding");
  const [profilo, setProfilo] = useState<Profilo | null>(null);

  // Avvia (o recupera) l'identità anonima: serve per salvare il Fascicolo.
  useEffect(() => {
    assicuraSessione();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <header className="mb-8 text-center">
          <Logo />
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-brand">
            La burocrazia, dalla tua parte
          </p>
        </header>

        {vista === "onboarding" && (
          <Onboarding
            onFatto={(p) => {
              setProfilo(p);
              setVista("assistente");
            }}
          />
        )}

        {vista !== "onboarding" && (
          <>
            <NavTabs vista={vista} onCambia={setVista} />
            {vista === "assistente" && <Assistente profilo={profilo} />}
            {vista === "archivio" && <Archivio />}
            {vista === "scadenze" && <Scadenze />}
          </>
        )}
      </div>
    </main>
  );
}

/* ------------------------------- NavTabs ----------------------------- */

function NavTabs({
  vista,
  onCambia,
}: {
  vista: Vista;
  onCambia: (v: Vista) => void;
}) {
  const tabs: { id: Vista; label: string }[] = [
    { id: "assistente", label: "Assistente" },
    { id: "archivio", label: "Archivio" },
    { id: "scadenze", label: "Scadenze" },
  ];
  return (
    <div className="mb-5 flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onCambia(t.id)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            vista === t.id ? "chip-brand" : "text-slate-600 hover:bg-white"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------- Archivio ---------------------------- */

function etichettaTipo(tipo: string): string {
  const m: Record<string, string> = {
    documento: "Documento",
    analisi_spetta: "Analisi diritti",
    affido: "Soluzioni",
    conversazione: "Conversazione",
  };
  return m[tipo] ?? tipo;
}

function Archivio() {
  const [atti, setAtti] = useState<Atto[] | null>(null);
  const [q, setQ] = useState("");
  const [aperto, setAperto] = useState<string | null>(null);

  async function carica(query = "") {
    setAtti(null);
    try {
      setAtti(await elencoAtti(query));
    } catch {
      setAtti([]);
    }
  }

  useEffect(() => {
    carica();
  }, []);

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          carica(q);
        }}
        className="flex gap-2"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cerca nel tuo archivio…"
          className="input"
        />
        <button className="btn-brand shrink-0 rounded-lg px-4 text-sm font-semibold">
          Cerca
        </button>
      </form>

      {atti === null && (
        <p className="text-sm text-slate-400">Carico l&apos;archivio…</p>
      )}
      {atti && atti.length === 0 && (
        <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
          Il tuo archivio è vuoto. Le analisi e i documenti che elabori
          compariranno qui, pronti da ritrovare.
        </p>
      )}
      {atti &&
        atti.map((a) => (
          <CardAtto
            key={a.id}
            a={a}
            aperto={aperto === a.id}
            onToggle={() => setAperto(aperto === a.id ? null : a.id)}
          />
        ))}
    </div>
  );
}

function CardAtto({
  a,
  aperto,
  onToggle,
}: {
  a: Atto;
  aperto: boolean;
  onToggle: () => void;
}) {
  const data = new Date(a.created_at).toLocaleDateString("it-IT");
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-2 text-left"
      >
        <div>
          <p className="font-semibold text-slate-900">{a.titolo || "Atto"}</p>
          <p className="text-xs text-slate-400">
            {etichettaTipo(a.tipo)} · {data}
          </p>
        </div>
        <span className="chip-brand shrink-0 rounded-full px-2 py-0.5 text-xs font-bold">
          {a.origine}
        </span>
      </button>
      {aperto && <DettaglioAtto a={a} />}
    </article>
  );
}

function DettaglioAtto({ a }: { a: Atto }) {
  const c = a.contenuto as Record<string, unknown>;
  const testo = (k: string) => (typeof c[k] === "string" ? (c[k] as string) : "");
  const opp = Array.isArray(c.opportunita)
    ? (c.opportunita as { titolo?: string }[])
    : [];
  const sol = Array.isArray(c.soluzioni)
    ? (c.soluzioni as { titolo?: string }[])
    : [];

  return (
    <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm text-slate-700">
      {testo("riassunto") && <p>{testo("riassunto")}</p>}
      {testo("messaggio") && (
        <p className="whitespace-pre-line">{testo("messaggio")}</p>
      )}
      {testo("domanda") && (
        <p>
          <span className="font-medium">Domanda:</span> {testo("domanda")}
        </p>
      )}
      {testo("risposta") && (
        <p className="whitespace-pre-line">{testo("risposta")}</p>
      )}
      {opp.length > 0 && (
        <ul className="list-disc space-y-0.5 pl-5">
          {opp.map((o, i) => (
            <li key={i}>{o.titolo}</li>
          ))}
        </ul>
      )}
      {sol.length > 0 && (
        <ul className="list-disc space-y-0.5 pl-5">
          {sol.map((s, i) => (
            <li key={i}>{s.titolo}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------- Scadenze ---------------------------- */

function Scadenze() {
  const [righe, setRighe] = useState<ScadenzaRow[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setRighe(await elencoScadenze());
      } catch {
        setRighe([]);
      }
    })();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-slate-900">Le tue scadenze</h2>
      {righe === null && <p className="text-sm text-slate-400">Carico…</p>}
      {righe && righe.length === 0 && (
        <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
          Nessuna scadenza per ora. Quando Mandari trova una scadenza in un
          documento che carichi, compare qui.
        </p>
      )}
      {righe &&
        righe.map((s) => (
          <div
            key={s.id}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className="mt-0.5 text-brand">📅</span>
            <div>
              <p className="font-medium text-slate-900">{s.cosa}</p>
              <p className="text-sm text-slate-500">
                {s.quando
                  ? new Date(s.quando).toLocaleDateString("it-IT")
                  : s.quando_testo || "—"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

/* -------------------------------- Logo ------------------------------- */

function Logo() {
  return (
    <h1 className="font-brand text-6xl leading-none">
      <span className="text-brand">M</span>
      <span className="text-slate-900">andari</span>
    </h1>
  );
}

/* ----------------------------- Onboarding ---------------------------- */

function Onboarding({ onFatto }: { onFatto: (p: Profilo) => void }) {
  const [profilo, setProfilo] = useState<Profilo>(PROFILO_INIZIALE);
  const [analisi, setAnalisi] = useState<Analisi | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  function aggiorna<K extends keyof Profilo>(campo: K, valore: Profilo[K]) {
    setProfilo((p) => ({ ...p, [campo]: valore }));
  }

  async function invia(e: React.FormEvent) {
    e.preventDefault();
    setCaricamento(true);
    setErrore(null);
    try {
      setAnalisi(await analizza(profilo));
    } catch {
      setErrore(
        "Non riesco a contattare il motore. Assicurati che il backend sia avviato."
      );
    } finally {
      setCaricamento(false);
    }
  }

  if (analisi) {
    return (
      <section className="space-y-4">
        {analisi.demo && <BannerDemo />}
        <h2 className="text-xl font-bold text-slate-900">
          Ecco cosa potresti approfondire
        </h2>
        <div className="space-y-3">
          {analisi.opportunita.map((o, i) => (
            <CardOpportunita key={i} o={o} />
          ))}
        </div>
        <Avviso testo={analisi.avviso} />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <p className="font-semibold text-slate-900">
            Questo è solo l&apos;inizio.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Con Mandari puoi chiedere qualsiasi cosa o caricare i tuoi documenti:
            ci pensa lui a capire e aiutarti.
          </p>
          <button
            onClick={() => onFatto(profilo)}
            className="btn-brand mt-4 w-full rounded-xl px-4 py-3 font-semibold transition"
          >
            Continua con Mandari →
          </button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-lg font-medium text-slate-500">Scopri cosa ti</p>
        <h2 className="mt-1 text-6xl font-black tracking-tight text-brand">
          SPETTA
        </h2>
        <p className="mx-auto mt-4 max-w-md text-slate-600">
          Rispondi a poche domande e scopri i diritti e le agevolazioni che
          potrebbero riguardarti.
        </p>
      </div>

      <form
        onSubmit={invia}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-2 gap-4">
          <Campo etichetta="In quale regione vivi?">
            <input
              type="text"
              value={profilo.regione}
              onChange={(e) => aggiorna("regione", e.target.value)}
              placeholder="Es. Lombardia"
              className="input"
            />
          </Campo>
          <Campo etichetta="La tua età">
            <input
              type="number"
              min={0}
              value={profilo.eta || ""}
              onChange={(e) => aggiorna("eta", Number(e.target.value) || 0)}
              placeholder="Es. 40"
              className="input"
            />
          </Campo>
        </div>

        <Campo etichetta="Cittadinanza">
          <select
            value={profilo.cittadinanza}
            onChange={(e) => aggiorna("cittadinanza", e.target.value)}
            className="input"
          >
            <option value="">Preferisco non dirlo</option>
            <option>Italiana</option>
            <option>Altro Paese UE</option>
            <option>Extra-UE</option>
          </select>
        </Campo>

        <Campo etichetta="Com'è composto il tuo nucleo?">
          <select
            value={profilo.composizione_nucleo}
            onChange={(e) => aggiorna("composizione_nucleo", e.target.value)}
            className="input"
          >
            <option value="">Seleziona…</option>
            <option>Single</option>
            <option>Coppia senza figli</option>
            <option>Famiglia con figli</option>
            <option>Genitore solo con figli</option>
            <option>Altro</option>
          </select>
        </Campo>

        <div className="grid grid-cols-2 gap-4">
          <Campo etichetta="Quanti figli?">
            <input
              type="number"
              min={0}
              value={profilo.numero_figli}
              onChange={(e) =>
                aggiorna("numero_figli", Number(e.target.value) || 0)
              }
              className="input"
            />
          </Campo>
          <Campo etichetta="Figli minorenni?">
            <Spunta
              valore={profilo.figli_minori}
              onChange={(v) => aggiorna("figli_minori", v)}
            />
          </Campo>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Campo etichetta="Invalidità in famiglia?">
            <Spunta
              valore={profilo.invalidita}
              onChange={(v) => aggiorna("invalidita", v)}
            />
          </Campo>
          <Campo etichetta="Anziani a carico?">
            <Spunta
              valore={profilo.anziani_a_carico}
              onChange={(v) => aggiorna("anziani_a_carico", v)}
            />
          </Campo>
        </div>

        <Campo etichetta="Qual è la tua situazione lavorativa?">
          <select
            value={profilo.situazione_lavorativa}
            onChange={(e) => aggiorna("situazione_lavorativa", e.target.value)}
            className="input"
          >
            <option value="">Seleziona…</option>
            <option>Dipendente</option>
            <option>Autonomo</option>
            <option>Disoccupato</option>
            <option>Pensionato</option>
            <option>Studente</option>
            <option>Altro</option>
          </select>
        </Campo>

        <Campo etichetta="ISEE indicativo (se lo conosci)">
          <select
            value={profilo.isee_indicativo}
            onChange={(e) => aggiorna("isee_indicativo", e.target.value)}
            className="input"
          >
            <option value="">Non so / preferisco non dirlo</option>
            <option>Meno di 10.000</option>
            <option>10.000 – 20.000</option>
            <option>20.000 – 40.000</option>
            <option>Oltre 40.000</option>
          </select>
        </Campo>

        <Campo etichetta="Situazione abitativa">
          <select
            value={profilo.situazione_abitativa}
            onChange={(e) => aggiorna("situazione_abitativa", e.target.value)}
            className="input"
          >
            <option value="">Seleziona…</option>
            <option>Affitto</option>
            <option>Casa di proprietà con mutuo</option>
            <option>Casa di proprietà</option>
            <option>Altro</option>
          </select>
        </Campo>

        <button
          type="submit"
          disabled={caricamento}
          className="btn-brand w-full rounded-xl px-4 py-3 font-semibold transition disabled:opacity-60"
        >
          {caricamento ? "Analisi in corso…" : "Scopri cosa ti spetta"}
        </button>

        {errore && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errore}
          </p>
        )}
      </form>
    </div>
  );
}

/* ---------------------------- Assistente ----------------------------- */

type Messaggio = {
  ruolo: "utente" | "mandari";
  testo: string;
  opportunita?: Opportunita[];
  soluzioni?: Soluzione[];
  documento?: SpiegazioneDoc | null;
  avviso?: string;
};

function Assistente({ profilo }: { profilo: Profilo | null }) {
  const [messaggi, setMessaggi] = useState<Messaggio[]>([
    {
      ruolo: "mandari",
      testo:
        "Ciao! Ora sono a tua disposizione. Scrivimi una domanda (es. «cosa mi spetta se perdo il lavoro?») oppure carica un documento e te lo spiego.",
    },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [caricamento, setCaricamento] = useState(false);

  async function invia(e: React.FormEvent) {
    e.preventDefault();
    if ((!input.trim() && !file) || caricamento) return;

    const testoUtente = input.trim()
      ? input.trim()
      : file
        ? `📎 ${file.name}`
        : "";
    setMessaggi((m) => [...m, { ruolo: "utente", testo: testoUtente }]);

    const msg = input;
    const doc = file;
    setInput("");
    setFile(null);
    setCaricamento(true);

    try {
      const r = await chiediAssistente(msg, profilo, doc);
      setMessaggi((m) => [
        ...m,
        {
          ruolo: "mandari",
          testo: r.messaggio,
          opportunita: r.opportunita ?? [],
          soluzioni: r.soluzioni ?? [],
          documento: r.documento ?? null,
          avviso: r.avviso,
        },
      ]);
    } catch {
      setMessaggi((m) => [
        ...m,
        {
          ruolo: "mandari",
          testo: "Ops, non riesco a rispondere in questo momento. Riprova tra poco.",
        },
      ]);
    } finally {
      setCaricamento(false);
    }
  }

  return (
    <div className="space-y-4">
      {messaggi.map((m, i) => (
        <Bolla key={i} m={m} />
      ))}
      {caricamento && (
        <p className="text-sm text-slate-400">Mandari sta pensando…</p>
      )}

      <form onSubmit={invia} className="sticky bottom-4 mt-2 space-y-2">
        {file && (
          <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
            <span>📎 {file.name}</span>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-sm">
          <label
            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:border-[#f2560a] hover:text-slate-900"
            title="Allega una foto o un PDF"
          >
            📎 Allega
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi una domanda…"
            className="flex-1 bg-transparent px-1 text-slate-800 outline-none"
          />
          <button
            type="submit"
            disabled={caricamento}
            className="btn-brand rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-60"
          >
            Invia
          </button>
        </div>
        <p className="px-1 text-xs text-slate-400">
          Fai una domanda, oppure premi{" "}
          <span className="font-medium text-slate-500">📎 Allega</span> per
          caricare una foto o un PDF di un documento da farti spiegare.
        </p>
      </form>
    </div>
  );
}

function Bolla({ m }: { m: Messaggio }) {
  if (m.ruolo === "utente") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl bg-slate-900 px-4 py-2 text-white">
          {m.testo}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="max-w-[92%] whitespace-pre-line rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm">
        {m.testo}
      </div>
      {m.opportunita && m.opportunita.length > 0 && (
        <div className="space-y-3">
          {m.opportunita.map((o, i) => (
            <CardOpportunita key={i} o={o} />
          ))}
        </div>
      )}
      {m.soluzioni && m.soluzioni.length > 0 && (
        <div className="space-y-3">
          {m.soluzioni.map((s, i) => (
            <CardSoluzione key={i} s={s} />
          ))}
        </div>
      )}
      {m.documento && <CardDocumento doc={m.documento} />}
      {m.avviso && <Avviso testo={m.avviso} />}
    </div>
  );
}

/* ------------------------------- Card -------------------------------- */

function CardOpportunita({ o }: { o: Opportunita }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{o.titolo}</h3>
        <Badge livello={o.confidenza} />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        {o.categoria}
      </p>
      <p className="mt-2 text-slate-700">{o.perche}</p>
      <p className="mt-1 text-sm text-slate-500">
        <span className="font-medium">Da verificare:</span> {o.cosa_verificare}
      </p>

      {o.documenti && o.documenti.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-500">Documenti utili</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {o.documenti.map((d, j) => (
              <span
                key={j}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {o.a_chi_rivolgersi && (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium">A chi rivolgerti:</span>{" "}
          {o.a_chi_rivolgersi}
        </p>
      )}
    </article>
  );
}

function CardSoluzione({ s }: { s: Soluzione }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{s.titolo}</h3>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {s.tipo}
        </span>
      </div>
      <p className="mt-2 text-slate-700">{s.perche}</p>
      {s.come_procedere && (
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-medium">Come procedere:</span>{" "}
          {s.come_procedere}
        </p>
      )}
      {s.documenti && s.documenti.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-500">Documenti utili</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {s.documenti.map((d, j) => (
              <span
                key={j}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function CardDocumento({ doc }: { doc: SpiegazioneDoc }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-slate-900">{doc.tipo}</h3>
        <Badge livello={doc.attendibilita} />
      </div>

      {doc.azioni && doc.azioni.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-500">Cosa fare</p>
          <ul className="mt-1 space-y-1">
            {doc.azioni.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-brand">→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {doc.scadenze && doc.scadenze.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-500">Scadenze</p>
          <ul className="mt-1 space-y-1">
            {doc.scadenze.map((s, i) => (
              <li key={i} className="text-sm text-slate-700">
                <span className="font-medium">{s.quando}</span> — {s.cosa}
              </li>
            ))}
          </ul>
        </div>
      )}

      {doc.a_chi_rivolgersi && (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium">A chi rivolgerti:</span>{" "}
          {doc.a_chi_rivolgersi}
        </p>
      )}
    </div>
  );
}

/* ------------------------------ Comuni ------------------------------- */

function Badge({ livello }: { livello: string }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${coloreLivello(
        livello
      )}`}
    >
      {livello}
    </span>
  );
}

function BannerDemo() {
  return (
    <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
      Modalità dimostrativa: l&apos;AI non è al momento disponibile.
    </p>
  );
}

function Avviso({ testo }: { testo: string }) {
  return (
    <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">{testo}</p>
  );
}

function Spunta({
  valore,
  onChange,
}: {
  valore: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex h-[42px] items-center gap-2">
      <input
        type="checkbox"
        checked={valore}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[#f2560a]"
      />
      <span className="text-slate-600">Sì</span>
    </label>
  );
}

function Campo({
  etichetta,
  children,
}: {
  etichetta: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {etichetta}
      </span>
      {children}
    </label>
  );
}
