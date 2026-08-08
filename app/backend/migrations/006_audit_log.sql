-- Registro delle operazioni (PRD-009): tracciabilità per utente.
-- Applicata su Supabase. Qui per riproducibilità.

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  azione text not null,
  dettaglio jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_log enable row level security;

create policy audit_own on public.audit_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists audit_user_idx on public.audit_log (user_id, created_at desc);
