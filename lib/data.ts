export const GITHUB_USER = "CrisMmolina";

export const perfil = {
  nombre: "Cristopher Ian Molina Fernández",
  nombreLinea1: "Cristopher",
  nombreLinea2: "Molina",
  rol: "Ingeniería en Informática",
  disciplina: "Desarrollo end-to-end, IA aplicada y sistemas geoespaciales",
  ubicacion: "Ciudad de México, MX",
  email: "molina.fernandez.cristopherian@gmail.com",
  github: "https://github.com/CrisMmolina",
  linkedin: "https://linkedin.com/in/Cristopher-Molina",
  resumen:
    "Estudiante de Ingeniería en Informática con experiencia en desarrollo de software end-to-end, inteligencia artificial aplicada y sistemas basados en datos. He participado en el diseño y desarrollo de soluciones que integran IA, visualización geoespacial, procesamiento de información y aplicaciones web escalables.",
  resumen2:
    "Trabajo con JavaScript, Python y React junto a herramientas de IA para construir productos funcionales desde la concepción hasta el despliegue.",
} as const;

export type Educacion = {
  institucion: string;
  unidad: string;
  titulo: string;
  periodo: string;
  lugar: string;
};

export const educacion: Educacion[] = [
  {
    institucion: "Instituto Politécnico Nacional",
    unidad: "UPIICSA",
    titulo: "Ingeniería en Informática",
    periodo: "Graduación est. 2028",
    lugar: "Ciudad de México",
  },
  {
    institucion: "Instituto Politécnico Nacional",
    unidad: "CECyT 9",
    titulo: "Técnico en Programación",
    periodo: "2024",
    lugar: "Ciudad de México",
  },
];

export type Logro = {
  id: string;
  evento: string;
  organizador: string;
  resultado: string;
  fecha: string;
  anio: string;
  detalle: string;
};

export const logros: Logro[] = [
  {
    id: "sedeco",
    evento: "SecretarIA Hackathon",
    organizador: "SEDECO",
    resultado: "1.er lugar",
    fecha: "Junio 2026",
    anio: "2026",
    detalle:
      "Lideré el desarrollo de una plataforma web para la planeación inteligente de eventos mediante visualización geoespacial interactiva. Diseñé e implementé interfaces para análisis de datos territoriales, integrando mapas dinámicos, simulaciones en tiempo real y métricas económicas para apoyar la toma de decisiones basada en datos.",
  },
  {
    id: "ibm",
    evento: "Genius Arena Hackathon",
    organizador: "IBM · Talent Land",
    resultado: "1.er lugar",
    fecha: "Abril 2026",
    anio: "2026",
    detalle:
      "Diseñé y desarrollé la arquitectura frontend completa de LumivIA. Implementé una interfaz responsiva en React y Vite con integración de MapBox para visualización geoespacial en tiempo real.",
  },
  {
    id: "elevenlabs",
    evento: "Hackathon México",
    organizador: "ElevenLabs",
    resultado: "3.er lugar · Mejor proyecto con Bolt",
    fecha: "Diciembre 2025",
    anio: "2025",
    detalle:
      "Construí la interfaz conversacional de un asistente de salud mental con voz, integrando ElevenLabs para síntesis de audio en tiempo real dentro de la UI.",
  },
  {
    id: "austria",
    evento: "Your Future Made in Austria",
    organizador: "Categoría Open Source",
    resultado: "Ganador",
    fecha: "Noviembre 2025",
    anio: "2025",
    detalle:
      "Desarrollé en React y Node.js una herramienta de visualización ciudadana para redes de metro, con mapas de calor generados a partir de reportes en tiempo real.",
  },
];

export type Proyecto = {
  id: string;
  indice: string;
  nombre: string;
  claim: string;
  descripcion: string;
  aportacion: string;
  stack: string[];
  url: string;
  repo?: string;
  anio: string;
};

