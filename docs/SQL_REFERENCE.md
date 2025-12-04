# Referencia SQL - Plantilla Tienda

## 📖 Documentación de Tablas y Queries

Esta documentación complementa los scripts en `/supabase/`.

### Archivos SQL Disponibles

1. **init.sql** - Esquema completo (crear primero)
2. **seed.sql** - Datos iniciales (ejecutar después)

## 🗄️ Consultas Útiles

### Productos

```sql
-- Ver todos los productos
SELECT * FROM public.products ORDER BY created_at DESC;

-- Buscar productos por título
SELECT * FROM public.products
WHERE title ILIKE '%teclado%'
ORDER BY created_at DESC;

-- Productos por categoría
SELECT * FROM public.products
WHERE category = 'Periféricos'
ORDER BY price ASC;

-- Stock bajo (< 10 unidades)
SELECT id, title, stock FROM public.products
WHERE stock < 10
ORDER BY stock ASC;

-- Productos sin stock
SELECT id, title FROM public.products
WHERE stock = 0;

-- Actualizar stock
UPDATE public.products
SET stock = stock - 1
WHERE id = 'uuid-aqui'
RETURNING *;

-- Eliminar producto (cuidado!)
DELETE FROM public.products
WHERE id = 'uuid-aqui'
RETURNING id, title;
```

### Categorías

```sql
-- Ver todas las categorías
SELECT * FROM public.categories
ORDER BY created_at DESC;

-- Contar productos por categoría
SELECT
  c.name,
  COUNT(p.id) as product_count
FROM public.categories c
LEFT JOIN public.products p ON p.category = c.name
GROUP BY c.name
ORDER BY product_count DESC;

-- Categorías con productos
SELECT DISTINCT c.* FROM public.categories c
INNER JOIN public.products p ON p.category = c.name
ORDER BY c.name;

-- Insertar categoría
INSERT INTO public.categories (name, description)
VALUES ('Nueva Categoría', 'Descripción aquí')
RETURNING *;

-- Actualizar categoría
UPDATE public.categories
SET description = 'Nueva descripción'
WHERE id = 'uuid-aqui'
RETURNING *;
```

### Descuentos

```sql
-- Ver descuentos activos
SELECT * FROM public.discounts
WHERE is_active = true
AND (valid_from IS NULL OR valid_from <= NOW())
AND (valid_until IS NULL OR valid_until >= NOW())
ORDER BY created_at DESC;

-- Descuentos por tipo
SELECT
  discount_type,
  COUNT(*) as total,
  AVG(discount_value) as promedio
FROM public.discounts
WHERE is_active = true
GROUP BY discount_type;

-- Descuentos vigentes en rango de fechas
SELECT * FROM public.discounts
WHERE is_active = true
AND valid_from <= '2024-12-31'
AND valid_until >= '2024-12-01'
ORDER BY discount_value DESC;

-- Insertar descuento
INSERT INTO public.discounts (
  title, description, discount_type, discount_value,
  is_global, valid_from, valid_until, is_active
)
VALUES (
  'Navidad 2024',
  '25% descuento en toda la tienda',
  'percentage',
  25,
  true,
  '2024-12-01',
  '2024-12-31',
  true
)
RETURNING *;

-- Desactivar descuento
UPDATE public.discounts
SET is_active = false
WHERE id = 'uuid-aqui'
RETURNING *;
```

### Cupones

