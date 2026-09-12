type Props = {
  titulo: string;
  nota?: string;
};

/** Titulo de seccion en la columna izquierda de la rejilla editorial. */
export default function CabeceraSeccion({ titulo, nota }: Props) {
  return (
    <div className="lg:sticky lg:top-16 lg:self-start">
      <p className="t-label">{titulo}</p>
      {nota ? (
        <p className="t-meta mt-3 max-w-[13rem] leading-relaxed text-[var(--color-ash-dim)]">
          {nota}
        </p>
      ) : null}
    </div>
  );
}
