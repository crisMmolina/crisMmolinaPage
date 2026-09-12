import CabeceraSeccion from "./CabeceraSeccion";
import Reveal from "./Reveal";
import { logros } from "@/lib/data";

export default function Logros() {
  return (
    <section id="logros" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="rule reveal-rule mb-14" />

      <div className="grid-editorial">
        <CabeceraSeccion
          indice="02"
          titulo="Logros"
          nota="Competencias de desarrollo resueltas en equipo, con entrega funcional."
        />

        <Reveal>
          <h2 className="t-section max-w-[18ch]" style={{ ["--i" as string]: 0 }}>
            Cuatro competencias,
            <span className="block text-[var(--color-ash)]">cuatro podios.</span>
          </h2>

          <div className="mt-14 border-t border-[var(--line)]">
            {logros.map((logro, i) => (
              <article
                key={logro.id}
                className="group relative border-b border-[var(--line)] py-9 transition-colors duration-500 hover:bg-[var(--color-ink-raised)]"
                style={{ ["--i" as string]: i + 1 }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[var(--color-sand)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                />

                <div className="grid gap-x-8 gap-y-4 pl-0 transition-[padding] duration-500 group-hover:pl-5 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <p className="t-meta text-[var(--color-sand)]">
                      {logro.resultado}
                    </p>
                    <p className="t-meta mt-1 text-[var(--color-ash-dim)]">
                      {logro.fecha}
                    </p>
                  </div>

                  <div className="lg:col-span-9">
                    <h3 className="t-title">
                      {logro.evento}
                      <span className="block text-[0.52em] font-normal tracking-[0.02em] text-[var(--color-ash)] sm:inline sm:text-[0.46em] sm:before:mx-3 sm:before:content-['/']">
                        {logro.organizador}
                      </span>
                    </h3>
                    <p className="t-body mt-4 max-w-[62ch]">{logro.detalle}</p>
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
