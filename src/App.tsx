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
import type { Metric, Row } from './lib/types.ts';

type Tab = 'synthese' | 'familles' | 'budget' | 'import';

const TABS: { id: Tab; label: string }[] = [
  { id: 'synthese', label: 'Synthèse' },
  { id: 'familles', label: 'Familles' },
  { id: 'budget', label: 'Budget' },
  { id: 'import', label: 'Import' },
];

export default function App() {
  const [unlocked, setUnlocked] = useState(isUnlocked());
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('synthese');

  const [metric, setMetric] = useState<Metric>('ordre');
  const [family, setFamily] = useState<string>('');
  const [fyCurrent, setFyCurrent] = useState<number | null>(null);
  const [fyCompare, setFyCompare] = useState<number | null>(null);
  /** Comparaison limitée aux mois présents dans les deux exercices. */
  const [samePerimeter, setSamePerimeter] = useState(true);

  const refresh = () => {
    loadRows()
      .then((r) => {
        setRows(r);
        setError(null);
      })
      .catch((e: Error) => setError(e.message));
  };

  useEffect(() => {
    if (unlocked) refresh();
  }, [unlocked]);

  const years = useMemo(() => (rows ? listFiscalYears(rows) : []), [rows]);
  const families = useMemo(() => (rows ? listFamilies(rows) : []), [rows]);

  // Sélection par défaut : exercice en cours (ou le plus récent) comparé au précédent.
  useEffect(() => {
    if (!years.length || fyCurrent !== null) return;
    const cur = years.includes(currentFiscalYear()) ? currentFiscalYear() : years[0];
    setFyCurrent(cur);
    setFyCompare(years.find((y) => y < cur) ?? years[years.length - 1]);
  }, [years, fyCurrent]);

  if (!unlocked) return <Login onUnlock={() => setUnlocked(true)} />;

  const ready = rows !== null && fyCurrent !== null && fyCompare !== null;
  const showFilters = tab === 'synthese' || tab === 'familles';

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          Chiffre Conflans<span>BUT · analyse par famille</span>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          <span className="badge">{storeMode === 'supabase' ? 'Supabase' : 'Stockage local'}</span>
          <button
            className="btn btn-ghost"
            onClick={() => {
              lock();
              setUnlocked(false);
            }}
          >
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
              {years.map((y) => (
                <option key={y} value={y}>{fiscalLabel(y)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Comparé à</label>
            <select value={fyCompare ?? ''} onChange={(e) => setFyCompare(Number(e.target.value))}>
              {years.filter((y) => y !== fyCurrent).map((y) => (
                <option key={y} value={y}>{fiscalLabel(y)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Famille</label>
            <select value={family} onChange={(e) => setFamily(e.target.value)}>
              <option value="">Toutes les familles</option>
              {families.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
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
            rows={rows}
            metric={metric}
            fyCurrent={fyCurrent}
            fyCompare={fyCompare}
            family={family || null}
            samePerimeter={samePerimeter}
            onPickFamily={setFamily}
          />
        )}

        {ready && tab === 'familles' && (
          <Families
            rows={rows}
            metric={metric}
            fyCurrent={fyCurrent}
            fyCompare={fyCompare}
            family={family || null}
            samePerimeter={samePerimeter}
            onPickFamily={setFamily}
          />
        )}

        {rows && tab === 'budget' && <BudgetPanel rows={rows} />}

        {rows && tab === 'import' && <ImportPanel rows={rows} onChanged={refresh} />}
      </main>
    </div>
  );
}
