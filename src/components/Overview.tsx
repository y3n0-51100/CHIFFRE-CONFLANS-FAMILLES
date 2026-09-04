import { useMemo } from 'react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartTooltip, Sparkline, chartColors } from './charts.tsx';
import {
  allMonths, buildIndex, commonMonths, evolution, familyLines, filledMonths,
  insights, monthSeries, periodsMissing, rollingTwelve, total,
} from '../lib/analytics.ts';
import { MONTH_LABELS, MONTH_SHORT, fiscalLabel, periodLabel } from '../lib/fiscal.ts';
import { fmtCompact, fmtEur, fmtPct, fmtSignedEur, trendClass } from '../lib/format.ts';
import { UNIVERSE_LABELS, type Universe } from '../lib/market.ts';
import type { Theme } from '../lib/theme.ts';
import type { Metric, Row } from '../lib/types.ts';

interface Props {
  rows: Row[];
  metric: Metric;
  fyCurrent: number;
  fyCompare: number;
  family: string | null;
  universe: Universe | null;
  samePerimeter: boolean;
  theme: Theme;
  onPickFamily: (f: string) => void;
}

export default function Overview({
  rows, metric, fyCurrent, fyCompare, family, universe, samePerimeter, theme, onPickFamily,
}: Props) {
  const C = chartColors(theme);
  const idx = useMemo(() => buildIndex(rows, metric), [rows, metric]);

  const monthsCur = useMemo(() => filledMonths(rows, fyCurrent), [rows, fyCurrent]);
  const monthsCmp = useMemo(() => filledMonths(rows, fyCompare), [rows, fyCompare]);
  const scope = samePerimeter ? commonMonths(monthsCur, monthsCmp) : allMonths;

  const cur = total(idx, fyCurrent, family, scope);
  const cmp = total(idx, fyCompare, family, scope);
  const pct = evolution(cur, cmp);
  const delta = cur - cmp;

  const series = useMemo(
    () => monthSeries(idx, fyCurrent, fyCompare, family, monthsCur, monthsCmp, MONTH_SHORT),
    [idx, fyCurrent, fyCompare, family, monthsCur, monthsCmp],
  );

  const lines = useMemo(() => familyLines(idx, fyCurrent, fyCompare, scope), [idx, fyCurrent, fyCompare, scope]);
  const movers = useMemo(() => lines.filter((l) => l.compare > 0 || l.current > 0), [lines]);
  const top = [...movers].sort((a, b) => b.delta - a.delta).slice(0, 5);
  const flop = [...movers].sort((a, b) => a.delta - b.delta).slice(0, 5);
  const reading = useMemo(() => insights(lines, cur, cmp), [lines, cur, cmp]);

  const rolling = useMemo(() => {
    const keep = family ? (f: string) => f === family : () => true;
    return rollingTwelve(rows, metric, keep).map((r) => ({ label: periodLabel(r.period), current: r.value }));
  }, [rows, metric, family]);

  const missing = periodsMissing(rows, fyCurrent);
  const scopeLabel = samePerimeter
    ? `${scope.size} mois communs`
    : `exercice complet · ${monthsCur.size}/12 mois saisis`;

  const monthsWithValue = series.filter((s) => s.current !== null);
  const best = monthsWithValue.reduce<null | typeof monthsWithValue[number]>(
    (b, s) => (b === null || (s.current as number) > (b.current as number) ? s : b), null);
  const avgDelta = monthsWithValue.length ? delta / monthsWithValue.length : 0;
  const perimeter = [family, universe ? UNIVERSE_LABELS[universe] : null].find(Boolean) ?? 'toutes familles';

  return (
    <>
      <div className="grid kpis">
        <div className="card hero">
          <div className="kpi-label">
            {fiscalLabel(fyCurrent)} · {metric === 'ordre' ? "prise d'ordre" : 'sortie'}
          </div>
          <div className="kpi-value hero-figure">{fmtEur(cur)}</div>
          <div className="kpi-foot">
            <span className={`pill ${trendClass(pct)}`}>{pct !== null && pct > 0 ? '▲' : pct !== null && pct < 0 ? '▼' : '■'} {fmtPct(pct)}</span>
            <span className="faint">vs {fiscalLabel(fyCompare)} · {perimeter}</span>
          </div>
          <Sparkline values={series.map((s) => s.current)} color={C.current} />
        </div>

        <div className="card">
          <div className="kpi-label">{fiscalLabel(fyCompare)} · même périmètre</div>
          <div className="kpi-value">{fmtEur(cmp)}</div>
          <div className="kpi-foot"><span className="faint">{scopeLabel}</span></div>
          <Sparkline values={series.map((s) => s.compare)} color={C.compare} />
        </div>

        <div className="card">
          <div className="kpi-label">Écart sur la période</div>
          <div className={`kpi-value txt ${trendClass(delta)}`}>{fmtSignedEur(delta)}</div>
          <div className="kpi-foot">
            <span className="faint">soit {fmtSignedEur(avgDelta)} par mois en moyenne</span>
          </div>
        </div>

        <div className="card">
          <div className="kpi-label">Meilleur mois</div>
          <div className="kpi-value">{best ? MONTH_LABELS[best.index] : '—'}</div>
          <div className="kpi-foot">
            <span className="faint">{best ? fmtEur(best.current) : 'aucune donnée'}</span>
          </div>
        </div>
      </div>

      {reading.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h2>Ce que disent les chiffres</h2>
          <p className="card-sub">Lecture automatique du périmètre sélectionné</p>
          <div className="insights">
            {reading.map((r, i) => (
              <div className="insight" key={i}>
                <span
                  className="dot"
                  style={{ background: r.tone === 'up' ? 'var(--up)' : r.tone === 'down' ? 'var(--down)' : 'var(--ink-3)' }}
                />
                <span>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {missing.length > 0 && (
        <div className="msg warn" style={{ marginBottom: 16, marginTop: 0 }}>
          Exercice {fiscalLabel(fyCurrent)} incomplet — mois manquants : {missing.map(periodLabel).join(', ')}.
        </div>
      )}

      <div className="grid cols-2">
        <div className="card">
          <h2>Chiffre mensuel</h2>
          <p className="card-sub">{perimeter} · {fiscalLabel(fyCurrent)} face à {fiscalLabel(fyCompare)}</p>
          <ResponsiveContainer width="100%" height={286}>
            <BarChart data={series} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={2}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.axis }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={54} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: C.cursor }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Bar dataKey="compare" name={fiscalLabel(fyCompare)} fill={C.compare} radius={[4, 4, 0, 0]} maxBarSize={24} />
              <Bar dataKey="current" name={fiscalLabel(fyCurrent)} fill={C.current} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Cumul depuis le 1er avril</h2>
          <p className="card-sub">Écart de cumul mois après mois sur l'exercice</p>
          <ResponsiveContainer width="100%" height={286}>
            <LineChart data={series} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.axis }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={54} />
              <Tooltip content={<ChartTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Line type="monotone" dataKey="cumCompare" name={fiscalLabel(fyCompare)} stroke={C.compare}
                strokeWidth={2} dot={false} connectNulls />
              <Line type="monotone" dataKey="cumCurrent" name={fiscalLabel(fyCurrent)} stroke={C.current}
                strokeWidth={2} dot={{ r: 4, strokeWidth: 2, stroke: C.surface, fill: C.current }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {rolling.length > 1 && (
        <div className="card" style={{ marginTop: 16 }}>
          <h2>Tendance de fond</h2>
          <p className="card-sub">
            Chiffre cumulé sur les 12 derniers mois glissants — la saisonnalité est neutralisée,
            seule la trajectoire reste
          </p>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={rolling} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rollingFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.rolling} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={C.rolling} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.axis }} minTickGap={24} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={54} domain={['dataMin', 'dataMax']} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="current" name="Cumul 12 mois" stroke={C.rolling} strokeWidth={2}
                fill="url(#rollingFill)" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: C.surface }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <MoversCard title="Plus fortes progressions" tone="up" lines={top} onPick={onPickFamily} />
        <MoversCard title="Plus fortes baisses" tone="down" lines={flop} onPick={onPickFamily} />
      </div>
    </>
  );
}

function MoversCard({
  title, tone, lines, onPick,
}: {
  title: string;
  tone: 'up' | 'down';
  lines: { family: string; current: number; compare: number; delta: number; pct: number | null }[];
  onPick: (f: string) => void;
}) {
  const max = Math.max(...lines.map((l) => Math.abs(l.delta)), 1);
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="card-sub">Écart en euros sur le périmètre sélectionné · cliquer pour filtrer</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Famille</th><th>Exercice</th><th>Écart</th><th>Évol.</th></tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.family} onClick={() => onPick(l.family)}>
                <td className="bar-cell">
                  <div
                    className="bar"
                    style={{
                      width: `${(Math.abs(l.delta) / max) * 100}%`,
                      background: tone === 'up' ? 'var(--up-wash)' : 'var(--down-wash)',
                    }}
                  />
                  <span>{l.family}</span>
                </td>
                <td>{fmtEur(l.current)}</td>
                <td className={`txt ${trendClass(l.delta)}`}>{fmtSignedEur(l.delta)}</td>
                <td className={`txt ${trendClass(l.pct)}`}>{fmtPct(l.pct)}</td>
              </tr>
            ))}
            {lines.length === 0 && (
              <tr><td colSpan={4} className="muted">Aucune donnée sur ce périmètre.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
