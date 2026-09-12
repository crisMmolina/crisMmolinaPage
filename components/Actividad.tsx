import { Fragment } from "react";
import CabeceraSeccion from "./CabeceraSeccion";
import Reveal from "./Reveal";
import GrafoContribuciones from "./GrafoContribuciones";
import { formatearFecha, obtenerActividad, obtenerLenguajes } from "@/lib/github";
import { perfil } from "@/lib/data";

const TONOS_LENGUAJE = [
  "rgb(215,197,166)",
  "rgba(201,180,146,0.74)",
  "rgba(201,180,146,0.52)",
  "rgba(201,180,146,0.34)",
  "rgba(237,233,225,0.18)",
  "rgba(237,233,225,0.10)",
];

export default async function Actividad() {
  const [actividad, lenguajes] = await Promise.all([
    obtenerActividad(),
    obtenerLenguajes(),
  ]);

  const principales = lenguajes.slice(0, 5);
  const resto = lenguajes.slice(5);
  const porcentajeResto =
    Math.round(resto.reduce((a, l) => a + l.porcentaje, 0) * 10) / 10;

  const metricas: { valor: string; etiqueta: string; extra?: string }[] = [
    { valor: String(actividad?.total ?? "—"), etiqueta: "Contribuciones", extra: "12 m" },
    { valor: String(actividad?.diasActivos ?? "—"), etiqueta: "Días con commits" },
    { valor: String(actividad?.mejorRacha ?? "—"), etiqueta: "Racha más larga" },
  ];

  return (
    <section id="actividad" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="rule reveal-rule mb-14" />

      <div className="grid-editorial">
        <CabeceraSeccion
          titulo="Actividad"
          nota="Historial de commits leído en vivo desde GitHub."
        />

        <Reveal>
          <h2 className="t-section max-w-[17ch]" style={{ ["--i" as string]: 0 }}>
            El registro
            <span className="block text-[var(--color-ash)]">no se edita.</span>
          </h2>

          {/* metricas */}
          <div
            className="mt-14 grid grid-cols-1 border-t border-l border-[var(--line)] sm:grid-cols-3"
            style={{ ["--i" as string]: 1 }}
          >
            {metricas.map((m) => (
              <div
                key={m.etiqueta}
                className="border-r border-b border-[var(--line)] px-5 py-7 transition-colors duration-500 hover:bg-[var(--color-ink-raised)]"
              >
                <p className="font-[family-name:var(--font-mono)] text-[1.9rem] leading-none tracking-[-0.03em] text-[var(--color-bone)] tabular-nums sm:text-[2.3rem]">
                  {m.valor}
                </p>
                <p className="t-label mt-3 text-[0.6rem] leading-relaxed tracking-[0.1em] sm:text-[0.6875rem] sm:tracking-[0.16em]">
                  {m.etiqueta}
                  {m.extra ? (
                    <span className="hidden sm:inline"> ({m.extra})</span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>

          {/* grafo */}
          <div className="mt-14" style={{ ["--i" as string]: 2 }}>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <p className="t-label">Historial de commits</p>
              {actividad ? (
                <p className="t-meta text-[var(--color-ash-dim)]">
                  {formatearFecha(actividad.desde)} — {formatearFecha(actividad.hasta)}
                </p>
              ) : null}
            </div>
          </div>

          {actividad ? (
            <GrafoContribuciones datos={actividad} />
          ) : (
            <p className="no-rise t-body border border-[var(--line)] px-6 py-10 text-center">
              El historial de commits no está disponible en este momento.{" "}
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-wipe inline-block text-[var(--color-bone)]"
              >
                Consultarlo en GitHub
              </a>
            </p>
          )}

          {/* reparto de lenguajes */}
          {principales.length > 0 ? (
            <div className="mt-16" style={{ ["--i" as string]: 3 }}>
              <p className="t-label mb-5">Lenguajes por volumen de código</p>
              <div className="flex h-[6px] w-full overflow-hidden">
                {principales.map((l, i) => (
                  <span
                    key={l.nombre}
                    className="block h-full"
                    style={{
                      width: `${l.porcentaje}%`,
                      backgroundColor: TONOS_LENGUAJE[i],
                    }}
                  />
                ))}
                {porcentajeResto > 0 ? (
                  <span
                    className="block h-full"
                    style={{
                      width: `${porcentajeResto}%`,
                      backgroundColor: TONOS_LENGUAJE[5],
                    }}
                  />
                ) : null}
              </div>
              <p className="t-meta mt-4 leading-[2.1] text-[var(--color-ash)]">
                {principales.map((l, i) => (
                  <Fragment key={l.nombre}>
                    {i > 0 ? (
                      <span className="mx-3 text-[var(--color-ash-dim)]"> · </span>
                    ) : null}
                    <span className="whitespace-nowrap">
                      <span
                        aria-hidden
                        className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-1px]"
                        style={{ backgroundColor: TONOS_LENGUAJE[i] }}
                      />
                      {l.nombre} {l.porcentaje}%
                    </span>
                  </Fragment>
                ))}
              </p>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
