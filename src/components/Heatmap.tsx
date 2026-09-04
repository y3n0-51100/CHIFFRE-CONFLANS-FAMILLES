import { useMemo } from 'react';
import { MONTH_SHORT } from '../lib/fiscal.ts';
import { fmtEur } from '../lib/format.ts';
import type { Index } from '../lib/analytics.ts';

/**
 * Carte de chaleur famille × mois : où se fait le chiffre dans l'année.
 * Encodage séquentiel une seule teinte, du plus clair (peu) au plus foncé (beaucoup).
 */
export default function Heatmap({
  idx, fy, families, onPick, selected,
}: {
  idx: Index;
  fy: number;
  families: string[];
  onPick: (f: string) => void;
  selected: string | null;
}) {
  const data = useMemo(() => {
    const byFamily = idx.get(fy);
    const rows = families
      .map((family) => {
        const months = byFamily?.get(family) ?? Array<number>(12).fill(0);
        // Chaque ligne est lue sur son propre maximum : c'est la saisonnalité de LA famille
        // qui doit ressortir, pas son poids face aux autres (le tableau s'en charge).
        return { family, months, max: Math.max(...months, 0), sum: months.reduce((a, b) => a + b, 0) };
      })
      .filter((r) => r.sum > 0);
    return { rows };
  }, [idx, fy, families]);

  // 6 paliers d'une seule teinte, du plus clair (mois faible) au plus foncé (meilleur mois).
  const step = (v: number, max: number): string => {
    if (v <= 0 || max <= 0) return 'var(--heat-0)';
    const r = v / max;
    if (r < 0.15) return 'var(--heat-1)';
    if (r < 0.35) return 'var(--heat-2)';
    if (r < 0.55) return 'var(--heat-3)';
    if (r < 0.75) return 'var(--heat-4)';
    if (r < 0.92) return 'var(--heat-5)';
    return 'var(--heat-6)';
  };

  if (data.rows.length === 0) return <p className="muted">Aucune donnée sur cet exercice.</p>;

  return (
    <>
      <div className="table-wrap">
        <table className="heat">
          <thead>
            <tr>
              <th style={{ width: 190 }} />
              {MONTH_SHORT.map((m) => <th key={m}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.family}>
                <th
                  onClick={() => onPick(r.family)}
                  style={{ cursor: 'pointer', color: r.family === selected ? 'var(--accent-ink)' : undefined }}
                >
                  {r.family}
                </th>
                {r.months.map((v, i) => (
                  <td key={i}>
                    <span
                      className="heat-cell"
                      style={{ background: step(v, r.max) }}
                      title={
                        `${r.family} · ${MONTH_SHORT[i]} : ${fmtEur(v)}` +
                        (r.max > 0 ? ` (${Math.round((v / r.max) * 100)} % de son meilleur mois)` : '')
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row spread" style={{ marginTop: 12 }}>
        <span className="faint small">
          Chaque ligne est comparée à son propre meilleur mois · survoler pour le montant, cliquer un libellé pour filtrer
        </span>
        <div className="heat-legend">
          <span>mois creux</span>
          {['var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)', 'var(--heat-4)', 'var(--heat-5)', 'var(--heat-6)'].map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
          <span>meilleur mois</span>
        </div>
      </div>
    </>
  );
}
