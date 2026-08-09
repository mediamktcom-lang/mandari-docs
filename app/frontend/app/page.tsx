"use client";

import { useEffect, useState } from "react";
import {
  analizza,
  chiediAssistente,
  creaDelega,
  creaInvito,
  creaPersona,
  elencoScadenze,
  getDeleghe,
  getInviti,
  impostaStatoInvito,
  revocaDelega,
  riscattaInvito,
  type Account,
  type Delega,
  type Invito,
  getAccount,
  getAudit,
  getPersone,
  getSpazio,
  type VoceAudit,
  type Analisi,
  type AttoBreve,
  type Opportunita,
  type Persona,
  type Profilo,
  type ScadenzaRow,
  type Soluzione,
  type SpiegazioneDoc,
} from "./lib/api";
import {
  accedi,
  assicuraSessione,
  esci,
  infoUtente,
  registraEmail,
} from "./lib/supabase";

type Vista = "home" | "onboarding" | "chat" | "calendario" | "impostazioni";

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
  const [profilo, setProfilo] = useState<Profilo | null>(null);
  const [menuAperto, setMenuAperto] = useState(false);
  const [persone, setPersone] = useState<Persona[]>([]);
  const [personaId, setPersonaId] = useState<string>("");
  const [account, setAccount] = useState<Account | null>(null);

  const ricaricaPersone = async (impostaAttiva = false) => {
    const ps = await getPersone();
    setPersone(ps);
    if (impostaAttiva || !ps.find((p) => p.id === personaId)) {
      const self = ps.find((p) => p.is_self) ?? ps[0];
      if (self) setPersonaId(self.id);
    }
  };

  const ricaricaAccount = async () => {
    setAccount(await getAccount());
  };

  useEffect(() => {
    (async () => {
      await assicuraSessione();
      await ricaricaPersone(true);
      await ricaricaAccount();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (vista === "home") {
    return <Cover onInizia={() => setVista(profilo ? "chat" : "onboarding")} />;
  }

  const selettore = persone.length > 1 && (
    <SelettorePersona
      persone={persone}
      personaId={personaId}
      onCambia={setPersonaId}
      onGestisci={() => setVista("impostazioni")}
    />
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <TopBar
          vista={vista}
          onDesk={() => setVista("chat")}
          onHome={() => setVista("home")}
          onCalendario={() => setVista("calendario")}
          onMenu={() => setMenuAperto(true)}
        />

        <div className="pt-4">
          {vista === "onboarding" && (
            <Onboarding
              onFatto={(p) => {
                setProfilo(p);
                setVista("chat");
              }}
            />
          )}
          {vista === "chat" && (
            <>
              {selettore}
              <Assistente
                profilo={profilo}
                personaId={personaId}
                attivato={account?.attivato ?? false}
                onAttivato={ricaricaAccount}
              />
            </>
          )}
          {vista === "calendario" && (
            <>
              {selettore}
              <CalendarioAmministrativo personaId={personaId} />
            </>
          )}
          {vista === "impostazioni" && (
            <Impostazioni
              persone={persone}
              personaId={personaId}
              onCambiaPersona={setPersonaId}
              onRicarica={ricaricaPersone}
              isAdmin={account?.is_admin ?? false}
            />
          )}
        </div>
      </div>

      <MenuScomparsa
        aperto={menuAperto}
        onChiudi={() => setMenuAperto(false)}
        onVai={(v) => {
          setVista(v);
          setMenuAperto(false);
        }}
      />
    </main>
  );
}

function SelettorePersona({
  persone,
  personaId,
  onCambia,
  onGestisci,
}: {
  persone: Persona[];
  personaId: string;
  onCambia: (id: string) => void;
  onGestisci: () => void;
}) {
  const [aperto, setAperto] = useState(false);
  const attiva = persone.find((p) => p.id === personaId) ?? persone[0];
  return (
    <div className="relative mb-4">
      <button
        onClick={() => setAperto(!aperto)}
        className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
      >
        <span className="text-slate-500">Stai gestendo:</span>
        <span className="font-semibold text-slate-900">{attiva?.nome}</span>
        <span className="text-slate-400">▾</span>
      </button>
      {aperto && (
        <div className="absolute z-10 mt-1 w-60 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          {persone.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onCambia(p.id);
                setAperto(false);
              }}
              className="btn-ghost block w-full rounded-md px-3 py-2 text-left text-sm"
            >
              {p.nome}
              {p.relazione ? ` · ${p.relazione}` : ""}
              {p.is_self ? " (tu)" : ""}
            </button>
          ))}
          <button
            onClick={() => {
              setAperto(false);
              onGestisci();
            }}
            className="btn-ghost block w-full rounded-md px-3 py-2 text-left text-sm text-brand"
          >
            + Gestisci profili
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Icone ------------------------------ */

function IconaHome() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}

function IconaCalendario() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5H20.5M8 3.5V6.5M16 3.5V6.5" />
    </svg>
  );
}

