import type { Actividad } from "@/lib/github";

const NIVELES = [
  "rgba(237,233,225,0.06)",
  "rgba(201,180,146,0.40)",
  "rgba(201,180,146,0.60)",
  "rgba(201,180,146,0.80)",
  "rgb(215,197,166)",
] as const;

const DIAS_SEMANA = ["", "Lun", "", "Mié", "", "Vie", ""];

function fechaLegible(iso: string) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function GrafoContribuciones({ datos }: { datos: Actividad }) {
  return (
    <figure className="no-rise m-0 min-w-0">
      <div className="zona-scroll -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2 lg:mx-0 lg:px-0">
        <div className="grafo inline-block min-w-max">
          {/* etiquetas de mes */}
          <div className="relative mb-2 ml-9 h-4">
            {datos.etiquetasMes.map((etiqueta) => (
              <span
                key={`${etiqueta.texto}-${etiqueta.indiceSemana}`}
                className="absolute top-0 font-[family-name:var(--font-mono)] text-[0.62rem] tracking-[0.1em] text-[var(--color-ash-dim)]"
                style={{ left: `${etiqueta.indiceSemana * 15}px` }}
              >
                {etiqueta.texto}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {/* dias de la semana */}
            <div className="mr-1.5 flex w-[26px] shrink-0 flex-col gap-[3px]">
              {DIAS_SEMANA.map((dia, i) => (
                <span
                  key={i}
                  className="flex h-[12px] items-center font-[family-name:var(--font-mono)] text-[0.55rem] tracking-[0.06em] text-[var(--color-ash-dim)]"
                >
                  {dia}
                </span>
              ))}
            </div>

            {datos.semanas.map((semana, indiceSemana) => (
              <div
                key={indiceSemana}
                className="flex flex-col gap-[3px]"
                style={{ ["--w" as string]: indiceSemana }}
              >
                {semana.map((dia, indiceDia) =>
                  dia === null ? (
                    <span
                      key={indiceDia}
                      className="celda block h-[12px] w-[12px]"
                    />
                  ) : (
                    <span
                      key={dia.date}
                      className="celda block h-[12px] w-[12px] rounded-[1px] transition-[outline-color] duration-200 outline-1 outline-transparent hover:outline-[var(--color-sand)]"
                      style={{ backgroundColor: NIVELES[dia.level] }}
                      title={`${dia.count} ${
                        dia.count === 1 ? "contribución" : "contribuciones"
                      } — ${fechaLegible(dia.date)}`}
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
        <span className="t-meta text-[var(--color-ash-dim)]">
          {datos.total} contribuciones en los últimos 12 meses
        </span>
        <span className="t-meta flex items-center gap-2 text-[var(--color-ash-dim)]">
          Menos
          {NIVELES.map((color) => (
            <span
              key={color}
              className="block h-[11px] w-[11px] rounded-[1px]"
              style={{ backgroundColor: color }}
            />
          ))}
          Más
        </span>
      </figcaption>
    </figure>
  );
}
