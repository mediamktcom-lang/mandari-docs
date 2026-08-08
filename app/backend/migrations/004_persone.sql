-- Profili aggiunti (PRD-002): persone gestite dall'Owner, ognuna col suo Fascicolo.
-- Applicata su Supabase. Qui per riproducibilità.

create table if not exists public.persone (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nome text not null,
  relazione text default '',
  is_self boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.persone enable row level security;

create policy persone_own on public.persone
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create index if not exists persone_owner_idx on public.persone (owner_id);

-- Ogni Atto/scadenza può appartenere a una persona gestita
alter table public.atti
  add column if not exists persona_id uuid references public.persone(id) on delete cascade;
alter table public.scadenze
  add column if not exists persona_id uuid references public.persone(id) on delete cascade;

create index if not exists atti_persona_idx on public.atti (persona_id);
create index if not exists scadenze_persona_idx on public.scadenze (persona_id);
