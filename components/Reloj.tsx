"use client";

import { useEffect, useState } from "react";

/** Hora local de Ciudad de Mexico, actualizada cada minuto. */
export default function Reloj() {
  const [hora, setHora] = useState<string>("--:--");

  useEffect(() => {
    const formato = new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Mexico_City",
    });

    const actualizar = () => setHora(formato.format(new Date()));
    actualizar();
    const id = window.setInterval(actualizar, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {hora}
    </span>
  );
}
