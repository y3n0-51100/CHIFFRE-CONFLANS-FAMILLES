import { useMemo, useState } from 'react';
import { useMonth } from '../lib/useMonth.ts';
import { buildBrief, briefToText, lastWeekRange } from '../lib/brief.ts';
import { buildIndex, commonMonths, familyLines, filledMonths } from '../lib/analytics.ts';
import { MONTH_NAMES, dateStr, type DayRow } from '../lib/suivi.ts';
import { fiscalLabel } from '../lib/fiscal.ts';
import type { Session } from '../lib/session.ts';
import type { FiscalYear, Metric, Row } from '../lib/types.ts';

/**
 * Le point du lundi matin, écrit tout seul à partir des chiffres saisis.
 * À lire en réunion, à copier dans un mail ou à imprimer.
 */
export default function BriefPanel({
  session, rows, fyCurrent, fyCompare, metric,
}: {
  session: Session; rows: Row[] | null;
  fyCurrent: FiscalYear; fyCompare: FiscalYear; metric: Metric;
}) {
  const [copied, setCopied] = useState(false);
  const today = new Date();
  const range = useMemo(() => lastWeekRange(today), []);

  // La semaine révolue peut chevaucher deux mois : on charge les deux.
  const cur = useMonth(range.to.getFullYear(), range.to.getMonth() + 1, session);
  const prev = useMonth(range.from.getFullYear(), range.from.getMonth() + 1, session);
  const mois = useMonth(today.getFullYear(), today.getMonth() + 1, session);

  const week = useMemo(() => {
    const keys = new Set<string>();
    for (let d = new Date(range.from); d <= range.to; d.setDate(d.getDate() + 1)) keys.add(dateStr(d));
    const all = [...prev.rows, ...cur.rows].filter((r): r is DayRow => r.type === 'day');
    const seen = new Set<string>();
    return all
      .filter((r) => keys.has(r.key) && r.realCA !== null && !seen.has(r.key) && seen.add(r.key))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, [cur.rows, prev.rows, range]);

  const families = useMemo(() => {
    if (!rows) return [];
    const idx = buildIndex(rows, metric);
    const scope = commonMonths(filledMonths(rows, fyCurrent), filledMonths(rows, fyCompare));
    return familyLines(idx, fyCurrent, fyCompare, scope);
  }, [rows, metric, fyCurrent, fyCompare]);

  const brief = useMemo(
    () => buildBrief(
      week, range, mois.totals, mois.landing, mois.objCA, mois.objMarge, families,
      `${MONTH_NAMES[today.getMonth()].toLowerCase()} ${today.getFullYear()}`,
      session.name,
    ),
    [week, range, mois.totals, mois.landing, mois.objCA, mois.objMarge, families, session.name],
  );

  const copy = () => {
    navigator.clipboard?.writeText(briefToText(brief)).then(
      () => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); },
      () => setCopied(false),
    );
  };

  return (
    <>
      <div className="row spread exp-bar no-print">
        <b>Point hebdomadaire</b>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-sm" onClick={copy}>{copied ? 'Copié' : 'Copier le texte'}</button>
          <button className="btn btn-sm" onClick={() => window.print()}>Imprimer / PDF</button>
        </div>
      </div>

      <div className="card brief">
        <h1>{brief.title}</h1>
        <p className="card-sub">
          {brief.subtitle} · Comparaison familles : exercice {fiscalLabel(fyCurrent)} vs {fiscalLabel(fyCompare)},
          en {metric === 'ordre' ? 'prise d\'ordre' : 'sortie'}, sur les mois communs.
        </p>
        {brief.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <ul>{s.lines.map((l, i) => <li key={i}>{l}</li>)}</ul>
          </section>
        ))}
        <p className="note">
          Texte produit à partir des chiffres saisis dans l'outil. Rien n'est inventé : une semaine
          non saisie donne un brief vide.
        </p>
      </div>
    </>
  );
}
