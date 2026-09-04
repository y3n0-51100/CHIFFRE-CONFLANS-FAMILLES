import type { FiscalYear, Metric, Row } from './types.ts';
import { fiscalIndexOf, fiscalYearOf, periodsOfFiscalYear } from './fiscal.ts';
import { fmtPct, fmtSignedEur } from './format.ts';

export interface MonthPoint {
  index: number;          // 0 = avril
  label: string;          // "Avr"
  current: number | null; // exercice sélectionné
  compare: number | null; // exercice de comparaison
  cumCurrent: number | null;
  cumCompare: number | null;
}

export interface FamilyLine {
  family: string;
  current: number;
  compare: number;
  delta: number;      // écart en euros
  pct: number | null; // évolution en %, null si base nulle
  share: number;      // poids dans le CA de l'exercice sélectionné
}

/** Index rapide : exercice -> famille -> index mois -> valeur. */
export type Index = Map<FiscalYear, Map<string, number[]>>;

export function buildIndex(rows: Row[], metric: Metric): Index {
  const idx: Index = new Map();
  for (const r of rows) {
    const fy = fiscalYearOf(r.period);
    const mi = fiscalIndexOf(r.period);
    let byFamily = idx.get(fy);
    if (!byFamily) idx.set(fy, (byFamily = new Map()));
    let months = byFamily.get(r.family);
    if (!months) byFamily.set(r.family, (months = Array(12).fill(0)));
    months[mi] += metric === 'ordre' ? r.ordre : r.sortie;
  }
  return idx;
}

/** Mois réellement présents dans les données pour un exercice (0..11). */
export function filledMonths(rows: Row[], fy: FiscalYear): Set<number> {
  const s = new Set<number>();
  for (const r of rows) if (fiscalYearOf(r.period) === fy) s.add(fiscalIndexOf(r.period));
  return s;
}

export function listFiscalYears(rows: Row[]): FiscalYear[] {
  return [...new Set(rows.map((r) => fiscalYearOf(r.period)))].sort((a, b) => b - a);
}

export function listFamilies(rows: Row[]): string[] {
  return [...new Set(rows.map((r) => r.family))].sort((a, b) => a.localeCompare(b, 'fr'));
}

/** Somme d'un exercice, éventuellement restreinte à une famille et à des mois. */
export function total(idx: Index, fy: FiscalYear, family: string | null, months?: Set<number>): number {
  const byFamily = idx.get(fy);
  if (!byFamily) return 0;
  const src = family ? (byFamily.get(family) ? [byFamily.get(family)!] : []) : [...byFamily.values()];
  let sum = 0;
  for (const arr of src) {
    for (let i = 0; i < 12; i++) if (!months || months.has(i)) sum += arr[i];
  }
  return sum;
}

export function evolution(current: number, compare: number): number | null {
  if (compare === 0) return null;
  return ((current - compare) / Math.abs(compare)) * 100;
}

/** Série mensuelle comparée. `restrict` limite aux mois communs (comparaison à périmètre égal). */
export function monthSeries(
  idx: Index,
  fyCurrent: FiscalYear,
  fyCompare: FiscalYear,
  family: string | null,
  monthsCurrent: Set<number>,
  monthsCompare: Set<number>,
  labels: string[],
): MonthPoint[] {
  const pick = (fy: FiscalYear, i: number, present: Set<number>): number | null => {
    if (!present.has(i)) return null;
    const byFamily = idx.get(fy);
    if (!byFamily) return null;
    if (family) return byFamily.get(family)?.[i] ?? 0;
    let s = 0;
    for (const arr of byFamily.values()) s += arr[i];
    return s;
  };
  let cumC = 0;
  let cumP = 0;
  return Array.from({ length: 12 }, (_, i) => {
    const current = pick(fyCurrent, i, monthsCurrent);
    const compare = pick(fyCompare, i, monthsCompare);
    if (current !== null) cumC += current;
    if (compare !== null) cumP += compare;
    return {
      index: i,
      label: labels[i],
      current,
      compare,
      cumCurrent: current === null ? null : cumC,
      cumCompare: compare === null ? null : cumP,
    };
  });
}

