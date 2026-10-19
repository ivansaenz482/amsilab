# AMSILAB

Sitio web de **AMSILAB — Industrial Automation Lab**: formación técnica, talleres,
seminarios y capacitación empresarial en automatización industrial, PLC, SCADA e
Industria 4.0.

Esta primera versión es una web comercial enfocada en presentar la marca, publicar
el catálogo de programas y captar solicitudes. No incluye pagos online ni aula
virtual.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Lucide React
- React Hook Form + Zod (formulario de solicitudes)
- Neon PostgreSQL (`@neondatabase/serverless`) para solicitudes y panel interno
- Resend (opcional) para notificaciones por correo
- Vercel + GitHub (despliegue)

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa DATABASE_URL y las claves del panel
npm run dev
```

Abre `http://localhost:3000`. El panel interno queda en `http://localhost:3000/admin`.

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
| `ADMIN_PASSWORD` | Contraseña de acceso al panel `/admin`. |
| `ADMIN_SESSION_SECRET` | Secreto para firmar la cookie de sesión del panel. |
| `RESEND_API_KEY` | Clave de Resend. Si falta, el formulario sigue guardando en la base de datos y no se envían correos. |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend, por ejemplo `AMSILAB <no-reply@tudominio.com>`. |
| `LEAD_NOTIFICATION_EMAIL` | Correo interno que recibe el aviso de cada solicitud nueva. |

## Base de datos

La migración inicial está en `db/migrations/0001_create_leads.sql` y crea la tabla
`public.leads` (solicitudes) con índices por fecha y correo, además de activar
Row Level Security.

```bash
psql "$DATABASE_URL" -f db/migrations/0001_create_leads.sql
```

## Panel de solicitudes

Disponible en `/admin`, protegido con contraseña (`ADMIN_PASSWORD`) y una cookie de
sesión firmada con `ADMIN_SESSION_SECRET` (válida durante 12 horas).

Incluye:

- Listado de solicitudes con buscador y filtro por estado.
- Estados: nuevo, contactado, cerrado y descartado.
- Contadores por estado y enlace directo de correo o teléfono.
- Exportación a CSV compatible con Excel.
- `noindex` y bloqueo en `robots.txt` para que no aparezca en buscadores.

## Notificaciones por correo

Con `RESEND_API_KEY` configurada, cada solicitud envía dos mensajes:

1. Aviso interno a `LEAD_NOTIFICATION_EMAIL` con todos los datos (responder contesta
   directamente al interesado).
2. Confirmación al interesado con copia de su mensaje.

Sin clave configurada, el envío se omite en silencio y la solicitud queda registrada
en la base de datos.

## Estructura

```text
src/
├── app/                      # rutas y metadatos (App Router)
│   ├── admin/                # panel interno (login, listado, export CSV)
│   ├── api/leads/route.ts    # endpoint del formulario público
│   ├── cursos/               # catálogo y detalle por programa
│   ├── talleres/ seminarios/ empresas/ servicios/ recursos/
│   ├── contacto/             # formulario de solicitudes
│   ├── sitemap.ts robots.ts
├── components/
│   ├── layout/               # navbar y footer
│   └── site/                 # componentes de páginas interiores
├── features/
│   ├── courses/              # datos, tipos y tarjeta del catálogo
│   └── leads/                # formulario, correos y consultas a la base de datos
├── lib/                      # utilidades, base de datos, correo y sesión del panel
└── schemas/                  # validación con Zod
```

## Catálogo

Los programas viven en `src/features/courses/data.ts` como datos tipados: cada uno
define horas, nivel, modalidades, módulos, competencias, contenido incluido,
convocatorias con fechas y cupos, e inversión.

Para publicar cursos reales basta con editar ese archivo: las tarjetas, el detalle,
las convocatorias y el sitemap se generan a partir de él.

```ts
{
  slug: "fundamentos-de-plc-industrial",
  hours: 40,
  investment: { usd: 340, unit: "por participante", note: "..." },
  schedules: [
    {
      label: "Grupo de tarde",
      startDate: "2026-11-09",
      endDate: "2026-12-04",
      modality: "Presencial",
      time: "Lunes y miércoles · 18:00 a 21:00",
      seats: 14,
    },
  ],
}
```

## Contenido pendiente

- Sustituir los programas, fechas y valores de ejemplo por la oferta comercial real.
- Verificar el dominio propio en Resend para enviar correos desde una dirección de AMSILAB.
- Imágenes industriales definitivas y revisión con lector de pantalla.

## Despliegue

El proyecto se despliega en Vercel. Cada push a `main` genera un despliegue de
producción y cada pull request una URL de preview.
