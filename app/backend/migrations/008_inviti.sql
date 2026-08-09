-- Codici invito (Fase A, test): l'accesso pieno a Mandari (chat) richiede
-- la registrazione con un codice invito valido. Applicata su Supabase.

create table if not exists public.inviti (
  id uuid primary key default gen_random_uuid(),
  codice text not null unique,
  nota text not null default '',
  max_usi integer,               -- null = illimitato
  usi integer not null default 0,
  attivo boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.inviti enable row level security;

-- Solo l'admin gestisce i codici (crea / elenca / disattiva).
drop policy if exists inviti_admin on public.inviti;
create policy inviti_admin on public.inviti
  for all
  using (auth.jwt() ->> 'email' = 'mediamktcom@gmail.com')
  with check (auth.jwt() ->> 'email' = 'mediamktcom@gmail.com');

-- Traccia del codice usato dall'utente.
alter table public.profili add column if not exists invito text;

-- Riscatto del codice: funzione sicura eseguibile da qualsiasi utente
-- autenticato (anche anonimo), senza esporre la tabella inviti.
create or replace function public.riscatta_invito(p_codice text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.inviti%rowtype;
begin
  select * into r from public.inviti
    where lower(codice) = lower(trim(p_codice)) for update;

  if not found then
    return jsonb_build_object('ok', false, 'errore', 'Codice non valido.');
  end if;
  if not r.attivo then
    return jsonb_build_object('ok', false, 'errore', 'Questo codice non è più attivo.');
  end if;
  if r.max_usi is not null and r.usi >= r.max_usi then
    return jsonb_build_object('ok', false, 'errore', 'Questo codice ha raggiunto il limite di utilizzi.');
  end if;

  update public.inviti set usi = usi + 1 where id = r.id;

  insert into public.profili (user_id, piano, invito)
    values (auth.uid(), 'pro', r.codice)
  on conflict (user_id) do update
    set piano = 'pro', invito = r.codice, updated_at = now();

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.riscatta_invito(text) to authenticated, anon;
