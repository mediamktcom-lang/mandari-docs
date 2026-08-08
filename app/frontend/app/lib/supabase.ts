// Client Supabase + identità anonima.
// L'accesso anonimo dà a ogni utente un'identità persistente (salvata nel
// browser) senza bisogno di email: basta per iniziare a salvare il Fascicolo.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(url, anonKey);

// Assicura che esista una sessione (anonima) e restituisce il token di accesso.
export async function assicuraSessione(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session.access_token;

  const { data: nuovo, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.warn("Accesso anonimo non riuscito:", error.message);
    return null;
  }
  return nuovo.session?.access_token ?? null;
}

// Token corrente (se presente).
export async function getToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}
