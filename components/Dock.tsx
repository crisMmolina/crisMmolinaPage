"use client";

import { useEffect, useState } from "react";
import { secciones } from "@/lib/data";

/**
 * Navegacion flotante inferior. Sustituye al header: sigue el scroll
 * y marca la seccion visible con un indicador que se desplaza.
 */
export default function Dock() {
  const [activa, setActiva] = useState<string>(secciones[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodos = secciones
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);

    const observador = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibles[0]) setActiva(visibles[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    for (const nodo of nodos) observador.observe(nodo);

    const alScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });

    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", alScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Secciones"
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="flex items-stretch border border-[var(--line)] bg-[rgba(11,10,9,0.72)] backdrop-blur-xl">
        {secciones.map((seccion, i) => {
          const esActiva = activa === seccion.id;
          return (
            <a
              key={seccion.id}
              href={`#${seccion.id}`}
              aria-current={esActiva ? "true" : undefined}
              className={`group relative px-3 py-2.5 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-300 sm:px-4 sm:text-[0.66rem] ${
                i > 0 ? "border-l border-[var(--line)]" : ""
              } ${
                seccion.prioridad === 2 ? "hidden sm:block" : ""
              } ${
                esActiva
                  ? "text-[var(--color-sand)]"
                  : "text-[var(--color-ash-dim)] hover:text-[var(--color-bone)]"
              }`}
            >
              {seccion.label}
              <span
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--color-sand)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  esActiva ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
