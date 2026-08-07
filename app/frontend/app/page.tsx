"use client";

import { useState } from "react";
import { analizza, type Analisi, type Profilo } from "./lib/api";

// Valori iniziali del questionario.
const PROFILO_INIZIALE: Profilo = {
  regione: "",
  composizione_nucleo: "",
  numero_figli: 0,
  figli_minori: false,
  situazione_lavorativa: "",
  isee_indicativo: "",
  situazione_abitativa: "",
  note: "",
};

// Colore del riquadro "confidenza".
function coloreConfidenza(livello: string): string {
  const l = livello.toLowerCase();
  if (l.includes("alta")) return "bg-green-100 text-green-800";
  if (l.includes("media")) return "bg-amber-100 text-amber-800";
  return "bg-slate-200 text-slate-700";
}

export default function Home() {
  const [profilo, setProfilo] = useState<Profilo>(PROFILO_INIZIALE);
  const [analisi, setAnalisi] = useState<Analisi | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  // Aggiorna un singolo campo del profilo.
  function aggiorna<K extends keyof Profilo>(campo: K, valore: Profilo[K]) {
    setProfilo((p) => ({ ...p, [campo]: valore }));
  }

  async function invia(e: React.FormEvent) {
    e.preventDefault();
    setCaricamento(true);
    setErrore(null);
    setAnalisi(null);
    try {
      const risultato = await analizza(profilo);
      setAnalisi(risultato);
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
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Intestazione */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Mandari</h1>
          <p className="mt-2 text-slate-600">
            Rispondi a poche domande e scopri cosa potrebbe spettarti.
          </p>
        </header>

        {/* Se non c'è ancora un'analisi, mostriamo il questionario */}
        {!analisi && (
          <form
            onSubmit={invia}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <Campo etichetta="In quale regione vivi?">
              <input
                type="text"
                value={profilo.regione}
                onChange={(e) => aggiorna("regione", e.target.value)}
                placeholder="Es. Lombardia"
                className="input"
              />
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
              <Campo etichetta="Ci sono figli minorenni?">
                <label className="flex h-[42px] items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profilo.figli_minori}
                    onChange={(e) => aggiorna("figli_minori", e.target.checked)}
                    className="h-5 w-5"
                  />
                  <span className="text-slate-600">Sì</span>
                </label>
              </Campo>
            </div>

            <Campo etichetta="Qual è la tua situazione lavorativa?">
              <select
                value={profilo.situazione_lavorativa}
                onChange={(e) =>
                  aggiorna("situazione_lavorativa", e.target.value)
                }
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
                onChange={(e) =>
                  aggiorna("situazione_abitativa", e.target.value)
                }
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
                placeholder="Es. ho una disabilità, sto cercando casa…"
              />
            </Campo>

            <button
              type="submit"
              disabled={caricamento}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {caricamento ? "Analisi in corso…" : "Scopri cosa potrebbe spettarti"}
            </button>

            {errore && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {errore}
              </p>
            )}
          </form>
        )}

        {/* Risultato dell'analisi */}
        {analisi && (
          <section className="space-y-4">
            {analisi.demo && (
              <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                Modalità dimostrativa: analisi basata su regole semplici (l&apos;AI
                non è ancora collegata).
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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{o.titolo}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${coloreConfidenza(
                        o.confidenza
                      )}`}
                    >
                      {o.confidenza}
                    </span>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {o.categoria}
                  </p>
                  <p className="mt-2 text-slate-700">{o.perche}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    <span className="font-medium">Da verificare:</span>{" "}
                    {o.cosa_verificare}
                  </p>
                </article>
              ))}
            </div>

            <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
              {analisi.avviso}
            </p>

            <button
              onClick={ricomincia}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Rifai il questionario
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

// Piccolo componente per etichetta + campo.
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
