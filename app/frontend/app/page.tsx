"use client";

import { useState } from "react";
import {
  analizza,
  spiegaDocumento,
  type Analisi,
  type Profilo,
  type SpiegazioneDoc,
} from "./lib/api";

type Vista = "home" | "spetta" | "carta";

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
  const [vista, setVista] = useState<Vista>("home");

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <header className="mb-8 text-center">
          <Logo />
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-brand">
            La burocrazia, dalla tua parte
          </p>
          {vista !== "home" && (
            <button
              onClick={() => setVista("home")}
              className="mt-4 text-sm text-slate-500 transition hover:text-slate-900"
            >
              ← Tutti i motori
            </button>
          )}
        </header>

        {vista === "home" && <Home onScegli={setVista} />}
        {vista === "spetta" && <Spetta />}
        {vista === "carta" && <Carta />}
      </div>
    </main>
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

/* -------------------------------- Home ------------------------------- */

function Home({ onScegli }: { onScegli: (v: Vista) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-center text-slate-500">Scegli cosa ti serve oggi.</p>

      <MotoreCard
        nome="SPETTA"
        claim="Scopri cosa ti spetta"
        desc="Diritti, bonus e agevolazioni che potrebbero riguardarti."
        cta="Inizia"
        onClick={() => onScegli("spetta")}
      />
      <MotoreCard
        nome="CARTA"
        claim="Spiega un documento"
        desc="Carichi una foto o un PDF di una lettera e te lo spiego in parole semplici."
        cta="Carica un documento"
        onClick={() => onScegli("carta")}
      />

      <div className="pt-3 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
          Presto anche
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <MotorePill nome="DATA" />
          <MotorePill nome="AFFIDO" />
        </div>
      </div>
    </div>
  );
}

function MotoreCard({
  nome,
  claim,
  desc,
  cta,
  onClick,
}: {
  nome: string;
  claim: string;
  desc: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-[#f2560a] hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="chip-brand rounded-full px-3 py-1 text-sm font-bold">
          {nome}
        </span>
        <span className="font-semibold text-slate-900">{claim}</span>
      </div>
      <p className="mt-2 text-slate-600">{desc}</p>
      <span className="btn-brand mt-4 inline-block rounded-xl px-4 py-2 text-sm font-semibold">
        {cta}
      </span>
    </button>
  );
}

function MotorePill({ nome }: { nome: string }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-400">
      {nome} · presto
    </span>
  );
}

/* ------------------------------- SPETTA ------------------------------ */

function Spetta() {
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
      <RisultatoSpetta
        analisi={analisi}
        onRicomincia={() => {
          setAnalisi(null);
          setErrore(null);
        }}
      />
    );
  }

  return (
    <div>
      <IntestazioneMotore
        nome="SPETTA"
        testo="Rispondi a poche domande sulla tua situazione."
      />
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

        <Campo etichetta="Qualcos'altro che vuoi aggiungere? (facoltativo)">
          <textarea
            value={profilo.note}
            onChange={(e) => aggiorna("note", e.target.value)}
            rows={3}
            className="input"
            placeholder="Es. sto cercando casa, ho una malattia cronica…"
          />
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

function RisultatoSpetta({
  analisi,
  onRicomincia,
}: {
  analisi: Analisi;
  onRicomincia: () => void;
}) {
  return (
    <section className="space-y-4">
      {analisi.demo && <BannerDemo />}

      <h2 className="text-xl font-bold text-slate-900">
        Ecco cosa potresti approfondire
      </h2>

      <div className="space-y-3">
        {analisi.opportunita.map((o, i) => (
          <article
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{o.titolo}</h3>
              <Badge livello={o.confidenza} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {o.categoria}
            </p>
            <p className="mt-2 text-slate-700">{o.perche}</p>
            <p className="mt-1 text-sm text-slate-500">
              <span className="font-medium">Da verificare:</span>{" "}
              {o.cosa_verificare}
            </p>

            {o.documenti && o.documenti.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-slate-500">
                  Documenti utili
                </p>
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
        ))}
      </div>

      <Avviso testo={analisi.avviso} />
      <BottoneSecondario onClick={onRicomincia}>
        Rifai il questionario
      </BottoneSecondario>
    </section>
  );
}

/* ------------------------------- CARTA ------------------------------- */

function Carta() {
  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<SpiegazioneDoc | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  async function invia(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setCaricamento(true);
    setErrore(null);
    try {
      setDoc(await spiegaDocumento(file));
    } catch {
      setErrore(
        "Non riesco a contattare il motore. Assicurati che il backend sia avviato."
      );
    } finally {
      setCaricamento(false);
    }
  }

  if (doc) {
    return (
      <RisultatoCarta
        doc={doc}
        onRicomincia={() => {
          setDoc(null);
          setFile(null);
          setErrore(null);
        }}
      />
    );
  }

  return (
    <div>
      <IntestazioneMotore
        nome="CARTA"
        testo="Carica una foto o un PDF di un documento e te lo spiego."
      />
      <form
        onSubmit={invia}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-[#f2560a]">
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          {file ? (
            <span className="font-medium text-slate-800">{file.name}</span>
          ) : (
            <span className="text-slate-500">
              Tocca per scegliere un&apos;immagine o un PDF
            </span>
          )}
        </label>

        <button
          type="submit"
          disabled={!file || caricamento}
          className="btn-brand w-full rounded-xl px-4 py-3 font-semibold transition disabled:opacity-60"
        >
          {caricamento ? "Lettura in corso…" : "Spiega il documento"}
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

function RisultatoCarta({
  doc,
  onRicomincia,
}: {
  doc: SpiegazioneDoc;
  onRicomincia: () => void;
}) {
  return (
    <section className="space-y-4">
      {doc.demo && <BannerDemo />}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900">{doc.tipo}</h2>
          <Badge livello={doc.attendibilita} />
        </div>
        <p className="mt-2 text-slate-700">{doc.riassunto}</p>

        {doc.azioni && doc.azioni.length > 0 && (
          <div className="mt-4">
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
          <div className="mt-4">
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
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-medium">A chi rivolgerti:</span>{" "}
            {doc.a_chi_rivolgersi}
          </p>
        )}
      </div>

      <Avviso testo={doc.avviso} />
      <BottoneSecondario onClick={onRicomincia}>
        Carica un altro documento
      </BottoneSecondario>
    </section>
  );
}

/* ------------------------------ Comuni ------------------------------- */

function IntestazioneMotore({ nome, testo }: { nome: string; testo: string }) {
  return (
    <div className="mb-4 text-center">
      <span className="chip-brand rounded-full px-3 py-1 text-sm font-bold">
        {nome}
      </span>
      <p className="mt-2 text-slate-600">{testo}</p>
    </div>
  );
}

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

function BottoneSecondario({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-slate-900 px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
    >
      {children}
    </button>
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