export const proyectos: Proyecto[] = [
  {
    id: "mercuria",
    indice: "01",
    nombre: "MercurIA",
    claim: "Planeación estratégica de eventos con datos territoriales",
    descripcion:
      "Plataforma que utiliza inteligencia artificial, análisis geoespacial y datos económicos para apoyar la planeación estratégica de eventos en la Ciudad de México. Identifica las zonas con mayor potencial de impacto, estima la derrama generada y analiza oportunidades para pequeñas y medianas empresas a partir de información territorial, comercial y demográfica.",
    aportacion:
      "Interfaces de análisis territorial, mapas dinámicos, simulación y monitoreo en tiempo real.",
    stack: ["React", "Visualización geoespacial", "IA aplicada", "Vercel"],
    url: "https://mercur-ia.vercel.app/map",
    anio: "2026",
  },
  {
    id: "lumivia",
    indice: "02",
    nombre: "LumivIA",
    claim: "Monitoreo urbano en tiempo real",
    descripcion:
      "Plataforma de monitoreo urbano que centraliza información de movilidad, medio ambiente y riesgos para dar una visión integral de las condiciones de una ciudad. Visualiza tráfico vehicular, emisiones, inundaciones, clima y rutas inteligentes para facilitar decisiones operativas de ciudadanía, organizaciones y entidades gubernamentales.",
    aportacion:
      "Arquitectura frontend completa: interfaz responsiva en React + Vite con MapBox para visualización geoespacial en vivo.",
    stack: ["React", "Vite", "TypeScript", "MapBox"],
    url: "https://lumiv-ia-f.vercel.app/",
    repo: "https://github.com/CrisMmolina/LumivIA-F",
    anio: "2026",
  },
];

export type GrupoStack = {
  clave: string;
  titulo: string;
  nota: string;
  /** `logo` referencia un trazo de lib/logos.ts o uno de linea en Logo.tsx. */
  items: { nombre: string; nota: string; logo: string }[];
};

export const stack: GrupoStack[] = [
  {
    clave: "LNG",
    titulo: "Lenguajes",
    nota: "Base del trabajo diario",
    items: [
      { nombre: "JavaScript", nota: "Lenguaje principal", logo: "javascript" },
      { nombre: "TypeScript", nota: "Tipado en producto", logo: "typescript" },
      { nombre: "Python", nota: "Datos e IA aplicada", logo: "python" },
      { nombre: "Java", nota: "Fundamentos y POO", logo: "java" },
      { nombre: "C", nota: "Sistemas y algoritmia", logo: "c" },
    ],
  },
  {
    clave: "WEB",
    titulo: "Desarrollo web",
    nota: "Interfaz y servidor",
    items: [
      { nombre: "React", nota: "Interfaces de producto", logo: "react" },
      { nombre: "Vite", nota: "Entorno de construcción", logo: "vite" },
      { nombre: "Node.js", nota: "Servicios y API", logo: "node" },
      { nombre: "HTML5", nota: "Estructura semántica", logo: "html5" },
      { nombre: "CSS3", nota: "Sistemas de estilo", logo: "css3" },
      { nombre: "Bootstrap", nota: "Prototipado rápido", logo: "bootstrap" },
    ],
  },
  {
    clave: "DAT",
    titulo: "Bases de datos",
    nota: "Persistencia y consulta",
    items: [
      { nombre: "MySQL", nota: "Modelado relacional", logo: "cilindro" },
      { nombre: "Oracle Database", nota: "Consulta y administración", logo: "capas" },
      { nombre: "Neon", nota: "Postgres serverless", logo: "neon" },
    ],
  },
  {
    clave: "OPS",
    titulo: "Herramientas y proceso",
    nota: "Despliegue y colaboración",
    items: [
      { nombre: "Git", nota: "Control de versiones", logo: "git" },
      { nombre: "GitHub", nota: "Colaboración y revisión", logo: "github" },
      { nombre: "Vercel", nota: "Despliegue continuo", logo: "vercel" },
      { nombre: "Cloudflare", nota: "Red y dominios", logo: "cloudflare" },
      { nombre: "Render", nota: "Servicios gestionados", logo: "render" },
      { nombre: "SCRUM", nota: "Trabajo en equipo", logo: "ciclo" },
    ],
  },
];

export const secciones = [
  { id: "perfil", label: "Perfil", prioridad: 2 },
  { id: "logros", label: "Logros", prioridad: 1 },
  { id: "proyectos", label: "Proyectos", prioridad: 1 },
  { id: "actividad", label: "Actividad", prioridad: 1 },
  { id: "stack", label: "Stack", prioridad: 2 },
  { id: "contacto", label: "Contacto", prioridad: 1 },
] as const;
