# CRUDs Completados - Próximos Pasos

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

## 🔧 Requisitos de Supabase

Para que los CRUDs funcionen correctamente, necesitas ejecutar las migraciones SQL en Supabase:

### 1. Crear tablas si no existen:

```sql
-- Categorías
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Descuentos
CREATE TABLE IF NOT EXISTS public.discounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2) NOT NULL,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  applicable_to TEXT DEFAULT 'all',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Verificar la tabla de productos:

La tabla `products` debe tener los siguientes campos (si no existen, agrégalos):

```sql
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images JSONB;
```

### 3. Configurar Row Level Security (RLS):

```sql
-- Para categorías
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden leer categorías"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Solo admin puede modificar categorías"
  ON public.categories FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Solo admin puede actualizar categorías"
  ON public.categories FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Solo admin puede eliminar categorías"
  ON public.categories FOR DELETE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Para descuentos
ALTER TABLE public.discounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden leer descuentos"
  ON public.discounts FOR SELECT
  USING (true);

CREATE POLICY "Solo admin puede crear descuentos"
  ON public.discounts FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Solo admin puede actualizar descuentos"
  ON public.discounts FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Solo admin puede eliminar descuentos"
  ON public.discounts FOR DELETE
  USING (auth.jwt() ->> 'role' = 'admin');
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

## 📋 Estructuras de Datos

### Productos

```json
{
  "id": "uuid",
  "title": "Nombre del producto",
  "description": "Descripción",
  "price": 99.99,
  "stock": 10,
  "category": "electronics",
  "images": [{ "url": "https://...", "alt": "Imagen 1" }]
}
```

### Categorías

```json
{
  "id": "uuid",
  "name": "Electronics",
  "description": "Productos electrónicos"
}
```

### Descuentos

```json
{
  "id": "uuid",
  "title": "Black Friday 2024",
  "description": "30% de descuento en todo",
  "discount_type": "percentage",
  "discount_value": 30,
  "valid_from": "2024-11-29",
  "valid_until": "2024-12-01",
  "is_active": true,
  "applicable_to": "all"
}
```

## 🐛 Troubleshooting

### Error: "Not authenticated"

- Verifica que estés logueado como usuario admin
- Revisa que tu usuario tenga `role: 'admin'` en user_metadata en Supabase

### Error: "Cannot insert into [table]"

- Verifica que las tablas existan en Supabase
- Revisa que RLS esté configurado correctamente
- Asegúrate de que el usuario sea admin para operaciones de escritura

### Error de CORS

- No debería ocurrir si Supabase está configurado correctamente
- Verifica las variables de entorno en `.env.local`

## 📝 Notas Adicionales

- Todos los CRUDs usan el mismo componente Modal reutilizable
- El archivo CSS es compartido entre todos los CRUDs (`admin-crud.module.css`)
- Los estilos son responsivos y adaptados para móvil
- Las búsquedas son en tiempo real sin necesidad de hacer clic en un botón
- Los timestamps se formatean automáticamente en la tabla de descuentos
