import { useEffect, useMemo, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  COLLECTION_STOCK, DOC_MAGASIN, db, syncLabel, syncTone, type SyncState,
} from '../lib/firebase.ts';
import { buildIndex, filledMonths, listFamilies, total } from '../lib/analytics.ts';
import { coverageDays, excessStock, stockLines } from '../lib/stock.ts';
import { fiscalLabel } from '../lib/fiscal.ts';
import { canEdit, stamp, type Session } from '../lib/session.ts';
import { fmtEur, fmtNum } from '../lib/format.ts';
import type { FiscalYear, Row } from '../lib/types.ts';

type StockDoc = {
  familles: Record<string, number>;
  tauxMarge: number;
  cible: number;
  updatedBy?: string;
  updatedAt?: string;
};

const empty = (): StockDoc => ({ familles: {}, tauxMarge: 30, cible: 75 });

const num = (v: string): number | null => {
  const t = v.trim().replace(',', '.');
  if (t === '') return null;
  const n = Number.parseFloat(t);
  return Number.isFinite(n) ? n : null;
};

/**
 * Ce que le stock immobilise, famille par famille. Le CA sortie vient de l'import
 * mensuel ; le stock se saisit ici, le jour de l'inventaire ou du relevé.
 */
export default function StockPanel({
  session, rows, fyCurrent,
}: { session: Session; rows: Row[]; fyCurrent: FiscalYear }) {
  const [state, setState] = useState<StockDoc>(empty);
  const [sync, setSync] = useState<SyncState>('loading');
  const [filtre, setFiltre] = useState('');
  const editable = canEdit(session);

  useEffect(() => {
    let alive = true;
    getDoc(doc(db, COLLECTION_STOCK, DOC_MAGASIN))
      .then((snap) => {
        if (!alive) return;
        if (snap.exists()) setState({ ...empty(), ...(snap.data() as StockDoc) });
        setSync(snap.metadata.fromCache && !navigator.onLine ? 'offline' : 'ok');
      })
      .catch(() => { if (alive) setSync('error'); });
    return () => { alive = false; };
  }, []);

  const save = (next: StockDoc) => {
    setState(next);
    setSync('saving');
    setDoc(doc(db, COLLECTION_STOCK, DOC_MAGASIN), { ...next, ...stamp(session) })
      .then(() => setSync(navigator.onLine ? 'ok' : 'offline'))
      .catch(() => setSync(navigator.onLine ? 'error' : 'offline'));
    if (!navigator.onLine) setSync('offline');
  };

  // Le stock se compare aux ventes en sortie (HT) : c'est ce qui le fait baisser.
  const idx = useMemo(() => buildIndex(rows, 'sortie'), [rows]);
  const months = useMemo(() => filledMonths(rows, fyCurrent), [rows, fyCurrent]);
  const families = useMemo(() => listFamilies(rows), [rows]);

  const lines = useMemo(
    () => stockLines(state.familles, idx, fyCurrent, months, state.tauxMarge, families),
    [state.familles, state.tauxMarge, idx, fyCurrent, months, families],
  );

  const stockTotal = lines.reduce((s, l) => s + l.stock, 0);
  const caTotal = total(idx, fyCurrent, null, months);
  const jours = Math.max(months.size, 1) * 30.4;
  const couvertureGlobale = stockTotal > 0 ? coverageDays(stockTotal, caTotal, jours, state.tauxMarge) : null;
  const dormant = excessStock(lines, state.cible);
  const saisies = lines.filter((l) => l.stock > 0).length;

  const visibles = lines.filter((l) => l.family.toLowerCase().includes(filtre.toLowerCase()));

  return (
    <>
      <div className="row spread exp-bar no-print">
        <b>Stock — exercice {fiscalLabel(fyCurrent)} ({months.size} mois de ventes)</b>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-sm" onClick={() => window.print()}>Imprimer / PDF</button>
          <span className={`badge ${syncTone(sync)}`}>{syncLabel(sync)}</span>
        </div>
      </div>

      <div className="grid kpis">
        <div className="card">
          <div className="kpi-label">Stock saisi</div>
          <div className="kpi-value">{stockTotal > 0 ? fmtEur(stockTotal) : '—'}</div>
          <div className="kpi-foot">{saisies} famille{saisies > 1 ? 's' : ''} sur {families.length} renseignée{saisies > 1 ? 's' : ''}</div>
        </div>
        <div className="card">
          <div className="kpi-label">Couverture globale</div>
          <div className={`kpi-value txt ${couvertureGlobale === null ? '' : couvertureGlobale > 120 ? 'down' : couvertureGlobale > 75 ? 'neutral' : 'up'}`}>
            {couvertureGlobale !== null ? `${Math.round(couvertureGlobale)} j` : '—'}
          </div>
          <div className="kpi-foot">
            {couvertureGlobale !== null ? `${(365 / couvertureGlobale).toFixed(1).replace('.', ',')} rotations par an` : 'stock non renseigné'}
          </div>
        </div>
        <div className="card">
          <div className="kpi-label">Cash immobilisé</div>
          <div className={`kpi-value txt ${dormant > 0 ? 'down' : ''}`}>{dormant > 0 ? fmtEur(dormant) : '—'}</div>
          <div className="kpi-foot">au-delà de {state.cible} jours de couverture</div>
        </div>
        <div className="card">
          <div className="kpi-label">Ventes de la période</div>
          <div className="kpi-value">{fmtEur(caTotal)}</div>
          <div className="kpi-foot">CA sortie HT, {months.size} mois</div>
        </div>
      </div>

      <div className="card exp-obj no-print">
        <div className="field">
          <label htmlFor="tx">Taux de marge moyen (%)</label>
          <input id="tx" type="number" step="0.5" defaultValue={state.tauxMarge} disabled={!editable}
            onBlur={(e) => save({ ...state, tauxMarge: num(e.target.value) ?? 30 })} />
        </div>
        <div className="field">
          <label htmlFor="cible">Couverture cible (jours)</label>
          <input id="cible" type="number" step="5" defaultValue={state.cible} disabled={!editable}
            onBlur={(e) => save({ ...state, cible: num(e.target.value) ?? 75 })} />
        </div>
        <div className="field">
          <label htmlFor="f">Filtrer une famille</label>
          <input id="f" type="text" placeholder="Nom de famille" value={filtre} onChange={(e) => setFiltre(e.target.value)} />
        </div>
        <p className="faint small">
          Le stock est valorisé au prix d'achat, le CA au prix de vente : le taux de marge sert à ramener
          les ventes à leur coût d'achat avant de calculer la couverture.
        </p>
      </div>

      <div className="card">
        <h2>Rotation par famille</h2>
        <p className="card-sub">
          Couverture = nombre de jours de vente que le stock actuel représente. Au-delà de {state.cible} jours,
          la part excédentaire est de la trésorerie qui dort.
        </p>
        <div className="table-wrap">
          <table className="suivi-table">
            <thead>
              <tr>
                <th>Famille</th><th>Stock (€)</th><th>CA sortie</th><th>Coût d'achat</th>
                <th>Couverture</th><th>Rotations / an</th><th>Dont excédentaire</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((l) => {
                const exces = l.couverture !== null && l.couverture > state.cible
                  ? l.stock * (1 - state.cible / l.couverture) : 0;
                return (
                  <tr key={l.family}>
                    <td>{l.family}</td>
                    <td className="cell-edit">
                      <input type="number" step="100" placeholder="—" disabled={!editable}
                        className={l.stock > 0 ? 'filled' : ''} defaultValue={l.stock || ''}
                        onBlur={(e) => {
                          const v = num(e.target.value);
                          const familles = { ...state.familles };
                          if (v === null || v === 0) delete familles[l.family];
                          else familles[l.family] = v;
                          save({ ...state, familles });
                        }} />
                    </td>
                    <td className="faint">{fmtNum(l.ca)}</td>
                    <td className="faint">{fmtNum(l.cout)}</td>
                    <td className={`txt ${l.tone === 'down' ? 'down' : l.tone === 'warn' ? 'neutral' : 'up'}`}>
                      {l.couverture === null ? '—'
                        : l.couverture > 999 ? <span title="Stock sans ventes sur la période">ne tourne pas</span>
                        : `${Math.round(l.couverture)} j`}
                    </td>
                    <td>
                      {l.rotation === null ? '—'
                        : l.rotation < 0.1 ? '< 0,1'
                        : l.rotation.toFixed(1).replace('.', ',')}
                    </td>
                    <td className={`txt ${exces > 0 ? 'down' : 'neutral'}`}>{exces > 0 ? fmtNum(exces) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {state.updatedBy && (
          <p className="note">
            Dernier relevé enregistré par {state.updatedBy}
            {state.updatedAt ? ` le ${new Date(state.updatedAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}` : ''}.
          </p>
        )}
      </div>
    </>
  );
}
