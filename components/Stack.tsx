import CabeceraSeccion from "./CabeceraSeccion";
import Reveal from "./Reveal";
import { stack } from "@/lib/data";

export default function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="rule reveal-rule mb-14" />

      <div className="grid-editorial">
        <CabeceraSeccion
          indice="05"
          titulo="Stack"
          nota="Herramientas que uso, con el papel que cumplen."
        />

        <Reveal>
          <h2 className="t-section max-w-[15ch]" style={{ ["--i" as string]: 0 }}>
            Cada herramienta,
            <span className="block text-[var(--color-ash)]">un porqué.</span>
          </h2>

          <div className="mt-14 flex flex-col gap-14">
            {stack.map((grupo, i) => (
              <div key={grupo.clave} style={{ ["--i" as string]: i + 1 }}>
                <div className="mb-5 flex items-baseline justify-between gap-5 border-b border-[var(--line)] pb-3">
                  <h3 className="flex items-baseline gap-4">
                    <span className="t-meta text-[var(--color-sand)]">
                      {grupo.clave}
                    </span>
                    <span className="text-[1.05rem] font-medium tracking-[-0.02em] text-[var(--color-bone)]">
                      {grupo.titulo}
                    </span>
                  </h3>
                  <span className="t-meta hidden text-[var(--color-ash-dim)] sm:block">
                    {grupo.nota}
                  </span>
                </div>

                <div className="grid grid-cols-1 border-t border-l border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
                  {grupo.items.map((item) => (
                    <div
                      key={item.nombre}
                      className="group border-r border-b border-[var(--line)] px-5 py-5 transition-colors duration-500 hover:bg-[var(--color-ink-raised)]"
                    >
                      <p className="text-[0.94rem] font-medium tracking-[-0.012em] text-[var(--color-bone)] transition-colors duration-300 group-hover:text-[var(--color-sand-soft)]">
                        {item.nombre}
                      </p>
                      <p className="t-meta mt-1.5 text-[var(--color-ash-dim)]">
                        {item.nota}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
