-- AMSILAB · 0001 · tabla de solicitudes (leads)
-- Base de datos: PostgreSQL (Neon / Supabase)

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  role text,
  interest text not null,
  course_slug text,
  message text not null,
  source text not null default 'web',
  user_agent text,
  ip_hash text,
  status text not null default 'nuevo'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

comment on table public.leads is 'Solicitudes de información y capacitación de AMSILAB';
