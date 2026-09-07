/**
 * Fin des doubles saisies.
 *
 * Le CA du mois existe déjà à deux endroits : dans l'import Excel des familles
 * (prise d'ordre TTC et sortie HT) et dans le suivi quotidien. Plutôt que de le
 * retaper dans le prévisionnel, on le propose — la validation reste manuelle,
 * personne n'écrase une saisie sans le vouloir.
 */
import { MOIS, cellKey } from './previsionnel.ts';
import { makePeriod } from './fiscal.ts';
import type { FiscalYear, Row } from './types.ts';

export type Suggestion = { key: string; value: number; source: string };

/** Mois calendaire d'une période du prévisionnel : P1 = avril de l'exercice. */
export function periodOfMois(moisCode: string, fy: FiscalYear): string {
  const i = MOIS.findIndex((m) => m.code === moisCode);
  const month = ((3 + i) % 12) + 1;
  return makePeriod(month >= 4 ? fy : fy + 1, month);
}

/** Totaux mensuels de l'import familles, mappés sur les indicateurs du prévisionnel. */
export function suggestFromRows(rows: Row[], fy: FiscalYear): Suggestion[] {
  const byPeriod = new Map<string, { ordre: number; sortie: number }>();
  for (const r of rows) {
    const acc = byPeriod.get(r.period) ?? { ordre: 0, sortie: 0 };
    acc.ordre += r.ordre;
    acc.sortie += r.sortie;
    byPeriod.set(r.period, acc);
  }
  const out: Suggestion[] = [];
  for (const m of MOIS) {
    const totals = byPeriod.get(periodOfMois(m.code, fy));
    if (!totals) continue;
    if (totals.ordre > 0) out.push({ key: cellKey(m.code, 'ca_po'), value: totals.ordre, source: 'Import familles' });
    if (totals.sortie > 0) out.push({ key: cellKey(m.code, 'ca_sortie'), value: totals.sortie, source: 'Import familles' });
  }
  return out;
}

/** Cumul du suivi quotidien du mois en cours, proposé sur le CA prise d'ordre. */
export function suggestFromSuivi(cumCA: number, year: number, month: number, fy: FiscalYear): Suggestion[] {
  if (cumCA <= 0) return [];
  const mois = MOIS.find((m) => periodOfMois(m.code, fy) === makePeriod(year, month));
  return mois ? [{ key: cellKey(mois.code, 'ca_po'), value: cumCA, source: 'Suivi quotidien' }] : [];
}

/** Les suggestions les plus fiables d'abord : l'import prime sur le suivi en cours. */
export function mergeSuggestions(...lists: Suggestion[][]): Map<string, Suggestion> {
  const map = new Map<string, Suggestion>();
  for (const list of lists) for (const s of list) if (!map.has(s.key)) map.set(s.key, s);
  return map;
}
