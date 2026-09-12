import { ImageResponse } from "next/og";
import { perfil } from "@/lib/data";

export const runtime = "nodejs";
export const alt = "Cristopher Molina — Desarrollo de software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagen() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0a09",
          color: "#ede9e1",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            color: "#827c72",
            textTransform: "uppercase",
          }}
        >
          <span>Ingeniería en Informática — IPN UPIICSA</span>
          <span>Portafolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            Cristopher
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 1,
              color: "#9a948a",
            }}
          >
            Molina
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", height: 1, background: "#2a2723" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 24,
              color: "#9a948a",
            }}
          >
            <span style={{ color: "#c9b492" }}>
              Desarrollo end-to-end · IA aplicada · Geoespacial
            </span>
            <span>{perfil.ubicacion}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
