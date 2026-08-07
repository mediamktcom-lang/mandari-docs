// Tipi e collegamento al backend (il "motore" FastAPI).

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

// Indirizzo del backend. In sviluppo è http://localhost:8000.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function analizza(profilo: Profilo): Promise<Analisi> {
  const risposta = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profilo),
  });

  if (!risposta.ok) {
    throw new Error(`Il motore ha risposto con un errore (${risposta.status}).`);
  }

  return risposta.json();
}

export type RispostaAssistente = {
  motore: string;
  messaggio: string;
  documento: SpiegazioneDoc | null;
  opportunita: Opportunita[];
  demo: boolean;
  avviso: string;
  nota_tecnica?: string;
};

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
    body: modulo,
  });

  if (!risposta.ok) {
    throw new Error(`Il motore ha risposto con un errore (${risposta.status}).`);
  }

  return risposta.json();
}

export async function spiegaDocumento(file: File): Promise<SpiegazioneDoc> {
  const modulo = new FormData();
  modulo.append("file", file);

  const risposta = await fetch(`${API_URL}/api/carta`, {
    method: "POST",
    body: modulo,
  });

  if (!risposta.ok) {
    throw new Error(`Il motore ha risposto con un errore (${risposta.status}).`);
  }

  return risposta.json();
}
