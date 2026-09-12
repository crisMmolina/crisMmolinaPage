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
- Sin emojis. Los iconos de interfaz son SVG propios en `components/Icons.tsx`
  y los logotipos del stack se dibujan en monocromo desde `lib/logos.ts`.
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
se revalida cada 6 horas. Si falla, la sección degrada sin romper la página.

### Contribuciones privadas

Sin autenticar, GitHub solo expone las contribuciones a **repositorios
públicos**. Si buena parte del trabajo vive en repos privados, el calendario
del sitio mostrará menos commits de los que ves tú en tu propio perfil.

Hay dos formas de arreglarlo, y basta con una:

1. **Sin código.** En GitHub → *Settings* → *Public profile* → activar
   **«Include private contributions on my profile»**. El calendario público
   pasa a incluirlas y el sitio las recoge en la siguiente revalidación.
2. **Con token.** Definir la variable de entorno `GITHUB_TOKEN` con un token
   personal de solo lectura (`read:user`). Con ella el sitio usa la API GraphQL
   y obtiene el calendario completo, privadas incluidas. Sin la variable cae
   automáticamente al calendario público.

El reparto de lenguajes se calcula por bytes de código de los repos públicos
vía la API REST (60 peticiones por hora por IP sin token; con `GITHUB_TOKEN`,
5000).

## Despliegue

Pensado para Vercel: importa el repositorio y despliega sin configuración.

Variables de entorno, ambas opcionales:

- `NEXT_PUBLIC_SITIO` — dominio propio, para que `sitemap.xml`, `robots.txt` y
  las etiquetas Open Graph apunten al sitio correcto.
- `GITHUB_TOKEN` — token de solo lectura para incluir las contribuciones a
  repositorios privados en el calendario.

## Estructura

```
app/          layout, página, estilos globales, OG, sitemap y robots
components/   secciones y piezas de interfaz
lib/data.ts   contenido del CV
lib/github.ts consumo de los datos de GitHub
lib/logos.ts  trazos de marca del stack (simple-icons, CC0)
```
