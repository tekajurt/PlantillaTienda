-- ========================================
-- SEED DATA - DATOS INICIALES
-- ========================================
-- Este script inserta datos de prueba para la aplicación
-- Ejecutar DESPUÉS de init.sql

-- ========================================
-- 1. INSERTAR CATEGORÍAS
-- ========================================

insert into
    public.categories (name, description)
values (
        'Periféricos',
        'Teclados, ratones y otros periféricos de computadora'
    ),
    (
        'Monitores',
        'Monitores y pantallas para computadora'
    ),
    (
        'Audio',
        'Auriculares, altavoces y equipos de sonido'
    ),
    (
        'Accesorios',
        'Accesorios diversos para computadora'
    ),
    (
        'Componentes',
        'Componentes internos y expansiones'
    )
on conflict (name) do nothing;

-- ========================================
-- 2. INSERTAR PRODUCTOS
-- ========================================

insert into
    public.products (
        title,
        description,
        price,
        images,
        category,
        stock
    )
values (
        'Teclado Mecánico',
        'Teclado con switches azules, retroiluminación RGB y diseño compacto ideal para gaming y productividad.',
        59.99,
        '["/images/teclado.svg"]',
        'Periféricos',
        25
    ),
    (
        'Mouse Gamer',
        'Mouse óptico de alta precisión con sensor de 16000 DPI, 6 botones programables y diseño ergonómico.',
        39.99,
        '["/images/mouse.svg"]',
        'Periféricos',
        40
    ),
    (
        'Monitor 24"',
        'Monitor IPS Full HD de 24 pulgadas con tasa de refresco de 75Hz, perfecto para trabajo y entretenimiento.',
        129.90,
        '["/images/monitor.svg"]',
        'Monitores',
        12
    ),
    (
        'Auriculares',
        'Auriculares over-ear con micrófono integrado, almohadillas cómodas y audio de alta calidad.',
        49.50,
        '["/images/headset.svg"]',
        'Audio',
        30
    );

-- ========================================
-- 3. INSERTAR DESCUENTOS
-- ========================================

insert into
    public.discounts (
        title,
        description,
        discount_type,
        discount_value,
        is_global,
        is_active,
        valid_from,
        valid_until
    )
values (
        'Black Friday 2024',
        '30% de descuento en todos los periféricos',
        'percentage',
        30,
        false,
        true,
        now(),
        now() + interval '7 days'
    ),
    (
        'Descuento en Monitores',
        '$20 de descuento en monitores',
        'fixed',
        20,
        false,
        true,
        now(),
        now() + interval '14 days'
    );

-- ========================================
-- 4. INSERTAR CUPONES
-- ========================================

insert into
    public.coupons (
        code,
        discount_type,
        discount_value,
        max_uses,
        min_purchase_amount,
        is_active,
        valid_from,
        valid_until
    )
values (
        'BIENVENIDA',
        'percentage',
        15,
        100,
        50.00,
        true,
        now(),
        now() + interval '30 days'
    ),
    (
        'ENVIOGRATIS',
        'free_shipping',
        0,
        50,
        100.00,
        true,
        now(),
        now() + interval '30 days'
    ),
    (
        'NAVIDAD20',
        'percentage',
        20,
        null,
        null,
        true,
        now() - interval '5 days',
        now() + interval '25 days'
    );

-- ========================================
-- FIN DEL SEED
-- ========================================