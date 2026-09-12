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
};

export type Repo = {
  nombre: string;
  descripcion: string | null;
  url: string;
  sitio: string | null;
  lenguaje: string | null;
  actualizado: string;
  estrellas: number;
};

const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

function aUTC(fecha: string) {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
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
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      total: Record<string, number>;
      contributions: Dia[];
    };

    const dias = json.contributions ?? [];
    if (dias.length === 0) return null;

    const semanas = construirSemanas(dias);
    const activos = dias.filter((d) => d.count > 0);

    return {
      total: json.total?.lastYear ?? dias.reduce((a, d) => a + d.count, 0),
      dias,
      semanas,
      etiquetasMes: etiquetasDeMes(semanas),
      diasActivos: activos.length,
      mejorDia: dias.reduce((a, d) => Math.max(a, d.count), 0),
      mejorRacha: mejorRachaDe(dias),
      desde: dias[0].date,
      hasta: dias[dias.length - 1].date,
    };
  } catch {
    return null;
  }
}

export async function obtenerRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      {
        next: { revalidate: REVALIDATE },
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!res.ok) return [];

    const json = (await res.json()) as Array<{
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      language: string | null;
      pushed_at: string;
      stargazers_count: number;
      fork: boolean;
      archived: boolean;
    }>;

    return json
      .filter(
        (r) =>
          !r.fork &&
          !r.archived &&
          r.name.toLowerCase() !== GITHUB_USER.toLowerCase(),
      )
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .map((r) => ({
        nombre: r.name,
        descripcion: r.description,
        url: r.html_url,
        sitio: r.homepage || null,
        lenguaje: r.language,
        actualizado: r.pushed_at,
        estrellas: r.stargazers_count,
      }));
  } catch {
    return [];
  }
}

export function repartoDeLenguajes(repos: Repo[]) {
  const conteo = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.lenguaje) continue;
    conteo.set(repo.lenguaje, (conteo.get(repo.lenguaje) ?? 0) + 1);
  }
  const total = [...conteo.values()].reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return [...conteo.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([nombre, n]) => ({
      nombre,
      repos: n,
      porcentaje: Math.round((n / total) * 100),
    }));
}

export function formatearFecha(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
