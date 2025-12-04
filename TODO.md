# TODO - MVP Tienda Online

## ✅ Fase 1: Infraestructura Base (COMPLETADO)

### Base de Datos y API

- [x] Migrar de MongoDB a Supabase
- [x] Crear esquema de tabla `products` con RLS
- [x] Configurar cliente Supabase (`src/lib/supabase.js`)
- [x] Endpoint GET `/datos` con filtros (q, category, limit, offset)
- [x] Endpoint GET `/datos/[id]` para detalle
- [x] Endpoints CRUD (POST, PATCH, DELETE) para productos
- [x] Seed de datos de prueba (4 productos)
- [x] Imágenes SVG de placeholder para productos
- [x] Variables de entorno configuradas (`.env.local`)

### Estructura de Proyecto

- [x] Configuración Next.js 14 con App Router
- [x] Context API para estado global (`CartContext`)
- [x] Layout principal con Navbar y Footer
- [x] Estilos globales base (`globals.css`)
- [x] Documentación inicial (`README.md`, `IMPLEMENTACION.md`)

## ✅ Fase 2: Frontend Cliente (COMPLETADO)

### Catálogo y Productos

- [x] Página Home con hero y CTA
- [x] Página `/tienda` con grid responsivo
- [x] Filtros por categoría
- [x] Búsqueda por texto (título)
- [x] Página detalle `/tienda/[id]` con galería
- [x] Mostrar precio, descripción, stock
- [x] Indicador "sin stock" y botón deshabilitado
- [x] Selector de cantidad en detalle

### Carrito de Compras

- [x] Context API con persistencia en localStorage
- [x] Agregar productos al carrito
- [x] Página `/carrito` con listado
- [x] Editar cantidades de productos
- [x] Eliminar productos del carrito
- [x] Cálculo de subtotales y total
- [x] Contador de items en Navbar
- [x] Rehidratación automática del carrito

### Checkout

- [x] Página `/checkout` con formulario
- [x] Validación de campos (nombre, email, teléfono, dirección, ciudad, CP)
- [x] Resumen de pedido con totales
- [x] Pantalla de confirmación post-checkout
- [x] Vaciar carrito después de confirmar

### UI/UX Base

- [x] Navbar con links y contador carrito
- [x] Footer con información básica
- [x] Diseño responsivo mobile-first
- [x] Estilos CSS modulares por componente
- [x] Estados de carga básicos
- [x] Manejo de errores en fetch

## 🚧 Fase 3: Dashboard Administrativo (PENDIENTE)

### Autenticación y Autorización

- [x] Integrar Supabase Auth
- [x] Página de login `/auth/login`
- [x] Middleware de protección de rutas admin
- [x] Roles: admin y cliente (via user_metadata)
- [x] Logout y sesión persistente
- [ ] Recuperación de contraseña
- [ ] Configurar usuario admin inicial en Supabase

### Dashboard Principal

- [x] Layout admin con sidebar
- [x] Dashboard `/admin` con métricas generales
- [ ] Gráficas de ventas (últimos 7/30 días)
- [x] Stock bajo (alertas)
- [x] Resumen de pedidos pendientes
- [ ] Usuarios registrados (total)

### CRUD de Productos

- [ ] Página `/admin/productos` con tabla
- [ ] Crear nuevo producto (formulario modal/página)
- [ ] Editar producto existente
- [ ] Eliminar producto (con confirmación)
- [ ] Upload de imágenes (Supabase Storage)
- [ ] Gestión de múltiples imágenes por producto
- [ ] Vista previa de imágenes
- [ ] Validación de formularios
- [ ] Búsqueda y filtros en tabla admin
- [ ] Paginación de productos en admin

### Gestión de Categorías

- [x] Tabla `categories` en Supabase (creada)
- [ ] CRUD de categorías desde admin
- [ ] Relación productos-categorías (foreign key)
- [ ] Selector de categoría en formulario producto
- [ ] Jerarquía de categorías (opcional: padre-hijo)

