import { useEffect, useMemo, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  COLLECTION_PREV, DOC_MAGASIN, db, syncLabel, syncTone, type SyncState,
} from '../lib/firebase.ts';
import {
  INDICATEURS, MOIS, cellKey, computeAdjusted, cumulAnnuel, ecartClass,
  emptyPrevState, getObjectif, type Indicateur, type PrevState,
} from '../lib/previsionnel.ts';
import { mergeSuggestions, suggestFromRows, suggestFromSuivi, type Suggestion } from '../lib/crosslink.ts';
import { currentFiscalYear, fiscalLabel } from '../lib/fiscal.ts';
import { useMonth } from '../lib/useMonth.ts';
import { canEdit, stamp, type Session } from '../lib/session.ts';
import { fmtNum } from '../lib/format.ts';
import type { Row } from '../lib/types.ts';

type Vue = 'saisie' | 'dashboard' | 'cumule';

const VUES: { id: Vue; label: string }[] = [
  { id: 'saisie', label: 'Saisie mensuelle' },
  { id: 'dashboard', label: 'Tableau de bord' },
  { id: 'cumule', label: 'Cumulé' },
];

const num = (v: string): number | undefined => {
  const t = v.trim().replace(',', '.');
  if (t === '') return undefined;
  const n = Number.parseFloat(t);
  return Number.isFinite(n) ? n : undefined;
};

const pct1 = (v: number | null): string =>
  v === null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')} %`;

const signed = (v: number | null): string => (v === null ? '—' : `${v >= 0 ? '+' : ''}${fmtNum(v)}`);

/** Un écart de moins de 0,5 % entre la suggestion et la saisie ne mérite pas d'être signalé. */
const differs = (a: number, b: number) => Math.abs(a - b) > Math.max(1, Math.abs(b) * 0.005);

