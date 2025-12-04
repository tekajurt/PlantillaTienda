# PlantillaTienda

Plantilla básica de tienda online construida con Next.js (App Router) y Supabase. El objetivo actual es alcanzar un MVP completo con catálogo, carrito, autenticación y panel administrativo.

## 🚀 Quick Start

1. **Lee la documentación**: Ver `/docs/INDEX.md` para orientarte
2. **Instala dependencias**: `npm install`
3. **Configura variables de entorno**: Copia `.env.example` a `.env.local`
4. **Ejecuta scripts SQL**: `supabase/init.sql` y `supabase/seed.sql` en Supabase
5. **Inicia el servidor**: `npm run dev`

## 📚 Documentación

La documentación está organizada en la carpeta `/docs/`:

- **`docs/INDEX.md`** - Índice de documentación (EMPIEZA AQUÍ)
- **`docs/TODO.md`** - Estado del proyecto y checklist de funcionalidades
- **`docs/IMPLEMENTACION.md`** - Resumen técnico y arquitectura
- **`docs/CRUDS.md`** - Guía de CRUDs administrativos
- **`docs/SQL_REFERENCE.md`** - Referencia completa de SQL y queries útiles

## ✅ Estado Actual

- **Stack**: Next.js 14 (App Router), React 18, Supabase, Context API
- **Funcionalidades completadas**:

  - ✅ Catálogo de productos con filtros y búsqueda
  - ✅ Detalle de producto
  - ✅ Carrito local con persistencia
  - ✅ Checkout (sin pago)
  - ✅ Autenticación y roles (admin/cliente)
  - ✅ Dashboard administrativo
  - ✅ CRUD de productos, categorías, descuentos
  - ✅ Base de datos completa (Supabase PostgreSQL)
  - ✅ RLS y seguridad

- **En desarrollo/Próximo**: Ver `/docs/TODO.md` para detalles

## 🗂️ Estructura del Proyecto

```
PlantillaTienda/
├── docs/                          # Documentación
│   ├── INDEX.md                   # Índice de documentos (empezar aquí)
│   ├── TODO.md                    # Estado y roadmap
│   ├── IMPLEMENTACION.md          # Resumen técnico
│   ├── CRUDS.md                   # Guía de CRUDs
│   └── SQL_REFERENCE.md           # Referencia SQL
├── supabase/                      # Scripts SQL
│   ├── init.sql                   # Crear todas las tablas
│   ├── seed.sql                   # Datos de prueba
│   ├── schema_products.sql        # (legacy)
│   ├── seed_products.sql          # (legacy)
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── page.js                # Home
│   │   ├── layout.js              # Layout con providers
│   │   ├── globals.css            # Estilos globales
│   │   ├── auth/
│   │   │   └── login/page.js      # Login y signup
│   │   ├── admin/
│   │   │   ├── layout.js          # Sidebar y protección
│   │   │   ├── page.js            # Dashboard
│   │   │   ├── productos/page.js  # CRUD productos
│   │   │   ├── categorias/page.js # CRUD categorías
│   │   │   ├── descuentos/page.js # CRUD descuentos
│   │   │   └── admin.module.css
│   │   ├── tienda/
│   │   │   ├── page.js            # Catálogo
│   │   │   ├── tienda.module.css
│   │   │   └── [id]/page.js       # Detalle de producto
│   │   ├── carrito/
│   │   │   ├── page.js            # Carrito
│   │   │   └── carrito.module.css
│   │   ├── checkout/
│   │   │   ├── page.js            # Checkout
│   │   │   └── checkout.module.css
│   │   ├── datos/                 # API REST
│   │   │   ├── route.js           # GET productos
│   │   │   └── [id]/route.js      # CRUD por ID
│   │   └── estructura/
│   │       ├── navbar/
│   │       ├── footer/
│   ├── context/
│   │   ├── AuthContext.js         # Autenticación global
│   │   └── CartContext.js         # Carrito global
│   ├── components/
│   │   ├── Modal.js               # Modal reutilizable
│   │   ├── modal.module.css
│   │   └── admin-crud.module.css  # Estilos CRUD compartidos
│   └── lib/
│       └── supabase.js            # Cliente Supabase
├── public/
│   └── images/
├── .env.example                   # Variables de entorno (ejemplo)
├── .env.local                     # Variables locales (NO commitar)
├── next.config.mjs
├── jsconfig.json
├── package.json
└── README.md                      # Este archivo
```

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, CSS Modules
- **Backend**: Supabase (PostgreSQL, Auth)
- **Estado**: Context API + localStorage
- **Autenticación**: Supabase Auth
- **BD**: PostgreSQL (Supabase)

## 💻 Desarrollo

### Requisitos

- Node.js 18+
- npm o yarn
- Cuenta en Supabase

### Instalación

```bash
npm install
```

### Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Build para producción

```bash
npm run build
npm start
```

## 🗄️ Base de Datos

### Crear esquema

1. Abre tu proyecto en Supabase
2. Ve a SQL Editor
3. Copia el contenido de `supabase/init.sql`
4. Ejecuta en el editor (PRIMERO)

### Agregar datos de prueba

1. Copia el contenido de `supabase/seed.sql`
2. Ejecuta en el editor (SEGUNDO)

**Nota**: Ver `/docs/CRUDS.md` para instrucciones detalladas

## 🔐 Configuración Admin

Para crear un usuario admin:

1. Ve a Supabase > Authentication > Users
2. Crea un usuario o usa uno existente
3. En "User Metadata", agrega:

   ```json
   {
     "user_role": "admin"
   }
   ```

4. Accede a `/admin` para ver el panel

## 📖 Guías por Caso de Uso

**Si quiero...**

- **Entender el proyecto**: Leer `/docs/INDEX.md` y `/docs/IMPLEMENTACION.md`
- **Ver qué falta**: Abrir `/docs/TODO.md`
- **Usar los CRUDs**: Consultar `/docs/CRUDS.md`
- **Escribir queries SQL**: Ver `/docs/SQL_REFERENCE.md`
- **Agregar un CRUD nuevo**: Copiar estructura de `src/app/admin/productos/page.js`
- **Modificar la BD**: Editar `supabase/init.sql` y ejecutar en Supabase

## 🚀 Roadmap

El roadmap completo está en `/docs/TODO.md`. Los siguientes pasos inmediatos son:

1. Guardar pedidos en checkout
2. CRUD de cupones en admin
3. Integración de descuentos en carrito
4. Upload de imágenes a Supabase Storage
5. Sistema de notificaciones (toasts)

## 🐛 Troubleshooting

**Para problemas comunes, consultar**:

- `/docs/CRUDS.md` - Sección "Troubleshooting"
- `/docs/SQL_REFERENCE.md` - Queries de auditoría
- Consola del navegador (F12) para errores JavaScript
- SQL Editor de Supabase para errores de BD

## 📝 Notas

- Este es un MVP. La arquitectura está diseñada para escalar
- Todos los CRUDs siguen el mismo patrón (fácil agregar más)
- RLS está configurado para seguridad automática
- Las migraciones SQL se encuentran unificadas en `supabase/init.sql`

## 📧 Contacto

Para dudas o sugerencias, revisar la documentación en `/docs/`
