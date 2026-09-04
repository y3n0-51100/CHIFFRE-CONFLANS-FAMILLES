import { useEffect, useMemo, useState } from 'react';
import Login from './components/Login.tsx';
import Overview from './components/Overview.tsx';
import Families from './components/Families.tsx';
import ImportPanel from './components/ImportPanel.tsx';
import BudgetPanel from './components/BudgetPanel.tsx';
import { isUnlocked, lock } from './lib/auth.ts';
import { loadRows, storeMode } from './lib/store.ts';
import { listFamilies, listFiscalYears } from './lib/analytics.ts';
import { currentFiscalYear, fiscalLabel } from './lib/fiscal.ts';
import { UNIVERSE_LABELS, universeOf, type Universe } from './lib/market.ts';
import { applyTheme, initialTheme, type Theme } from './lib/theme.ts';
import type { Metric, Row } from './lib/types.ts';

type Tab = 'synthese' | 'familles' | 'budget' | 'import';

const TABS: { id: Tab; label: string }[] = [
  { id: 'synthese', label: 'Synthèse' },
  { id: 'familles', label: 'Familles' },
  { id: 'budget', label: 'Budget' },
  { id: 'import', label: 'Import' },
];

const UNIVERSES: Universe[] = ['MEUBLE', 'DECO', 'GEM', 'PEM', 'TECH', 'AUTRE'];

export default function App() {
  const [unlocked, setUnlocked] = useState(isUnlocked());
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** État de la source de données, affiché dans le bandeau. */
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [tab, setTab] = useState<Tab>('synthese');
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const [metric, setMetric] = useState<Metric>('ordre');
  const [family, setFamily] = useState<string>('');
  const [universe, setUniverse] = useState<Universe | null>(null);
  const [fyCurrent, setFyCurrent] = useState<number | null>(null);
  const [fyCompare, setFyCompare] = useState<number | null>(null);
  /** Comparaison limitée aux mois présents dans les deux exercices. */
  const [samePerimeter, setSamePerimeter] = useState(true);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const refresh = () => {
    setStatus('loading');
    loadRows()
      .then((r) => {
        setRows(r);
        setError(null);
        setStatus('ok');
      })
      .catch((e: Error) => {
        setError(e.message);
        setStatus('error');
      });
  };

  useEffect(() => {
    if (unlocked) refresh();
  }, [unlocked]);

  const years = useMemo(() => (rows ? listFiscalYears(rows) : []), [rows]);
  const allFamilies = useMemo(() => (rows ? listFamilies(rows) : []), [rows]);

  // Le filtre "univers" restreint la liste des familles proposées et les agrégats.
  const families = useMemo(
    () => (universe ? allFamilies.filter((f) => universeOf(f) === universe) : allFamilies),
    [allFamilies, universe],
  );
  const scopedRows = useMemo(
    () => (rows && universe ? rows.filter((r) => universeOf(r.family) === universe) : rows),
    [rows, universe],
  );

  // Sélection par défaut : exercice en cours (ou le plus récent) comparé au précédent.
  useEffect(() => {
    if (!years.length || fyCurrent !== null) return;
    const cur = years.includes(currentFiscalYear()) ? currentFiscalYear() : years[0];
    setFyCurrent(cur);
    setFyCompare(years.find((y) => y < cur) ?? years[years.length - 1]);
  }, [years, fyCurrent]);

  // Une famille sélectionnée hors de l'univers retenu n'a plus de sens : on la relâche.
  useEffect(() => {
    if (family && universe && universeOf(family) !== universe) setFamily('');
  }, [family, universe]);

  // Libellé du bandeau : la source de données ET si elle répond.
  const onSupabase = storeMode === 'supabase';
  const sourceLabel = onSupabase
    ? status === 'ok'
      ? `Supabase · ${rows?.length ?? 0} lignes`
      : status === 'error'
        ? 'Supabase · injoignable'
        : 'Supabase · connexion…'
    : 'Stockage local du navigateur';
  const sourceHint = onSupabase
    ? status === 'ok'
      ? 'Base commune : les imports sont partagés avec les autres postes.'
      : status === 'error'
        ? "La base ne répond pas. Les chiffres affichés ne sont pas à jour tant que la connexion n'est pas rétablie."
        : 'Interrogation de la base en cours.'
    : "Les données restent sur ce poste. Renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY pour passer sur la base commune.";

  if (!unlocked) return <Login onUnlock={() => setUnlocked(true)} />;

  const ready = scopedRows !== null && fyCurrent !== null && fyCompare !== null;
  const showFilters = tab === 'synthese' || tab === 'familles';

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <b>Chiffre Conflans</b>
          <span>BUT · analyse par famille</span>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          <span className={`badge ${status}`} title={sourceHint}>{sourceLabel}</span>
          <button
            className="icon-btn"
            title={theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
            aria-label={theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button className="btn btn-ghost" onClick={() => { lock(); setUnlocked(false); }}>
            Verrouiller
          </button>
        </div>
      </header>

      {showFilters && ready && (
        <div className="filters">
          <div className="field">
            <label>Indicateur</label>
            <div className="segmented">
              <button className={metric === 'ordre' ? 'active' : ''} onClick={() => setMetric('ordre')}>
                Prise d'ordre
              </button>
              <button className={metric === 'sortie' ? 'active' : ''} onClick={() => setMetric('sortie')}>
                Sortie
              </button>
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
              <button className={samePerimeter ? 'active' : ''} onClick={() => setSamePerimeter(true)}>
                Mois communs
              </button>
              <button className={!samePerimeter ? 'active' : ''} onClick={() => setSamePerimeter(false)}>
                Exercice complet
              </button>
            </div>
          </div>
          <div className="field">
            <label>Univers</label>
            <div className="chips">
              <button className={`chip${universe === null ? ' active' : ''}`} onClick={() => setUniverse(null)}>
                Tous
              </button>
              {UNIVERSES.map((u) => (
                <button
                  key={u}
                  className={`chip${universe === u ? ' active' : ''}`}
                  onClick={() => setUniverse(universe === u ? null : u)}
                >
                  {UNIVERSE_LABELS[u]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        {error && (
          <div className="msg err">
            <div className="row spread">
              <span>Erreur de chargement : {error}</span>
              <button className="btn" onClick={refresh}>Réessayer</button>
            </div>
          </div>
        )}
        {!rows && !error && <p className="muted">Chargement…</p>}

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

        {rows && tab === 'budget' && <BudgetPanel rows={rows} theme={theme} />}

        {rows && tab === 'import' && <ImportPanel rows={rows} onChanged={refresh} />}
      </main>
    </div>
  );
}
