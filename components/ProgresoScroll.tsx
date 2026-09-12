"use client";

import { useEffect, useState } from "react";

/** Linea de 1px en la parte superior que indica el avance de lectura. */
export default function ProgresoScroll() {
  const [avance, setAvance] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calcular = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      setAvance(alto > 0 ? Math.min(1, window.scrollY / alto) : 0);
      ticking = false;
    };

    const alScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(calcular);
    };

    calcular();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-px bg-transparent"
    >
      <div
        className="h-full origin-left bg-[var(--color-sand)] opacity-70"
        style={{ transform: `scaleX(${avance})` }}
      />
    </div>
  );
}
