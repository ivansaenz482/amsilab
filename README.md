# AMSILAB

Sitio web de **AMSILAB — Industrial Automation Lab**: formación técnica, talleres,
seminarios y capacitación empresarial en automatización industrial, PLC, SCADA e
Industria 4.0.

Esta primera versión es una web comercial enfocada en presentar la marca y captar
solicitudes de información. No incluye pagos online ni aula virtual.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Lucide React
- React Hook Form + Zod (formulario de solicitudes)
- Neon PostgreSQL (`@neondatabase/serverless`) para almacenar los leads
- Vercel + GitHub (despliegue)

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa DATABASE_URL
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm run start    # servidor de producción
npm run lint     # ESLint
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública usada en metadata, sitemap y robots. En Vercel se detecta automáticamente. |
| `DATABASE_URL` | Cadena de conexión PostgreSQL (Neon o Supabase) para la tabla `leads`. |
| `LEAD_HASH_SALT` | Sal para anonimizar la IP registrada con cada solicitud. |

## Base de datos

La migración inicial está en `db/migrations/0001_create_leads.sql` y crea la tabla
`public.leads` (solicitudes) con índices por fecha y correo, además de activar
Row Level Security.

```bash
psql "$DATABASE_URL" -f db/migrations/0001_create_leads.sql
```

## Estructura

```text
src/
├── app/                      # rutas y metadatos (App Router)
│   ├── api/leads/route.ts    # endpoint del formulario
│   ├── cursos/               # catálogo y detalle por programa
│   ├── talleres/ seminarios/ empresas/ servicios/ recursos/
│   ├── contacto/             # formulario de solicitudes
│   ├── sitemap.ts robots.ts
├── components/
│   ├── layout/               # navbar y footer
│   └── site/                 # componentes de páginas interiores
├── features/
│   ├── courses/              # datos, tipos y tarjeta del catálogo
│   └── leads/                # formulario de solicitudes
├── lib/                      # utilidades, cliente de base de datos
└── schemas/                  # validación con Zod
```

## Catálogo

Los programas viven en `src/features/courses/data.ts` como datos tipados. Para
publicar cursos reales basta con editar ese archivo (o conectar una tabla de
cursos cuando exista el panel administrativo).

## Contenido pendiente

- Sustituir los programas ilustrativos por cursos, fechas y precios reales.
- Notificaciones por correo al recibir solicitudes (Resend).
- Panel administrativo para gestionar cursos, solicitudes y eventos.
- Imágenes industriales definitivas y revisión de accesibilidad.
- Aula virtual, certificados y pagos online, cuando el negocio lo requiera.

## Despliegue

El proyecto se despliega en Vercel. Cada push a `main` genera un despliegue de
producción y cada pull request una URL de preview.
