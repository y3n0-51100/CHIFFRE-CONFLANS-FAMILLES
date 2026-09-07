import { useMemo, useState } from 'react';
import { useMonth } from '../lib/useMonth.ts';
import {
  DAY_NAMES, MONTH_NAMES, computeFreq, type DayRow, type WeekRow,
} from '../lib/suivi.ts';
import { monthAlerts } from '../lib/alerts.ts';
import { fmtEur, fmtNum, fmtPct, fmtSignedEur } from '../lib/format.ts';
import { syncLabel, syncTone } from '../lib/firebase.ts';
import { canEdit, type Session } from '../lib/session.ts';

const num = (v: string): number | null => {
  const t = v.trim().replace(',', '.');
  if (t === '') return null;
  const n = Number.parseFloat(t);
  return Number.isFinite(n) ? n : null;
};

const ecartClass = (v: number | null): string => (v === null ? 'neutral' : v >= 0 ? 'up' : 'down');
const pct1 = (v: number) => `${v.toFixed(1).replace('.', ',')} %`;

type Vue = 'ventes' | 'frequentation';

export default function SuiviPanel({ session }: { session: Session }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [vue, setVue] = useState<Vue>('ventes');
  const editable = canEdit(session);

  const { data, sync, save, setDay, monthKey, rows, totals, objCA, objMarge, landing } = useMonth(year, month, session);

  const shift = (delta: number) => {
    const m = month + delta;
    if (m > 12) { setMonth(1); setYear(year + 1); }
    else if (m < 1) { setMonth(12); setYear(year - 1); }
    else setMonth(m);
  };

  const alerts = useMemo(
    () => monthAlerts(rows, totals, landing, objCA, objMarge, today),
    [rows, totals, landing, objCA, objMarge],
  );

  const ecartCA = totals.cumCA > 0 && totals.cumObjCA > 0 ? totals.cumCA - totals.cumObjCA : null;
  const ecartMarge = totals.cumMarge > 0 && totals.cumObjMarge > 0 ? totals.cumMarge - totals.cumObjMarge : null;
  const evolCA = totals.n1CAFilled > 0 && totals.cumCA > 0
    ? ((totals.cumCA - totals.n1CAFilled) / totals.n1CAFilled) * 100 : null;
  const tauxMarge = totals.cumCA > 0 && totals.cumMarge > 0 ? (totals.cumMarge / totals.cumCA) * 100 : null;
  const tauxObjectif = objCA > 0 && objMarge > 0 ? (objMarge / objCA) * 100 : null;
  const partCA = objCA > 0 ? (totals.cumCA / objCA) * 100 : null;
  const partMarge = objMarge > 0 ? (totals.cumMarge / objMarge) * 100 : null;
  const freq = computeFreq(totals.cumCA, totals.cumTickets, totals.cumVisiteurs, totals.n1CAFilled, totals.n1FreqFilled);

  return (
    <>
      <div className="row spread exp-bar no-print">
        <div className="month-nav">
          <button className="icon-btn" onClick={() => shift(-1)} aria-label="Mois précédent">←</button>
          <b>{MONTH_NAMES[month - 1]} {year}</b>
          <button className="icon-btn" onClick={() => shift(1)} aria-label="Mois suivant">→</button>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-sm" onClick={() => window.print()}>Imprimer / PDF</button>
          <span className={`badge ${syncTone(sync)}`}>{syncLabel(sync)}</span>
        </div>
      </div>

      <h1 className="print-only">Suivi CA / Marge — {MONTH_NAMES[month - 1]} {year}</h1>

      {alerts.length > 0 && (
        <div className="insights" style={{ marginBottom: 16 }}>
          {alerts.map((a, i) => (
            <div className="insight" key={i}>
              <span className="dot" style={{ background: `var(--${a.tone === 'up' ? 'up' : a.tone === 'warn' ? 'warn' : 'down'})` }} />
              <span><b>{a.title}</b> — {a.detail}</span>
            </div>
          ))}
        </div>
      )}

      <div className="card exp-obj no-print">
        <div className="field">
          <label htmlFor="objCA">Objectif CA du mois</label>
          <input id="objCA" key={`objca-${monthKey}`} type="number" step="100" placeholder="0" disabled={!editable}
            defaultValue={objCA || ''} onBlur={(e) => save({ ...data, objCA: num(e.target.value) ?? 0 })} />
        </div>
        <div className="field">
          <label htmlFor="objMarge">Objectif marge du mois</label>
          <input id="objMarge" key={`objmg-${monthKey}`} type="number" step="100" placeholder="0" disabled={!editable}
            defaultValue={objMarge || ''} onBlur={(e) => save({ ...data, objMarge: num(e.target.value) ?? 0 })} />
        </div>
        <p className="faint small">
          {tauxObjectif !== null
            ? `Taux de marge visé : ${pct1(tauxObjectif)}`
            : 'Renseigner les deux objectifs pour répartir le mois jour par jour.'}
        </p>
      </div>

      <div className="grid cols-2" style={{ marginBottom: 16 }}>
        <ProgressCard title="Chiffre d'affaires" done={totals.cumCA} goal={objCA} tone="ca" />
        <ProgressCard title="Marge" done={totals.cumMarge} goal={objMarge} tone="mg" />
      </div>

      <div className="card hero" style={{ marginBottom: 16 }}>
        <div className="row spread">
          <div>
            <div className="kpi-label">Atterrissage projeté du mois</div>
            <div className={`kpi-value hero-figure txt ${landing.gapCA === null ? '' : landing.gapCA >= 0 ? 'up' : 'down'}`}>
              {landing.reliable ? fmtEur(landing.ca) : '—'}
            </div>
            <div className="kpi-foot">
              {landing.reliable ? (
                <>
                  <span className={`pill ${(landing.gapCA ?? 0) >= 0 ? 'up' : 'down'}`}>{fmtSignedEur(landing.gapCA)}</span>
                  <span>vs objectif de {fmtEur(objCA)}</span>
                  <span className="faint">· {(landing.coverage * 100).toFixed(0)} % du mois écoulé, {totals.filledDays} jours saisis</span>
                </>
              ) : (
                <span>Il faut au moins 15 % du mois saisi pour projeter une fin de mois qui veuille dire quelque chose.</span>
              )}
            </div>
          </div>
          <div className="landing-right">
            <div className="kpi-label">Pour tenir l'objectif</div>
            <div className="kpi-value">{landing.perDay !== null && landing.perDay > 0 ? fmtEur(landing.perDay) : '—'}</div>
            <div className="kpi-foot">
              {landing.restCA === null
                ? 'objectif du mois non renseigné'
                : landing.restCA > 0
                  ? `par jour sur les ${landing.daysLeft} jours restants`
                  : 'objectif du mois déjà atteint'}
            </div>
          </div>
        </div>
        <p className="note">
          La projection applique la saisonnalité N-1 des jours restants au rythme constaté depuis le 1er :
          elle ne se contente pas d'extrapoler une moyenne, elle tient compte du poids réel des jours à venir.
        </p>
      </div>

      <div className="grid kpis">
        <div className="card">
          <div className="kpi-label">CA réalisé</div>
          <div className="kpi-value">{totals.cumCA > 0 ? fmtEur(totals.cumCA) : '—'}</div>
          <div className="kpi-foot">cumul du mois</div>
        </div>
        <div className="card">
          <div className="kpi-label">Écart vs objectif CA</div>
          <div className={`kpi-value txt ${ecartClass(ecartCA)}`}>{fmtSignedEur(ecartCA)}</div>
          <div className="kpi-foot">{partCA !== null && totals.cumCA > 0 ? `${pct1(partCA)} de l'objectif` : '—'}</div>
        </div>
        <div className="card">
          <div className="kpi-label">CA N-1 (jours saisis)</div>
          <div className="kpi-value">{totals.n1CAFilled > 0 ? fmtEur(totals.n1CAFilled) : '—'}</div>
          <div className="kpi-foot">
            {evolCA !== null ? <span className={`pill ${evolCA >= 0 ? 'up' : 'down'}`}>{fmtPct(evolCA)}</span> : '—'}
            <span className="faint">périmètre comparable</span>
          </div>
        </div>
        <div className="card">
          <div className="kpi-label">Marge réalisée</div>
          <div className="kpi-value">{totals.cumMarge > 0 ? fmtEur(totals.cumMarge) : '—'}</div>
          <div className="kpi-foot">{tauxMarge !== null ? `Taux : ${pct1(tauxMarge)}` : '—'}</div>
        </div>
        <div className="card">
          <div className="kpi-label">Écart vs objectif marge</div>
          <div className={`kpi-value txt ${ecartClass(ecartMarge)}`}>{fmtSignedEur(ecartMarge)}</div>
          <div className="kpi-foot">{partMarge !== null && totals.cumMarge > 0 ? `${pct1(partMarge)} de l'objectif` : '—'}</div>
        </div>
        <div className="card">
          <div className="kpi-label">Jours saisis</div>
          <div className="kpi-value">{totals.filledDays}</div>
          <div className="kpi-foot">{totals.totalDays - totals.filledDays} jours restants</div>
        </div>
      </div>

      {(freq.visiteurs !== null || freq.visiteursN1 !== null) && (
        <div className="card">
          <h2>Fréquentation et transformation</h2>
          <p className="card-sub">
            Moins de monde, ou moins bien vendu ? Le N-1 vient du compteur d'entrées porte de l'export d'origine ;
            les visiteurs et tickets du mois se saisissent dans le tableau ci-dessous ou sur l'écran Aujourd'hui.
          </p>
          <div className="grid kpis" style={{ marginBottom: 0 }}>
            <div className="card">
              <div className="kpi-label">Visiteurs</div>
              <div className="kpi-value">{freq.visiteurs !== null ? fmtNum(freq.visiteurs) : '—'}</div>
              <div className="kpi-foot">
                {freq.indice !== null
                  ? <><span className={`pill ${freq.indice >= 0 ? 'up' : 'down'}`}>{fmtPct(freq.indice)}</span> vs {fmtNum(freq.visiteursN1)} en N-1</>
                  : freq.visiteursN1 !== null ? `${fmtNum(freq.visiteursN1)} en N-1` : '—'}
              </div>
            </div>
            <div className="card">
              <div className="kpi-label">Taux de transformation</div>
              <div className="kpi-value">{freq.transfo !== null ? pct1(freq.transfo) : '—'}</div>
              <div className="kpi-foot">{freq.tickets !== null ? `${fmtNum(freq.tickets)} tickets` : 'tickets non saisis'}</div>
            </div>
            <div className="card">
              <div className="kpi-label">Panier moyen</div>
              <div className="kpi-value">{freq.panier !== null ? fmtEur(freq.panier) : '—'}</div>
              <div className="kpi-foot">CA / nombre de tickets</div>
            </div>
            <div className="card">
              <div className="kpi-label">CA par visiteur</div>
              <div className="kpi-value">{freq.caParVisiteur !== null ? fmtEur(freq.caParVisiteur) : '—'}</div>
              <div className="kpi-foot">
                {freq.caParVisiteurN1 !== null ? `${fmtEur(freq.caParVisiteurN1)} en N-1` : '—'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="row spread">
          <div>
            <h2>Détail quotidien</h2>
            <p className="card-sub">
              L'objectif du jour est le poids de ce même jour l'an dernier (décalage de 52 semaines) appliqué à l'objectif du mois.
            </p>
          </div>
          <div className="segmented no-print">
            <button className={vue === 'ventes' ? 'active' : ''} onClick={() => setVue('ventes')}>Ventes</button>
            <button className={vue === 'frequentation' ? 'active' : ''} onClick={() => setVue('frequentation')}>Fréquentation</button>
          </div>
        </div>
        <div className="table-wrap">
          <table className="suivi-table">
            <thead>
              {vue === 'ventes' ? (
                <tr>
                  <th>Jour</th><th>Date</th><th>CA N-1</th><th>% mensuel</th>
                  <th>Obj. CA jour</th><th>CA réalisé</th><th>Écart CA</th>
                  <th>Obj. marge jour</th><th>Marge réalisée</th><th>Écart marge</th><th>Taux</th>
                </tr>
              ) : (
                <tr>
                  <th>Jour</th><th>Date</th><th>Visiteurs</th><th>Visiteurs N-1</th><th>Indice</th>
                  <th>Tickets</th><th>Transfo.</th><th>Panier</th><th>CA / visiteur</th><th>N-1</th>
                </tr>
              )}
            </thead>
            <tbody>
              {rows.map((row) => row.type === 'day'
                ? (vue === 'ventes'
                    ? <DayLine key={row.key} row={row} month={month} year={year} monthKey={monthKey}
                        objCA={objCA} objMarge={objMarge} editable={editable} onChange={setDay} />
                    : <FreqLine key={row.key} row={row} month={month} year={year} monthKey={monthKey}
                        editable={editable} onChange={setDay} />)
                : (vue === 'ventes' ? <WeekLine key={`w${row.num}`} row={row} /> : null))}
            </tbody>
            {vue === 'ventes' && (
              <tfoot>
                <tr className="total-row">
                  <td colSpan={2}>Total du mois</td>
                  <td>{totals.n1CA > 0 ? fmtNum(totals.n1CA) : '—'}</td>
                  <td>100 %</td>
                  <td>{objCA > 0 ? fmtNum(objCA) : '—'}</td>
                  <td>{totals.cumCA > 0 ? fmtNum(totals.cumCA) : '—'}</td>
                  <td className={`txt ${ecartClass(ecartCA)}`}>{ecartCA !== null ? fmtNum(ecartCA) : '—'}</td>
                  <td>{objMarge > 0 ? fmtNum(objMarge) : '—'}</td>
                  <td>{totals.cumMarge > 0 ? fmtNum(totals.cumMarge) : '—'}</td>
                  <td className={`txt ${ecartClass(ecartMarge)}`}>{ecartMarge !== null ? fmtNum(ecartMarge) : '—'}</td>
                  <td>{tauxMarge !== null ? pct1(tauxMarge) : '—'}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        {data.updatedBy && (
          <p className="note">
            Dernière modification par {data.updatedBy}
            {data.updatedAt ? ` le ${new Date(data.updatedAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}` : ''}.
          </p>
        )}
      </div>
    </>
  );
}

function ProgressCard({ title, done, goal, tone }: { title: string; done: number; goal: number; tone: 'ca' | 'mg' }) {
  const pct = goal > 0 && done > 0 ? (done / goal) * 100 : 0;
  const reste = goal - done;
  return (
    <div className="card">
      <div className="row spread">
        <div className="kpi-label" style={{ marginBottom: 0 }}>{title}</div>
        <b>{done > 0 ? fmtEur(done) : '—'} <span className="faint">/ {goal > 0 ? fmtEur(goal) : '—'}</span></b>
      </div>
      <div className="prog-track">
        <div className={`prog-fill ${tone}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <div className="row spread small faint">
        <span>{goal > 0 ? (reste > 0 ? `${fmtEur(reste)} restant` : 'Objectif atteint') : 'Objectif non renseigné'}</span>
        <span>{pct > 0 ? pct1(pct) : '0 %'}</span>
      </div>
    </div>
  );
}

type LineProps = {
  row: DayRow; month: number; year: number; monthKey: string; editable: boolean;
  onChange: (key: string, field: 'ca' | 'marge' | 'tickets' | 'visiteurs', value: number | null) => void;
};

const dateCell = (row: DayRow, month: number, year: number) =>
  `${String(row.day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

function DayLine({ row, month, year, monthKey, objCA, objMarge, editable, onChange }: LineProps & { objCA: number; objMarge: number }) {
  const ecCA = row.realCA !== null && row.objDayCA > 0 ? row.realCA - row.objDayCA : null;
  const ecMg = row.realMarge !== null && row.objDayMarge > 0 ? row.realMarge - row.objDayMarge : null;
  const taux = row.realCA !== null && row.realMarge !== null && row.realCA > 0
    ? (row.realMarge / row.realCA) * 100 : null;
  const weekend = row.dow === 0 || row.dow === 6;

  return (
    <tr className={weekend ? 'weekend' : ''}>
      <td className="faint">{DAY_NAMES[row.dow]}</td>
      <td>{dateCell(row, month, year)}</td>
      <td className="faint">{row.n1ca > 0 ? fmtNum(row.n1ca) : '—'}</td>
      <td className="faint">{row.weight > 0 ? `${(row.weight * 100).toFixed(2).replace('.', ',')} %` : '—'}</td>
      <td>{objCA > 0 ? fmtNum(row.objDayCA) : '—'}</td>
      <td className="cell-edit">
        <input key={`${monthKey}-${row.key}-ca`} type="number" step="0.01" placeholder="Saisir…" disabled={!editable}
          className={row.realCA !== null ? 'filled' : ''} defaultValue={row.realCA ?? ''}
          onBlur={(e) => onChange(row.key, 'ca', e.target.value.trim() === '' ? null : Number(e.target.value))} />
      </td>
      <td className={`txt ${ecartClass(ecCA)}`}>{ecCA !== null ? fmtNum(ecCA) : '—'}</td>
      <td>{objMarge > 0 ? fmtNum(row.objDayMarge) : '—'}</td>
      <td className="cell-edit">
        <input key={`${monthKey}-${row.key}-mg`} type="number" step="0.01" placeholder="Saisir…" disabled={!editable}
          className={row.realMarge !== null ? 'filled' : ''} defaultValue={row.realMarge ?? ''}
          onBlur={(e) => onChange(row.key, 'marge', e.target.value.trim() === '' ? null : Number(e.target.value))} />
      </td>
      <td className={`txt ${ecartClass(ecMg)}`}>{ecMg !== null ? fmtNum(ecMg) : '—'}</td>
      <td className="faint">{taux !== null ? pct1(taux) : '—'}</td>
    </tr>
  );
}

function FreqLine({ row, month, year, monthKey, editable, onChange }: LineProps) {
  const f = computeFreq(row.realCA ?? 0, row.tickets ?? 0, row.visiteurs ?? 0, row.n1ca, row.n1freq);
  const weekend = row.dow === 0 || row.dow === 6;
  return (
    <tr className={weekend ? 'weekend' : ''}>
      <td className="faint">{DAY_NAMES[row.dow]}</td>
      <td>{dateCell(row, month, year)}</td>
      <td className="cell-edit">
        <input key={`${monthKey}-${row.key}-vis`} type="number" step="1" placeholder="—" disabled={!editable}
          className={row.visiteurs !== null ? 'filled' : ''} defaultValue={row.visiteurs ?? ''}
          onBlur={(e) => onChange(row.key, 'visiteurs', e.target.value.trim() === '' ? null : Number(e.target.value))} />
      </td>
      <td className="faint">{row.n1freq > 0 ? fmtNum(row.n1freq) : '—'}</td>
      <td className={`txt ${f.indice === null ? 'neutral' : f.indice >= 0 ? 'up' : 'down'}`}>
        {f.indice !== null ? fmtPct(f.indice) : '—'}
      </td>
      <td className="cell-edit">
        <input key={`${monthKey}-${row.key}-tick`} type="number" step="1" placeholder="—" disabled={!editable}
          className={row.tickets !== null ? 'filled' : ''} defaultValue={row.tickets ?? ''}
          onBlur={(e) => onChange(row.key, 'tickets', e.target.value.trim() === '' ? null : Number(e.target.value))} />
      </td>
      <td>{f.transfo !== null ? pct1(f.transfo) : '—'}</td>
      <td>{f.panier !== null ? fmtNum(f.panier) : '—'}</td>
      <td>{f.caParVisiteur !== null ? fmtNum(f.caParVisiteur) : '—'}</td>
      <td className="faint">{f.caParVisiteurN1 !== null ? fmtNum(f.caParVisiteurN1) : '—'}</td>
    </tr>
  );
}

function WeekLine({ row }: { row: WeekRow }) {
  const has = row.ca > 0;
  const ecCA = has && row.objCA > 0 ? row.ca - row.objCA : null;
  const ecMg = row.marge > 0 && row.objMarge > 0 ? row.marge - row.objMarge : null;
  const tone = !has ? 'neutral' : row.ca >= row.objCA ? 'up' : 'down';
  const label = !has ? '—' : row.ca >= row.objCA ? 'En avance' : 'En retard';

  return (
    <tr className="week-row">
      <td colSpan={2}>Semaine {row.num} <span className={`pill ${tone}`}>{label}</span></td>
      <td /><td />
      <td>{row.objCA > 0 ? fmtNum(row.objCA) : '—'}</td>
      <td>{has ? fmtNum(row.ca) : '—'}</td>
      <td className={`txt ${ecartClass(ecCA)}`}>{ecCA !== null ? fmtNum(ecCA) : '—'}</td>
      <td>{row.objMarge > 0 ? fmtNum(row.objMarge) : '—'}</td>
      <td>{row.marge > 0 ? fmtNum(row.marge) : '—'}</td>
      <td className={`txt ${ecartClass(ecMg)}`}>{ecMg !== null ? fmtNum(ecMg) : '—'}</td>
      <td>{row.ca > 0 && row.marge > 0 ? pct1((row.marge / row.ca) * 100) : '—'}</td>
    </tr>
  );
}
