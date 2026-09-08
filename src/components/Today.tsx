import { useMemo, useState } from 'react';
import { useMonth } from '../lib/useMonth.ts';
import {
  DAY_NAMES, MONTH_NAMES, computeFreq, dateStr, findDay, lastFilledDays,
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

const dayLabel = (d: Date) =>
  `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()].toLowerCase()}`;

/**
 * Écran d'entrée, pensé pour le téléphone en surface de vente : où on en est
 * aujourd'hui, où finit le mois, et la saisie de la journée en quatre champs.
 */
export default function Today({ session }: { session: Session }) {
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const [picked, setPicked] = useState<Date>(now);
  const editable = canEdit(session);

  const { data, sync, setDay, rows, totals, objCA, objMarge, landing } = useMonth(
    picked.getFullYear(), picked.getMonth() + 1, session,
  );

  const key = dateStr(picked);
  const day = findDay(rows, key);
  const recents = useMemo(() => lastFilledDays(rows, 5), [rows]);
  const alerts = useMemo(
    () => monthAlerts(rows, totals, landing, objCA, objMarge, now),
    [rows, totals, landing, objCA, objMarge],
  );

  const freq = day
    ? computeFreq(day.realCA ?? 0, day.tickets ?? 0, day.visiteurs ?? 0, day.n1ca, day.n1freq)
    : null;
  const ecartJour = day && day.realCA !== null && day.objDayCA > 0 ? day.realCA - day.objDayCA : null;
  const evolJour = day && day.realCA !== null && day.n1ca > 0 ? ((day.realCA - day.n1ca) / day.n1ca) * 100 : null;
  const partObjectif = objCA > 0 ? (totals.cumCA / objCA) * 100 : null;

  const set = (field: 'ca' | 'marge' | 'tickets' | 'visiteurs') => (v: string) => setDay(key, field, num(v));

  return (
    <div className="today">
      <div className="row spread exp-bar">
        <div className="segmented">
          <button className={dateStr(picked) === dateStr(yesterday) ? 'active' : ''} onClick={() => setPicked(yesterday)}>
            Hier
          </button>
          <button className={dateStr(picked) === dateStr(now) ? 'active' : ''} onClick={() => setPicked(now)}>
            Aujourd'hui
          </button>
        </div>
        <span className={`badge ${syncTone(sync)}`}>{syncLabel(sync)}</span>
      </div>

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

      <div className="card hero today-hero">
        <div className="kpi-label">{dayLabel(picked)}</div>
        <div className="kpi-value hero-figure">{day?.realCA !== null && day ? fmtEur(day.realCA) : '—'}</div>
        <div className="kpi-foot">
          {day && day.objDayCA > 0 && <span>Objectif du jour {fmtEur(day.objDayCA)}</span>}
          {ecartJour !== null && (
            <span className={`pill ${ecartJour >= 0 ? 'up' : 'down'}`}>{fmtSignedEur(ecartJour)}</span>
          )}
          {evolJour !== null && <span className="faint">{fmtPct(evolJour)} vs N-1 ({fmtEur(day?.n1ca ?? 0)})</span>}
        </div>
      </div>

      <div className="card">
        <h2>Saisie de la journée</h2>
        <p className="card-sub">
          {editable
            ? "Le chiffre de la journée, relevé le soir ou le lendemain matin. Les deux premiers suffisent : les visiteurs et les tickets sont facultatifs et ne servent qu'à calculer la transformation et le panier moyen."
            : 'Consultation seule : la saisie est réservée à la direction et aux chefs de rayon.'}
        </p>
        <div className="today-inputs">
          <div className="field">
            <label htmlFor="t-ca">CA du jour (€)</label>
            <input id="t-ca" key={`${key}-ca`} type="number" step="0.01" inputMode="decimal" placeholder="0"
              defaultValue={day?.realCA ?? ''} disabled={!editable} onBlur={(e) => set('ca')(e.target.value)} />
            <span className="hint">chiffre d'affaires de la journée, TTC</span>
          </div>
          <div className="field">
            <label htmlFor="t-mg">Marge du jour (€)</label>
            <input id="t-mg" key={`${key}-mg`} type="number" step="0.01" inputMode="decimal" placeholder="0"
              defaultValue={day?.realMarge ?? ''} disabled={!editable} onBlur={(e) => set('marge')(e.target.value)} />
            <span className="hint">marge dégagée en euros, pas en %</span>
          </div>
          <div className="field">
            <label htmlFor="t-vis">Visiteurs (entrées)</label>
            <input id="t-vis" key={`${key}-vis`} type="number" step="1" inputMode="numeric" placeholder="—"
              defaultValue={day?.visiteurs ?? ''} disabled={!editable} onBlur={(e) => set('visiteurs')(e.target.value)} />
            <span className="hint">entrées porte · facultatif</span>
          </div>
          <div className="field">
            <label htmlFor="t-tick">Tickets</label>
            <input id="t-tick" key={`${key}-tick`} type="number" step="1" inputMode="numeric" placeholder="—"
              defaultValue={day?.tickets ?? ''} disabled={!editable} onBlur={(e) => set('tickets')(e.target.value)} />
            <span className="hint">nombre de ventes du jour · facultatif</span>
          </div>
        </div>
        {freq && (freq.transfo !== null || freq.panier !== null || freq.indice !== null) && (
          <div className="row today-freq">
            {freq.indice !== null && (
              <span>Fréquentation <b>{fmtPct(freq.indice)}</b> <span className="faint">vs N-1 ({freq.visiteursN1} visiteurs)</span></span>
            )}
            {freq.transfo !== null && <span>Transformation <b>{freq.transfo.toFixed(1).replace('.', ',')} %</b></span>}
            {freq.panier !== null && <span>Panier moyen <b>{fmtEur(freq.panier)}</b></span>}
            {freq.caParVisiteur !== null && (
              <span>CA / visiteur <b>{fmtEur(freq.caParVisiteur)}</b>
                {freq.caParVisiteurN1 !== null && <span className="faint"> vs {fmtEur(freq.caParVisiteurN1)} en N-1</span>}
              </span>
            )}
          </div>
        )}
        <p className="note">
          Enregistré au fil de la saisie. Hors réseau, tout est conservé sur l'appareil et repart
          vers la base dès que la connexion revient.
        </p>
        {data.updatedBy && (
          <p className="note">
            Dernière modification par {data.updatedBy}
            {data.updatedAt ? ` le ${new Date(data.updatedAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}` : ''}.
          </p>
        )}
      </div>

      <div className="grid kpis">
        <div className="card">
          <div className="kpi-label">Cumul {MONTH_NAMES[picked.getMonth()].toLowerCase()}</div>
          <div className="kpi-value">{fmtEur(totals.cumCA)}</div>
          <div className="kpi-foot">
            {partObjectif !== null ? `${partObjectif.toFixed(1).replace('.', ',')} % de l'objectif` : 'Objectif non renseigné'}
          </div>
        </div>
        <div className="card">
          <div className="kpi-label">Atterrissage projeté</div>
          <div className={`kpi-value txt ${landing.gapCA === null ? '' : landing.gapCA >= 0 ? 'up' : 'down'}`}>
            {landing.reliable ? fmtEur(landing.ca) : '—'}
          </div>
          <div className="kpi-foot">
            {landing.reliable
              ? <>{fmtSignedEur(landing.gapCA)} vs objectif <span className="faint">· {(landing.coverage * 100).toFixed(0)} % du mois écoulé</span></>
              : 'Pas encore assez de jours saisis'}
          </div>
        </div>
        <div className="card">
          <div className="kpi-label">Reste à faire</div>
          <div className="kpi-value">{landing.perDay !== null && landing.perDay > 0 ? fmtEur(landing.perDay) : '—'}</div>
          <div className="kpi-foot">
            {landing.restCA === null
              ? 'Objectif du mois non renseigné'
              : landing.restCA > 0
                ? `par jour sur ${landing.daysLeft} jours (${fmtEur(landing.restCA)} au total)`
                : 'Objectif du mois atteint'}
          </div>
        </div>
        <div className="card">
          <div className="kpi-label">Évolution vs N-1</div>
          <div className={`kpi-value txt ${totals.n1CAFilled > 0 && totals.cumCA >= totals.n1CAFilled ? 'up' : 'down'}`}>
            {totals.n1CAFilled > 0 ? fmtPct(((totals.cumCA - totals.n1CAFilled) / totals.n1CAFilled) * 100) : '—'}
          </div>
          <div className="kpi-foot">à périmètre de jours identique ({fmtEur(totals.n1CAFilled)} en N-1)</div>
        </div>
      </div>

      {recents.length > 0 && (
        <div className="card">
          <h2>Derniers jours saisis</h2>
          <div className="table-wrap">
            <table className="suivi-table">
              <thead>
                <tr><th>Jour</th><th>CA</th><th>Objectif</th><th>Écart</th><th>N-1</th><th>Marge</th><th>Taux</th></tr>
              </thead>
              <tbody>
                {recents.map((d) => {
                  const ecart = d.objDayCA > 0 ? (d.realCA ?? 0) - d.objDayCA : null;
                  const taux = d.realCA && d.realMarge ? (d.realMarge / d.realCA) * 100 : null;
                  return (
                    <tr key={d.key}>
                      <td>{DAY_NAMES[d.dow]} {d.day}</td>
                      <td>{fmtNum(d.realCA)}</td>
                      <td className="faint">{d.objDayCA > 0 ? fmtNum(d.objDayCA) : '—'}</td>
                      <td className={`txt ${ecart === null ? 'neutral' : ecart >= 0 ? 'up' : 'down'}`}>
                        {ecart !== null ? fmtNum(ecart) : '—'}
                      </td>
                      <td className="faint">{d.n1ca > 0 ? fmtNum(d.n1ca) : '—'}</td>
                      <td>{d.realMarge !== null ? fmtNum(d.realMarge) : '—'}</td>
                      <td className="faint">{taux !== null ? `${taux.toFixed(1).replace('.', ',')} %` : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
