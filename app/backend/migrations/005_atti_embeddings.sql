-- Ricerca semantica sugli Atti (PRD-007): pgvector + similarità coseno.
-- Applicata su Supabase. Qui per riproducibilità.
-- NB: embedding a 768 dimensioni (Gemini gemini-embedding-001, output 768).

create extension if not exists vector;

alter table public.atti
  add column if not exists embedding vector(768);

create index if not exists atti_embedding_idx
  on public.atti using hnsw (embedding vector_cosine_ops);

create or replace function public.cerca_atti_simili(
  query_embedding vector(768),
  p_persona uuid default null,
  k int default 6
)
returns table (
  id uuid,
  tipo text,
  titolo text,
  origine text,
  contenuto jsonb,
  distanza float
)
language sql
stable
as $$
  select a.id, a.tipo, a.titolo, a.origine, a.contenuto,
         (a.embedding <=> query_embedding) as distanza
  from public.atti a
  where a.embedding is not null
    and (p_persona is null or a.persona_id = p_persona)
  order by a.embedding <=> query_embedding
  limit k;
$$;
