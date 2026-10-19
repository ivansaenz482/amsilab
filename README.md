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
- React Hook Form + Zod (siguiente entrega, formularios)
- Supabase (siguiente entrega, base de datos y autenticación)
- Resend (siguiente entrega, correo transaccional)
- Vercel + GitHub (despliegue)

## Desarrollo local

```bash
npm install
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

## Estructura

```text
src/
├── app/                 # rutas y metadatos (App Router)
│   ├── cursos/          # catálogo de formación
│   ├── talleres/
│   ├── seminarios/
│   ├── empresas/
│   ├── servicios/
│   ├── recursos/
│   ├── contacto/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/          # navbar y footer
│   └── site/            # componentes de páginas interiores
└── lib/
    └── site.ts          # URL pública del sitio
```

## Contenido pendiente

- Sustituir los programas ilustrativos por cursos, fechas y precios reales.
- Implementar el formulario de solicitudes con validación y persistencia.
- Conectar Supabase y Resend.
- Añadir imágenes industriales definitivas y revisar accesibilidad.
- Construir el panel administrativo y, más adelante, el aula virtual.

## Despliegue

El proyecto se despliega en Vercel. Cada push a `main` genera un despliegue de
producción y cada pull request genera una URL de preview.

Variable opcional:

```text
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Si no se define, se usa automáticamente el dominio de producción de Vercel.
