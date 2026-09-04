import { useMemo, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartTooltip, COLORS } from './charts.tsx';
import {
  allMonths, buildIndex, commonMonths, familyLines, filledMonths, listFiscalYears, monthSeries, total,
} from '../lib/analytics.ts';
import { MONTH_SHORT, fiscalLabel } from '../lib/fiscal.ts';
import { fmtCompact, fmtEur, fmtPct, fmtSignedEur, trendClass } from '../lib/format.ts';
import type { FamilyLine } from '../lib/analytics.ts';
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

type SortKey = 'family' | 'current' | 'compare' | 'delta' | 'pct' | 'share';

export default function Families({ rows, metric, fyCurrent, fyCompare, family, samePerimeter, onPickFamily }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('current');
  const [asc, setAsc] = useState(false);
  const [search, setSearch] = useState('');

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

  const head = (key: SortKey, label: string) => (
    <th
      onClick={() => {
        if (sortKey === key) setAsc(!asc);
        else {
          setSortKey(key);
          setAsc(key === 'family');
        }
      }}
    >
      {label}{sortKey === key ? (asc ? ' ↑' : ' ↓') : ''}
    </th>
  );

  return (
    <>
      {family && (
        <FamilyDetail
          rows={rows} idx={idx} metric={metric} family={family}
          fyCurrent={fyCurrent} fyCompare={fyCompare}
          monthsCur={monthsCur} monthsCmp={monthsCmp} scope={scope}
          onClear={() => onPickFamily('')}
        />
      )}

      <div className="card" style={{ marginTop: family ? 16 : 0 }}>
        <div className="row spread" style={{ marginBottom: 14 }}>
          <div>
            <h2>Toutes les familles</h2>
            <p className="card-sub" style={{ margin: 0 }}>
              {fiscalLabel(fyCurrent)} vs {fiscalLabel(fyCompare)} · {samePerimeter ? `${scope.size} mois communs` : 'exercice complet'}
            </p>
          </div>
          <input
            type="text" placeholder="Rechercher une famille…" value={search}
            onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }}
          />
        </div>
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
      </div>
    </>
  );
}

function FamilyDetail({
  rows, idx, metric, family, fyCurrent, fyCompare, monthsCur, monthsCmp, scope, onClear,
}: {
  rows: Row[];
  idx: ReturnType<typeof buildIndex>;
  metric: Metric;
  family: string;
  fyCurrent: number;
  fyCompare: number;
  monthsCur: Set<number>;
  monthsCmp: Set<number>;
  scope: Set<number>;
  onClear: () => void;
}) {
  const series = useMemo(
    () => monthSeries(idx, fyCurrent, fyCompare, family, monthsCur, monthsCmp, MONTH_SHORT),
    [idx, fyCurrent, fyCompare, family, monthsCur, monthsCmp],
  );

  // Historique tous exercices, ramené au périmètre de mois retenu pour rester comparable.
  const history = useMemo(() => {
    const years = listFiscalYears(rows).sort((a, b) => a - b);
    return years.map((fy) => ({
      label: fiscalLabel(fy),
      current: total(idx, fy, family, scope),
    }));
  }, [rows, idx, family, scope]);

  const cur = total(idx, fyCurrent, family, scope);
  const cmp = total(idx, fyCompare, family, scope);
  const pct = cmp === 0 ? null : ((cur - cmp) / Math.abs(cmp)) * 100;

  return (
    <div className="card">
      <div className="row spread" style={{ marginBottom: 6 }}>
        <div>
          <h2>{family}</h2>
          <p className="card-sub" style={{ margin: 0 }}>
            {metric === 'ordre' ? "Prise d'ordre" : 'Sortie'} · {fmtEur(cur)} en {fiscalLabel(fyCurrent)}{' '}
            <span className={`pill ${trendClass(pct)}`}>{fmtPct(pct)}</span>{' '}
            <span className="muted">vs {fiscalLabel(fyCompare)} ({fmtEur(cmp)})</span>
          </p>
        </div>
        <button className="btn btn-ghost" onClick={onClear}>Retirer le filtre</button>
      </div>

      <div className="grid cols-2" style={{ marginTop: 14 }}>
        <div>
          <p className="card-sub">Détail mensuel</p>
          <ResponsiveContainer width="100%" height={240}>
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
        <div>
          <p className="card-sub">Tendance par exercice (périmètre identique)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={history} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#eeedea" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: '#e4e3df' }} />
              <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={52} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f2f2f0' }} />
              <Bar dataKey="current" name="CA" fill={COLORS.current} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export type { FamilyLine };
