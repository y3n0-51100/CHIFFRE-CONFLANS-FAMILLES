import { useMemo, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ChartTooltip, chartColors } from './charts.tsx';
import { DEFAULT_SETTINGS, buildBudget, type BudgetSettings } from '../lib/budget.ts';
import { SCENARIO_LABELS, UNIVERSE_LABELS, type Scenario, type Universe } from '../lib/market.ts';
import { MONTH_SHORT, currentFiscalYear, fiscalLabel } from '../lib/fiscal.ts';
import { listFiscalYears } from '../lib/analytics.ts';
import { downloadCsv } from '../lib/csv.ts';
import { fmtCompact, fmtEur, fmtPct, fmtSignedEur, trendClass } from '../lib/format.ts';
import type { Theme } from '../lib/theme.ts';
import type { Metric, Row } from '../lib/types.ts';

const UNIVERSES: Universe[] = ['MEUBLE', 'DECO', 'GEM', 'PEM', 'TECH', 'AUTRE'];
const SCENARIOS: Scenario[] = ['prudent', 'base', 'favorable'];

export default function BudgetPanel({ rows, theme }: { rows: Row[]; theme: Theme }) {
  const [metric, setMetric] = useState<Metric>('ordre');
  const [scenario, setScenario] = useState<Scenario>('prudent');
  const [settings, setSettings] = useState<BudgetSettings>(DEFAULT_SETTINGS);
  const [showHypotheses, setShowHypotheses] = useState(false);

  const C = chartColors(theme);
  const years = useMemo(() => listFiscalYears(rows), [rows]);
  const defaultTarget = Math.max(currentFiscalYear(), years[0] ?? currentFiscalYear()) + 1;
  const [target, setTarget] = useState<number>(defaultTarget);

  const result = useMemo(
    () => buildBudget(rows, metric, target, scenario, settings),
    [rows, metric, target, scenario, settings],
  );

  // Comparatif des trois scénarios sur le total.
  const scenarioTotals = useMemo(
    () => SCENARIOS.map((s) => ({
      scenario: s,
      label: SCENARIO_LABELS[s],
      total: buildBudget(rows, metric, target, s, settings).totalBudget,
    })),
    [rows, metric, target, settings],
  );

  const monthly = result.monthly.map((m) => ({ label: MONTH_SHORT[m.index], current: m.value }));
  const growth = result.totalBase === 0 ? null : ((result.totalBudget - result.totalBase) / result.totalBase) * 100;

  const setMarket = (u: Universe, s: Scenario, v: number) =>
    setSettings((prev) => ({ ...prev, market: { ...prev.market, [u]: { ...prev.market[u], [s]: v } } }));

  const exportCsv = () => {
    downloadCsv(
      `budget_${fiscalLabel(result.targetYear).replace('/', '-')}_${scenario}`,
      ['Famille', 'Univers', `Base ${fiscalLabel(result.baseYear)}`, 'Tendance %', 'Marche %', 'Retenu %', 'Budget', 'Ecart'],
      result.lines.map((l) => [
        l.family, UNIVERSE_LABELS[l.universe], l.base, l.trend, l.market, l.applied, l.budget, l.delta,
      ]),
    );
  };

  return (
    <>
      <div className="card hero">
        <div className="row spread" style={{ marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 16 }}>Budget {fiscalLabel(result.targetYear)}</h2>
            <p className="card-sub" style={{ margin: 0 }}>
              Base : exercice {fiscalLabel(result.baseYear)}
              {result.annualized ? ' (incomplet, annualisé selon la saisonnalité observée)' : ''} ·{' '}
              {metric === 'ordre' ? "prise d'ordre" : 'sortie'}
            </p>
          </div>
          <div className="row">
            <div className="field">
              <label>Indicateur</label>
              <div className="segmented">
                <button className={metric === 'ordre' ? 'active' : ''} onClick={() => setMetric('ordre')}>Prise d'ordre</button>
                <button className={metric === 'sortie' ? 'active' : ''} onClick={() => setMetric('sortie')}>Sortie</button>
              </div>
            </div>
            <div className="field">
              <label>Exercice budgété</label>
              <select value={target} onChange={(e) => setTarget(Number(e.target.value))}>
                {[defaultTarget - 1, defaultTarget, defaultTarget + 1].map((y) => (
                  <option key={y} value={y}>{fiscalLabel(y)}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Scénario</label>
              <div className="segmented">
                {SCENARIOS.map((s) => (
                  <button key={s} className={scenario === s ? 'active' : ''} onClick={() => setScenario(s)}>
                    {SCENARIO_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid kpis" style={{ marginBottom: 0 }}>
          <div className="card">
            <div className="kpi-label">Budget {SCENARIO_LABELS[scenario].toLowerCase()}</div>
            <div className="kpi-value hero-figure">{fmtEur(result.totalBudget)}</div>
            <div className="kpi-foot">
              <span className={`pill ${trendClass(growth)}`}>{fmtPct(growth)}</span>
              <span className="faint">vs base {fiscalLabel(result.baseYear)}</span>
            </div>
          </div>
          <div className="card">
            <div className="kpi-label">Base de référence</div>
            <div className="kpi-value">{fmtEur(result.totalBase)}</div>
            <div className="kpi-foot"><span className="faint">{result.lines.length} familles retenues</span></div>
          </div>
          {scenarioTotals.filter((s) => s.scenario !== scenario).map((s) => (
            <div className="card" key={s.scenario}>
              <div className="kpi-label">Scénario {s.label.toLowerCase()}</div>
              <div className="kpi-value">{fmtEur(s.total)}</div>
              <div className="kpi-foot">
                <span className="faint">{fmtSignedEur(s.total - result.totalBudget)} vs scénario retenu</span>
              </div>
            </div>
          ))}
        </div>

        <p className="note">
          Méthode : tendance propre du magasin sur les derniers exercices (l'exercice récent pèse davantage,
          écrêtée à ±{settings.trendCap} %) pondérée à {Math.round(settings.storeWeight * 100)} %, complétée par
          l'hypothèse de marché de l'univers de la famille. Un exercice en cours est annualisé via la saisonnalité
          des exercices complets.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="row spread">
          <div>
            <h2>Hypothèses de marché</h2>
            <p className="card-sub" style={{ margin: 0 }}>Croissance annuelle retenue par univers, en %</p>
          </div>
          <button className="btn btn-sm" onClick={() => setShowHypotheses(!showHypotheses)}>
            {showHypotheses ? 'Masquer' : 'Ajuster'}
          </button>
        </div>

        {showHypotheses && (
          <>
            <div className="table-wrap" style={{ marginTop: 16 }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ cursor: 'default' }}>Univers</th>
                    {SCENARIOS.map((s) => <th key={s} style={{ cursor: 'default' }}>{SCENARIO_LABELS[s]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {UNIVERSES.map((u) => (
                    <tr key={u} style={{ cursor: 'default' }}>
                      <td>{UNIVERSE_LABELS[u]}</td>
                      {SCENARIOS.map((s) => (
                        <td key={s}>
                          <input
                            type="number" step="0.5" style={{ width: 90, textAlign: 'right' }}
                            value={settings.market[u][s]}
                            onChange={(e) => setMarket(u, s, Number(e.target.value))}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row" style={{ marginTop: 18 }}>
              <div className="field">
                <label>Poids de la tendance magasin ({Math.round(settings.storeWeight * 100)} %)</label>
                <input
                  type="range" min={0} max={100} step={5} value={settings.storeWeight * 100}
                  onChange={(e) => setSettings({ ...settings, storeWeight: Number(e.target.value) / 100 })}
                  style={{ width: 240 }}
                />
              </div>
              <div className="field">
                <label>Écrêtage de la tendance (± %)</label>
                <input
                  type="number" min={0} max={100} step={1} value={settings.trendCap}
                  onChange={(e) => setSettings({ ...settings, trendCap: Number(e.target.value) })}
                  style={{ width: 110 }}
                />
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSettings(DEFAULT_SETTINGS)}>
                Rétablir les valeurs par défaut
              </button>
            </div>
            <p className="note">
              Valeurs par défaut : ordres de grandeur prudents du marché français (meuble quasi stable, électroménager
              légèrement porteur, image et son en repli). À réviser chaque année avec les publications de branche.
            </p>
          </>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Répartition mensuelle du budget</h2>
        <p className="card-sub">Saisonnalité constatée sur les exercices complets, appliquée au budget total</p>
        <ResponsiveContainer width="100%" height={262}>
          <BarChart data={monthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={C.grid} vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.axis }} />
            <YAxis tickFormatter={fmtCompact} tickLine={false} axisLine={false} width={54} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: C.cursor }} />
            <Bar dataKey="current" name={`Budget ${fiscalLabel(result.targetYear)}`} fill={C.budget}
              radius={[4, 4, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="row spread" style={{ marginBottom: 16 }}>
          <div>
            <h2>Budget par famille</h2>
            <p className="card-sub" style={{ margin: 0 }}>Scénario {SCENARIO_LABELS[scenario].toLowerCase()}</p>
          </div>
          <button className="btn btn-sm" onClick={exportCsv}>Exporter CSV</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ cursor: 'default' }}>Famille</th>
                <th style={{ cursor: 'default' }}>Univers</th>
                <th style={{ cursor: 'default' }}>Base {fiscalLabel(result.baseYear)}</th>
                <th style={{ cursor: 'default' }}>Tendance</th>
                <th style={{ cursor: 'default' }}>Marché</th>
                <th style={{ cursor: 'default' }}>Retenu</th>
                <th style={{ cursor: 'default' }}>Budget</th>
                <th style={{ cursor: 'default' }}>Écart</th>
              </tr>
            </thead>
            <tbody>
              {result.lines.map((l) => (
                <tr key={l.family} style={{ cursor: 'default' }}>
                  <td>{l.family}</td>
                  <td className="faint small">{UNIVERSE_LABELS[l.universe]}</td>
                  <td>{fmtEur(l.base)}</td>
                  <td className={`txt ${trendClass(l.trend)}`}>{fmtPct(l.trend)}</td>
                  <td className="muted">{fmtPct(l.market)}</td>
                  <td className={`txt ${trendClass(l.applied)}`}>{fmtPct(l.applied)}</td>
                  <td>{fmtEur(l.budget)}</td>
                  <td className={`txt ${trendClass(l.delta)}`}>{fmtSignedEur(l.delta)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td />
                <td>{fmtEur(result.totalBase)}</td>
                <td /><td />
                <td className={`txt ${trendClass(growth)}`}>{fmtPct(growth)}</td>
                <td>{fmtEur(result.totalBudget)}</td>
                <td className={`txt ${trendClass(result.totalBudget - result.totalBase)}`}>
                  {fmtSignedEur(result.totalBudget - result.totalBase)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