function IconaMenu() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconaChiudi() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function IconaAllega() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8l-6.4 6.4a2.5 2.5 0 003.5 3.5L20 11a4.5 4.5 0 00-6.4-6.4L6.2 12" />
    </svg>
  );
}

function IconaCamera() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8h3l1.4-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

/* ------------------------------- Wordmark ---------------------------- */

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-brand leading-none ${className}`}>
      <span className="text-brand">M</span>
      <span className="text-slate-900">andari</span>
    </span>
  );
}

/* -------------------------------- Cover ------------------------------ */

function Cover({ onInizia }: { onInizia: () => void }) {
  return (
    <main className="cover-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Wordmark className="text-7xl" />
      <p className="font-claim mt-5 text-2xl italic text-slate-500">
        la burocrazia, dalla tua parte
      </p>
      <button
        onClick={onInizia}
        className="btn-brand mt-12 rounded-xl px-12 py-3 text-lg font-semibold shadow-sm"
      >
        Inizia
      </button>
    </main>
  );
}

/* -------------------------------- TopBar ----------------------------- */

function TopBar({
  vista,
  onDesk,
  onHome,
  onCalendario,
  onMenu,
}: {
  vista: Vista;
  onDesk: () => void;
  onHome: () => void;
  onCalendario: () => void;
  onMenu: () => void;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-slate-100 bg-white/85 px-4 py-3 backdrop-blur">
      <button onClick={onDesk} aria-label="Vai alla chat">
        <Wordmark className="text-2xl" />
      </button>
      <div className="flex items-center gap-1">
        <button onClick={onHome} className="icon-btn rounded-lg p-2" aria-label="Home">
          <IconaHome />
        </button>
        <button
          onClick={onCalendario}
          className={`icon-btn rounded-lg p-2 ${vista === "calendario" ? "attivo" : ""}`}
          aria-label="Calendario amministrativo"
        >
          <IconaCalendario />
        </button>
        <button onClick={onMenu} className="icon-btn rounded-lg p-2" aria-label="Menu">
          <IconaMenu />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- Menu a scomparsa ----------------------- */

function MenuScomparsa({
  aperto,
  onChiudi,
  onVai,
}: {
  aperto: boolean;
  onChiudi: () => void;
  onVai: (v: Vista) => void;
}) {
  if (!aperto) return null;
  return (
    <div className="fixed inset-0 z-30" onClick={onChiudi}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute right-0 top-0 flex h-full w-72 max-w-[85%] flex-col bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <Wordmark className="text-2xl" />
          <button
            onClick={onChiudi}
            className="icon-btn rounded-lg p-2"
            aria-label="Chiudi"
          >
            <IconaChiudi />
          </button>
        </div>
        <nav className="space-y-1">
          <VoceMenu onClick={() => onVai("chat")}>Chat</VoceMenu>
          <VoceMenu onClick={() => onVai("calendario")}>
            Calendario amministrativo
          </VoceMenu>
          <VoceMenu onClick={() => onVai("impostazioni")}>Impostazioni</VoceMenu>
        </nav>
      </div>
    </div>
  );
}

function VoceMenu({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="btn-ghost block w-full rounded-lg px-3 py-2.5 text-left font-medium"
    >
      {children}
    </button>
  );
}

/* ----------------------------- Impostazioni -------------------------- */

function Impostazioni({
  persone,
  personaId,
  onCambiaPersona,
  onRicarica,
  isAdmin,
}: {
  persone: Persona[];
  personaId: string;
  onCambiaPersona: (id: string) => void;
  onRicarica: () => Promise<void>;
  isAdmin: boolean;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Impostazioni</h2>

      {isAdmin && (
        <SezioneImp
          titolo="Codici invito (admin)"
          descrizione="Crea e gestisci i codici che danno accesso a Mandari durante la fase di prova."
        >
          <GestioneInviti />
        </SezioneImp>
      )}

      <SezioneImp
        titolo="Il tuo account"
        descrizione="Crea un account per non perdere il tuo Fascicolo e accedere da altri dispositivi."
      >
        <AccountBox />
      </SezioneImp>

      <SezioneImp
        titolo="Profili gestiti"
        descrizione="Oltre a te, puoi aggiungere il profilo di qualcuno di cui ti occupi (es. un genitore): ognuno con il proprio Fascicolo separato."
      >
        <ProfiliGestiti
          persone={persone}
          personaId={personaId}
          onCambiaPersona={onCambiaPersona}
          onRicarica={onRicarica}
        />
      </SezioneImp>

      <SezioneImp
        titolo="Deleghe"
        descrizione="Autorizza una persona (per email) a consultare il tuo Fascicolo in sola lettura. Puoi revocare in qualsiasi momento."
      >
        <Deleghe />
      </SezioneImp>

      <SezioneImp
        titolo="Abbonamento e pagamenti"
        descrizione="Il tuo piano e lo stato dei pagamenti."
      >
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
          <span className="text-slate-600">Piano attuale</span>
          <PianoBadge />
        </div>
        <SpazioUsato />
        <p className="mt-2 text-xs text-slate-400">
          Presto: passaggio al piano completo e metodi di pagamento.
        </p>
      </SezioneImp>

      <SezioneImp
        titolo="Impostazioni generali"
        descrizione="Account, privacy e notifiche."
      >
        <ul className="divide-y divide-slate-100 text-sm">
          <VoceImp>Account e identità</VoceImp>
          <VoceImp>Privacy e dati</VoceImp>
          <VoceImp>Notifiche</VoceImp>
          <VoceImp>Lingua</VoceImp>
          <VoceImp>Aiuto e assistenza</VoceImp>
        </ul>
        <p className="mt-2 text-xs text-slate-400">Presto disponibili.</p>
      </SezioneImp>

      <SezioneImp
        titolo="Attività recenti"
        descrizione="Le ultime operazioni registrate sul tuo Fascicolo (tracciabilità)."
      >
        <AttivitaRecenti />
      </SezioneImp>
    </div>
  );
}

function Deleghe() {
  const [lista, setLista] = useState<Delega[] | null>(null);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [carica, setCarica] = useState(false);

  async function ricarica() {
    setLista(await getDeleghe());
  }
  useEffect(() => {
    ricarica();
  }, []);

  async function invita() {
    if (!email.trim()) return;
    setCarica(true);
    setMsg(null);
    const r = await creaDelega(email.trim());
    setCarica(false);
    if (r.errore) {
      setMsg(r.errore);
      return;
    }
    setEmail("");
    await ricarica();
  }

  async function revoca(id: string) {
    await revocaDelega(id);
    await ricarica();
  }

  const attive = (lista ?? []).filter((d) => d.stato === "attiva");

  return (
    <div>
      {attive.length > 0 && (
        <ul className="mb-3 divide-y divide-slate-100 text-sm">
          {attive.map((d) => (
            <li key={d.id} className="flex items-center justify-between py-2">
              <span className="text-slate-700">{d.delegato_email}</span>
              <button
                onClick={() => revoca(d.id)}
                className="btn-ghost rounded-lg px-2 py-1 text-xs font-semibold"
              >
                Revoca
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          className="input"
          type="email"
          placeholder="Email della persona da autorizzare"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={carica}
          onClick={invita}
          className="btn-brand shrink-0 rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {carica ? "…" : "Autorizza"}
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-amber-700">{msg}</p>}
      <p className="mt-2 text-xs text-slate-400">
        La persona autorizzata potrà consultare (sola lettura) il tuo Fascicolo
        dopo aver effettuato l&apos;accesso con quell&apos;email.
      </p>
    </div>
  );
}

function GestioneInviti() {
  const [lista, setLista] = useState<Invito[] | null>(null);
  const [codice, setCodice] = useState("");
  const [nota, setNota] = useState("");
  const [maxUsi, setMaxUsi] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [carica, setCarica] = useState(false);

  async function ricarica() {
    setLista(await getInviti());
  }
  useEffect(() => {
    ricarica();
  }, []);

  async function crea() {
    if (!codice.trim()) return;
    setCarica(true);
    setMsg(null);
    const r = await creaInvito(
      codice.trim(),
      nota.trim(),
      maxUsi.trim() ? Number(maxUsi) : null
    );
    setCarica(false);
    if (r.errore) {
      setMsg(r.errore);
      return;
    }
    setCodice("");
    setNota("");
    setMaxUsi("");
    await ricarica();
  }

  async function cambiaStato(inv: Invito) {
    await impostaStatoInvito(inv.id, !inv.attivo);
    await ricarica();
  }

  return (
    <div>
      {lista && lista.length > 0 && (
        <ul className="mb-3 divide-y divide-slate-100 text-sm">
          {lista.map((inv) => (
            <li key={inv.id} className="flex items-center justify-between gap-2 py-2">
              <div className="min-w-0">
                <span className="font-mono font-semibold text-slate-800">
                  {inv.codice}
                </span>
                {inv.nota && (
                  <span className="ml-2 text-slate-400">{inv.nota}</span>
                )}
                <div className="text-xs text-slate-500">
                  usato {inv.usi}
                  {inv.max_usi != null ? ` / ${inv.max_usi}` : " (illimitato)"}
                  {" · "}
                  {inv.attivo ? "attivo" : "disattivato"}
                </div>
              </div>
              <button
                onClick={() => cambiaStato(inv)}
                className="btn-ghost shrink-0 rounded-lg px-2 py-1 text-xs font-semibold"
              >
                {inv.attivo ? "Disattiva" : "Riattiva"}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2 rounded-xl bg-slate-50 p-3">
        <input
          className="input"
          placeholder="Codice (es. AMICI2026)"
          value={codice}
          onChange={(e) => setCodice(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="Nota (facoltativa)"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
          <input
            className="input w-32 shrink-0"
            type="number"
            min={1}
            placeholder="Max usi"
            value={maxUsi}
            onChange={(e) => setMaxUsi(e.target.value)}
          />
        </div>
        <button
          disabled={carica}
          onClick={crea}
          className="btn-brand w-full rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {carica ? "…" : "Crea codice"}
        </button>
        {msg && <p className="text-xs text-amber-700">{msg}</p>}
        <p className="text-xs text-slate-400">
          Lascia &ldquo;Max usi&rdquo; vuoto per un codice illimitato.
        </p>
      </div>
    </div>
  );
}

const ETICHETTE_AZIONE: Record<string, string> = {
  richiesta: "Richiesta all'assistente",
  analisi_diritti: "Analisi diritti (SPETTA)",
  documento_caricato: "Documento caricato (CARTA)",
  ricerca_soluzioni: "Ricerca soluzioni (AFFIDO)",
  profilo_aggiunto: "Profilo aggiunto",
  invito_riscattato: "Codice invito attivato",
  delega_creata: "Delega concessa",
  delega_revocata: "Delega revocata",
};

function AttivitaRecenti() {
  const [voci, setVoci] = useState<VoceAudit[] | null>(null);
  useEffect(() => {
    (async () => setVoci(await getAudit()))();
  }, []);

  if (voci === null) return <p className="text-xs text-slate-400">Carico…</p>;
  if (voci.length === 0)
    return (
      <p className="text-sm text-slate-500">Nessuna attività registrata.</p>
    );

  return (
    <ul className="divide-y divide-slate-100 text-sm">
      {voci.map((v, i) => (
        <li key={i} className="flex items-center justify-between py-2">
          <span className="text-slate-700">
            {ETICHETTE_AZIONE[v.azione] ?? v.azione}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(v.created_at).toLocaleDateString("it-IT")}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProfiliGestiti({
  persone,
  personaId,
  onCambiaPersona,
  onRicarica,
}: {
  persone: Persona[];
  personaId: string;
  onCambiaPersona: (id: string) => void;
  onRicarica: () => Promise<void>;
}) {
  const [nome, setNome] = useState("");
  const [relazione, setRelazione] = useState("");
  const [modo, setModo] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [carica, setCarica] = useState(false);

  async function aggiungi() {
    if (!nome.trim()) return;
    setCarica(true);
    setMsg(null);
    const r = await creaPersona(nome.trim(), relazione.trim());
    setCarica(false);
    if (r.errore) {
      setMsg(
        r.serve_pro
          ? "Aggiungere profili è una funzione del piano Pro. Chiedi l'attivazione."
          : r.errore
      );
      return;
    }
    setNome("");
    setRelazione("");
    setModo(false);
    await onRicarica();
  }

  return (
    <div>
      <div className="space-y-1">
        {persone.map((p) => (
          <button
            key={p.id}
            onClick={() => onCambiaPersona(p.id)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
              p.id === personaId ? "bg-[#fff1e9]" : "hover:bg-slate-50"
            }`}
          >
            <span className="font-medium text-slate-800">
              {p.nome}
              {p.relazione ? ` · ${p.relazione}` : ""}
              {p.is_self ? " (tu)" : ""}
            </span>
            {p.id === personaId && (
              <span className="text-xs font-semibold text-brand">attivo</span>
            )}
          </button>
        ))}
      </div>

      {!modo && (
        <button
          onClick={() => {
            setModo(true);
            setMsg(null);
          }}
          className="btn-ghost mt-2 rounded-lg px-3 py-2 text-sm font-semibold"
        >
          + Aggiungi un profilo
        </button>
      )}
      {modo && (
        <div className="mt-2 space-y-2">
          <input
            className="input"
            placeholder="Nome (es. Maria)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className="input"
            placeholder="Relazione (es. madre)"
            value={relazione}
            onChange={(e) => setRelazione(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              disabled={carica}
              onClick={aggiungi}
              className="btn-brand rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-60"
            >
              {carica ? "Attendi…" : "Aggiungi"}
            </button>
            <button
              onClick={() => {
                setModo(false);
                setMsg(null);
              }}
              className="btn-ghost rounded-lg px-3 py-2 text-sm font-semibold"
            >
              Annulla
            </button>
          </div>
        </div>
      )}
      {msg && <p className="mt-2 text-xs text-amber-700">{msg}</p>}
    </div>
  );
}

