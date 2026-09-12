type Props = { className?: string };

const base = "h-[1.05em] w-[1.05em]";

export function IconoGithub({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function IconoLinkedin({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M3.36 4.6a1.34 1.34 0 1 0 0-2.68 1.34 1.34 0 0 0 0 2.68ZM2.2 5.62h2.32v7.86H2.2V5.62Zm4.02 0h2.22v1.07h.03c.31-.58 1.07-1.2 2.2-1.2 2.35 0 2.79 1.5 2.79 3.46v4.53h-2.32V9.42c0-.85-.02-1.94-1.2-1.94-1.2 0-1.39.92-1.39 1.88v4.12H6.22V5.62Z" />
    </svg>
  );
}

export function IconoCorreo({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className={`${base} ${className}`}>
      <rect x="1.6" y="3.4" width="12.8" height="9.2" />
      <path d="m1.6 4.4 6.4 4.4 6.4-4.4" />
    </svg>
  );
}

export function IconoSalida({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className={`${base} ${className}`}>
      <path d="M5.2 10.8 10.8 5.2M6 5.2h4.8V10" />
    </svg>
  );
}

export function IconoFlechaAbajo({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden className={`${base} ${className}`}>
      <path d="M8 2v12M3.6 9.6 8 14l4.4-4.4" />
    </svg>
  );
}
