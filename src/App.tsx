import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import Login from './components/Login.tsx';
import { restoreSession, canSee, scopeOf, signOut, ROLE_LABELS, type Session } from './lib/session.ts';
import { loadRows, storeMode } from './lib/store.ts';
import { listFamilies, listFiscalYears } from './lib/analytics.ts';
import { currentFiscalYear, fiscalLabel } from './lib/fiscal.ts';
import { UNIVERSE_LABELS, universeOf, type Universe } from './lib/market.ts';
import { applyTheme, initialTheme, type Theme } from './lib/theme.ts';
import type { Metric, Row } from './lib/types.ts';

// Chargés à la demande : l'ouverture de l'application ne traîne plus derrière
// elle les graphes, le lecteur Excel et le client Firebase.
const Today = lazy(() => import('./components/Today.tsx'));
const SuiviPanel = lazy(() => import('./components/SuiviPanel.tsx'));
const PrevisionnelPanel = lazy(() => import('./components/PrevisionnelPanel.tsx'));
const BriefPanel = lazy(() => import('./components/BriefPanel.tsx'));
const StockPanel = lazy(() => import('./components/StockPanel.tsx'));
const Overview = lazy(() => import('./components/Overview.tsx'));
const Families = lazy(() => import('./components/Families.tsx'));
const BudgetPanel = lazy(() => import('./components/BudgetPanel.tsx'));
const ImportPanel = lazy(() => import('./components/ImportPanel.tsx'));

type Tab = 'aujourdhui' | 'suivi' | 'previsionnel' | 'synthese' | 'familles' | 'budget' | 'stock' | 'brief' | 'import';

const TABS: { id: Tab; label: string }[] = [
  { id: 'aujourdhui', label: "Aujourd'hui" },
  { id: 'suivi', label: 'Suivi CA / Marge' },
  { id: 'previsionnel', label: 'Prévisionnel' },
  { id: 'synthese', label: 'Synthèse' },
  { id: 'familles', label: 'Familles' },
  { id: 'budget', label: 'Budget' },
  { id: 'stock', label: 'Stock' },
  { id: 'brief', label: 'Point hebdo' },
  { id: 'import', label: 'Import' },
];

/** Écrans branchés sur Supabase ; les autres lisent Firebase. */
const SUPABASE_TABS: Tab[] = ['synthese', 'familles', 'budget', 'import', 'stock'];