```sql
-- Ver cupones activos
SELECT * FROM public.coupons
WHERE is_active = true
AND (valid_from IS NULL OR valid_from <= NOW())
AND (valid_until IS NULL OR valid_until >= NOW())
ORDER BY created_at DESC;

-- Cupones más usados
SELECT
  code,
  discount_type,
  discount_value,
  uses_count,
  max_uses,
  ROUND((uses_count::float / max_uses) * 100, 2) as usage_percentage
FROM public.coupons
WHERE max_uses IS NOT NULL
ORDER BY usage_percentage DESC
LIMIT 10;

-- Cupones por expirar (en 7 días)
SELECT
  code,
  discount_type,
  discount_value,
  valid_until,
  (valid_until - NOW())::interval as tiempo_restante
FROM public.coupons
WHERE is_active = true
AND valid_until IS NOT NULL
AND valid_until BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY valid_until ASC;

-- Validar cupón
SELECT * FROM public.coupons
WHERE code = 'BIENVENIDA'
AND is_active = true
AND (valid_from IS NULL OR valid_from <= NOW())
AND (valid_until IS NULL OR valid_until >= NOW())
AND (max_uses IS NULL OR uses_count < max_uses)
LIMIT 1;

-- Incrementar uso de cupón
UPDATE public.coupons
SET uses_count = uses_count + 1
WHERE code = 'BIENVENIDA'
RETURNING *;
```

### Pedidos

```sql
-- Ver todos los pedidos
SELECT * FROM public.orders
ORDER BY created_at DESC;

-- Pedidos de un cliente
SELECT * FROM public.orders
WHERE customer_email = 'cliente@example.com'
ORDER BY created_at DESC;

-- Resumen de pedidos por estado
SELECT
  status,
  COUNT(*) as total,
  SUM(total_amount) as monto_total,
  AVG(total_amount) as monto_promedio
FROM public.orders
GROUP BY status
ORDER BY total DESC;

-- Ingresos últimos 30 días
SELECT
  DATE(created_at) as fecha,
  COUNT(*) as pedidos,
  SUM(total_amount) as ingresos
FROM public.orders
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- Mejores clientes (por monto gastado)
SELECT
  customer_email,
  customer_name,
  COUNT(*) as total_pedidos,
  SUM(total_amount) as gasto_total,
  AVG(total_amount) as gasto_promedio
FROM public.orders
GROUP BY customer_email, customer_name
ORDER BY gasto_total DESC
LIMIT 10;

-- Pedidos pendientes
SELECT * FROM public.orders
WHERE status = 'pending'
ORDER BY created_at ASC;

-- Cambiar estado de pedido
UPDATE public.orders
SET status = 'processing', updated_at = NOW()
WHERE id = 'uuid-aqui'
RETURNING *;

-- Insertar pedido
INSERT INTO public.orders (
  customer_email, customer_name, customer_phone,
  customer_address, customer_city, customer_postal_code,
  status, total_amount
)
VALUES (
  'cliente@example.com',
  'Juan Pérez',
  '+34123456789',
  'Calle Principal 123',
  'Madrid',
  '28001',
  'pending',
  299.99
)
RETURNING *;
```

### Order Items

```sql
-- Ver items de un pedido
SELECT
  oi.*,
  p.title,
  p.price
FROM public.order_items oi
LEFT JOIN public.products p ON p.id = oi.product_id
WHERE oi.order_id = 'uuid-pedido'
ORDER BY oi.created_at;

-- Productos más vendidos
SELECT
  p.id,
  p.title,
  COUNT(oi.id) as veces_vendido,
  SUM(oi.quantity) as unidades_totales,
  SUM(oi.quantity * oi.unit_price) as ingresos_totales
FROM public.order_items oi
LEFT JOIN public.products p ON p.id = oi.product_id
GROUP BY p.id, p.title
ORDER BY veces_vendido DESC
LIMIT 10;

-- Items de un cliente (historial)
SELECT
  p.title,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) as total,
  o.created_at
FROM public.order_items oi
LEFT JOIN public.products p ON p.id = oi.product_id
LEFT JOIN public.orders o ON o.id = oi.order_id
WHERE o.customer_email = 'cliente@example.com'
ORDER BY o.created_at DESC;

-- Insertar item de pedido
INSERT INTO public.order_items (
  order_id, product_id, quantity, unit_price
)
VALUES (
  'uuid-pedido',
  'uuid-producto',
  2,
  49.99
)
RETURNING *;
```

