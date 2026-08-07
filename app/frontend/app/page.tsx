"use client";

import { useState } from "react";
import { analizza, type Analisi, type Profilo } from "./lib/api";

type Fase = "intro" | "form" | "risultato";

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

function coloreConfidenza(livello: string): string {
  const l = livello.toLowerCase();
  if (l.includes("alta")) return "bg-emerald-100 text-emerald-800";
  if (l.includes("media")) return "bg-amber-100 text-amber-800";
  return "bg-slate-200 text-slate-700";
}

export default function Home() {
  const [fase, setFase] = useState<Fase>("intro");
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
      const risultato = await analizza(profilo);
      setAnalisi(risultato);
      setFase("risultato");
    } catch {
      setErrore(
        "Non riesco a contattare il motore. Assicurati che il backend sia avviato."
      );
    } finally {
      setCaricamento(false);
    }
  }

  function ricomincia() {
    setAnalisi(null);
    setErrore(null);
    setFase("form");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <header className="mb-8 text-center">
          <Logo />
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-brand">
            La burocrazia, dalla tua parte
          </p>
        </header>

        {fase === "intro" && <Intro onInizia={() => setFase("form")} />}

        {fase === "form" && (
          <Questionario
            profilo={profilo}
            aggiorna={aggiorna}
            invia={invia}
            caricamento={caricamento}
            errore={errore}
          />
        )}

        {fase === "risultato" && analisi && (
          <Risultato analisi={analisi} onRicomincia={ricomincia} />
        )}
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

/* ------------------------------- Intro ------------------------------- */

function Intro({ onInizia }: { onInizia: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-lg font-medium text-slate-500">Scopri cosa ti</p>
      <h2 className="mt-1 text-6xl font-black tracking-tight text-brand">
        SPETTA
      </h2>
      <p className="mx-auto mt-4 max-w-md text-slate-600">
        Con <strong>SPETTA</strong>, il motore dei tuoi diritti, scopri in un
        minuto bonus e agevolazioni che ti riguardano — e i primi passi per
        ottenerli.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Pillola>Gratis</Pillola>
        <Pillola>Nessuna registrazione</Pillola>
        <Pillola>Circa 1 minuto</Pillola>
      </div>

      <button
        onClick={onInizia}
        className="btn-brand mt-8 w-full rounded-xl px-4 py-3 font-semibold transition"
      >
        Inizia
      </button>

      <div className="mt-8 border-t border-slate-100 pt-5">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
          I motori di Mandari
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <MotorePill nome="SPETTA" attivo />
          <MotorePill nome="DATA" />
          <MotorePill nome="CARTA" />
          <MotorePill nome="AFFIDO" />
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-400">
        I dati che inserisci restano sul tuo dispositivo e servono solo per
        generare l&apos;analisi.
      </p>
    </div>
  );
}

function Pillola({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill-brand rounded-full px-3 py-1 text-sm font-medium">
      {children}
    </span>
  );
}

function MotorePill({ nome, attivo = false }: { nome: string; attivo?: boolean }) {
  if (attivo) {
    return (
      <span className="chip-brand rounded-full px-3 py-1 text-sm font-bold">
        {nome}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-400">
      {nome} · presto
    </span>
  );
}

/* ---------------------------- Questionario --------------------------- */

function Questionario({
  profilo,
  aggiorna,
  invia,
  caricamento,
  errore,
}: {
  profilo: Profilo;
  aggiorna: <K extends keyof Profilo>(campo: K, valore: Profilo[K]) => void;
  invia: (e: React.FormEvent) => void;
  caricamento: boolean;
  errore: string | null;
}) {
  return (
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
          <label className="flex h-[42px] items-center gap-2">
            <input
              type="checkbox"
              checked={profilo.figli_minori}
              onChange={(e) => aggiorna("figli_minori", e.target.checked)}
              className="h-5 w-5 accent-[#f2560a]"
            />
            <span className="text-slate-600">Sì</span>
          </label>
        </Campo>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Campo etichetta="Invalidità in famiglia?">
          <label className="flex h-[42px] items-center gap-2">
            <input
              type="checkbox"
              checked={profilo.invalidita}
              onChange={(e) => aggiorna("invalidita", e.target.checked)}
              className="h-5 w-5 accent-[#f2560a]"
            />
            <span className="text-slate-600">Sì</span>
          </label>
        </Campo>
        <Campo etichetta="Anziani a carico?">
          <label className="flex h-[42px] items-center gap-2">
            <input
              type="checkbox"
              checked={profilo.anziani_a_carico}
              onChange={(e) => aggiorna("anziani_a_carico", e.target.checked)}
              className="h-5 w-5 accent-[#f2560a]"
            />
            <span className="text-slate-600">Sì</span>
          </label>
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
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errore}</p>
      )}
    </form>
  );
}

/* ------------------------------ Risultato ---------------------------- */

function Risultato({
  analisi,
  onRicomincia,
}: {
  analisi: Analisi;
  onRicomincia: () => void;
}) {
  return (
    <section className="space-y-4">
      {analisi.demo && (
        <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
          Modalità dimostrativa: analisi basata su regole semplici (l&apos;AI non
          è al momento disponibile).
        </p>
      )}

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
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${coloreConfidenza(
                  o.confidenza
                )}`}
              >
                {o.confidenza}
              </span>
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

      <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        {analisi.avviso}
      </p>

      <button
        onClick={onRicomincia}
        className="w-full rounded-xl border border-slate-900 px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
      >
        Rifai il questionario
      </button>
    </section>
  );
}

/* ------------------------------- Helper ------------------------------ */

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
