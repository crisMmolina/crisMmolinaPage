import { Fragment } from "react";
import CabeceraSeccion from "./CabeceraSeccion";
import Reveal from "./Reveal";
import GrafoContribuciones from "./GrafoContribuciones";
import { IconoSalida } from "./Icons";
import {
  formatearFecha,
  obtenerActividad,
  obtenerRepos,
  repartoDeLenguajes,
} from "@/lib/github";
import { perfil } from "@/lib/data";

const TONOS_LENGUAJE = [
  "rgba(201,180,146,0.95)",
  "rgba(201,180,146,0.70)",
  "rgba(201,180,146,0.48)",
  "rgba(201,180,146,0.30)",
  "rgba(237,233,225,0.14)",
];

export default async function Actividad() {
  const [actividad, repos] = await Promise.all([
    obtenerActividad(),
    obtenerRepos(),
  ]);

  const lenguajes = repartoDeLenguajes(repos).slice(0, 5);

  const metricas: { valor: string; etiqueta: string; extra?: string }[] = [
    { valor: String(actividad?.total ?? "—"), etiqueta: "Contribuciones", extra: "12 m" },
    { valor: String(actividad?.diasActivos ?? "—"), etiqueta: "Días con commits" },
    { valor: String(actividad?.mejorRacha ?? "—"), etiqueta: "Racha más larga" },
    { valor: String(repos.length || "—"), etiqueta: "Repositorios", extra: "públicos" },
  ];

  return (
    <section id="actividad" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="rule reveal-rule mb-14" />

      <div className="grid-editorial">
        <CabeceraSeccion
          indice="04"
          titulo="Actividad"
          nota="Historial de commits leído en vivo desde la API de GitHub."
        />

        <Reveal>
          <h2 className="t-section max-w-[17ch]" style={{ ["--i" as string]: 0 }}>
            El registro
            <span className="block text-[var(--color-ash)]">no se edita.</span>
          </h2>

          {/* metricas */}
          <div
            className="mt-14 grid grid-cols-2 border-t border-l border-[var(--line)] lg:grid-cols-4"
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
                className="link-wipe text-[var(--color-bone)]"
              >
                Consultarlo en GitHub
              </a>
            </p>
          )}

          {/* reparto de lenguajes */}
          {lenguajes.length > 0 ? (
            <div className="mt-16" style={{ ["--i" as string]: 3 }}>
              <p className="t-label mb-5">Lenguajes por repositorio</p>
              <div className="flex h-[6px] w-full overflow-hidden">
                {lenguajes.map((l, i) => (
                  <span
                    key={l.nombre}
                    className="block h-full"
                    style={{
                      width: `${l.porcentaje}%`,
                      backgroundColor: TONOS_LENGUAJE[i] ?? TONOS_LENGUAJE[4],
                    }}
                  />
                ))}
              </div>
              <p className="t-meta mt-4 leading-[2.1] text-[var(--color-ash)]">
                {lenguajes.map((l, i) => (
                  <Fragment key={l.nombre}>
                    {i > 0 ? (
                      <span className="mx-3 text-[var(--color-ash-dim)]"> · </span>
                    ) : null}
                    <span className="whitespace-nowrap">
                      <span
                        aria-hidden
                        className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-1px]"
                        style={{
                          backgroundColor: TONOS_LENGUAJE[i] ?? TONOS_LENGUAJE[4],
                        }}
                      />
                      {l.nombre} {l.porcentaje}%
                    </span>
                  </Fragment>
                ))}
              </p>
            </div>
          ) : null}

          {/* indice de repositorios */}
          {repos.length > 0 ? (
            <div className="mt-16" style={{ ["--i" as string]: 4 }}>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <p className="t-label">Repositorios públicos</p>
                <a
                  href={perfil.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-wipe t-meta inline-flex items-center gap-2 text-[var(--color-ash)] hover:text-[var(--color-bone)]"
                >
                  Ver perfil
                  <IconoSalida />
                </a>
              </div>

              <div className="border-t border-[var(--line)]">
                {repos.map((repo) => (
                  <a
                    key={repo.nombre}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-[var(--line)] py-4 transition-colors duration-[400ms] hover:bg-[var(--color-ink-raised)]"
                  >
                    <span className="col-span-12 text-[0.92rem] font-medium tracking-[-0.012em] text-[var(--color-bone)] transition-colors duration-300 group-hover:text-[var(--color-sand-soft)] sm:col-span-5">
                      {repo.nombre}
                    </span>
                    <span className="t-meta col-span-6 text-[var(--color-ash-dim)] sm:col-span-4">
                      {repo.lenguaje ?? "—"}
                    </span>
                    <span className="t-meta col-span-6 text-right text-[var(--color-ash-dim)] sm:col-span-3">
                      {formatearFecha(repo.actualizado)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
