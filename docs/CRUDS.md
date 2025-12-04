# CRUDs Completados - Guía de Implementación

## ✅ Archivos Creados

### 1. CRUD de Productos

- **Archivo**: `src/app/admin/productos/page.js`
- **Funcionalidad**: Crear, leer, actualizar y eliminar productos
- **Campos**: title, description, price, stock, category, images (JSON)
- **Características**:
  - Búsqueda en tiempo real
  - Modal para crear/editar
  - Tabla con listado de productos
  - Confirmación antes de eliminar

### 2. CRUD de Categorías

- **Archivo**: `src/app/admin/categorias/page.js`
- **Funcionalidad**: Gestionar categorías de productos
- **Campos**: name, description
- **Características**:
  - Búsqueda por nombre
  - Interfaz limpia y simple
  - Modal reutilizable

### 3. CRUD de Descuentos

- **Archivo**: `src/app/admin/descuentos/page.js`
- **Funcionalidad**: Crear y gestionar descuentos
- **Campos**: title, description, discount_type (percentage/fixed), discount_value, valid_from, valid_until, is_active, applicable_to
- **Características**:
  - Soporte para descuentos por porcentaje y monto fijo
  - Fechas de vigencia
  - Toggle para activar/desactivar
  - Visualización clara en tabla

### 4. Estilos Compartidos

- **Archivo**: `src/components/admin-crud.module.css`
- **Contenido**: Estilos responsivos para todos los CRUDs
- **Incluye**: Tables, buttons, forms, search input, responsive design

## 🔧 Configuración Supabase

Para que los CRUDs funcionen correctamente, ejecuta el script SQL unificado:

### Ubicación del Script:

- **Archivo**: `supabase/init.sql` (esquema completo)
- **Archivo**: `supabase/seed.sql` (datos de prueba)

### Pasos para Ejecutar:

1. **Abre el Editor SQL de Supabase**:

   - Ve a tu proyecto Supabase
   - Abre "SQL Editor" en el panel izquierdo
   - Crea una nueva query

2. **Ejecuta init.sql primero**:

   ```
   - Copia el contenido de supabase/init.sql
   - Pégalo en el editor SQL
   - Haz clic en "Run" o presiona Ctrl+Enter
   - Verifica que no haya errores
   ```

3. **Ejecuta seed.sql después** (opcional, para datos de prueba):
   ```
   - Copia el contenido de supabase/seed.sql
   - Pégalo en el editor SQL
   - Haz clic en "Run"
   - Esto agregará categorías, productos, descuentos y cupones de ejemplo
   ```

## 📊 Tablas Creadas

### categories

```
id (UUID, PK)
name (TEXT, UNIQUE)
description (TEXT)
created_at (TIMESTAMP)
```

### discounts

```
id (UUID, PK)
title (TEXT)
description (TEXT)
discount_type (TEXT: 'percentage' | 'fixed')
discount_value (DECIMAL)
product_ids (JSONB)
category_ids (JSONB)
is_global (BOOLEAN)
valid_from (TIMESTAMP)
valid_until (TIMESTAMP)
is_active (BOOLEAN)
created_at (TIMESTAMP)
```

### coupons

```
id (UUID, PK)
code (TEXT, UNIQUE)
discount_type (TEXT: 'percentage' | 'fixed' | 'free_shipping')
discount_value (DECIMAL)
max_uses (INTEGER)
uses_count (INTEGER)
min_purchase_amount (DECIMAL)
product_ids (JSONB)
category_ids (JSONB)
valid_from (TIMESTAMP)
valid_until (TIMESTAMP)
is_active (BOOLEAN)
created_at (TIMESTAMP)
```

### orders

```
id (UUID, PK)
customer_email (TEXT)
customer_name (TEXT)
customer_phone (TEXT)
customer_address (TEXT)
customer_city (TEXT)
customer_postal_code (TEXT)
status (TEXT: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
total_amount (DECIMAL)
discount_amount (DECIMAL)
coupon_code (TEXT)
notes (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### order_items

```
id (UUID, PK)
order_id (UUID, FK)
product_id (UUID, FK)
quantity (INTEGER)
unit_price (DECIMAL)
created_at (TIMESTAMP)
```

## 🔐 Configuración de Roles (Importante)

Para que el sistema de autenticación funcione:

1. **En Supabase Auth**, cuando crees un usuario admin:

   - Ve a Authentication > Users
   - Crea o edita un usuario
   - En "User Metadata", agrega:

   ```json
   {
     "user_role": "admin"
   }
   ```

2. **O usa SQL para actualizar**:
   ```sql
   UPDATE auth.users
   SET raw_user_meta_data = jsonb_set(
     COALESCE(raw_user_meta_data, '{}'),
     '{user_role}',
     '"admin"'
   )
   WHERE email = 'tu-email@example.com';
   ```

## 🚀 Pasos para Usar los CRUDs

1. **Ejecutar el servidor de Next.js**:

   ```bash
   npm run dev
   ```

2. **Acceder al admin**:

   - Ve a `http://localhost:3000/admin`
   - Si no estás autenticado, serás redirigido a `/auth/login`
   - Inicia sesión con tu cuenta admin

3. **Navegar a los CRUDs**:

   - **Productos**: `/admin/productos`
   - **Categorías**: `/admin/categorias`
   - **Descuentos**: `/admin/descuentos`

4. **Operaciones**:
   - **Crear**: Haz clic en el botón "+ Nueva [Entidad]"
   - **Editar**: Haz clic en "Editar" en la fila
   - **Eliminar**: Haz clic en "Eliminar" (requiere confirmación)
   - **Buscar**: Usa el input de búsqueda en tiempo real

## 📋 Estructuras de Datos JSON

### Productos - Campo images

```json
[{ "url": "https://...", "alt": "Descripción de la imagen" }]
```

### Descuentos - Campos product_ids y category_ids

```json
["uuid-producto-1", "uuid-producto-2"]
```

## 🐛 Troubleshooting

### Error: "Not authenticated"

- Verifica que estés logueado como usuario admin
- Revisa que tu usuario tenga `user_role: 'admin'` en user_metadata en Supabase

### Error: "Cannot insert into [table]"

- Verifica que las tablas existan en Supabase (ejecuta init.sql)
- Revisa que RLS esté configurado correctamente
- Asegúrate de que el usuario sea admin para operaciones de escritura

### Error de CORS

- No debería ocurrir si Supabase está configurado correctamente
- Verifica las variables de entorno en `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
  ```

### Las tablas no se crean

- Abre la consola del navegador (F12)
- Revisa si hay errores SQL específicos
- Intenta ejecutar init.sql nuevamente en el SQL Editor de Supabase
- Verifica que tengas permisos de superusuario en Supabase

## 📝 Notas Adicionales

- Todos los CRUDs usan el mismo componente Modal reutilizable (`src/components/Modal.js`)
- El archivo CSS es compartido entre todos los CRUDs (`src/components/admin-crud.module.css`)
- Los estilos son responsivos y adaptados para móvil
- Las búsquedas son en tiempo real sin necesidad de hacer clic en un botón
- Los timestamps se formatean automáticamente en la tabla de descuentos
- Las políticas RLS están configuradas para permitir solo a admins crear/editar/eliminar

## 🔗 Archivos Relacionados

- Documentación general: `/docs/IMPLEMENTACION.md`
- Lista de tareas: `/docs/TODO.md`
- Schema unificado: `/supabase/init.sql`
- Datos de prueba: `/supabase/seed.sql`
- Componente Modal: `/src/components/Modal.js`
- Estilos CRUD: `/src/components/admin-crud.module.css`
