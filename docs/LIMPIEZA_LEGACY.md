# 🧹 Limpieza Opcional - Archivos Legacy

## 📋 Sobre Este Documento

Este documento lista archivos que ahora están **replicados** y **no son necesarios** en la raíz del proyecto. Pueden ser eliminados si lo deseas, pero **no son peligrosos** dejarlos ahí.

## 🗂️ Archivos Que Pueden Eliminarse

### Archivos Markdown en Raíz (Movidos a `docs/`)

```bash
# Estos archivos existen en docs/ con mejor formato
rm -f CRUDS_COMPLETADOS.md      # → docs/CRUDS.md
rm -f TODO.md                   # → docs/TODO.md
rm -f IMPLEMENTACION.md         # → docs/IMPLEMENTACION.md
```

### Archivos SQL Legacy (Reemplazados por `init.sql`)

```bash
# Estos archivos están reemplazados por supabase/init.sql
rm -f supabase/schema_products.sql      # Reemplazado por init.sql
rm -f supabase/seed_products.sql        # Reemplazado por seed.sql
rm -rf supabase/migrations/             # Reemplazado por init.sql
```

## ✅ Lo Que Debes Conservar

### Documentación (MANTENER)

```
docs/
├── INDEX.md                    ⭐ Índice central
├── TODO.md                     ✅ Mantener
├── IMPLEMENTACION.md           ✅ Mantener
├── CRUDS.md                    ✅ Mantener
├── SQL_REFERENCE.md            ✅ Mantener
└── CAMBIOS.md                  ✅ Mantener

README.md                        ✅ Mantener (actualizado)
```

### SQL (MANTENER)

```
supabase/
├── init.sql                    ⭐ CRÍTICO - Mantener
└── seed.sql                    ✅ Mantener
```

## 🚀 Instrucciones de Limpieza (Opcional)

### Opción 1: Eliminar Todo

```bash
#!/bin/bash
cd /home/teka/Workspace/PlantillaTienda

# Eliminar MD legacy
rm -f CRUDS_COMPLETADOS.md
rm -f TODO.md
rm -f IMPLEMENTACION.md

# Eliminar SQL legacy
rm -f supabase/schema_products.sql
rm -f supabase/seed_products.sql
rm -rf supabase/migrations/

echo "Limpieza completada ✅"
```

### Opción 2: Eliminar Solo MD

```bash
#!/bin/bash
cd /home/teka/Workspace/PlantillaTienda

rm -f CRUDS_COMPLETADOS.md
rm -f TODO.md
rm -f IMPLEMENTACION.md

echo "Archivos MD legacy eliminados ✅"
```

### Opción 3: Eliminar Solo SQL

```bash
#!/bin/bash
cd /home/teka/Workspace/PlantillaTienda

rm -f supabase/schema_products.sql
rm -f supabase/seed_products.sql
rm -rf supabase/migrations/

echo "Archivos SQL legacy eliminados ✅"
```

## ⚠️ Advertencias

### ❌ NO ELIMINAR ESTOS ARCHIVOS

```
README.md                        # Documentación principal
.env.local                      # Configuración local
.env.example                    # Template de env
src/                            # Código fuente
public/                         # Assets públicos
package.json                    # Dependencias
next.config.mjs                 # Config de Next.js
jsconfig.json                   # Config de JS
```

### ✅ SEGURO ELIMINAR

```
CRUDS_COMPLETADOS.md            # Está en docs/CRUDS.md
TODO.md (raíz)                  # Está en docs/TODO.md
IMPLEMENTACION.md (raíz)        # Está en docs/IMPLEMENTACION.md
supabase/schema_products.sql    # Está en supabase/init.sql
supabase/seed_products.sql      # Está en supabase/seed.sql
supabase/migrations/001_*       # Está en supabase/init.sql
```

## 📊 Comparación: Antes vs Después

### ANTES (Desorganizado)

```
PlantillaTienda/
├── README.md
├── TODO.md                     ← En raíz
├── IMPLEMENTACION.md           ← En raíz
├── CRUDS_COMPLETADOS.md        ← En raíz
├── supabase/
│   ├── schema_products.sql     ← Incompleto
│   ├── seed_products.sql       ← Solo productos
│   ├── migrations/001_*        ← Separado
│   └── ...
└── src/
```

### DESPUÉS (Organizado)

```
PlantillaTienda/
├── README.md                   ← Actualizado y limpio
├── docs/
│   ├── INDEX.md                ← Entrada principal
│   ├── TODO.md                 ← Documentación
│   ├── IMPLEMENTACION.md       ← Documentación
│   ├── CRUDS.md                ← Documentación
│   ├── SQL_REFERENCE.md        ← Nueva referencia
│   └── CAMBIOS.md              ← Referencia
├── supabase/
│   ├── init.sql                ← Completo y unificado
│   └── seed.sql                ← Todos los datos
└── src/
```

## 🎯 Recomendación

### Opción A: Limpieza Completa (Recomendado)

Eliminar todos los archivos legacy para tener un proyecto limpio:

```bash
# Ver estado antes
ls -la | grep -E "TODO|IMPLEMENTACION|CRUDS"
ls -la supabase/ | grep -E "schema|seed_products"

# Limpiar
rm -f CRUDS_COMPLETADOS.md TODO.md IMPLEMENTACION.md
rm -f supabase/schema_products.sql supabase/seed_products.sql
rm -rf supabase/migrations/

# Verificar
git status  # Si usas git, verás qué se eliminó
```

### Opción B: Sin Limpieza

Dejar como está - **no afecta funcionalidad**, solo es redundante.

## 🔄 Si Hiciste Cambios en Archivos Legacy

**Importante**: Si hiciste cambios en archivos legacy después de esta reorganización:

1. **Copia los cambios** a los nuevos archivos en `docs/`
2. **Verifica que los cambios estén** en las nuevas ubicaciones
3. **Entonces elimina** los archivos legacy

Ejemplo:

```bash
# Si editaste TODO.md (raíz) después de reorganización
# Copia cambios a docs/TODO.md

# Verifica que está todo en docs/TODO.md
cat docs/TODO.md | grep "tu cambio"

# Entonces elimina
rm -f TODO.md
```

## ✅ Checklist de Limpieza

Si decides limpiar, sigue este checklist:

- [ ] He leído este documento
- [ ] He verificado que todos los cambios están en `docs/`
- [ ] He verificado que `supabase/init.sql` tiene todo el schema
- [ ] He verificado que `supabase/seed.sql` tiene todos los datos
- [ ] Entiendo que esto es opcional y reversible
- [ ] Estoy listo para ejecutar la limpieza

## 🆘 Si Algo Sale Mal

Si accidentalmente eliminas algo importante:

1. **Git Restore** (si estás en git):

   ```bash
   git restore ARCHIVO_ELIMINADO
   ```

2. **Desde backup** (si tienes):

   - Restaura desde tu backup

3. **Manualmente**:
   - Los archivos están disponibles en la documentación

## 📞 Soporte

Si tienes dudas:

- Consulta `docs/INDEX.md` - Sección FAQ
- Revisa `docs/CAMBIOS.md` - Detalles de cambios
- Lee este documento nuevamente

---

**Nota**: Esta limpieza es **completamente opcional** y no afecta la funcionalidad de la aplicación.
