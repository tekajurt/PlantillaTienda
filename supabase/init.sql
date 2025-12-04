-- ========================================
-- SCRIPT SQL UNIFICADO - PLANTILLA TIENDA
-- ========================================
-- Este script crea todas las tablas necesarias para la aplicación
-- Ejecutar en Supabase SQL Editor (en orden secuencial)

-- ========================================
-- 1. TABLA PRODUCTS (Productos)
-- ========================================

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

-- Índices para productos
create index if not exists products_title_idx on public.products using gin (
    to_tsvector('simple', coalesce(title, ''))
);

create index if not exists products_category_idx on public.products (category);

-- RLS para productos
alter table public.products enable row level security;

drop policy if exists "Allow read for anon" on public.products;

create policy "Allow read for anon" on public.products for
select using (true);

-- ========================================
-- 2. TABLA CATEGORIES (Categorías)
-- ========================================

create table if not exists public.categories (
    id uuid default gen_random_uuid () primary key,
    name text not null unique,
    description text,
    created_at timestamp with time zone default now()
);

-- RLS para categorías
alter table public.categories enable row level security;

drop policy if exists "Allow read categories for all" on public.categories;

create policy "Allow read categories for all" on public.categories for
select using (true);

drop policy if exists "Allow insert categories for admin" on public.categories;

create policy "Allow insert categories for admin" on public.categories for insert
with
    check (
        (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Allow update categories for admin" on public.categories;

create policy "Allow update categories for admin" on public.categories
for update
    using (
        (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Allow delete categories for admin" on public.categories;

create policy "Allow delete categories for admin" on public.categories for delete using (
    (
        select auth.jwt () ->> 'user_role'
    ) = 'admin'
);

-- ========================================
-- 3. TABLA DISCOUNTS (Descuentos)
-- ========================================

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
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- Índices para descuentos
create index if not exists discounts_active_idx on public.discounts (is_active);

create index if not exists discounts_valid_from_idx on public.discounts (valid_from);

create index if not exists discounts_valid_until_idx on public.discounts (valid_until);

-- RLS para descuentos
alter table public.discounts enable row level security;

drop policy if exists "Allow read discounts for all" on public.discounts;

create policy "Allow read discounts for all" on public.discounts for
select using (true);

drop policy if exists "Allow insert discounts for admin" on public.discounts;

create policy "Allow insert discounts for admin" on public.discounts for insert
with
    check (
        (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Allow update discounts for admin" on public.discounts;

create policy "Allow update discounts for admin" on public.discounts
for update
    using (
        (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Allow delete discounts for admin" on public.discounts;

create policy "Allow delete discounts for admin" on public.discounts for delete using (
    (
        select auth.jwt () ->> 'user_role'
    ) = 'admin'
);

-- ========================================
-- 4. TABLA COUPONS (Cupones de Descuento)
-- ========================================

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
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- Índices para cupones
create index if not exists coupons_code_idx on public.coupons (code);

create index if not exists coupons_active_idx on public.coupons (is_active);

-- RLS para cupones
alter table public.coupons enable row level security;

drop policy if exists "Allow read coupons for all" on public.coupons;

create policy "Allow read coupons for all" on public.coupons for
select using (is_active = true);

drop policy if exists "Allow insert coupons for admin" on public.coupons;

create policy "Allow insert coupons for admin" on public.coupons for insert
with
    check (
        (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Allow update coupons for admin" on public.coupons;

create policy "Allow update coupons for admin" on public.coupons
for update
    using (
        (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Allow delete coupons for admin" on public.coupons;

create policy "Allow delete coupons for admin" on public.coupons for delete using (
    (
        select auth.jwt () ->> 'user_role'
    ) = 'admin'
);

-- ========================================
-- 5. TABLA ORDERS (Pedidos)
-- ========================================

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

-- Índices para pedidos
create index if not exists orders_status_idx on public.orders (status);

create index if not exists orders_created_at_idx on public.orders (created_at);

create index if not exists orders_customer_email_idx on public.orders (customer_email);

-- RLS para pedidos
alter table public.orders enable row level security;

drop policy if exists "Users see own orders" on public.orders;

create policy "Users see own orders" on public.orders for
select using (
        auth.jwt () ->> 'email' = customer_email
        or (
            select auth.jwt () ->> 'user_role'
        ) = 'admin'
    );

drop policy if exists "Admin can manage orders" on public.orders;

create policy "Admin can manage orders" on public.orders for insert,
update,
delete using (
    (
        select auth.jwt () ->> 'user_role'
    ) = 'admin'
);

-- ========================================
-- 6. TABLA ORDER_ITEMS (Items del Pedido)
-- ========================================

create table if not exists public.order_items (
    id uuid default gen_random_uuid () primary key,
    order_id uuid not null references public.orders (id) on delete cascade,
    product_id uuid not null references public.products (id) on delete restrict,
    quantity integer not null,
    unit_price numeric(12, 2) not null,
    created_at timestamp with time zone default now()
);

-- Índices para items de pedidos
create index if not exists order_items_order_id_idx on public.order_items (order_id);

create index if not exists order_items_product_id_idx on public.order_items (product_id);

-- RLS para items de pedidos
alter table public.order_items enable row level security;

drop policy if exists "Users see own order items" on public.order_items;

create policy "Users see own order items" on public.order_items for
select using (
        order_id in (
            select id
            from public.orders
            where
                auth.jwt () ->> 'email' = customer_email
                or (
                    select auth.jwt () ->> 'user_role'
                ) = 'admin'
        )
    );

-- ========================================
-- 7. MEJORAS A TABLA PRODUCTS
-- ========================================

alter table public.products
add column if not exists category_id uuid references public.categories (id) on delete set null;

-- ========================================
-- FIN DEL SCRIPT
-- ========================================
-- Todas las tablas han sido creadas correctamente
-- Las políticas RLS están configuradas para:
-- - Lectura pública de productos, categorías y descuentos activos
-- - Acceso de administrador para crear/editar/eliminar
-- - Acceso de usuarios a sus propios pedidos