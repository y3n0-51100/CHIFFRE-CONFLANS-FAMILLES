import { useMemo } from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartTooltip, COLORS } from './charts.tsx';
import {
  allMonths, buildIndex, commonMonths, evolution, familyLines, filledMonths, monthSeries, periodsMissing, total,
} from '../lib/analytics.ts';
import { MONTH_SHORT, fiscalLabel, periodLabel } from '../lib/fiscal.ts';
import { fmtCompact, fmtEur, fmtPct, fmtSignedEur, trendClass } from '../lib/format.ts';
import type { Metric, Row } from '../lib/types.ts';

interface Props {
  rows: Row[];
  metric: Metric;
  fyCurrent: number;
  fyCompare: number;
  family: string | null;
  samePerimeter: boolean;
  onPickFamily: (f: string) => void;
}

export default function Overview({ rows, metric, fyCurrent, fyCompare, family, samePerimeter, onPickFamily }: Props) {
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

  const missing = periodsMissing(rows, fyCurrent);
  const scopeLabel = samePerimeter
    ? `${scope.size} mois communs`
    : `exercice complet (${monthsCur.size}/12 mois saisis)`;

  // Meilleur et pire mois de l'exercice sélectionné.
  const monthsWithValue = series.filter((s) => s.current !== null);
  const best = monthsWithValue.reduce<null | typeof monthsWithValue[number]>(
    (b, s) => (b === null || (s.current as number) > (b.current as number) ? s : b), null);

  return (
    <>
      <div className="grid kpis">
        <div className="card">
          <div className="kpi-label">{fiscalLabel(fyCurrent)} · {metric === 'ordre' ? "prise d'ordre" : 'sortie'}</div>
          <div className="kpi-value">{fmtEur(cur)}</div>
          <div className="kpi-foot">
            <span className={`pill ${trendClass(pct)}`}>{fmtPct(pct)}</span>
            <span className="muted">vs {fiscalLabel(fyCompare)}</span>
          </div>
        </div>
        <div className="card">
          <div className="kpi-label">{fiscalLabel(fyCompare)} · même périmètre</div>
          <div className="kpi-value">{fmtEur(cmp)}</div>
          <div className="kpi-foot"><span className="muted">{scopeLabel}</span></div>
        </div>
        <div className="card">
          <div className="kpi-label">Écart</div>
          <div className={`kpi-value txt ${trendClass(delta)}`}>{fmtSignedEur(delta)}</div>
          <div className="kpi-foot"><span className="muted">{family ?? 'toutes familles'}</span></div>
        </div>
        <div className="card">
          <div className="kpi-label">Meilleur mois</div>
          <div className="kpi-value">{best ? best.label : '—'}</div>
          <div className="kpi-foot"><span className="muted">{best ? fmtEur(best.current) : 'aucune donnée'}</span></div>
        </div>
      </div>

      {missing.length > 0 && (
        <div className="msg warn" style={{ marginBottom: 16 }}>
          Exercice {fiscalLabel(fyCurrent)} incomplet — mois manquants : {missing.map(periodLabel).join(', ')}.
        </div>
      )}

      <div className="grid cols-2">
        <div className="card">
          <h2>Chiffre mensuel</h2>
          <p className="card-sub">
            {family ?? 'Toutes familles'} · {fiscalLabel(fyCurrent)} vs {fiscalLabel(fyCompare)}
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={series} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#eeedea" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: '#e4e3df' }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={52} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f2f2f0' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="compare" name={fiscalLabel(fyCompare)} fill={COLORS.compare} radius={[3, 3, 0, 0]} />
              <Bar dataKey="current" name={fiscalLabel(fyCurrent)} fill={COLORS.current} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Cumul depuis le 1er avril</h2>
          <p className="card-sub">Suivi du cumul d'exercice, mois après mois</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={series} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#eeedea" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: '#e4e3df' }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={52} />
              <Tooltip content={<ChartTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Line
                type="monotone" dataKey="cumCompare" name={fiscalLabel(fyCompare)} stroke={COLORS.cumCompare}
                strokeWidth={2} dot={false} connectNulls
              />
              <Line
                type="monotone" dataKey="cumCurrent" name={fiscalLabel(fyCurrent)} stroke={COLORS.current}
                strokeWidth={2.2} dot={false} connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <MoversCard title="Plus fortes progressions" lines={top} onPick={onPickFamily} />
        <MoversCard title="Plus fortes baisses" lines={flop} onPick={onPickFamily} />
      </div>
    </>
  );
}

function MoversCard({
  title, lines, onPick,
}: { title: string; lines: { family: string; current: number; compare: number; delta: number; pct: number | null }[]; onPick: (f: string) => void }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="card-sub">Écart en euros sur le périmètre sélectionné</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Famille</th>
              <th>Exercice</th>
              <th>Écart</th>
              <th>Évol.</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.family} onClick={() => onPick(l.family)}>
                <td>{l.family}</td>
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