export default function PrevisionnelPanel({ session, rows }: { session: Session; rows: Row[] | null }) {
  const [state, setState] = useState<PrevState>(emptyPrevState);
  const [vue, setVue] = useState<Vue>('saisie');
  const [moisActif, setMoisActif] = useState('P1');
  const [sync, setSync] = useState<SyncState>('loading');
  const [toast, setToast] = useState<string | null>(null);
  const editable = canEdit(session);
  const fy = currentFiscalYear();

  const now = new Date();
  const suivi = useMonth(now.getFullYear(), now.getMonth() + 1, session);

  useEffect(() => {
    let alive = true;
    getDoc(doc(db, COLLECTION_PREV, DOC_MAGASIN))
      .then((snap) => {
        if (!alive) return;
        if (snap.exists()) setState({ ...emptyPrevState(), ...(snap.data() as PrevState) });
        setSync(snap.metadata.fromCache && !navigator.onLine ? 'offline' : 'ok');
      })
      .catch(() => { if (alive) setSync('error'); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  /** Écriture immédiate : le prévisionnel se saisit valeur par valeur, pas au kilomètre. */
  const save = (next: PrevState, message = 'Enregistré') => {
    setState(next);
    setSync('saving');
    setDoc(doc(db, COLLECTION_PREV, DOC_MAGASIN), { ...next, ...stamp(session) })
      .then(() => { setSync(navigator.onLine ? 'ok' : 'offline'); setToast(message); })
      .catch((e: Error) => { setSync(navigator.onLine ? 'error' : 'offline'); setToast(`Échec : ${e.message}`); });
    if (!navigator.onLine) { setSync('offline'); setToast('Hors ligne — conservé sur le poste'); }
  };

  const adj = useMemo(() => computeAdjusted(state), [state]);
  const isLocked = (code: string) => state.moisVerrouilles.includes(code);

  // Chiffres déjà connus ailleurs dans l'outil, proposés plutôt que ressaisis.
  const suggestions = useMemo(
    () => mergeSuggestions(
      rows ? suggestFromRows(rows, fy) : [],
      suggestFromSuivi(suivi.totals.cumCA, now.getFullYear(), now.getMonth() + 1, fy),
    ),
    [rows, fy, suivi.totals.cumCA],
  );

  const pending = useMemo(
    () => [...suggestions.values()].filter((s) => {
      const [code] = s.key.split('_');
      if (isLocked(code)) return false;
      const current = state.realises[s.key];
      return current === undefined || differs(s.value, current);
    }),
    [suggestions, state],
  );

  const applyAll = () => {
    const realises = { ...state.realises };
    const modifTimestamps = { ...state.modifTimestamps };
    pending.forEach((s) => {
      realises[s.key] = Math.round(s.value * 100) / 100;
      modifTimestamps[s.key] = new Date().toISOString();
    });
    save({ ...state, realises, modifTimestamps }, `${pending.length} valeur(s) reprises`);
  };

  // R.C.A.I : on signale les mois où le déficit dépasse ce qui était prévu.
  const alertes = MOIS.filter((m) => {
    const r = state.realises[cellKey(m.code, 'rcai')];
    return r !== undefined && r - getObjectif(adj, m.code, 'rcai').val < 0;
  }).map((m) => m.label);

  const setRealise = (key: string, raw: string) => {
    const v = num(raw);
    const realises = { ...state.realises };
    const modifTimestamps = { ...state.modifTimestamps };
    if (v === undefined) { delete realises[key]; delete modifTimestamps[key]; }
    else { realises[key] = v; modifTimestamps[key] = new Date().toISOString(); }
    save({ ...state, realises, modifTimestamps });
  };

  const setReseau = (key: string, raw: string) => {
    const v = num(raw);
    const reseauMoyennes = { ...state.reseauMoyennes };
    if (v === undefined) delete reseauMoyennes[key];
    else reseauMoyennes[key] = v;
    save({ ...state, reseauMoyennes });
  };

  const setCommentaire = (key: string, value: string) => {
    if ((state.commentaires[key] ?? '') === value) return;
    const commentaires = { ...state.commentaires };
    if (value) commentaires[key] = value;
    else delete commentaires[key];
    save({ ...state, commentaires });
  };

  const toggleLock = (code: string) => {
    const locked = isLocked(code);
    save(
      {
        ...state,
        moisVerrouilles: locked
          ? state.moisVerrouilles.filter((m) => m !== code)
          : [...state.moisVerrouilles, code],
      },
      locked ? 'Mois déverrouillé' : 'Mois verrouillé',
    );
  };

  return (
    <>
      <div className="row spread exp-bar no-print">
        <div className="segmented">
          {VUES.map((v) => (
            <button key={v.id} className={vue === v.id ? 'active' : ''} onClick={() => setVue(v.id)}>
              {v.label}
            </button>
          ))}
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="faint small">Exercice {fiscalLabel(fy)}</span>
          <button className="btn btn-sm" onClick={() => window.print()}>Imprimer / PDF</button>
          <span className={`badge ${syncTone(sync)}`}>{syncLabel(sync)}</span>
        </div>
      </div>

      <h1 className="print-only">Prévisionnel — exercice {fiscalLabel(fy)}</h1>

      {alertes.length > 0 && (
        <div className="msg err" style={{ marginTop: 0, marginBottom: 16 }}>
          <b>Alerte R.C.A.I</b> — déficit supérieur au prévu sur : {alertes.join(' · ')}
        </div>
      )}

      {editable && pending.length > 0 && (
        <div className="msg warn no-print" style={{ marginTop: 0, marginBottom: 16 }}>
          <div className="row spread">
            <span>
              <b>{pending.length} valeur{pending.length > 1 ? 's' : ''} déjà connue{pending.length > 1 ? 's' : ''} ailleurs</b> —
              l'import des familles et le suivi quotidien contiennent des chiffres que ce tableau n'a pas encore.
            </span>
            <button className="btn btn-sm" onClick={applyAll}>Tout reprendre</button>
          </div>
        </div>
      )}

      {vue === 'saisie' && (
        <>
          <div className="chips prev-months no-print">
            {MOIS.map((m) => {
              const hasVal = INDICATEURS.some((i) => state.realises[cellKey(m.code, i.id)] !== undefined);
              return (
                <button
                  key={m.code}
                  className={`chip${m.code === moisActif ? ' active' : ''}${hasVal ? ' filled' : ''}`}
                  onClick={() => setMoisActif(m.code)}
                >
                  {m.abr} <span className="faint">{m.code}</span>{isLocked(m.code) ? ' 🔒' : ''}
                </button>
              );
            })}
          </div>

          <div className="row spread exp-bar">
            <b>{MOIS.find((m) => m.code === moisActif)?.label} — {moisActif}</b>
            {editable && (
              <button className="btn btn-sm no-print" onClick={() => toggleLock(moisActif)}>
                {isLocked(moisActif) ? '🔒 Mois verrouillé — déverrouiller' : '🔓 Verrouiller ce mois'}
              </button>
            )}
          </div>

          <div className="grid">
            {INDICATEURS.map((ind) => (
              <SaisieCard
                key={ind.id} ind={ind} state={state} adj={adj} moisCode={moisActif}
                locked={isLocked(moisActif) || !editable}
                suggestion={suggestions.get(cellKey(moisActif, ind.id)) ?? null}
                onRealise={setRealise} onReseau={setReseau} onCommentaire={setCommentaire}
              />
            ))}
          </div>
        </>
      )}

      {vue === 'dashboard' && (
        <div className="grid">
          {INDICATEURS.map((ind) => (
            <DashboardSection key={ind.id} ind={ind} state={state} adj={adj} isLocked={isLocked} />
          ))}
        </div>
      )}

      {vue === 'cumule' && <VueCumulee state={state} adj={adj} isLocked={isLocked} />}

      {state.updatedBy && (
        <p className="note">
          Dernière modification par {state.updatedBy}
          {state.updatedAt ? ` le ${new Date(state.updatedAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}` : ''}.
        </p>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

function SaisieCard({
  ind, state, adj, moisCode, locked, suggestion, onRealise, onReseau, onCommentaire,
}: {
  ind: Indicateur;
  state: PrevState;
  adj: Record<string, number>;
  moisCode: string;
  locked: boolean;
  suggestion: Suggestion | null;
  onRealise: (key: string, raw: string) => void;
  onReseau: (key: string, raw: string) => void;
  onCommentaire: (key: string, value: string) => void;
}) {
  const key = cellKey(moisCode, ind.id);
  const objectif = getObjectif(adj, moisCode, ind.id);
  const real = state.realises[key];
  const ecart = real !== undefined ? real - objectif.val : null;
  const pct = ecart !== null && objectif.val !== 0 ? (ecart / Math.abs(objectif.val)) * 100 : null;
  const taux = real !== undefined && objectif.val !== 0 ? (real / objectif.val) * 100 : null;
  const tone = ecartClass(ecart, ind);
  const reseau = state.reseauMoyennes[key];
  const modif = state.modifTimestamps[key];
  const moisIdx = MOIS.findIndex((m) => m.code === moisCode);
  const cumul = ind.isStock ? null : cumulAnnuel(state, ind);
  const ecartAnn = cumul && cumul.real !== null ? cumul.real - cumul.obj : null;
  const proposable = suggestion && !locked && (real === undefined || differs(suggestion.value, real));

  return (
    <div className="card prev-card">
      <div className="row spread">
        <h2>{ind.label}</h2>
        <div className="row" style={{ gap: 6 }}>
          {objectif.recalibre && (
            <span className="pill neutral" title="Objectif ajusté d'après les écarts des mois déjà saisis">↺ Recalibré</span>
          )}
          {ecart !== null && (
            <span className={`pill ${tone === 'bon' ? 'up' : 'down'}`}>{signed(ecart)} € · {pct1(pct)}</span>
          )}
        </div>
      </div>

      <div className="prev-grid">
        <div>
          <div className="kpi-label">Objectif{objectif.recalibre ? ' *' : ''}</div>
          <div className="prev-val">{fmtNum(objectif.val)} €</div>
          {objectif.recalibre && <div className="faint small">Origine : {fmtNum(ind.obj[moisIdx])} €</div>}
        </div>
        <div>
          <div className="kpi-label">Réalisé</div>
          <input
            key={`${key}-real-${real ?? ''}`} type="number" step="0.01" placeholder="Saisir…"
            defaultValue={real ?? ''} disabled={locked}
            onBlur={(e) => onRealise(key, e.target.value)}
          />
          {proposable && (
            <button className="link-btn no-print" onClick={() => onRealise(key, String(Math.round(suggestion.value * 100) / 100))}>
              {suggestion.source} : {fmtNum(suggestion.value)} € — reprendre
            </button>
          )}
          {modif && <div className="faint small">Modifié le {new Date(modif).toLocaleDateString('fr-FR')}</div>}
        </div>
        {cumul && (
          <div>
            <div className="kpi-label">Cumul annuel</div>
            <div className={`prev-val txt ${ecartAnn === null ? 'neutral' : ecartClass(ecartAnn, ind) === 'bon' ? 'up' : 'down'}`}>
              {cumul.real !== null ? `${fmtNum(cumul.real)} €` : '—'}
            </div>
            <div className="faint small">Obj. : {fmtNum(cumul.obj)} €</div>
          </div>
        )}
        <div>
          <div className="kpi-label">Moyenne réseau</div>
          <input
            key={`${key}-res-${reseau ?? ''}`} type="number" step="0.01" placeholder="—"
            defaultValue={reseau ?? ''} disabled={locked}
            onBlur={(e) => onReseau(key, e.target.value)}
          />
          {reseau !== undefined && real !== undefined && (
            <div className={`small txt ${real >= reseau ? 'up' : 'down'}`}>
              {real >= reseau ? '▲ Au-dessus' : '▼ En-dessous'} du réseau
            </div>
          )}
        </div>
      </div>

      {taux !== null && (
        <>
          <div className="prog-track">
            <div
              className={`prog-fill ${tone === 'bon' ? 'good' : 'bad'}`}
              style={{ width: `${Math.min(Math.abs(taux), 100)}%` }}
            />
          </div>
          <div className={`small txt ${tone === 'bon' ? 'up' : 'down'}`}>
            {taux.toFixed(1).replace('.', ',')} % de l'objectif
          </div>
        </>
      )}

      <textarea
        key={`${key}-com`} className="prev-comment" placeholder="Commentaire — contexte, raison de l'écart…"
        defaultValue={state.commentaires[key] ?? ''} disabled={locked}
        onBlur={(e) => onCommentaire(key, e.target.value.trim())}
      />
    </div>
  );
}

function DashboardSection({
  ind, state, adj, isLocked,
}: {
  ind: Indicateur; state: PrevState; adj: Record<string, number>; isLocked: (code: string) => boolean;
}) {
  const { real, obj } = cumulAnnuel(state, ind);
  const ecart = real !== null ? real - obj : null;
  const pct = ecart !== null && obj !== 0 ? (ecart / Math.abs(obj)) * 100 : null;
  const tone = ecartClass(ecart, ind);

  return (
    <div className="card">
      <div className="row spread">
        <h2>{ind.label}</h2>
        <div className="small faint">
          Obj. annuel : <b>{fmtNum(obj)} €</b>
          {real !== null && (
            <> &nbsp;|&nbsp; Réalisé : <b>{fmtNum(real)} €</b> <span className={`txt ${tone === 'bon' ? 'up' : 'down'}`}>{signed(ecart)} € ({pct1(pct)})</span></>
          )}
        </div>
      </div>
      <div className="dash-grid">
        {MOIS.map((m) => {
          const key = cellKey(m.code, ind.id);
          const objectif = getObjectif(adj, m.code, ind.id);
          const r = state.realises[key];
          const e = r !== undefined ? r - objectif.val : null;
          const taux = r !== undefined && objectif.val !== 0 ? (r / objectif.val) * 100 : null;
          const t = ecartClass(e, ind);
          const com = state.commentaires[key];
          return (
            <div key={m.code} className={`dash-cell ${t}${isLocked(m.code) ? ' locked' : ''}`} title={com ?? ''}>
              <div className="dash-mois">{m.abr}{isLocked(m.code) ? ' 🔒' : ''}</div>
              <div className="faint small">{fmtNum(objectif.val)}{objectif.recalibre ? ' ↺' : ''}</div>
              {r !== undefined ? (
                <>
                  <div className="dash-real">{fmtNum(r)}</div>
                  <div className={`small txt ${t === 'bon' ? 'up' : 'down'}`}>
                    {taux !== null ? `${taux.toFixed(1).replace('.', ',')} %` : '—'}
                  </div>
                  <div className="dash-bar">
                    <div className={`dash-fill ${t}`} style={{ width: `${Math.min(taux ?? 0, 100)}%` }} />
                  </div>
                  {com && <div className="small">💬</div>}
                </>
              ) : <div className="faint">—</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VueCumulee({
  state, adj, isLocked,
}: {
  state: PrevState; adj: Record<string, number>; isLocked: (code: string) => boolean;
}) {
  return (
    <>
      <div className="grid kpis">
        {INDICATEURS.filter((i) => !i.isStock).map((ind) => {
          const { real, obj } = cumulAnnuel(state, ind);
          const ecart = real !== null ? real - obj : null;
          const pct = real !== null && obj !== 0 ? (real / Math.abs(obj)) * 100 : null;
          const tone = ecartClass(ecart, ind);
          const saisis = MOIS.filter((m) => state.realises[cellKey(m.code, ind.id)] !== undefined).length;
          return (
            <div className="card" key={ind.id}>
              <div className="kpi-label">{ind.label}</div>
              <div className={`kpi-value txt ${ecart === null ? 'neutral' : tone === 'bon' ? 'up' : 'down'}`}>
                {real !== null ? `${fmtNum(real)} €` : '—'}
              </div>
              <div className="kpi-foot">
                {ecart !== null
                  ? `${signed(ecart)} € · ${pct !== null ? pct.toFixed(1).replace('.', ',') : '—'} %`
                  : `Obj. : ${fmtNum(obj)} €`}
                {saisis > 0 && <span className="faint">({saisis}/12 périodes)</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2>Toutes périodes</h2>
        <p className="card-sub">Objectif, réalisé et écart de chaque période, cumul annuel en dernière colonne.</p>
        <div className="table-wrap">
          <table className="cumul-table">
            <thead>
              <tr>
                <th>Indicateur</th>
                {MOIS.map((m) => (
                  <th key={m.code}>{m.abr}<span className="faint"> {m.code}{isLocked(m.code) ? ' 🔒' : ''}</span></th>
                ))}
                <th className="th-total">Cumul annuel</th>
              </tr>
            </thead>
            <tbody>
              {INDICATEURS.map((ind) => {
                const { real, obj } = cumulAnnuel(state, ind);
                const cumEcart = real !== null ? real - obj : null;
                const cumPct = real !== null && obj !== 0 ? (real / Math.abs(obj)) * 100 : null;
                const totTone = ecartClass(cumEcart, ind);
                return (
                  <tr key={ind.id}>
                    <th scope="row">{ind.label}</th>
                    {MOIS.map((m) => {
                      const key = cellKey(m.code, ind.id);
                      const objectif = getObjectif(adj, m.code, ind.id);
                      const r = state.realises[key];
                      const e = r !== undefined ? r - objectif.val : null;
                      const pct = r !== undefined && objectif.val !== 0 ? (r / Math.abs(objectif.val)) * 100 : null;
                      const tone = ecartClass(e, ind);
                      const cls = `${tone}${isLocked(m.code) ? ' locked' : ''}`;
                      if (r === undefined) return <td key={m.code} className={cls}>—</td>;
                      return (
                        <td key={m.code} className={cls}>
                          <div className="faint small">{fmtNum(objectif.val)}{objectif.recalibre ? ' ↺' : ''}</div>
                          <div><b>{fmtNum(r)}</b></div>
                          <div className={`small txt ${tone === 'bon' ? 'up' : 'down'}`}>
                            {signed(e)} ({pct !== null ? pct.toFixed(1).replace('.', ',') : '—'} %)
                          </div>
                        </td>
                      );
                    })}
                    <td className={`td-total ${totTone}`}>
                      <div className="faint small">Obj : {fmtNum(obj)}</div>
                      {real !== null ? (
                        <>
                          <div><b>{fmtNum(real)}</b></div>
                          <div className={`small txt ${totTone === 'bon' ? 'up' : 'down'}`}>
                            {signed(cumEcart)} ({cumPct !== null ? cumPct.toFixed(1).replace('.', ',') : '—'} %)
                          </div>
                        </>
                      ) : <div>—</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