/** Tableau des familles pour deux exercices, à périmètre de mois donné. */
export function familyLines(
  idx: Index,
  fyCurrent: FiscalYear,
  fyCompare: FiscalYear,
  months: Set<number>,
): FamilyLine[] {
  const families = new Set<string>([
    ...(idx.get(fyCurrent)?.keys() ?? []),
    ...(idx.get(fyCompare)?.keys() ?? []),
  ]);
  const rows: FamilyLine[] = [];
  let grand = 0;
  for (const family of families) {
    const current = total(idx, fyCurrent, family, months);
    const compare = total(idx, fyCompare, family, months);
    grand += current;
    rows.push({ family, current, compare, delta: current - compare, pct: evolution(current, compare), share: 0 });
  }
  for (const r of rows) r.share = grand === 0 ? 0 : (r.current / grand) * 100;
  return rows.sort((a, b) => b.current - a.current);
}

/** Historique d'une famille sur tous les exercices (pour le graphe de tendance). */
export function familyHistory(idx: Index, family: string | null, years: FiscalYear[], monthsByYear: Map<FiscalYear, Set<number>>) {
  return years
    .slice()
    .sort((a, b) => a - b)
    .map((fy) => ({ fy, value: total(idx, fy, family, monthsByYear.get(fy)) }));
}

/** Mois communs entre deux exercices : base de comparaison honnête pour un exercice en cours. */
export function commonMonths(a: Set<number>, b: Set<number>): Set<number> {
  return new Set([...a].filter((m) => b.has(m)));
}

export const allMonths = new Set(Array.from({ length: 12 }, (_, i) => i));

export function periodsMissing(rows: Row[], fy: FiscalYear): string[] {
  const present = new Set(rows.map((r) => r.period));
  return periodsOfFiscalYear(fy).filter((p) => !present.has(p));
}

/** Somme glissante sur 12 mois : lisse la saisonnalité et montre la tendance de fond. */
export function rollingTwelve(
  rows: Row[],
  metric: Metric,
  keep: (family: string) => boolean,
): { period: string; value: number }[] {
  const byPeriod = new Map<string, number>();
  for (const r of rows) {
    if (!keep(r.family)) continue;
    const v = metric === 'ordre' ? r.ordre : r.sortie;
    byPeriod.set(r.period, (byPeriod.get(r.period) ?? 0) + v);
  }
  const periods = [...byPeriod.keys()].sort();
  const out: { period: string; value: number }[] = [];
  for (let i = 11; i < periods.length; i++) {
    let sum = 0;
    for (let j = i - 11; j <= i; j++) sum += byPeriod.get(periods[j]) ?? 0;
    out.push({ period: periods[i], value: sum });
  }
  return out;
}

/** Une ou deux phrases de lecture des chiffres, pour ouvrir la synthèse. */
export function insights(lines: FamilyLine[], cur: number, cmp: number): { tone: 'up' | 'down' | 'neutral'; text: string }[] {
  const out: { tone: 'up' | 'down' | 'neutral'; text: string }[] = [];
  if (lines.length === 0) return out;
  const moved = lines.filter((l) => l.compare > 0 || l.current > 0);
  const best = [...moved].sort((a, b) => b.delta - a.delta)[0];
  const worst = [...moved].sort((a, b) => a.delta - b.delta)[0];
  const gap = cur - cmp;

  if (best && best.delta > 0) {
    out.push({
      tone: 'up',
      text: `${best.family} porte la croissance : ${fmtSignedEur(best.delta)} sur la période, soit ${fmtPct(best.pct)}.`,
    });
  }
  if (worst && worst.delta < 0) {
    const share = gap < 0 ? Math.min(100, (worst.delta / gap) * 100) : null;
    out.push({
      tone: 'down',
      text:
        `${worst.family} pèse le plus lourd : ${fmtSignedEur(worst.delta)}` +
        (share !== null ? `, soit ${share.toFixed(0)} % du recul total.` : '.'),
    });
  }
  const top3 = lines.slice(0, 3);
  const weight = top3.reduce((s, l) => s + l.share, 0);
  if (top3.length === 3) {
    out.push({
      tone: 'neutral',
      text: `${top3.map((l) => l.family).join(', ')} concentrent ${weight.toFixed(0)} % du chiffre de la période.`,
    });
  }
  return out;
}
