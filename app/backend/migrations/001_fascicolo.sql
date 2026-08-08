-- Fascicolo Amministrativo — schema iniziale (PRD-007/008)
-- Applicata su Supabase (progetto qqxkkywymjdpsmwtsjjz). Qui per riproducibilità.

create table if not exists public.profili (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  regione text default '',
  eta int default 0,
  cittadinanza text default '',
  composizione_nucleo text default '',
  numero_figli int default 0,
  figli_minori boolean default false,
  invalidita boolean default false,
  anziani_a_carico boolean default false,
  situazione_lavorativa text default '',
  isee_indicativo text default '',
  situazione_abitativa text default '',
  note text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.atti (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tipo text not null,
  titolo text default '',
  origine text default '',
  data_evento timestamptz not null default now(),
  contenuto jsonb not null default '{}'::jsonb,
  metadati jsonb not null default '{}'::jsonb,
  testo_ricerca text default '',
  allegato_url text,
  created_at timestamptz not null default now()
);

create index if not exists atti_user_idx on public.atti (user_id, created_at desc);
create index if not exists atti_tipo_idx on public.atti (user_id, tipo);
create index if not exists atti_metadati_idx on public.atti using gin (metadati);
create index if not exists atti_ricerca_idx on public.atti using gin (to_tsvector('italian', coalesce(testo_ricerca, '')));

create table if not exists public.scadenze (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  atto_id uuid references public.atti(id) on delete set null,
  cosa text not null,
  quando date,
  quando_testo text default '',
  stato text not null default 'da_fare',
  created_at timestamptz not null default now()
);

create index if not exists scadenze_user_idx on public.scadenze (user_id, quando);

alter table public.profili enable row level security;
alter table public.atti enable row level security;
alter table public.scadenze enable row level security;

create policy profili_own on public.profili
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy atti_own on public.atti
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy scadenze_own on public.scadenze
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
