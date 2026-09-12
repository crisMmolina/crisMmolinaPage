import CabeceraSeccion from "./CabeceraSeccion";
import Reveal from "./Reveal";
import { educacion, perfil } from "@/lib/data";

export default function Perfil() {
  return (
    <section id="perfil" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="rule reveal-rule mb-14" />

      <div className="grid-editorial">
        <CabeceraSeccion
          titulo="Perfil"
          nota="Quién soy y dónde me estoy formando."
        />

        <Reveal>
          <p className="t-lead max-w-[52ch]" style={{ ["--i" as string]: 0 }}>
            {perfil.resumen}
          </p>
          <p
            className="t-body mt-6 max-w-[58ch]"
            style={{ ["--i" as string]: 1 }}
          >
            {perfil.resumen2}
          </p>

          <div className="mt-16" style={{ ["--i" as string]: 2 }}>
            <p className="t-label mb-6">Formación</p>

            <div className="border-t border-[var(--line)]">
              {educacion.map((e) => (
                <article
                  key={e.unidad}
                  className="group grid grid-cols-1 gap-x-8 gap-y-2 border-b border-[var(--line)] py-6 transition-colors duration-500 hover:bg-[var(--color-ink-raised)] sm:grid-cols-12"
                >
                  <p className="t-meta sm:col-span-3">{e.periodo}</p>
                  <div className="sm:col-span-6">
                    <h3 className="text-[0.98rem] font-medium tracking-[-0.015em] text-[var(--color-bone)]">
                      {e.titulo}
                    </h3>
                    <p className="t-body mt-1 text-[0.85rem]">
                      {e.institucion} · {e.unidad}
                    </p>
                  </div>
                  <p className="t-meta text-[var(--color-ash-dim)] sm:col-span-3 sm:text-right">
                    {e.lugar}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
