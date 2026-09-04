import { fmtEur, fmtPct } from '../lib/format.ts';
import type { Theme } from '../lib/theme.ts';

/**
 * Palette de séries, déclinée pour chaque thème et validée sur la surface réelle
 * (séparation daltonisme et contraste). L'exercice de comparaison est une série
 * de référence : il reste neutre pour que l'exercice en cours porte la couleur.
 */
export function chartColors(theme: Theme) {
  return theme === 'dark'
    ? {
        current: '#3987e5',
        compare: '#56575a',
        budget: '#199e70',
        rolling: '#3987e5',
        grid: '#2a2b2d',
        axis: '#3a3b3d',
        surface: '#17181a',
        ink3: '#8e8d86',
        cursor: 'rgba(255,255,255,0.05)',
      }
    : {
        current: '#2a78d6',
        compare: '#c3c2bb',
        budget: '#1baf7a',
        rolling: '#2a78d6',
        grid: '#e7e6e1',
        axis: '#c9c8c2',
        surface: '#ffffff',
        ink3: '#898781',
        cursor: 'rgba(11,11,11,0.04)',
      };
}

interface TooltipEntry {
  name?: string;
  value?: number | null;
  color?: string;
  dataKey?: string | number;
}

/** Infobulle commune : valeurs en euros, et l'écart quand les deux exercices sont présents. */
export function ChartTooltip({
  active, payload, label,
}: { active?: boolean; payload?: TooltipEntry[]; label?: string | number }) {
  if (!active || !payload?.length) return null;
  const rows = payload.filter((p) => p.value !== null && p.value !== undefined);
  if (!rows.length) return null;
  const cur = rows.find((r) => r.dataKey === 'current')?.value ?? null;
  const cmp = rows.find((r) => r.dataKey === 'compare')?.value ?? null;
  const pct = cur !== null && cmp !== null && cmp !== 0 ? ((cur - cmp) / Math.abs(cmp)) * 100 : null;
  const gap = cur !== null && cmp !== null ? cur - cmp : null;
  return (
    <div className="tooltip">
      <div className="t-title">{label}</div>
      {rows.map((r, i) => (
        <div className="t-row" key={i}>
          <span className="t-key"><i style={{ background: r.color }} />{r.name}</span>
          <strong>{fmtEur(r.value as number)}</strong>
        </div>
      ))}
      {pct !== null && (
        <>
          <div className="t-sep" />
          <div className="t-row">
            <span className="t-key">Écart</span>
            <strong className={gap && gap > 0 ? 'txt up' : gap && gap < 0 ? 'txt down' : ''}>
              {fmtPct(pct)}
            </strong>
          </div>
        </>
      )}
    </div>
  );
}

/** Courbe de tendance compacte pour les cartes d'indicateurs. */
export function Sparkline({
  values, color, height = 34,
}: { values: (number | null)[]; color: string; height?: number }) {
  const pts = values.map((v, i) => ({ i, v })).filter((p) => p.v !== null) as { i: number; v: number }[];
  if (pts.length < 2) return null;
  const w = 100;
  const max = Math.max(...pts.map((p) => p.v));
  const min = Math.min(...pts.map((p) => p.v), 0);
  const span = max - min || 1;
  const x = (i: number) => (i / Math.max(values.length - 1, 1)) * w;
  const y = (v: number) => height - ((v - min) / span) * (height - 6) - 3;
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.i).toFixed(2)},${y(p.v).toFixed(2)}`).join(' ');
  const area = `${line} L${x(pts[pts.length - 1].i).toFixed(2)},${height} L${x(pts[0].i).toFixed(2)},${height} Z`;
  return (
    <svg
      className="kpi-spark" width="100%" height={height} viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none" role="img" aria-label="Tendance sur l'exercice"
    >
      <path d={area} fill={color} fillOpacity={0.1} />
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
        vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