const UNIVERSES: Universe[] = ['MEUBLE', 'DECO', 'GEM', 'PEM', 'TECH', 'AUTRE'];

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [booting, setBooting] = useState(true);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [tab, setTab] = useState<Tab>('aujourdhui');
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const [metric, setMetric] = useState<Metric>('ordre');
  const [family, setFamily] = useState<string>('');
  const [universe, setUniverse] = useState<Universe | null>(null);
  const [fyCurrent, setFyCurrent] = useState<number | null>(null);
  const [fyCompare, setFyCompare] = useState<number | null>(null);
  const [samePerimeter, setSamePerimeter] = useState(true);

  useEffect(() => { applyTheme(theme); }, [theme]);

  // Session déjà ouverte (compte Supabase ou poste déverrouillé) ?
  useEffect(() => {
    restoreSession()
      .then(setSession)
      .catch(() => setSession(null))
      .finally(() => setBooting(false));
  }, []);

  const refresh = () => {
    setStatus('loading');
    loadRows()
      .then((r) => { setRows(r); setError(null); setStatus('ok'); })
      .catch((e: Error) => { setError(e.message); setStatus('error'); });
  };

  useEffect(() => { if (session) refresh(); }, [session]);

  // Un rôle qui n'a pas accès à l'onglet courant est ramené sur son premier écran.
  useEffect(() => {
    if (session && !canSee(session, tab)) {
      const first = TABS.find((t) => canSee(session, t.id));
      if (first) setTab(first.id);
    }
  }, [session, tab]);

  const years = useMemo(() => (rows ? listFiscalYears(rows) : []), [rows]);
  const allFamilies = useMemo(() => (rows ? listFamilies(rows) : []), [rows]);

  // Périmètre : les rayons confiés à la personne connectée, puis le filtre univers.
  const scope = session ? scopeOf(session) : null;
  const families = useMemo(() => {
    let list = allFamilies;
    if (scope) list = list.filter((f) => scope.includes(f));
    if (universe) list = list.filter((f) => universeOf(f) === universe);
    return list;
  }, [allFamilies, scope, universe]);

  const scopedRows = useMemo(() => {
    if (!rows) return null;
    let list = rows;
    if (scope) list = list.filter((r) => scope.includes(r.family));
    if (universe) list = list.filter((r) => universeOf(r.family) === universe);
    return list;
  }, [rows, scope, universe]);

  useEffect(() => {
    if (!years.length || fyCurrent !== null) return;
    const cur = years.includes(currentFiscalYear()) ? currentFiscalYear() : years[0];
    setFyCurrent(cur);
    setFyCompare(years.find((y) => y < cur) ?? years[years.length - 1]);
  }, [years, fyCurrent]);

  useEffect(() => {
    if (family && universe && universeOf(family) !== universe) setFamily('');
  }, [family, universe]);

  const onSupabase = storeMode === 'supabase';
  const sourceLabel = onSupabase
    ? status === 'ok' ? `Supabase · ${rows?.length ?? 0} lignes`
      : status === 'error' ? 'Supabase · injoignable' : 'Supabase · connexion…'
    : 'Stockage local du navigateur';

  if (booting) return <div className="login"><p className="muted">Ouverture…</p></div>;
  if (!session) return <Login onSession={setSession} />;

  const onSupabaseTab = SUPABASE_TABS.includes(tab);
  const ready = scopedRows !== null && fyCurrent !== null && fyCompare !== null;
  const showFilters = tab === 'synthese' || tab === 'familles';
  const visibleTabs = TABS.filter((t) => canSee(session, t.id));

  return (
    <div className="app">
      <header className="topbar no-print">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <b>BUT Conflans</b>
          <span>Pilotage du magasin 275</span>
        </div>
        <nav className="tabs">
          {visibleTabs.map((t) => (
            <button key={t.id} className={`tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          {onSupabaseTab && <span className={`badge ${status}`}>{sourceLabel}</span>}
          <span className="who" title={`${ROLE_LABELS[session.role]}${scope ? ` · ${scope.length} rayon(s)` : ''}`}>
            {session.name}
          </span>
          <button
            className="icon-btn"
            title={theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
            aria-label={theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button className="btn btn-ghost" onClick={() => { signOut().finally(() => setSession(null)); }}>
            Quitter
          </button>
        </div>
      </header>

      {showFilters && ready && (
        <div className="filters no-print">
          <div className="field">
            <label>Indicateur</label>
            <div className="segmented">
              <button className={metric === 'ordre' ? 'active' : ''} onClick={() => setMetric('ordre')}>Prise d'ordre</button>
              <button className={metric === 'sortie' ? 'active' : ''} onClick={() => setMetric('sortie')}>Sortie</button>
            </div>
          </div>
          <div className="field">
            <label>Exercice</label>
            <select value={fyCurrent ?? ''} onChange={(e) => setFyCurrent(Number(e.target.value))}>
              {years.map((y) => <option key={y} value={y}>{fiscalLabel(y)}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Comparé à</label>
            <select value={fyCompare ?? ''} onChange={(e) => setFyCompare(Number(e.target.value))}>
              {years.filter((y) => y !== fyCurrent).map((y) => <option key={y} value={y}>{fiscalLabel(y)}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Famille</label>
            <select value={family} onChange={(e) => setFamily(e.target.value)}>
              <option value="">Toutes les familles</option>
              {families.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Périmètre</label>
            <div className="segmented">
              <button className={samePerimeter ? 'active' : ''} onClick={() => setSamePerimeter(true)}>Mois communs</button>
              <button className={!samePerimeter ? 'active' : ''} onClick={() => setSamePerimeter(false)}>Exercice complet</button>
            </div>
          </div>
          <div className="field">
            <label>Univers</label>
            <div className="chips">
              <button className={`chip${universe === null ? ' active' : ''}`} onClick={() => setUniverse(null)}>Tous</button>
              {UNIVERSES.map((u) => (
                <button key={u} className={`chip${universe === u ? ' active' : ''}`}
                  onClick={() => setUniverse(universe === u ? null : u)}>
                  {UNIVERSE_LABELS[u]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        <Suspense fallback={<p className="muted">Chargement de l'écran…</p>}>
          {tab === 'aujourdhui' && <Today session={session} />}
          {tab === 'suivi' && <SuiviPanel session={session} />}
          {tab === 'previsionnel' && <PrevisionnelPanel session={session} rows={rows} />}
          {tab === 'brief' && ready && (
            <BriefPanel session={session} rows={scopedRows} fyCurrent={fyCurrent} fyCompare={fyCompare} metric={metric} />
          )}

          {onSupabaseTab && error && (
            <div className="msg err">
              <div className="row spread">
                <span>Erreur de chargement : {error}</span>
                <button className="btn" onClick={refresh}>Réessayer</button>
              </div>
            </div>
          )}
          {onSupabaseTab && !rows && !error && <p className="muted">Chargement…</p>}

          {ready && tab === 'synthese' && (
            <Overview
              rows={scopedRows} metric={metric} fyCurrent={fyCurrent} fyCompare={fyCompare}
              family={family || null} universe={universe} samePerimeter={samePerimeter}
              theme={theme} onPickFamily={setFamily}
            />
          )}
          {ready && tab === 'familles' && (
            <Families
              rows={scopedRows} metric={metric} fyCurrent={fyCurrent} fyCompare={fyCompare}
              family={family || null} samePerimeter={samePerimeter} theme={theme} onPickFamily={setFamily}
            />
          )}
          {ready && tab === 'stock' && <StockPanel session={session} rows={scopedRows} fyCurrent={fyCurrent} />}
          {rows && tab === 'budget' && <BudgetPanel rows={rows} theme={theme} />}
          {rows && tab === 'import' && <ImportPanel rows={rows} onChanged={refresh} />}
        </Suspense>
      </main>
    </div>
  );
}
