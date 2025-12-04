-- Schema for products table in Supabase (Postgres)
create table if not exists public.products (
    id uuid default gen_random_uuid () primary key,
    title text not null,
    description text,
    price numeric(12, 2) not null default 0,
    images jsonb default '[]'::jsonb,
    category text,
    stock integer not null default 0,
    created_at timestamp with time zone default now()
);

-- Indexes
create index if not exists products_title_idx on public.products using gin (
    to_tsvector('simple', coalesce(title, ''))
);

create index if not exists products_category_idx on public.products (category);

-- Enable RLS (optional; adjust policies as needed)
alter table public.products enable row level security;

-- Simple read policy for anon key (adjust for production)
drop policy if exists "Allow read for anon" on public.products;

create policy "Allow read for anon" on public.products for
select using (true);

-- Insert/Update/Delete typically require service role; omit anon policies for write in MVP.