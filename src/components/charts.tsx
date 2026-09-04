import { fmtEur, fmtPct } from '../lib/format.ts';

export const COLORS = {
  current: '#1f6feb',
  compare: '#c3c7cd',
  cumCurrent: '#16181c',
  cumCompare: '#a8adb5',
  budget: '#1a7f52',
};

interface TooltipEntry {
  name?: string;
  value?: number | null;
  color?: string;
  dataKey?: string | number;
}

/** Infobulle commune : libellés en euros, ligne d'écart si les deux séries sont présentes. */
export function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string | number }) {
  if (!active || !payload?.length) return null;
  const rows = payload.filter((p) => p.value !== null && p.value !== undefined);
  if (!rows.length) return null;
  const cur = rows.find((r) => r.dataKey === 'current')?.value ?? null;
  const cmp = rows.find((r) => r.dataKey === 'compare')?.value ?? null;
  const pct = cur !== null && cmp !== null && cmp !== 0 ? ((cur - cmp) / Math.abs(cmp)) * 100 : null;
  return (
    <div className="tooltip">
      <div className="t-title">{label}</div>
      {rows.map((r, i) => (
        <div className="t-row" key={i}>
          <span style={{ color: r.color }}>{r.name}</span>
          <strong>{fmtEur(r.value as number)}</strong>
        </div>
      ))}
      {pct !== null && (
        <div className="t-row" style={{ marginTop: 4 }}>
          <span className="muted">Évolution</span>
          <strong>{fmtPct(pct)}</strong>
        </div>
      )}
    </div>
  );
}
