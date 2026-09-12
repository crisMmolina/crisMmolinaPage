import Reveal from "./Reveal";
import { IconoGithub, IconoLinkedin, IconoSalida } from "./Icons";
import { perfil } from "@/lib/data";

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="grain relative scroll-mt-24 overflow-hidden pt-24 sm:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[42vh] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 opacity-45 blur-[100px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(201,180,146,0.15) 0%, transparent 70%)",
          animation: "drift 30s ease-in-out infinite",
        }}
      />

      <div className="shell relative z-10">
        <div className="rule reveal-rule mb-14" />

        <Reveal>
          <p className="t-label" style={{ ["--i" as string]: 0 }}>
            Contacto
          </p>

          <h2
            className="t-section mt-8 max-w-[16ch]"
            style={{ ["--i" as string]: 1 }}
          >
            ¿Construimos algo{" "}
            <span className="t-serif text-[var(--color-sand-soft)]">juntos</span>?
          </h2>

          <div className="mt-12" style={{ ["--i" as string]: 2 }}>
            <a
              href={`mailto:${perfil.email}`}
              className="link-wipe inline-block max-w-full break-words text-[clamp(1.05rem,3.2vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-bone)]"
            >
              {perfil.email}
            </a>
          </div>

          <div
            className="mt-14 grid grid-cols-1 border-t border-l border-[var(--line)] sm:grid-cols-2"
            style={{ ["--i" as string]: 3 }}
          >
            <EnlaceDirecto
              href={perfil.github}
              titulo="GitHub"
              detalle="@CrisMmolina"
            >
              <IconoGithub />
            </EnlaceDirecto>
            <EnlaceDirecto
              href={perfil.linkedin}
              titulo="LinkedIn"
              detalle="Cristopher Molina"
            >
              <IconoLinkedin />
            </EnlaceDirecto>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-5 border-t border-[var(--line)] pt-10 pb-28 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta text-[var(--color-ash-dim)]">
            {perfil.nombre} · {perfil.ubicacion}
          </p>
          <p className="t-meta text-[var(--color-ash-dim)]">
            Next.js · TypeScript · Tailwind CSS
          </p>
        </footer>
      </div>
    </section>
  );
}

function EnlaceDirecto({
  href,
  titulo,
  detalle,
  children,
}: {
  href: string;
  titulo: string;
  detalle: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center justify-between gap-6 border-r border-b border-[var(--line)] px-6 py-7 transition-colors duration-500 hover:bg-[var(--color-ink-raised)]"
    >
      <span className="flex items-center gap-4">
        <span className="text-[var(--color-ash-dim)] transition-colors duration-300 group-hover:text-[var(--color-sand)]">
          {children}
        </span>
        <span>
          <span className="block text-[0.98rem] font-medium tracking-[-0.015em] text-[var(--color-bone)]">
            {titulo}
          </span>
          <span className="t-meta mt-0.5 block text-[var(--color-ash-dim)]">
            {detalle}
          </span>
        </span>
      </span>
      <IconoSalida className="shrink-0 text-[var(--color-ash-dim)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-sand)]" />
    </a>
  );
}
