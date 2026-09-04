import type { FiscalYear } from './types';

/** L'exercice démarre le 1er avril. Avril = position 0, mars = position 11. */
export const FISCAL_START_MONTH = 4;

export const MONTH_LABELS = [
  'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
  'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars',
];

export const MONTH_SHORT = [
  'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep',
  'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar',
];

/** "2025-04" -> { year: 2025, month: 4 } */
export function splitPeriod(period: string): { year: number; month: number } {
  const [y, m] = period.split('-');
  return { year: Number(y), month: Number(m) };
}

export function makePeriod(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

/** Exercice auquel appartient une période (avril 2025 -> exercice 2025). */
export function fiscalYearOf(period: string): FiscalYear {
  const { year, month } = splitPeriod(period);
  return month >= FISCAL_START_MONTH ? year : year - 1;
}

/** Index 0..11 du mois dans l'exercice (avril -> 0). */
export function fiscalIndexOf(period: string): number {
  const { month } = splitPeriod(period);
  return (month - FISCAL_START_MONTH + 12) % 12;
}

/** Les 12 périodes calendaires d'un exercice, dans l'ordre avril -> mars. */
export function periodsOfFiscalYear(fy: FiscalYear): string[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = ((FISCAL_START_MONTH - 1 + i) % 12) + 1;
    const year = FISCAL_START_MONTH + i > 12 ? fy + 1 : fy;
    return makePeriod(year, month);
  });
}

/** Libellé d'exercice : 2025 -> "2025/26". */
export function fiscalLabel(fy: FiscalYear): string {
  return `${fy}/${String((fy + 1) % 100).padStart(2, '0')}`;
}

/** Exercice en cours à la date donnée. */
export function currentFiscalYear(d = new Date()): FiscalYear {
  return d.getMonth() + 1 >= FISCAL_START_MONTH ? d.getFullYear() : d.getFullYear() - 1;
}

/** Période lisible : "2025-04" -> "Avril 2025". */
export function periodLabel(period: string): string {
  const { year, month } = splitPeriod(period);
  return `${MONTH_LABELS[(month - FISCAL_START_MONTH + 12) % 12]} ${year}`;
}
