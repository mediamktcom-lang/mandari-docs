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

// Info sull'utente corrente (email e se è anonimo).
export async function infoUtente(): Promise<{
  email: string | null;
  anonimo: boolean;
}> {
  const { data } = await supabase.auth.getUser();
  const u = data.user;
  return { email: u?.email ?? null, anonimo: u?.is_anonymous ?? true };
}

// Crea un account collegando email+password all'utente attuale (mantiene il Fascicolo).
export async function registraEmail(
  email: string,
  password: string
): Promise<string | null> {
  const { error } = await supabase.auth.updateUser({ email, password });
  return error?.message ?? null;
}

// Accede con un account esistente (es. da un altro dispositivo).
export async function accedi(
  email: string,
  password: string
): Promise<string | null> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error?.message ?? null;
}

// Esce e torna a una sessione anonima.
export async function esci(): Promise<void> {
  await supabase.auth.signOut();
  await assicuraSessione();
}
