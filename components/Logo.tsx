import { TRAZOS_MARCA } from "@/lib/logos";

/**
 * Marcas sin logotipo propio en el conjunto de trazos. Se dibujan con
 * linea, no con relleno, y comparten la misma caja de 24x24.
 */
const TRAZOS_LINEA: Record<string, React.ReactNode> = {
  cilindro: (
    <>
      <ellipse cx="12" cy="5.6" rx="7.4" ry="3.1" />
      <path d="M4.6 5.6v12.8c0 1.71 3.31 3.1 7.4 3.1s7.4-1.39 7.4-3.1V5.6" />
      <path d="M4.6 12c0 1.71 3.31 3.1 7.4 3.1s7.4-1.39 7.4-3.1" />
    </>
  ),
  capas: (
    <>
      <path d="M12 2.4 21.4 7 12 11.6 2.6 7z" />
      <path d="m2.6 12 9.4 4.6 9.4-4.6" />
      <path d="m2.6 17 9.4 4.6 9.4-4.6" />
    </>
  ),
  ciclo: (
    <>
      <path d="M20.2 12a8.2 8.2 0 1 1-2.75-6.12" />
      <path d="M20.6 3.2v4.4h-4.4" />
    </>
  ),
};

type Props = {
  nombre: string;
  etiqueta: string;
  className?: string;
};

export default function Logo({ nombre, etiqueta, className = "" }: Props) {
  const relleno = TRAZOS_MARCA[nombre];
  const linea = TRAZOS_LINEA[nombre];
  if (!relleno && !linea) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={etiqueta}
      className={className}
      {...(relleno
        ? { fill: "currentColor" }
        : {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.5,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          })}
    >
      {relleno ? <path d={relleno} /> : linea}
    </svg>
  );
}
