# Obinasom-only tables — prefixed so they never collide with other projects on this Supabase.
# Safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists public.obinasom_guests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  surname text not null,
  phone text not null,
  email text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists obinasom_guests_sort_order_idx
  on public.obinasom_guests (sort_order asc, created_at asc);

create index if not exists obinasom_guests_email_idx
  on public.obinasom_guests (email);

alter table public.obinasom_guests enable row level security;

-- Public can only insert guest submissions (namespaced table only)
drop policy if exists "obinasom_guests_anon_insert" on public.obinasom_guests;
create policy "obinasom_guests_anon_insert"
  on public.obinasom_guests
  for insert
  to anon, authenticated
  with check (true);

-- No public select/update/delete — admin uses service role via Next.js API routes
drop policy if exists "obinasom_guests_anon_select" on public.obinasom_guests;
drop policy if exists "obinasom_guests_anon_update" on public.obinasom_guests;
drop policy if exists "obinasom_guests_anon_delete" on public.obinasom_guests;

comment on table public.obinasom_guests is 'Obinasom wedding Save-the-Date guest submissions';
