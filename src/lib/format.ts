const eur0 = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const eur2 = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num0 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

export const fmtEur = (n: number | null | undefined): string => (n === null || n === undefined ? '—' : eur0.format(n));
export const fmtEur2 = (n: number | null | undefined): string => (n === null || n === undefined ? '—' : eur2.format(n));
export const fmtNum = (n: number | null | undefined): string => (n === null || n === undefined ? '—' : num0.format(n));

export function fmtPct(n: number | null | undefined, digits = 1): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—';
  return `${n > 0 ? '+' : ''}${n.toFixed(digits).replace('.', ',')} %`;
}

export function fmtSignedEur(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—';
  return `${n > 0 ? '+' : ''}${eur0.format(n)}`;
}

/** Classe CSS de couleur selon le sens de la variation. */
export function trendClass(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return 'neutral';
  if (n > 0.05) return 'up';
  if (n < -0.05) return 'down';
  return 'neutral';
}

/** Compact pour les axes : 154 000 -> "154 k". */
export function fmtCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} M`;
  if (Math.abs(n) >= 1000) return `${Math.round(n / 1000)} k`;
  return num0.format(n);
}
