-- Piano dell'utente (freemium): 'free' oppure 'pro'.
-- Applicata su Supabase. L'admin attiva "pro" a mano, es.:
--   update public.profili set piano = 'pro' where user_id = '<UUID_UTENTE>';

alter table public.profili
  add column if not exists piano text not null default 'free';
