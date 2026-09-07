/**
 * Lecture du stock : ce qui dort coûte de la trésorerie.
 *
 * La couverture est exprimée en jours de vente. Le stock étant valorisé au prix
 * d'achat et le CA au prix de vente, on ramène le CA à son coût d'achat via le
 * taux de marge avant de comparer — sans quoi la couverture est sous-estimée
 * d'autant.
 */
import type { Index } from './analytics.ts';
import { total } from './analytics.ts';
import type { FiscalYear } from './types.ts';

export type StockLine = {
  family: string;
  stock: number;
  /** CA sortie HT de la période retenue. */
  ca: number;
  /** Coût d'achat estimé des ventes de la période. */
  cout: number;
  /** Jours de vente couverts par le stock. */
  couverture: number | null;
  /** Nombre de rotations par an. */
  rotation: number | null;
  tone: 'up' | 'warn' | 'down';
};

/** Couverture en jours : stock / coût d'achat journalier des ventes. */
export function coverageDays(stock: number, caPeriode: number, jours: number, tauxMarge: number): number | null {
  const cout = caPeriode * (1 - tauxMarge / 100);
  if (cout <= 0 || jours <= 0) return null;
  return stock / (cout / jours);
}

/** Au-delà de 120 jours de couverture, le stock ne tourne plus : il finance des invendus. */
function toneOf(couverture: number | null): 'up' | 'warn' | 'down' {
  if (couverture === null) return 'warn';
  if (couverture > 120) return 'down';
  if (couverture > 75) return 'warn';
  return 'up';
}

/**
 * Croise le stock saisi par famille avec le CA sortie de la période.
 * Les familles sans stock saisi ressortent quand même, pour être complétées.
 */
export function stockLines(
  stocks: Record<string, number>,
  idx: Index,
  fy: FiscalYear,
  months: Set<number>,
  tauxMarge: number,
  families: string[],
): StockLine[] {
  const jours = Math.max(months.size, 1) * 30.4;
  return families
    .map((family) => {
      const stock = stocks[family] ?? 0;
      const ca = total(idx, fy, family, months);
      const cout = ca * (1 - tauxMarge / 100);
      const couverture = stock > 0 ? coverageDays(stock, ca, jours, tauxMarge) : null;
      return {
        family,
        stock,
        ca,
        cout,
        couverture,
        rotation: couverture !== null && couverture > 0 ? 365 / couverture : null,
        tone: stock > 0 ? toneOf(couverture) : 'warn',
      };
    })
    .sort((a, b) => (b.couverture ?? -1) - (a.couverture ?? -1));
}

/** Cash immobilisé au-delà d'une couverture cible : le gisement de trésorerie. */
export function excessStock(lines: StockLine[], cibleJours = 75): number {
  return lines.reduce((s, l) => {
    if (l.couverture === null || l.couverture <= cibleJours) return s;
    return s + l.stock * (1 - cibleJours / l.couverture);
  }, 0);
}