## 🚧 Fase 4: Funcionalidades Avanzadas (PENDIENTE)

### Sistema de Ofertas y Descuentos

- [x] Tabla `discounts` en Supabase (creada)
- [ ] CRUD de descuentos desde admin
- [ ] Tipos: porcentaje, monto fijo
- [ ] Aplicar descuento a productos específicos
- [ ] Aplicar descuento a categorías
- [ ] Descuento global (toda la tienda)
- [ ] Fechas de vigencia (inicio/fin)
- [ ] Mostrar precio original tachado
- [ ] Badge "OFERTA" en productos
- [ ] Validación de descuentos en carrito

### Cupones de Descuento

- [x] Tabla `coupons` en Supabase (creada)
- [ ] CRUD de cupones desde admin
- [ ] Código único de cupón
- [ ] Tipo: porcentaje, monto fijo, envío gratis
- [ ] Límite de usos (total y por usuario)
- [ ] Monto mínimo de compra
- [ ] Productos/categorías aplicables
- [ ] Input de cupón en checkout
- [ ] Validación y aplicación de cupón
- [ ] Mostrar descuento aplicado en resumen

### Gestión de Pedidos

- [x] Tabla `orders` en Supabase (creada)
- [x] Tabla `order_items` (productos del pedido) (creada)
- [ ] Guardar pedido al confirmar checkout
- [ ] Estados: pendiente, procesando, enviado, entregado, cancelado
- [ ] Página `/admin/pedidos` con lista
- [ ] Detalle de pedido con items
- [ ] Cambiar estado de pedido
- [ ] Filtros por estado y fecha
- [ ] Búsqueda por número de pedido o cliente
- [ ] Exportar pedidos (CSV/PDF opcional)

### Gestión de Clientes

- [ ] Tabla `customers` extendiendo users
- [ ] Lista de clientes en admin
- [ ] Detalle de cliente con historial de compras
- [ ] Direcciones guardadas del cliente
- [ ] Desactivar/activar cuenta
- [ ] Estadísticas por cliente (total gastado, pedidos)

### Inventario y Stock

- [ ] Reducir stock al confirmar pedido
- [ ] Alertas de stock bajo en dashboard
- [ ] Historial de movimientos de stock (opcional)
- [ ] Desactivar compra si stock = 0
- [ ] Indicador de stock en admin y cliente

## 🚧 Fase 5: Experiencia de Usuario (PENDIENTE)

### Búsqueda y Filtros Avanzados

- [ ] Filtros múltiples (precio, categoría, stock)
- [ ] Ordenamiento (precio asc/desc, nombre, fecha)
- [ ] Paginación completa en catálogo
- [ ] Barra de búsqueda en navbar
- [ ] Autocompletado en búsqueda (opcional)
- [ ] Filtrar por rango de precios

### Wishlist (Lista de Deseos)

- [ ] Tabla `wishlists` en Supabase
- [ ] Agregar/quitar productos de wishlist
- [ ] Página `/wishlist` con productos guardados
- [ ] Icono corazón en productos
- [ ] Mover de wishlist a carrito
- [ ] Persistencia para usuarios autenticados

### Reviews y Ratings

- [ ] Tabla `reviews` en Supabase
- [ ] Mostrar reviews en detalle de producto
- [ ] Promedio de rating (estrellas)
- [ ] Escribir review (solo usuarios autenticados)
- [ ] Validación: 1 review por usuario/producto
- [ ] Moderación de reviews en admin
- [ ] Ordenar reviews (más útiles, recientes)

### Recomendaciones

- [ ] Productos relacionados en detalle
- [ ] "Los clientes también compraron"
- [ ] Productos destacados en home
- [ ] Últimos productos agregados

### Notificaciones

- [ ] Toasts/snackbar para feedback
- [ ] Notificación al agregar al carrito
- [ ] Notificación de error en formularios
- [ ] Confirmación de acciones (eliminar, etc)
- [ ] Emails transaccionales (opcional):
  - [ ] Confirmación de pedido
  - [ ] Cambio de estado de pedido
  - [ ] Recuperación de contraseña

