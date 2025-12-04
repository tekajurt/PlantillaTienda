-- Seed sample products
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
        'perifericos',
        25
    ),
    (
        'Mouse Gamer',
        'Mouse óptico de alta precisión con sensor de 16000 DPI, 6 botones programables y diseño ergonómico.',
        39.99,
        '["/images/mouse.svg"]',
        'perifericos',
        40
    ),
    (
        'Monitor 24"',
        'Monitor IPS Full HD de 24 pulgadas con tasa de refresco de 75Hz, perfecto para trabajo y entretenimiento.',
        129.90,
        '["/images/monitor.svg"]',
        'monitores',
        12
    ),
    (
        'Auriculares',
        'Auriculares over-ear con micrófono integrado, almohadillas cómodas y audio de alta calidad.',
        49.50,
        '["/images/headset.svg"]',
        'audio',
        30
    );