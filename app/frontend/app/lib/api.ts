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
