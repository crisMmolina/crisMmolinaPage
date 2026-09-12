import CabeceraSeccion from "./CabeceraSeccion";
import Reveal from "./Reveal";
import { IconoSalida } from "./Icons";
import { proyectos } from "@/lib/data";

export default function Proyectos() {
  return (
    <section id="proyectos" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="rule reveal-rule mb-14" />

      <div className="grid-editorial">
        <CabeceraSeccion
          titulo="Proyectos"
          nota="Plataformas construidas en competencia y llevadas a despliegue."
        />

        <Reveal>
          <h2 className="t-section max-w-[16ch]" style={{ ["--i" as string]: 0 }}>
            Datos urbanos,
            <span className="block text-[var(--color-ash)]">
              hechos interfaz.
            </span>
          </h2>

          <div className="mt-16 flex flex-col gap-20">
            {proyectos.map((p, i) => (
              <article
                key={p.id}
                className="group"
                style={{ ["--i" as string]: i + 1 }}
              >
                <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-5">
                  <div className="flex items-baseline gap-5">
                    <span className="t-meta text-[var(--color-ash-dim)]">
                      {p.indice}
                    </span>
                    <h3 className="t-title">{p.nombre}</h3>
                  </div>
                  <span className="t-meta shrink-0 text-[var(--color-ash-dim)]">
                    {p.anio}
                  </span>
                </div>

                <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="t-lead max-w-[34ch] text-[var(--color-sand-soft)]">
                      {p.claim}
                    </p>
                    <p className="t-body mt-5 max-w-[60ch]">{p.descripcion}</p>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="t-label mb-3">Mi aportación</p>
                    <p className="t-body max-w-[42ch] text-[0.9rem]">
                      {p.aportacion}
                    </p>

                    <p className="t-label mt-8 mb-3">Tecnología</p>
                    <p className="t-meta max-w-[42ch] leading-[2] text-[var(--color-ash)]">
                      {p.stack.map((t, j) => (
                        <span key={t}>
                          {j > 0 ? (
                            <span className="mx-2.5 text-[var(--color-ash-dim)]">
                              ·
                            </span>
                          ) : null}
                          {t}
                        </span>
                      ))}
                    </p>

                    {p.repo ? (
                      <div className="mt-9">
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-wipe inline-flex items-center gap-2 text-sm text-[var(--color-bone)]"
                        >
                          Código
                          <IconoSalida className="text-[var(--color-sand)]" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
