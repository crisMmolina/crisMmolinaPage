/**
 * URL publica del sitio. En Vercel se resuelve sola;
 * para un dominio propio define NEXT_PUBLIC_SITIO.
 */
export const SITIO =
  process.env.NEXT_PUBLIC_SITIO ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://crismmolina.vercel.app");
