import Reloj from "./Reloj";
import { IconoFlechaAbajo, IconoGithub, IconoLinkedin, IconoCorreo } from "./Icons";
import { perfil } from "@/lib/data";

export default function Hero() {
  return (
    <header
      id="inicio"
      className="grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-10 pb-8"
    >
      {/* luz calida en deriva lenta */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[28vh] left-1/2 h-[85vh] w-[115vw] -translate-x-1/2 opacity-[0.5] blur-[90px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(201,180,146,0.16) 0%, rgba(201,180,146,0.05) 42%, transparent 72%)",
          animation: "drift 26s ease-in-out infinite",
        }}
      />
      {/* rejilla de hairlines que se desvanece hacia abajo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(237,233,225,0.045) 1px, transparent 1px)",
          backgroundSize: "clamp(70px, 9vw, 140px) 100%",
          maskImage: "linear-gradient(to bottom, black 8%, transparent 82%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 8%, transparent 82%)",
        }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-between">
        {/* fila superior */}
        <div className="flex items-start justify-between gap-6">
          <p className="t-label enter whitespace-nowrap" style={{ ["--i" as string]: 0 }}>
            <span className="sm:hidden">CDMX, MX</span>
            <span className="hidden sm:inline">{perfil.ubicacion}</span>
            <span className="mx-2 text-[var(--line)]">/</span>
            <Reloj />
          </p>
          <p
            className="t-label enter whitespace-nowrap text-right"
            style={{ ["--i" as string]: 1 }}
          >
            <span className="hidden sm:inline">
              Portafolio
              <span className="mx-2 text-[var(--line)]">/</span>
            </span>
            2026
          </p>
        </div>

        {/* bloque central */}
        <div className="py-14">
          <p
            className="t-label enter mb-5 text-[var(--color-sand)]"
            style={{ ["--i" as string]: 2 }}
          >
            Ingeniería en Informática — IPN UPIICSA
          </p>

          <h1 className="t-display">
            <span
              className="enter block"
              style={{ ["--i" as string]: 3 }}
            >
              {perfil.nombreLinea1}
            </span>
            <span
              className="enter block text-[var(--color-ash)]"
              style={{ ["--i" as string]: 4 }}
            >
              {perfil.nombreLinea2}
            </span>
          </h1>

          <div
            className="rule rule-entra mt-10 mb-8"
            style={{ ["--i" as string]: 6 }}
          />

          <div className="grid gap-8 md:grid-cols-12">
            <p
              className="t-lead enter md:col-span-7 lg:col-span-6"
              style={{ ["--i" as string]: 6 }}
            >
              Construyo software{" "}
              <span className="t-serif text-[var(--color-sand-soft)]">
                de principio a fin
              </span>
              : interfaces, datos y modelos trabajando juntos. Especializado en
              visualización geoespacial e inteligencia artificial aplicada a
              problemas urbanos.
            </p>

            <div
              className="enter flex flex-wrap items-end gap-x-7 gap-y-3 self-end md:col-span-5 md:justify-end lg:col-span-6"
              style={{ ["--i" as string]: 7 }}
            >
              <EnlaceSocial href={perfil.github} etiqueta="GitHub">
                <IconoGithub />
              </EnlaceSocial>
              <EnlaceSocial href={perfil.linkedin} etiqueta="LinkedIn">
                <IconoLinkedin />
              </EnlaceSocial>
              <EnlaceSocial href={`mailto:${perfil.email}`} etiqueta="Correo">
                <IconoCorreo />
              </EnlaceSocial>
            </div>
          </div>
        </div>

        {/* fila inferior */}
        <div className="flex items-end justify-between gap-6">
          <a
            href="#perfil"
            className="enter t-label group flex items-center gap-3 transition-colors duration-300 hover:text-[var(--color-bone)]"
            style={{ ["--i" as string]: 8 }}
          >
            <IconoFlechaAbajo className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-1" />
            Desplazar
          </a>
          <p
            className="enter t-label hidden text-right sm:block"
            style={{ ["--i" as string]: 9 }}
          >
            Cuatro primeros lugares en hackathon
          </p>
        </div>
      </div>
    </header>
  );
}

function EnlaceSocial({
  href,
  etiqueta,
  children,
}: {
  href: string;
  etiqueta: string;
  children: React.ReactNode;
}) {
  const externo = href.startsWith("http");
  return (
    <a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noreferrer noopener" : undefined}
      className="link-wipe flex items-center gap-2.5 text-sm text-[var(--color-ash)] transition-colors duration-300 hover:text-[var(--color-bone)]"
    >
      {children}
      {etiqueta}
    </a>
  );
}
