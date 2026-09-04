import { useMemo, useRef, useState } from 'react';
import { parseWorkbook } from '../lib/parse.ts';
import { deleteMonth, resetToSeed, saveMonth, storeMode } from '../lib/store.ts';
import { fiscalLabel, periodLabel, periodsOfFiscalYear } from '../lib/fiscal.ts';
import { listFiscalYears } from '../lib/analytics.ts';
import { fmtEur } from '../lib/format.ts';
import type { ParsedFile, Row } from '../lib/types.ts';

export default function ImportPanel({ rows, onChanged }: { rows: Row[]; onChanged: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<ParsedFile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const years = useMemo(() => listFiscalYears(rows), [rows]);
  const present = useMemo(() => new Set(rows.map((r) => r.period)), [rows]);
  const totals = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) m.set(r.period, (m.get(r.period) ?? 0) + r.ordre);
    return m;
  }, [rows]);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    setDone(null);
    const parsed: ParsedFile[] = [];
    try {
      for (const file of Array.from(files)) {
        const buf = await file.arrayBuffer();
        parsed.push(await parseWorkbook(buf, file.name));
      }
      parsed.sort((a, b) => a.period.localeCompare(b.period));
      setPreview(parsed);
    } catch (e) {
      setPreview(null);
      setError((e as Error).message);
    }
  };

  const confirm = async () => {
    if (!preview) return;
    setBusy(true);
    setError(null);
    try {
      for (const p of preview) await saveMonth(p.period, p.rows);
      setDone(`${preview.length} mois enregistré(s) : ${preview.map((p) => periodLabel(p.period)).join(', ')}.`);
      setPreview(null);
      onChanged();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (period: string) => {
    if (!window.confirm(`Supprimer les données de ${periodLabel(period)} ?`)) return;
    setBusy(true);
    try {
      await deleteMonth(period);
      onChanged();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!window.confirm("Réinitialiser avec l'historique livré ? Les imports ultérieurs seront perdus.")) return;
    setBusy(true);
    try {
      await resetToSeed();
      onChanged();
      setDone('Historique de référence rechargé.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="card">
        <h2>Import mensuel</h2>
        <p className="card-sub">
          Fichier Excel de l'extraction BUT, nommé <code>MM.AA.xlsx</code> (ex : <code>04.26.xlsx</code> pour avril 2026).
          Un mois déjà présent est remplacé.
        </p>

        <div
          className={`dropzone${over ? ' over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); void handleFiles(e.dataTransfer.files); }}
        >
          <strong>Déposer un ou plusieurs fichiers .xlsx</strong>
          ou cliquer pour les sélectionner
        </div>
        <input
          ref={inputRef} type="file" accept=".xlsx,.xls" multiple hidden
          onChange={(e) => { void handleFiles(e.target.files); e.target.value = ''; }}
        />

        {error && <div className="msg err">{error}</div>}
        {done && <div className="msg ok">{done}</div>}

        {preview && (
          <div style={{ marginTop: 16 }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Mois</th>
                    <th>Familles</th>
                    <th>Prise d'ordre</th>
                    <th>Sortie</th>
                    <th>Déjà présent</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((p) => (
                    <tr key={p.period}>
                      <td>{periodLabel(p.period)}</td>
                      <td>{p.rows.length}</td>
                      <td>{fmtEur(p.rows.reduce((s, r) => s + r.ordre, 0))}</td>
                      <td>{fmtEur(p.rows.reduce((s, r) => s + r.sortie, 0))}</td>
                      <td className="muted">{present.has(p.period) ? 'oui — sera remplacé' : 'non'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {preview.some((p) => p.warnings.length > 0) && (
              <div className="msg warn">
                Points de vigilance :
                <ul>
                  {preview.flatMap((p) => p.warnings.map((w, i) => <li key={`${p.period}-${i}`}>{periodLabel(p.period)} : {w}</li>))}
                </ul>
              </div>
            )}
            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn" style={{ background: 'var(--text)', color: '#fff', borderColor: 'var(--text)' }}
                onClick={() => void confirm()} disabled={busy}>
                {busy ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button className="btn btn-ghost" onClick={() => setPreview(null)} disabled={busy}>Annuler</button>
            </div>
          </div>
        )}

        <p className="note">
          Destination : {storeMode === 'supabase' ? 'base Supabase (table monthly_sales)' : 'stockage local du navigateur'}.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="row spread">
          <div>
            <h2>Mois disponibles</h2>
            <p className="card-sub" style={{ margin: 0 }}>Prise d'ordre par mois · exercice du 1er avril au 31 mars</p>
          </div>
          <button className="btn btn-ghost" onClick={() => void reset()} disabled={busy}>Recharger l'historique livré</button>
        </div>

        {years.map((fy) => (
          <div key={fy} style={{ marginTop: 18 }}>
            <div className="small muted" style={{ marginBottom: 8 }}>Exercice {fiscalLabel(fy)}</div>
            <div className="months">
              {periodsOfFiscalYear(fy).map((p) => (
                <div key={p} className={`month-chip${present.has(p) ? '' : ' missing'}`}>
                  <span>
                    {periodLabel(p).replace(` ${p.slice(0, 4)}`, '')}
                    <br />
                    <strong className="small">{present.has(p) ? fmtEur(totals.get(p) ?? 0) : '—'}</strong>
                  </span>
                  {present.has(p) && (
                    <button title="Supprimer ce mois" onClick={() => void remove(p)}>✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
