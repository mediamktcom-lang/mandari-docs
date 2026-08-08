// Tipi e collegamento al backend (il "motore" FastAPI).

import { getToken } from "./supabase";

export type Profilo = {
  regione: string;
  eta: number;
  cittadinanza: string;
  composizione_nucleo: string;
  numero_figli: number;
  figli_minori: boolean;
  invalidita: boolean;
  anziani_a_carico: boolean;
  situazione_lavorativa: string;
  isee_indicativo: string;
  situazione_abitativa: string;
  note: string;
};

export type Opportunita = {
  titolo: string;
  categoria: string;
  perche: string;
  cosa_verificare: string;
  documenti: string[];
  a_chi_rivolgersi: string;
  confidenza: string;
};

export type Analisi = {
  demo: boolean;
  opportunita: Opportunita[];
  avviso: string;
  nota_tecnica?: string;
};

export type Scadenza = { cosa: string; quando: string };

export type SpiegazioneDoc = {
  demo: boolean;
  tipo: string;
  riassunto: string;
  azioni: string[];
  scadenze: Scadenza[];
  a_chi_rivolgersi: string;
  attendibilita: string;
  avviso: string;
  nota_tecnica?: string;
};

export type Soluzione = {
  titolo: string;
  tipo: string;
  perche: string;
  come_procedere: string;
  documenti: string[];
};

export type RispostaAssistente = {
  motore: string;
  messaggio: string;
  documento: SpiegazioneDoc | null;
  opportunita: Opportunita[];
  soluzioni: Soluzione[];
  demo: boolean;
  avviso: string;
  nota_tecnica?: string;
};

export type Atto = {
  id: string;
  tipo: string;
  titolo: string;
  origine: string;
  created_at: string;
  metadati: Record<string, unknown>;
  contenuto: Record<string, unknown>;
};

export type AttoBreve = {
  id: string;
  titolo: string;
  tipo: string;
  origine: string;
  contenuto: Record<string, unknown>;
};

export type ScadenzaRow = {
  id: string;
  cosa: string;
  quando: string | null;
  quando_testo: string;
  stato: string;
  created_at: string;
  atti?: AttoBreve | AttoBreve[] | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// Intestazione di autenticazione (token della sessione), se disponibile.
async function authHeader(): Promise<Record<string, string>> {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function analizza(profilo: Profilo): Promise<Analisi> {
  const risposta = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify(profilo),
  });
  if (!risposta.ok) {
    throw new Error(`Il motore ha risposto con un errore (${risposta.status}).`);
  }
  return risposta.json();
}

export async function chiediAssistente(
  messaggio: string,
  profilo: Profilo | null,
  file: File | null
): Promise<RispostaAssistente> {
  const modulo = new FormData();
  modulo.append("messaggio", messaggio);
  if (profilo) modulo.append("profilo", JSON.stringify(profilo));
  if (file) modulo.append("file", file);

  const risposta = await fetch(`${API_URL}/api/assistant`, {
    method: "POST",
    headers: { ...(await authHeader()) },
    body: modulo,
  });
  if (!risposta.ok) {
    throw new Error(`Il motore ha risposto con un errore (${risposta.status}).`);
  }
  return risposta.json();
}

export async function elencoAtti(q = ""): Promise<Atto[]> {
  const url = new URL(`${API_URL}/api/fascicolo`);
  if (q) url.searchParams.set("q", q);
  const risposta = await fetch(url, { headers: { ...(await authHeader()) } });
  if (!risposta.ok) {
    throw new Error(`Errore nel caricare l'archivio (${risposta.status}).`);
  }
  const dati = await risposta.json();
  return dati.atti ?? [];
}

export async function getSpazio(): Promise<{ usato: number; quota: number }> {
  const risposta = await fetch(`${API_URL}/api/spazio`, {
    headers: { ...(await authHeader()) },
  });
  if (!risposta.ok) return { usato: 0, quota: 0 };
  return risposta.json();
}

export async function elencoScadenze(): Promise<ScadenzaRow[]> {
  const risposta = await fetch(`${API_URL}/api/scadenze`, {
    headers: { ...(await authHeader()) },
  });
  if (!risposta.ok) {
    throw new Error(`Errore nel caricare le scadenze (${risposta.status}).`);
  }
  const dati = await risposta.json();
  return dati.scadenze ?? [];
}

export async function spiegaDocumento(file: File): Promise<SpiegazioneDoc> {
  const modulo = new FormData();
  modulo.append("file", file);

  const risposta = await fetch(`${API_URL}/api/carta`, {
    method: "POST",
    headers: { ...(await authHeader()) },
    body: modulo,
  });
  if (!risposta.ok) {
    throw new Error(`Il motore ha risposto con un errore (${risposta.status}).`);
  }
  return risposta.json();
}
