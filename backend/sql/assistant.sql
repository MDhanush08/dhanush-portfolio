create extension if not exists vector;

create table if not exists portfolio_knowledge (
  id bigserial primary key,
  section text not null,
  content text not null,
  link text,
  embedding vector(768) not null,
  created_at timestamptz default now()
);

create index if not exists portfolio_knowledge_embedding_idx
  on portfolio_knowledge using hnsw (embedding vector_cosine_ops);

alter table portfolio_knowledge enable row level security;

create or replace function match_portfolio_knowledge(
  query_embedding vector(768),
  match_count int default 6,
  min_similarity float default 0.0
)
returns table (id bigint, section text, content text, link text, similarity float)
language sql stable
as $$
  select k.id, k.section, k.content, k.link,
         1 - (k.embedding <=> query_embedding) as similarity
  from portfolio_knowledge k
  where 1 - (k.embedding <=> query_embedding) >= min_similarity
  order by k.embedding <=> query_embedding
  limit match_count;
$$;
