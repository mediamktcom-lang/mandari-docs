-- Deleghe (PRD-009): un utente autorizza una persona (per email) a
-- consultare in SOLA LETTURA il proprio Fascicolo. Applicata su Supabase.
-- Qui per riproducibilità.

create table if not exists public.deleghe (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  delegato_email text not null,
  stato text not null default 'attiva',
  created_at timestamptz not null default now()
);

alter table public.deleghe enable row level security;

-- Il proprietario gestisce le proprie deleghe (crea, elenca, revoca).
create policy deleghe_owner on public.deleghe
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- Il delegato vede le deleghe che lo riguardano (per la propria email).
create policy deleghe_delegato_select on public.deleghe
  for select using (delegato_email = (auth.jwt() ->> 'email'));

create index if not exists deleghe_owner_idx on public.deleghe (owner_id, created_at desc);
create index if not exists deleghe_delegato_idx on public.deleghe (delegato_email);

-- Accesso in SOLA LETTURA del delegato al Fascicolo del proprietario.
-- Una delega 'attiva' abilita la SELECT su persone, atti e scadenze.

create policy persone_delegato_select on public.persone
  for select using (
    exists (
      select 1 from public.deleghe d
      where d.owner_id = persone.owner_id
        and d.delegato_email = (auth.jwt() ->> 'email')
        and d.stato = 'attiva'
    )
  );

create policy atti_delegato_select on public.atti
  for select using (
    exists (
      select 1 from public.deleghe d
      where d.owner_id = atti.user_id
        and d.delegato_email = (auth.jwt() ->> 'email')
        and d.stato = 'attiva'
    )
  );

create policy scadenze_delegato_select on public.scadenze
  for select using (
    exists (
      select 1 from public.deleghe d
      where d.owner_id = scadenze.user_id
        and d.delegato_email = (auth.jwt() ->> 'email')
        and d.stato = 'attiva'
    )
  );
