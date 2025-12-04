-- Tabla de categorías
create table if not exists public.categories (
    id uuid default gen_random_uuid () primary key,
    name text not null unique,
    description text,
    created_at timestamp with time zone default now()
);

-- Tabla de descuentos
create table if not exists public.discounts (
    id uuid default gen_random_uuid () primary key,
    title text not null,
    description text,
    discount_type text not null check (
        discount_type in ('percentage', 'fixed')
    ),
    discount_value numeric(12, 2) not null,
    product_ids jsonb default '[]'::jsonb,
    category_ids jsonb default '[]'::jsonb,
    is_global boolean default false,
    valid_from timestamp with time zone,
    valid_until timestamp with time zone,
    active boolean default true,
    created_at timestamp with time zone default now()
);

-- Tabla de cupones
create table if not exists public.coupons (
    id uuid default gen_random_uuid () primary key,
    code text not null unique,
    discount_type text not null check (
        discount_type in (
            'percentage',
            'fixed',
            'free_shipping'
        )
    ),
    discount_value numeric(12, 2) not null,
    max_uses integer,
    uses_count integer default 0,
    min_purchase_amount numeric(12, 2),
    product_ids jsonb default '[]'::jsonb,
    category_ids jsonb default '[]'::jsonb,
    valid_from timestamp with time zone,
    valid_until timestamp with time zone,
    active boolean default true,
    created_at timestamp with time zone default now()
);

-- Tabla de pedidos
create table if not exists public.orders (
    id uuid default gen_random_uuid () primary key,
    customer_email text not null,
    customer_name text not null,
    customer_phone text not null,
    customer_address text not null,
    customer_city text not null,
    customer_postal_code text not null,
    status text not null default 'pending' check (
        status in (
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
        )
    ),
    total_amount numeric(12, 2) not null,
    discount_amount numeric(12, 2) default 0,
    coupon_code text,
    notes text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Tabla de items del pedido
create table if not exists public.order_items (
    id uuid default gen_random_uuid () primary key,
    order_id uuid not null references public.orders (id) on delete cascade,
    product_id uuid not null references public.products (id) on delete restrict,
    quantity integer not null,
    unit_price numeric(12, 2) not null,
    created_at timestamp with time zone default now()
);

-- Actualizar tabla products para agregar relación con categorías
alter table public.products
add column if not exists category_id uuid references public.categories (id) on delete set null;

-- Índices para mejor performance
create index if not exists orders_status_idx on public.orders (status);

create index if not exists orders_created_at_idx on public.orders (created_at);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

create index if not exists coupons_code_idx on public.coupons (code);

create index if not exists discounts_active_idx on public.discounts (active);

-- RLS para orders (usuarios ven sus propios pedidos)
alter table public.orders enable row level security;

drop policy if exists "Users see own orders" on public.orders;

create policy "Users see own orders" on public.orders for
select using (
        auth.jwt () ->> 'email' = customer_email
    );