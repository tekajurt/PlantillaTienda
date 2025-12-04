# 📚 Documentación - PlantillaTienda

Bienvenido a la documentación del proyecto. Aquí encontrarás guías, referencias y recursos para entender la arquitectura y funcionalidades.

## 📑 Índice de Documentos

### 1. **TODO.md** - Lista de Tareas Completa

- Estado del proyecto fase por fase
- Checklist de funcionalidades implementadas y pendientes
- Prioridades inmediatas y futuras
- Notas de implementación

👉 **Usa esto para**: Entender qué está hecho y qué falta

---

### 2. **IMPLEMENTACION.md** - Resumen Técnico Ejecutivo

- Descripción general de lo implementado
- Estructura del proyecto
- Stack tecnológico utilizado
- Cómo ejecutar el proyecto localmente
- Próximos pasos recomendados

👉 **Usa esto para**: Entender la arquitectura general y cómo ejecutar el proyecto

---

### 3. **CRUDS.md** - Guía de CRUDs Administrativos

- Descripción de los 3 CRUDs implementados (Productos, Categorías, Descuentos)
- Instrucciones para ejecutar scripts SQL
- Configuración de roles en Supabase
- Troubleshooting de errores comunes

👉 **Usa esto para**: Implementar o entender los CRUDs del admin

---

### 4. **SQL_REFERENCE.md** - Referencia SQL Completa

- Documentación de todas las tablas
- Queries útiles por funcionalidad
- Vistas personalizadas
- Tips de optimización
- Scripts de mantenimiento

👉 **Usa esto para**: Consultas SQL, auditoría, reportes

---

## 🗂️ Scripts SQL

Ubicados en `/supabase/`:

### **init.sql** - Esquema Completo (EJECUTAR PRIMERO)

- Crea todas las tablas (products, categories, discounts, coupons, orders, order_items)
- Configura índices para performance
- Establece RLS (Row Level Security)
- Define políticas de acceso

**Ejecución**:

```
1. Abre Supabase > SQL Editor
2. Copia contenido de supabase/init.sql
3. Ejecuta en el editor
```

---

### **seed.sql** - Datos de Prueba (EJECUTAR SEGUNDO)

- Inserta categorías de ejemplo
- Agrega productos de muestra
- Crea descuentos y cupones de prueba

**Ejecución**:

```
1. Abre Supabase > SQL Editor
2. Copia contenido de supabase/seed.sql
3. Ejecuta en el editor
```

---

## 🚀 Quick Start

### Para desarrolladores nuevos:

1. **Lee primero**: `IMPLEMENTACION.md` (5 min)
2. **Configura**: Variables de entorno y Supabase
3. **Ejecuta**: `npm install && npm run dev`
4. **Explora**: `/admin` para ver los CRUDs en acción

### Para entender la base de datos:

1. **Lee**: `SQL_REFERENCE.md` sección "Tablas"
2. **Ejecuta**: Los scripts SQL en `supabase/init.sql` y `supabase/seed.sql`
3. **Consulta**: Usa las queries de ejemplo en `SQL_REFERENCE.md`

### Para agregar funcionalidades:

1. **Consulta**: `TODO.md` para ver qué falta
2. **Lee**: `CRUDS.md` si es admin
3. **Lee**: `IMPLEMENTACION.md` sección "Próximos pasos"

---

## 📊 Estructura de Carpetas Documentación

```
docs/
├── INDEX.md (este archivo)
├── TODO.md (lista de tareas)
├── IMPLEMENTACION.md (resumen técnico)
├── CRUDS.md (guía de CRUDs)
└── SQL_REFERENCE.md (referencia SQL)
```

---

## 🔗 Enlaces Rápidos

- **README.md** (raíz) - Información general del proyecto
- **supabase/** - Scripts SQL
  - `init.sql` - Crear esquema
  - `seed.sql` - Datos de prueba
- **src/** - Código fuente
  - `app/admin/` - Rutas administrativas
  - `context/` - Estado global
  - `lib/supabase.js` - Cliente Supabase

---

## ❓ FAQ Rápido

**P: ¿Cómo configuro un usuario admin?**
A: Lee "Configuración de Roles" en `CRUDS.md`

**P: ¿Qué tablas existen?**
A: Ver sección "Tablas Creadas" en `CRUDS.md`

**P: ¿Cómo escribo una query SQL?**
A: Consulta `SQL_REFERENCE.md` - tiene ejemplos para cada tabla

**P: ¿Qué falta implementar?**
A: Abre `TODO.md` y busca items sin `[x]`

**P: ¿Cómo ejecuto el servidor?**
A: Lee "Cómo Ejecutar" en `IMPLEMENTACION.md`

---

## 🎯 Documentación por Rol

### Si eres **Desarrollador Frontend**:

- Leer: `IMPLEMENTACION.md` (arquitectura)
- Revisar: `TODO.md` (funcionalidades faltantes)
- Código: Explorar `/src/app/` y `/src/context/`

### Si eres **Desarrollador Backend/Database**:

- Leer: `SQL_REFERENCE.md` (todas las queries)
- Revisar: `CRUDS.md` (RLS y seguridad)
- Ejecutar: Scripts en `/supabase/`

### Si eres **Devops/Admin**:

- Leer: `IMPLEMENTACION.md` (stack y deployment)
- Revisar: Variables de entorno en `.env.example`
- Consultar: SQL scripts para backups

### Si eres **Product Manager**:

- Leer: `TODO.md` (roadmap)
- Leer: `IMPLEMENTACION.md` (qué está hecho)
- Priorizar: "Próximos pasos" en `IMPLEMENTACION.md`

---

## 🔄 Flujo de Desarrollo

```
1. Leer TODO.md → Elegir feature
           ↓
2. Leer doc relevante (CRUDS.md, SQL_REFERENCE.md, etc)
           ↓
3. Revisar IMPLEMENTACION.md → Entender arquitectura
           ↓
4. Escribir código
           ↓
5. Probar y actualizar documentación si es necesario
```

---

## 📝 Notas Generales

- **Todos los documentos están en español** para facilitar lectura
- **Los scripts SQL son comentados** para fácil entendimiento
- **Las tablas tienen RLS configurado** - el acceso es automático según rol
- **Los CRUDs son reutilizables** - mismo patrón para agregar más

---

## 🚨 Importante

- **NUNCA ejecutes DELETE sin WHERE en producción**
- **SIEMPRE haz backup antes de cambios grandes**
- **RLS está ACTIVO - respeta las políticas de acceso**
- **Variables de entorno NUNCA se commiten** (.env.local es local)

---

## 📞 Soporte

Si necesitas help:

1. Busca en la documentación relevante
2. Revisa los ejemplos en `SQL_REFERENCE.md`
3. Consulta `CRUDS.md` para troubleshooting
4. Lee los comentarios en el código

---

**Última actualización**: Diciembre 2024
**Versión**: MVP 1.0
