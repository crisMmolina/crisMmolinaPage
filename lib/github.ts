import { GITHUB_USER } from "./data";

const REVALIDATE = 60 * 60 * 6; // 6 h

export type Dia = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Semana = (Dia | null)[];

export type Actividad = {
  total: number;
  dias: Dia[];
  semanas: Semana[];
  etiquetasMes: { indiceSemana: number; texto: string }[];
  diasActivos: number;
  mejorDia: number;
  mejorRacha: number;
  desde: string;
  hasta: string;
  /** "privadas" cuando el token deja ver contribuciones privadas. */
  alcance: "publicas" | "privadas";
};

export type Lenguaje = { nombre: string; bytes: number; porcentaje: number };

const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const NIVEL_GRAPHQL: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function aUTC(fecha: string) {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/* ------------------------------------------------------------------ origen 1
   API GraphQL de GitHub. Con un token propio incluye las contribuciones
   a repositorios privados, que es lo que ve el dueño del perfil.
------------------------------------------------------------------ */
async function desdeGraphQL(token: string): Promise<Dia[] | null> {
  const consulta = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays { date contributionCount contributionLevel }
            }
          }
        }
      }
    }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: consulta, variables: { login: GITHUB_USER } }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection: {
            contributionCalendar: {
              weeks: {
                contributionDays: {
                  date: string;
                  contributionCount: number;
                  contributionLevel: string;
                }[];
              }[];
            };
          };
        } | null;
      };
    };

    const semanas =
      json.data?.user?.contributionsCollection.contributionCalendar.weeks;
    if (!semanas?.length) return null;

    return semanas.flatMap((s) =>
      s.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: NIVEL_GRAPHQL[d.contributionLevel] ?? 0,
      })),
    );
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ origen 2
   El mismo fragmento que GitHub sirve para el calendario del perfil
   publico. Sin token solo cuenta contribuciones a repos publicos.
------------------------------------------------------------------ */
async function desdePerfilPublico(): Promise<Dia[] | null> {
  try {
    const res = await fetch(
      `https://github.com/users/${GITHUB_USER}/contributions`,
      {
        headers: { "x-requested-with": "XMLHttpRequest" },
        next: { revalidate: REVALIDATE },
      },
    );
    if (!res.ok) return null;

    const html = await res.text();

    // conteo por dia: <tool-tip for="id">N contributions on ...</tool-tip>
    const conteos = new Map<string, number>();
    const reTip =
      /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>\s*(No|[\d,]+)\s+contribution/g;
    for (let m = reTip.exec(html); m; m = reTip.exec(html)) {
      conteos.set(m[1], m[2] === "No" ? 0 : Number(m[2].replace(/,/g, "")));
    }

    // celda por dia: <td ... data-date="..." id="..." data-level="N">
    const dias: Dia[] = [];
    const reCelda =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*\bid="([^"]+)"[^>]*data-level="(\d)"/g;
    for (let m = reCelda.exec(html); m; m = reCelda.exec(html)) {
      dias.push({
        date: m[1],
        count: conteos.get(m[2]) ?? 0,
        level: Number(m[3]) as 0 | 1 | 2 | 3 | 4,
      });
    }

    if (dias.length === 0) return null;
    dias.sort((a, b) => a.date.localeCompare(b.date));
    return dias;
  } catch {
    return null;
  }
}

function construirSemanas(dias: Dia[]): Semana[] {
  if (dias.length === 0) return [];
  const semanas: Semana[] = [];
  let actual: Semana = Array(aUTC(dias[0].date).getUTCDay()).fill(null);

  for (const dia of dias) {
    actual.push(dia);
    if (actual.length === 7) {
      semanas.push(actual);
      actual = [];
    }
  }
  if (actual.length > 0) {
    while (actual.length < 7) actual.push(null);
    semanas.push(actual);
  }
  return semanas;
}

function etiquetasDeMes(semanas: Semana[]) {
  const etiquetas: { indiceSemana: number; texto: string }[] = [];
  let ultimoMes = -1;

  semanas.forEach((semana, indiceSemana) => {
    const primero = semana.find((d): d is Dia => d !== null);
    if (!primero) return;
    const fecha = aUTC(primero.date);
    const mes = fecha.getUTCMonth();
    if (mes !== ultimoMes && fecha.getUTCDate() <= 7) {
      etiquetas.push({ indiceSemana, texto: MESES[mes] });
      ultimoMes = mes;
    }
  });

  return etiquetas;
}

function mejorRachaDe(dias: Dia[]) {
  let mejor = 0;
  let corriendo = 0;
  for (const dia of dias) {
    if (dia.count > 0) {
      corriendo += 1;
      if (corriendo > mejor) mejor = corriendo;
    } else {
      corriendo = 0;
    }
  }
  return mejor;
}

export async function obtenerActividad(): Promise<Actividad | null> {
  const token = process.env.GITHUB_TOKEN;

  let dias: Dia[] | null = null;
  let alcance: Actividad["alcance"] = "publicas";

  if (token) {
    dias = await desdeGraphQL(token);
    if (dias) alcance = "privadas";
  }
  if (!dias) dias = await desdePerfilPublico();
  if (!dias || dias.length === 0) return null;

  const semanas = construirSemanas(dias);
  const activos = dias.filter((d) => d.count > 0);

  return {
    total: dias.reduce((a, d) => a + d.count, 0),
    dias,
    semanas,
    etiquetasMes: etiquetasDeMes(semanas),
    diasActivos: activos.length,
    mejorDia: dias.reduce((a, d) => Math.max(a, d.count), 0),
    mejorRacha: mejorRachaDe(dias),
    desde: dias[0].date,
    hasta: dias[dias.length - 1].date,
    alcance,
  };
}

/* ---------------------------------------------------- reparto de lenguajes */
export async function obtenerLenguajes(): Promise<Lenguaje[]> {
  const token = process.env.GITHUB_TOKEN;
  const cabeceras: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      { next: { revalidate: REVALIDATE }, headers: cabeceras },
    );
    if (!res.ok) return [];

    const repos = (await res.json()) as Array<{
      name: string;
      languages_url: string;
      fork: boolean;
      archived: boolean;
    }>;

    const propios = repos.filter(
      (r) =>
        !r.fork &&
        !r.archived &&
        r.name.toLowerCase() !== GITHUB_USER.toLowerCase(),
    );

    const respuestas = await Promise.all(
      propios.map(async (r) => {
        try {
          const res = await fetch(r.languages_url, {
            next: { revalidate: REVALIDATE },
            headers: cabeceras,
          });
          return res.ok ? ((await res.json()) as Record<string, number>) : {};
        } catch {
          return {};
        }
      }),
    );

    const bytes = new Map<string, number>();
    for (const mapa of respuestas) {
      for (const [nombre, n] of Object.entries(mapa)) {
        bytes.set(nombre, (bytes.get(nombre) ?? 0) + n);
      }
    }

    const total = [...bytes.values()].reduce((a, b) => a + b, 0);
    if (total === 0) return [];

    return [...bytes.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([nombre, n]) => ({
        nombre,
        bytes: n,
        porcentaje: Math.round((n / total) * 1000) / 10,
      }));
  } catch {
    return [];
  }
}

export function formatearFecha(iso: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
