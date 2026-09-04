import { useMemo, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartTooltip, chartColors } from './charts.tsx';
import Heatmap from './Heatmap.tsx';
import {
  allMonths, buildIndex, commonMonths, familyLines, filledMonths, listFiscalYears, monthSeries, total,
} from '../lib/analytics.ts';
import { MONTH_SHORT, fiscalLabel } from '../lib/fiscal.ts';
import { fmtCompact, fmtEur, fmtPct, fmtSignedEur, trendClass } from '../lib/format.ts';
import { UNIVERSE_LABELS, universeOf } from '../lib/market.ts';
import { downloadCsv } from '../lib/csv.ts';
import type { Theme } from '../lib/theme.ts';
import type { Metric, Row } from '../lib/types.ts';

interface Props {
  rows: Row[];
  metric: Metric;
  fyCurrent: number;
  fyCompare: number;
  family: string | null;
  samePerimeter: boolean;
  theme: Theme;
  onPickFamily: (f: string) => void;
}

type SortKey = 'family' | 'current' | 'compare' | 'delta' | 'pct' | 'share';
type View = 'table' | 'heatmap';

export default function Families({
  rows, metric, fyCurrent, fyCompare, family, samePerimeter, theme, onPickFamily,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('current');
  const [asc, setAsc] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<View>('table');

  const idx = useMemo(() => buildIndex(rows, metric), [rows, metric]);
  const monthsCur = useMemo(() => filledMonths(rows, fyCurrent), [rows, fyCurrent]);
  const monthsCmp = useMemo(() => filledMonths(rows, fyCompare), [rows, fyCompare]);
  const scope = samePerimeter ? commonMonths(monthsCur, monthsCmp) : allMonths;

  const lines = useMemo(() => familyLines(idx, fyCurrent, fyCompare, scope), [idx, fyCurrent, fyCompare, scope]);

  const filtered = useMemo(() => {
    const q = search.trim().toUpperCase();
    const base = q ? lines.filter((l) => l.family.includes(q)) : lines;
    const dir = asc ? 1 : -1;
    return [...base].sort((a, b) => {
      if (sortKey === 'family') return dir * a.family.localeCompare(b.family, 'fr');
      const av = a[sortKey];
      const bv = b[sortKey];
      // Les familles sans base de comparaison (pct null) restent en fin de tri.
      if (av === null) return 1;
      if (bv === null) return -1;
      return dir * ((av as number) - (bv as number));
    });
  }, [lines, search, sortKey, asc]);

  const sumCur = filtered.reduce((s, l) => s + l.current, 0);
  const sumCmp = filtered.reduce((s, l) => s + l.compare, 0);
  const maxCur = Math.max(...filtered.map((l) => l.current), 1);

  const exportCsv = () => {
    downloadCsv(
      `familles_${fiscalLabel(fyCurrent).replace('/', '-')}_vs_${fiscalLabel(fyCompare).replace('/', '-')}`,
      ['Famille', 'Univers', `${fiscalLabel(fyCurrent)}`, `${fiscalLabel(fyCompare)}`, 'Ecart EUR', 'Evolution %', 'Poids %'],
      filtered.map((l) => [l.family, UNIVERSE_LABELS[universeOf(l.family)], l.current, l.compare, l.delta, l.pct, l.share]),
    );
  };

  const head = (key: SortKey, label: string) => (
    <th
      onClick={() => {
        if (sortKey === key) setAsc(!asc);
        else { setSortKey(key); setAsc(key === 'family'); }
      }}
    >
      {label}{sortKey === key ? (asc ? ' ↑' : ' ↓') : ''}
    </th>
  );

  return (
    <>
      {family && (
        <FamilyDetail
          rows={rows} idx={idx} metric={metric} family={family} theme={theme}
          fyCurrent={fyCurrent} fyCompare={fyCompare}
          monthsCur={monthsCur} monthsCmp={monthsCmp} scope={scope}
          onClear={() => onPickFamily('')}
        />
      )}

      <div className="card" style={{ marginTop: family ? 16 : 0 }}>
        <div className="row spread" style={{ marginBottom: 16 }}>
          <div>
            <h2>{view === 'table' ? 'Toutes les familles' : 'Saisonnalité par famille'}</h2>
            <p className="card-sub" style={{ margin: 0 }}>
              {view === 'table'
                ? `${fiscalLabel(fyCurrent)} face à ${fiscalLabel(fyCompare)} · ${samePerimeter ? `${scope.size} mois communs` : 'exercice complet'}`
                : `Répartition du chiffre mois par mois sur l'exercice ${fiscalLabel(fyCurrent)}`}
            </p>
          </div>
          <div className="row" style={{ gap: 10 }}>
            <div className="segmented">
              <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>Tableau</button>
              <button className={view === 'heatmap' ? 'active' : ''} onClick={() => setView('heatmap')}>Saisonnalité</button>
            </div>
            {view === 'table' && (
              <>
                <input
                  type="text" placeholder="Rechercher une famille…" value={search}
                  onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 210 }}
                />
                <button className="btn btn-sm" onClick={exportCsv}>Exporter CSV</button>
              </>
            )}
          </div>
        </div>

        {view === 'heatmap' ? (
          <Heatmap
            idx={idx} fy={fyCurrent} selected={family}
            families={lines.map((l) => l.family)} onPick={onPickFamily}
          />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {head('family', 'Famille')}
                  {head('current', fiscalLabel(fyCurrent))}
                  {head('compare', fiscalLabel(fyCompare))}
                  {head('delta', 'Écart €')}
                  {head('pct', 'Évolution')}
                  {head('share', 'Poids')}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr
                    key={l.family}
                    className={l.family === family ? 'selected' : ''}
                    onClick={() => onPickFamily(l.family === family ? '' : l.family)}
                  >
                    <td className="bar-cell">
                      <div className="bar" style={{ width: `${(l.current / maxCur) * 100}%` }} />
                      <span>{l.family}</span>
                    </td>
                    <td>{fmtEur(l.current)}</td>
                    <td className="muted">{fmtEur(l.compare)}</td>
                    <td className={`txt ${trendClass(l.delta)}`}>{fmtSignedEur(l.delta)}</td>
                    <td className={`txt ${trendClass(l.pct)}`}>{fmtPct(l.pct)}</td>
                    <td className="muted">{l.share.toFixed(1).replace('.', ',')} %</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{fmtEur(sumCur)}</td>
                  <td>{fmtEur(sumCmp)}</td>
                  <td className={`txt ${trendClass(sumCur - sumCmp)}`}>{fmtSignedEur(sumCur - sumCmp)}</td>
                  <td className={`txt ${trendClass(sumCmp ? sumCur - sumCmp : null)}`}>
                    {fmtPct(sumCmp ? ((sumCur - sumCmp) / Math.abs(sumCmp)) * 100 : null)}
                  </td>
                  <td>100 %</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function FamilyDetail({
  rows, idx, metric, family, theme, fyCurrent, fyCompare, monthsCur, monthsCmp, scope, onClear,
}: {
  rows: Row[];
  idx: ReturnType<typeof buildIndex>;
  metric: Metric;
  family: string;
  theme: Theme;
  fyCurrent: number;
  fyCompare: number;
  monthsCur: Set<number>;
  monthsCmp: Set<number>;
  scope: Set<number>;
  onClear: () => void;
}) {
  const C = chartColors(theme);
  const series = useMemo(
    () => monthSeries(idx, fyCurrent, fyCompare, family, monthsCur, monthsCmp, MONTH_SHORT),
    [idx, fyCurrent, fyCompare, family, monthsCur, monthsCmp],
  );

  // Historique tous exercices, ramené au périmètre de mois retenu pour rester comparable.
  const history = useMemo(() => {
    const years = listFiscalYears(rows).sort((a, b) => a - b);
    return years.map((fy) => ({ label: fiscalLabel(fy), current: total(idx, fy, family, scope) }));
  }, [rows, idx, family, scope]);

  const cur = total(idx, fyCurrent, family, scope);
  const cmp = total(idx, fyCompare, family, scope);
  const pct = cmp === 0 ? null : ((cur - cmp) / Math.abs(cmp)) * 100;

  return (
    <div className="card hero">
      <div className="row spread" style={{ marginBottom: 6 }}>
        <div>
          <h2 style={{ fontSize: 16 }}>{family}</h2>
          <p className="card-sub" style={{ margin: 0 }}>
            {UNIVERSE_LABELS[universeOf(family)]} · {metric === 'ordre' ? "prise d'ordre" : 'sortie'}
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClear}>Retirer le filtre</button>
      </div>

      <div className="row" style={{ gap: 26, margin: '14px 0 4px' }}>
        <div>
          <div className="kpi-label">{fiscalLabel(fyCurrent)}</div>
          <div className="kpi-value">{fmtEur(cur)}</div>
        </div>
        <div>
          <div className="kpi-label">{fiscalLabel(fyCompare)}</div>
          <div className="kpi-value" style={{ color: 'var(--ink-2)' }}>{fmtEur(cmp)}</div>
        </div>
        <div>
          <div className="kpi-label">Évolution</div>
          <div className={`kpi-value txt ${trendClass(pct)}`}>{fmtPct(pct)}</div>
        </div>
        <div>
          <div className="kpi-label">Écart</div>
          <div className={`kpi-value txt ${trendClass(cur - cmp)}`}>{fmtSignedEur(cur - cmp)}</div>
        </div>
      </div>

      <div className="grid cols-2" style={{ marginTop: 18 }}>
        <div>
          <p className="card-sub">Détail mensuel</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={series} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={2}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.axis }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={54} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: C.cursor }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Bar dataKey="compare" name={fiscalLabel(fyCompare)} fill={C.compare} radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="current" name={fiscalLabel(fyCurrent)} fill={C.current} radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="card-sub">Trajectoire par exercice, à périmètre de mois identique</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={history} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.axis }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={54} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: C.cursor }} />
              <Bar dataKey="current" name="CA" fill={C.current} radius={[4, 4, 0, 0]} maxBarSize={54} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
