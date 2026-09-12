# crisMmolinaPage

Portafolio personal de **Cristopher Ian Molina Fernández** — Ingeniería en
Informática, IPN UPIICSA.

Sitio de una sola página en modo oscuro, con navegación flotante inferior
(sin header) y el historial de commits de GitHub leído en vivo.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Geist Sans/Mono + Instrument Serif.

## Reglas de diseño

El diseño se construyó bajo restricciones explícitas que conviene respetar al
editarlo:

- Sin colores neón. La paleta es de neutros cálidos sobre negro `#0b0a09` con un
  único acento arena `#c9b492` de baja saturación.
- Sin emojis. Todos los iconos son SVG en `components/Icons.tsx`.
- Sin tarjetas redondeadas de una sola palabra. Las celdas son de esquina viva y
  siempre llevan nombre + contexto.
- Sin listas ordenadas ni desordenadas. La información se estructura en rejillas
  editoriales y filas de libro mayor.
- Animación mínima: entradas escalonadas con `IntersectionObserver` y CSS puro,
  sin librerías de animación. Se respeta `prefers-reduced-motion`.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

```bash
npm run build     # compilación de producción
npm run typecheck # comprobación de tipos
```

## Datos

El contenido del CV vive en un solo sitio: [`lib/data.ts`](lib/data.ts). Edita
ahí perfil, formación, logros, proyectos y stack.

Lo de GitHub se consulta en el servidor desde [`lib/github.ts`](lib/github.ts) y
se revalida cada 6 horas:

- Historial de contribuciones vía `github-contributions-api.jogruber.de`
  (público, sin token).
- Repositorios y lenguajes vía la API REST de GitHub (sin token, 60 peticiones
  por hora por IP).

Si alguna de las dos falla, la sección degrada sin romper la página.

## Despliegue

Pensado para Vercel: importa el repositorio y despliega sin configuración.

Para un dominio propio, define `NEXT_PUBLIC_SITIO` (por ejemplo
`https://cristophermolina.com`) para que `sitemap.xml`, `robots.txt` y las
etiquetas Open Graph apunten al dominio correcto.

## Estructura

```
app/          layout, página, estilos globales, OG, sitemap y robots
components/   secciones y piezas de interfaz
lib/data.ts   contenido del CV
lib/github.ts consumo de la API de GitHub
```
