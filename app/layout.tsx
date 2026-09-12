import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { perfil } from "@/lib/data";
import { SITIO } from "@/lib/sitio";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const descripcion =
  "Cristopher Molina — Ingeniería en Informática (IPN UPIICSA). Desarrollo end-to-end, IA aplicada y visualización geoespacial. Cuatro primeros lugares en hackathon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "Cristopher Molina — Desarrollo de software",
    template: "%s · Cristopher Molina",
  },
  description: descripcion,
  authors: [{ name: perfil.nombre, url: perfil.github }],
  keywords: [
    "Cristopher Molina",
    "desarrollador",
    "React",
    "TypeScript",
    "IA aplicada",
    "visualización geoespacial",
    "IPN",
    "UPIICSA",
    "Ciudad de México",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Cristopher Molina — Desarrollo de software",
    description: descripcion,
    siteName: "Cristopher Molina",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristopher Molina — Desarrollo de software",
    description: descripcion,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <noscript>
          <style>{`
            .reveal > *, .enter { opacity: 1 !important; animation: none !important; }
            .reveal-rule, .rule-entra { transform: none !important; animation: none !important; }
            .grafo .celda { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