## 🚧 Fase 6: Optimización y Calidad (PENDIENTE)

### Performance

- [ ] Optimización de imágenes (Next.js Image)
- [ ] Lazy loading de productos
- [ ] Caché de queries (React Query/SWR opcional)
- [ ] Minimizar re-renders en carrito
- [ ] Lighthouse score > 90

### Accesibilidad

- [ ] Etiquetas alt en todas las imágenes
- [ ] Navegación por teclado
- [ ] ARIA labels y roles
- [ ] Contraste de colores WCAG AA
- [ ] Formularios accesibles

### SEO

- [ ] Metadata dinámica por página
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Structured data (JSON-LD para productos)

### Testing

- [ ] Tests unitarios (componentes clave)
- [ ] Tests de integración (flujos críticos)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] Test del carrito y checkout
- [ ] Test de CRUD en admin

### Seguridad

- [ ] Validación server-side en todos los endpoints
- [ ] Rate limiting en API
- [ ] Sanitización de inputs
- [ ] RLS policies más restrictivas en Supabase
- [ ] Prevención de inyección SQL
- [ ] HTTPS en producción

## 🚧 Fase 7: Despliegue y Producción (PENDIENTE)

### Preparación

- [ ] Configurar variables de entorno para producción
- [ ] Build de Next.js sin errores
- [ ] Optimización de bundle size
- [ ] Configurar dominio personalizado
- [ ] Certificado SSL

### Deploy

- [ ] Deploy en Vercel/Netlify
- [ ] Conectar Supabase producción
- [ ] Configurar CI/CD (GitHub Actions opcional)
- [ ] Monitoreo de errores (Sentry opcional)
- [ ] Analytics (Google Analytics/Plausible)

### Documentación

- [ ] Guía de instalación completa
- [ ] Documentación de API
- [ ] Guía de uso del admin
- [ ] Changelog
- [ ] Política de privacidad
- [ ] Términos de servicio

## 🎯 Fase 8: Post-MVP (FUTURO)

### Integraciones de Pago

- [ ] Stripe/PayPal/MercadoPago
- [ ] Checkout con pago real
- [ ] Webhooks de confirmación
- [ ] Reembolsos
- [ ] Múltiples métodos de pago

### Envíos

- [ ] Integración con proveedores de envío
- [ ] Cálculo de costos de envío
- [ ] Tracking de paquetes
- [ ] Múltiples direcciones de envío

### Marketing

- [ ] Newsletter (captura de emails)
- [ ] Integración con Mailchimp/SendGrid
- [ ] Banners promocionales
- [ ] Popup de descuento primera compra
- [ ] Programa de referidos

### Multiidioma

- [ ] i18n (español/inglés)
- [ ] Selector de idioma
- [ ] Traducciones de contenido

### App Móvil

- [ ] PWA (Progressive Web App)
- [ ] React Native/Flutter (opcional)
- [ ] Notificaciones push

## 📝 Notas de Implementación

### Prioridades Inmediatas (Siguientes Pasos)

1. **Autenticación**: Implementar Supabase Auth para admin
2. **Dashboard Admin**: Panel básico con métricas
3. **CRUD Productos**: Gestión completa desde admin
4. **Gestión de Pedidos**: Guardar y listar pedidos
5. **Sistema de Descuentos**: Ofertas básicas

### Stack Tecnológico Confirmado

- **Frontend**: Next.js 14 (App Router), React 18
- **Backend**: Supabase (Postgres, Auth, Storage)
- **Estilos**: CSS Modules
- **Estado**: Context API + localStorage
- **Hosting**: Vercel (sugerido)

### Consideraciones

- Mantener la arquitectura desacoplada para escalar
- Priorizar funcionalidades core antes que nice-to-have
- Validar tanto en cliente como servidor
- Documentar decisiones importantes
- Commits pequeños y frecuentes
