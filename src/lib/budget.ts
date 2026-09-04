import type { FiscalYear, Metric, Row } from './types.ts';
import { fiscalIndexOf, fiscalYearOf } from './fiscal.ts';
import { DEFAULT_MARKET, universeOf, type Scenario, type Universe } from './market.ts';

export interface BudgetSettings {
  /** Croissance marché annuelle par univers et scénario, en %. */
  market: Record<Universe, Record<Scenario, number>>;
  /** Poids de la tendance propre du magasin face au marché (0 = marché seul, 1 = tendance magasin seule). */
  storeWeight: number;
  /** Plafonnement de la tendance magasin retenue, en % (évite qu'un coup ponctuel s'extrapole). */
  trendCap: number;
}

export const DEFAULT_SETTINGS: BudgetSettings = {
  market: DEFAULT_MARKET,
  storeWeight: 0.6,
  trendCap: 15,
};

export interface FamilyBudget {
  family: string;
  universe: Universe;
  /** CA de référence : dernier exercice complet, ou exercice en cours annualisé. */
  base: number;
  /** Tendance propre du magasin sur la famille, en % (lissée, plafonnée). */
  trend: number;
  /** Croissance marché retenue pour le scénario, en %. */
  market: number;
  /** Croissance appliquée = combinaison pondérée, en %. */
  applied: number;
  budget: number;
  delta: number;
}

export interface BudgetResult {
  targetYear: FiscalYear;
  baseYear: FiscalYear;
  /** true si l'exercice de référence est incomplet et a été annualisé. */
  annualized: boolean;
  lines: FamilyBudget[];
  totalBase: number;
  totalBudget: number;
  /** Répartition mensuelle du budget total (12 valeurs, avril -> mars). */
  monthly: { index: number; value: number; share: number }[];
}

/** Moyenne pondérée : l'exercice le plus récent compte double. */
function weightedTrend(values: { fy: FiscalYear; value: number }[], cap: number): number {
  const usable = values.filter((v) => v.value > 0).sort((a, b) => a.fy - b.fy);
  if (usable.length < 2) return 0;
  const growths: { w: number; g: number }[] = [];
  for (let i = 1; i < usable.length; i++) {
    const g = ((usable[i].value - usable[i - 1].value) / usable[i - 1].value) * 100;
    growths.push({ w: i, g });
  }
  const wSum = growths.reduce((s, x) => s + x.w, 0);
  const t = growths.reduce((s, x) => s + x.w * x.g, 0) / wSum;
  return Math.max(-cap, Math.min(cap, t));
}

/**
 * Construit un budget pour l'exercice `targetYear`.
 * Base = dernier exercice disponible ; s'il est incomplet, il est annualisé
 * via la saisonnalité observée sur les exercices complets.
 */
export function buildBudget(
  rows: Row[],
  metric: Metric,
  targetYear: FiscalYear,
  scenario: Scenario,
  settings: BudgetSettings,
): BudgetResult {
  const val = (r: Row) => (metric === 'ordre' ? r.ordre : r.sortie);

  // Agrégation exercice -> famille -> mois.
  const byYear = new Map<FiscalYear, Map<string, number[]>>();
  for (const r of rows) {
    const fy = fiscalYearOf(r.period);
    const mi = fiscalIndexOf(r.period);
    let fam = byYear.get(fy);
    if (!fam) byYear.set(fy, (fam = new Map()));
    let months = fam.get(r.family);
    if (!months) fam.set(r.family, (months = Array(12).fill(0)));
    months[mi] += val(r);
  }

  const monthsPresent = new Map<FiscalYear, Set<number>>();
  for (const r of rows) {
    const fy = fiscalYearOf(r.period);
    let s = monthsPresent.get(fy);
    if (!s) monthsPresent.set(fy, (s = new Set()));
    s.add(fiscalIndexOf(r.period));
  }

  const years = [...byYear.keys()].sort((a, b) => a - b);
  const completeYears = years.filter((y) => (monthsPresent.get(y)?.size ?? 0) === 12);
  const baseYear = years.filter((y) => y < targetYear).pop() ?? years[years.length - 1];
  const baseMonths = monthsPresent.get(baseYear) ?? new Set<number>();
  const annualized = baseMonths.size > 0 && baseMonths.size < 12;

  // Saisonnalité de référence : moyenne des exercices complets, sinon répartition uniforme.
  const seasonality = Array(12).fill(1 / 12);
  if (completeYears.length > 0) {
    const acc = Array(12).fill(0);
    for (const y of completeYears) {
      for (const months of byYear.get(y)!.values()) for (let i = 0; i < 12; i++) acc[i] += months[i];
    }
    const s = acc.reduce((a, b) => a + b, 0);
    if (s > 0) for (let i = 0; i < 12; i++) seasonality[i] = acc[i] / s;
  }

  /** Ramène un exercice partiel à 12 mois via la saisonnalité. */
  const annualize = (months: number[], present: Set<number>): number => {
    const sum = months.reduce((a, b) => a + b, 0);
    if (present.size === 0 || present.size === 12) return sum;
    const covered = [...present].reduce((s, i) => s + seasonality[i], 0);
    return covered > 0 ? sum / covered : sum;
  };

  const families = new Set<string>();
  for (const fam of byYear.values()) for (const f of fam.keys()) families.add(f);

  const lines: FamilyBudget[] = [];
  for (const family of families) {
    const history = years.map((fy) => ({
      fy,
      value: annualize(byYear.get(fy)?.get(family) ?? Array(12).fill(0), monthsPresent.get(fy) ?? new Set()),
    }));
    const base = history.find((h) => h.fy === baseYear)?.value ?? 0;
    if (base <= 0) continue;

    const universe = universeOf(family);
    const trend = weightedTrend(history.filter((h) => h.fy <= baseYear), settings.trendCap);
    const market = settings.market[universe][scenario];
    const applied = settings.storeWeight * trend + (1 - settings.storeWeight) * market;
    const budget = base * (1 + applied / 100);
    lines.push({ family, universe, base, trend, market, applied, budget, delta: budget - base });
  }

  lines.sort((a, b) => b.budget - a.budget);
  const totalBase = lines.reduce((s, l) => s + l.base, 0);
  const totalBudget = lines.reduce((s, l) => s + l.budget, 0);
  const monthly = seasonality.map((share, index) => ({ index, share: share * 100, value: totalBudget * share }));

  return { targetYear, baseYear, annualized, lines, totalBase, totalBudget, monthly };
}
