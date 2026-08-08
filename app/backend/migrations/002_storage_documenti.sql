-- Storage degli allegati originali (PRD-008) — bucket privato per-utente.
-- Applicata su Supabase. Qui per riproducibilità.

insert into storage.buckets (id, name, public)
values ('documenti', 'documenti', false)
on conflict (id) do nothing;

-- Ogni utente accede solo ai propri file (cartella = user_id)
create policy documenti_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'documenti'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy documenti_select on storage.objects
  for select to authenticated
  using (
    bucket_id = 'documenti'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy documenti_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'documenti'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
