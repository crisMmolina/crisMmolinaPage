"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
};

/** Anade la clase `is-in` cuando el bloque entra en pantalla. */
export default function Reveal({
  children,
  className = "",
  threshold = 0.15,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (typeof IntersectionObserver === "undefined") {
      nodo.classList.add("is-in");
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            nodo.classList.add("is-in");
            if (once) observador.unobserve(nodo);
          } else if (!once) {
            nodo.classList.remove("is-in");
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [threshold, once]);

  return (
    <div ref={ref} className={`reveal min-w-0 ${className}`}>
      {children}
    </div>
  );
}