## 🔧 Queries de Mantenimiento

### Estadísticas Generales

```sql
-- Dashboard resumen
SELECT
  (SELECT COUNT(*) FROM public.products) as total_productos,
  (SELECT COUNT(*) FROM public.categories) as total_categorias,
  (SELECT COUNT(*) FROM public.orders) as total_pedidos,
  (SELECT COUNT(*) FROM public.coupons) as total_cupones,
  (SELECT SUM(total_amount) FROM public.orders) as ingresos_totales,
  (SELECT COUNT(*) FROM public.orders WHERE status = 'pending') as pedidos_pendientes,
  (SELECT COUNT(*) FROM public.products WHERE stock < 10) as productos_bajo_stock;
```

### Auditoría

```sql
-- Productos creados en los últimos 7 días
SELECT id, title, created_at FROM public.products
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Órdenes procesadas hoy
SELECT id, customer_email, total_amount, status FROM public.orders
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;

-- Cambios de estado de orden en últimas 24h
SELECT
  id,
  status,
  updated_at
FROM public.orders
WHERE updated_at >= NOW() - INTERVAL '24 hours'
ORDER BY updated_at DESC;
```

### Limpieza de Datos

```sql
-- Eliminar descuentos expirados e inactivos (CUIDADO!)
DELETE FROM public.discounts
WHERE is_active = false
AND valid_until < NOW() - INTERVAL '30 days'
RETURNING id, title;

-- Eliminar cupones expirados e inactivos (CUIDADO!)
DELETE FROM public.coupons
WHERE is_active = false
AND valid_until < NOW() - INTERVAL '30 days'
RETURNING code;

-- Ver órdenes canceladas en últimos 90 días
SELECT * FROM public.orders
WHERE status = 'cancelled'
AND created_at >= NOW() - INTERVAL '90 days'
ORDER BY created_at DESC;
```

## 📊 Vistas Útiles

```sql
-- Vista: Productos con información de categoría
CREATE OR REPLACE VIEW products_with_category AS
SELECT
  p.id,
  p.title,
  p.description,
  p.price,
  p.stock,
  c.name as category_name,
  c.id as category_id,
  p.created_at
FROM public.products p
LEFT JOIN public.categories c ON p.category = c.name;

-- Vista: Descuentos vigentes
CREATE OR REPLACE VIEW active_discounts AS
SELECT
  id,
  title,
  discount_type,
  discount_value,
  is_global,
  valid_from,
  valid_until
FROM public.discounts
WHERE is_active = true
AND (valid_from IS NULL OR valid_from <= NOW())
AND (valid_until IS NULL OR valid_until >= NOW());

-- Vista: Cupones disponibles
CREATE OR REPLACE VIEW available_coupons AS
SELECT
  id,
  code,
  discount_type,
  discount_value,
  uses_count,
  max_uses,
  min_purchase_amount
FROM public.coupons
WHERE is_active = true
AND (valid_from IS NULL OR valid_from <= NOW())
AND (valid_until IS NULL OR valid_until >= NOW())
AND (max_uses IS NULL OR uses_count < max_uses);

-- Usar vistas
SELECT * FROM products_with_category;
SELECT * FROM active_discounts;
SELECT * FROM available_coupons;
```

## 💡 Tips y Mejores Prácticas

1. **Siempre usar RETURNING** en INSERT/UPDATE/DELETE para confirmar cambios
2. **Usar transacciones** para operaciones relacionadas (ej: crear orden + items)
3. **Validar con Supabase Auth** antes de modificar datos sensibles
4. **Usar índices** en campos frecuentemente consultados (ya incluidos)
5. **Respetar RLS** - las queries desde la app respetarán automáticamente
6. **Backup regular** de la base de datos en Supabase

## 🔗 Recursos SQL

- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Supabase SQL Reference](https://supabase.com/docs/guides/database/overview)
- [PostgreSQL JSON](https://www.postgresql.org/docs/current/datatype-json.html)