function PianoBadge() {
  const [piano, setPiano] = useState("free");
  useEffect(() => {
    (async () => setPiano((await getAccount()).piano))();
  }, []);
  return (
    <span className="font-semibold text-brand">
      {piano === "pro" ? "Pro" : "Free"}
    </span>
  );
}

function AccountBox() {
  const [info, setInfo] = useState<{ email: string | null; anonimo: boolean } | null>(
    null
  );
  const [modo, setModo] = useState<"none" | "registra" | "accedi">("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [carica, setCarica] = useState(false);

  async function ricarica() {
    setInfo(await infoUtente());
  }
  useEffect(() => {
    ricarica();
  }, []);

  async function fai(azione: "registra" | "accedi") {
    setCarica(true);
    setMsg(null);
    const err =
      azione === "registra"
        ? await registraEmail(email, password)
        : await accedi(email, password);
    setCarica(false);
    if (err) {
      setMsg(err);
      return;
    }
    setMsg(
      azione === "registra"
        ? "Account creato. Se richiesto, conferma l'email dal messaggio ricevuto."
        : "Accesso eseguito."
    );
    setModo("none");
    setEmail("");
    setPassword("");
    await ricarica();
  }

  async function logout() {
    await esci();
    await ricarica();
    setMsg("Sei uscito.");
  }

  if (!info) return null;

  return (
    <div>
      {!info.anonimo && info.email ? (
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
          <span className="text-slate-700">{info.email}</span>
          <button
            onClick={logout}
            className="btn-ghost rounded-lg px-2 py-1 text-sm font-semibold"
          >
            Esci
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600">
            Stai usando Mandari senza account (dati salvati solo su questo
            dispositivo).
          </p>
          {modo === "none" && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setModo("registra")}
                className="btn-brand rounded-lg px-3 py-2 text-sm font-semibold"
              >
                Crea account
              </button>
              <button
                onClick={() => setModo("accedi")}
                className="btn-ghost rounded-lg px-3 py-2 text-sm font-semibold"
              >
                Ho già un account
              </button>
            </div>
          )}
          {modo !== "none" && (
            <div className="mt-3 space-y-2">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  disabled={carica}
                  onClick={() => fai(modo === "registra" ? "registra" : "accedi")}
                  className="btn-brand rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-60"
                >
                  {carica
                    ? "Attendi…"
                    : modo === "registra"
                      ? "Crea account"
                      : "Accedi"}
                </button>
                <button
                  onClick={() => {
                    setModo("none");
                    setMsg(null);
                  }}
                  className="btn-ghost rounded-lg px-3 py-2 text-sm font-semibold"
                >
                  Annulla
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {msg && <p className="mt-2 text-xs text-slate-500">{msg}</p>}
    </div>
  );
}

function SpazioUsato() {
  const [dati, setDati] = useState<{ usato: number; quota: number } | null>(
    null
  );

  useEffect(() => {
    (async () => setDati(await getSpazio()))();
  }, []);

  if (!dati || !dati.quota) return null;
  const mb = (b: number) => b / 1024 / 1024;
  const perc = Math.min(100, Math.round((dati.usato / dati.quota) * 100));

  return (
    <div className="mt-3">
      <div className="mb-1 flex justify-between text-xs text-slate-500">
        <span>Spazio documenti su Mandari</span>
        <span>
          {mb(dati.usato).toFixed(1)} / {Math.round(mb(dati.quota))} MB
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#f2560a]"
          style={{ width: `${perc}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Oltre i 500 MB potrai collegare il tuo spazio personale.
      </p>
    </div>
  );
}

function SezioneImp({
  titolo,
  descrizione,
  children,
}: {
  titolo: string;
  descrizione: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">{titolo}</h3>
      <p className="mt-1 text-sm text-slate-600">{descrizione}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function VoceImp({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between py-2.5 text-slate-700">
      <span>{children}</span>
      <span className="text-slate-300">›</span>
    </li>
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

/* ---------------------------- Assistente (desk) ---------------------- */

type Messaggio = {
  ruolo: "utente" | "mandari";
  testo: string;
  opportunita?: Opportunita[];
  soluzioni?: Soluzione[];
  documento?: SpiegazioneDoc | null;
  avviso?: string;
};

function AttivazioneInvito({
  onChiudi,
  onFatto,
}: {
  onChiudi: () => void;
  onFatto: () => Promise<void>;
}) {
  const [modo, setModo] = useState<"registra" | "accedi">("registra");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codice, setCodice] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [carica, setCarica] = useState(false);
  const [riscattato, setRiscattato] = useState(false);

  async function conferma() {
    setMsg(null);

    // --- Accesso con account esistente ---
    if (modo === "accedi") {
      if (!email.trim() || !password.trim()) {
        setMsg("Inserisci email e password.");
        return;
      }
      setCarica(true);
      try {
        const err = await accedi(email.trim(), password);
        if (err) {
          setMsg(traduciErrore(err));
          return;
        }
        await onFatto();
      } finally {
        setCarica(false);
      }
      return;
    }

    // --- Attivazione con codice invito (email/password facoltativi) ---
    if (!codice.trim() && !riscattato) {
      setMsg("Inserisci il codice invito.");
      return;
    }
    setCarica(true);
    try {
      // 1) Riscatta il codice (una sola volta) → sblocca l'accesso.
      if (!riscattato) {
        const r = await riscattaInvito(codice.trim());
        if (!r.ok) {
          setMsg(r.errore ?? "Codice non valido.");
          return;
        }
        setRiscattato(true);
      }
      // 2) Facoltativo: crea l'account per ritrovare tutto da altri dispositivi.
      if (email.trim() && password.trim()) {
        const err = await registraEmail(email.trim(), password);
        if (err) {
          setMsg(
            "Accesso attivato! Non sono riuscito a salvare l'account ora (" +
              traduciErrore(err) +
              ") — puoi farlo più tardi dalle Impostazioni. Premi di nuovo per entrare."
          );
          return;
        }
      }
      await onFatto();
    } finally {
      setCarica(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={onChiudi}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-slate-900">
          {modo === "registra"
            ? "Attiva Mandari"
            : "Accedi al tuo account"}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {modo === "registra"
            ? "Per usare Mandari inserisci il codice invito che hai ricevuto."
            : "Bentornato! Accedi con la tua email e password."}
        </p>

        <div className="mt-4 space-y-2">
          {modo === "registra" ? (
            <>
              <input
                className="input"
                placeholder="Codice invito"
                value={codice}
                onChange={(e) => setCodice(e.target.value)}
                autoFocus
              />
              <p className="pt-1 text-xs font-medium text-slate-500">
                Facoltativo — crea un account per ritrovare tutto da un altro
                dispositivo:
              </p>
              <input
                className="input"
                type="email"
                placeholder="Email (facoltativa)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password (facoltativa)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                className="input"
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="La tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
        </div>

        {msg && <p className="mt-3 text-sm text-amber-700">{msg}</p>}

        <button
          disabled={carica}
          onClick={conferma}
          className="btn-brand mt-4 w-full rounded-xl px-4 py-3 font-semibold disabled:opacity-60"
        >
          {carica
            ? "Attendi…"
            : modo === "registra"
              ? "Attiva e continua"
              : "Accedi"}
        </button>

        <button
          onClick={() => {
            setMsg(null);
            setModo(modo === "registra" ? "accedi" : "registra");
          }}
          className="mt-3 w-full text-center text-sm text-slate-500 hover:text-slate-800"
        >
          {modo === "registra"
            ? "Hai già un account? Accedi"
            : "Non hai un account? Attiva con invito"}
        </button>
      </div>
    </div>
  );
}

function traduciErrore(err: string): string {
  const e = err.toLowerCase();
  if (e.includes("already") || e.includes("registered") || e.includes("exists"))
    return "Questa email risulta già registrata. Prova ad accedere.";
  if (e.includes("invalid") && e.includes("credential"))
    return "Email o password non corretti.";
  if (e.includes("password"))
    return "La password deve avere almeno 6 caratteri.";
  return err;
}

function Assistente({
  profilo,
  personaId,
  attivato,
  onAttivato,
}: {
  profilo: Profilo | null;
  personaId: string;
  attivato: boolean;
  onAttivato: () => Promise<void>;
}) {
  const [messaggi, setMessaggi] = useState<Messaggio[]>([
    {
      ruolo: "mandari",
      testo:
        "Ciao, sono Mandari 👋 Mi occupo io della tua vita amministrativa: ti dico cosa ti spetta, ti spiego lettere e documenti, tengo d'occhio le scadenze e ti aiuto a portare a termine le pratiche. Scrivimi con parole tue — anche la foto di un documento va benissimo — e ci penso io.",
    },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [caricamento, setCaricamento] = useState(false);
  const [mostraAttivazione, setMostraAttivazione] = useState(false);

  async function invia(e: React.FormEvent) {
    e.preventDefault();
    if ((!input.trim() && !file) || caricamento) return;

    // In fase di prova: per interagire serve un account attivato con invito.
    if (!attivato) {
      setMostraAttivazione(true);
      return;
    }

    const testoUtente = input.trim()
      ? input.trim()
      : file
        ? file.name
        : "";
    setMessaggi((m) => [...m, { ruolo: "utente", testo: testoUtente }]);

    const msg = input;
    const doc = file;
    setInput("");
    setFile(null);
    setCaricamento(true);

    try {
      const r = await chiediAssistente(msg, profilo, doc, personaId);
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
          testo:
            "Ops, non riesco a rispondere in questo momento. Riprova tra poco.",
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
            <span>{file.name}</span>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white p-2 shadow-sm">
          <label className="icon-btn rounded-lg p-2" title="Allega un file">
            <IconaAllega />
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <label className="icon-btn rounded-lg p-2" title="Scatta una foto">
            <IconaCamera />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi una domanda…"
            className="min-w-0 flex-1 bg-transparent px-1 text-slate-800 outline-none"
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
          Scrivi, allega un file o scatta la foto di un documento da farti
          spiegare.
        </p>
      </form>

      {mostraAttivazione && (
        <AttivazioneInvito
          onChiudi={() => setMostraAttivazione(false)}
          onFatto={async () => {
            await onAttivato();
            setMostraAttivazione(false);
          }}
        />
      )}
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

/* ----------------------- Calendario amministrativo ------------------- */

function formattaData(q: string | null): { giorno: string; mese: string } {
  if (!q) return { giorno: "•", mese: "" };
  const d = new Date(q);
  if (isNaN(d.getTime())) return { giorno: "•", mese: "" };
  return {
    giorno: String(d.getDate()),
    mese: d.toLocaleDateString("it-IT", { month: "short" }),
  };
}

function attoDi(s: ScadenzaRow): AttoBreve | null {
  if (!s.atti) return null;
  return Array.isArray(s.atti) ? (s.atti[0] ?? null) : s.atti;
}

function CalendarioAmministrativo({ personaId }: { personaId: string }) {
  const [righe, setRighe] = useState<ScadenzaRow[] | null>(null);
  const [aperto, setAperto] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setRighe(await elencoScadenze(personaId));
      } catch {
        setRighe([]);
      }
    })();
  }, [personaId]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">
        Calendario amministrativo
      </h2>

      {righe === null && <p className="text-sm text-slate-400">Carico…</p>}
      {righe && righe.length === 0 && (
        <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
          La tua agenda è vuota. Quando in chat emerge una scadenza (ad esempio
          da un documento), Mandari la fissa qui.
        </p>
      )}
      {righe &&
        righe.map((s) => (
          <EventoAgenda
            key={s.id}
            s={s}
            aperto={aperto === s.id}
            onToggle={() => setAperto(aperto === s.id ? null : s.id)}
          />
        ))}
    </div>
  );
}

function EventoAgenda({
  s,
  aperto,
  onToggle,
}: {
  s: ScadenzaRow;
  aperto: boolean;
  onToggle: () => void;
}) {
  const atto = attoDi(s);
  const { giorno, mese } = formattaData(s.quando);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button onClick={onToggle} className="flex w-full items-stretch text-left">
        <div className="flex w-16 shrink-0 flex-col items-center justify-center bg-[#fff1e9] px-2 py-3 text-brand">
          <span className="text-xl font-bold leading-none">{giorno}</span>
          <span className="text-xs font-medium uppercase">{mese}</span>
        </div>
        <div className="flex-1 p-4">
          <p className="font-semibold text-slate-900">{s.cosa}</p>
          {!s.quando && s.quando_testo && (
            <p className="text-xs text-slate-500">{s.quando_testo}</p>
          )}
          {atto && (
            <p className="mt-0.5 text-xs text-slate-400">Da: {atto.titolo}</p>
          )}
        </div>
        <span className="flex items-center pr-4 text-slate-400">
          {aperto ? "▲" : "▼"}
        </span>
      </button>

      {aperto && atto && <DettaglioEvento atto={atto} />}
      {aperto && !atto && (
        <p className="border-t border-slate-100 p-4 text-sm text-slate-500">
          Nessun dettaglio collegato a questo evento.
        </p>
      )}
    </article>
  );
}

function DettaglioEvento({ atto }: { atto: AttoBreve }) {
  const c = atto.contenuto as Record<string, unknown>;
  const testo = (k: string) => (typeof c[k] === "string" ? (c[k] as string) : "");
  const azioni = Array.isArray(c.azioni) ? (c.azioni as string[]) : [];

  return (
    <div className="space-y-2 border-t border-slate-100 p-4 text-sm text-slate-700">
      {testo("riassunto") && <p>{testo("riassunto")}</p>}
      {testo("messaggio") && (
        <p className="whitespace-pre-line">{testo("messaggio")}</p>
      )}
      {azioni.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-500">Cosa fare</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {azioni.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs text-slate-400">Fonte: {atto.origine}</p>
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
