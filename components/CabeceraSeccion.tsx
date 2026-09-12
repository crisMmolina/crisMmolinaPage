type Props = {
  indice: string;
  titulo: string;
  nota?: string;
};

/** Etiqueta monoespaciada + titulo, en la columna izquierda de la rejilla. */
export default function CabeceraSeccion({ indice, titulo, nota }: Props) {
  return (
    <div className="lg:sticky lg:top-16 lg:self-start">
      <p className="t-label" style={{ ["--i" as string]: 0 }}>
        {indice} — {titulo}
      </p>
      {nota ? (
        <p className="t-meta mt-3 max-w-[13rem] leading-relaxed text-[var(--color-ash-dim)]">
          {nota}
        </p>
      ) : null}
    </div>
  );
}
