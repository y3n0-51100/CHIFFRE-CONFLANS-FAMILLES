import type { ParsedFile, Row } from './types.ts';
import { makePeriod } from './fiscal.ts';

/** Libellé donné aux lignes de valeurs sans famille renseignée dans l'export. */
export const UNASSIGNED = '(NON AFFECTE)';

const HEADER_FAMILY = 'LIB_RAYON';
const HEADER_ORDRE = "CATTC PRISE D'ORDRE";
const HEADER_SORTIE = 'CA HORS-TAXE SORTIE';

/** Normalise un libellé : majuscules, accents retirés, espaces compactés. */
export function normalizeLabel(v: unknown): string {
  return String(v ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u00a0\u202f]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

/** Convertit une cellule en nombre (gère "1 234,56", "-", null). */
function toNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  const s = String(v).replace(/[\s\u00a0\u202f]/g, '').replace(',', '.').replace(/[^0-9.\-]/g, '');
  if (s === '' || s === '-') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/**
 * Déduit la période depuis un nom de fichier type "04.25.xlsx" (avril 2026 -> "04.26").
 * Accepte aussi 04-25, 042025, 04.2025.
 */
export function periodFromFilename(name: string): string | null {
  const base = name.replace(/\.[^.]+$/, '');
  const m = base.match(/(?:^|[^0-9])(0[1-9]|1[0-2])[.\-_ ]?((?:19|20)?\d{2})(?:[^0-9]|$)/);
  if (!m) return null;
  const month = Number(m[1]);
  let year = Number(m[2]);
  if (year < 100) year += 2000;
  if (year < 2000 || year > 2100) return null;
  return makePeriod(year, month);
}

/**
 * Lit un export mensuel BUT (feuille "Report 1").
 * Les colonnes sont repérées par leur libellé, pas par leur position,
 * pour absorber un décalage de mise en forme.
 */
export async function parseWorkbook(buf: ArrayBuffer | Uint8Array, filename: string, forcedPeriod?: string): Promise<ParsedFile> {
  // Import différé : la librairie xlsx ne pèse sur le chargement que si on importe un fichier.
  const XLSX = await import('xlsx');
  const warnings: string[] = [];
  const wb = XLSX.read(buf, { type: 'array' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  if (!sheet) throw new Error('Fichier illisible : aucune feuille trouvée.');

  const grid = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, blankrows: true, defval: null });

  // Repérage de la ligne d'en-tête.
  let headerRow = -1;
  let colFamily = -1;
  let colOrdre = -1;
  let colSortie = -1;
  for (let i = 0; i < grid.length && headerRow < 0; i++) {
    const cells = (grid[i] ?? []).map(normalizeLabel);
    const fi = cells.indexOf(HEADER_FAMILY);
    if (fi < 0) continue;
    headerRow = i;
    colFamily = fi;
    colOrdre = cells.indexOf(normalizeLabel(HEADER_ORDRE));
    colSortie = cells.indexOf(normalizeLabel(HEADER_SORTIE));
  }
  if (headerRow < 0) throw new Error(`En-tête "${HEADER_FAMILY}" introuvable dans ${filename}.`);
  if (colOrdre < 0 || colSortie < 0) {
    // Repli : après le libellé viennent ordre, %N-1, sortie, %N-1.
    colOrdre = colFamily + 1;
    colSortie = colFamily + 3;
    warnings.push('Colonnes de CA repérées par position (en-têtes non reconnus).');
  }

  const period = forcedPeriod ?? periodFromFilename(filename);
  if (!period) throw new Error(`Impossible de déduire le mois depuis le nom "${filename}" (attendu : 04.25.xlsx).`);

  const byFamily = new Map<string, Row>();
  let fileTotals: ParsedFile['fileTotals'] = null;

  for (let i = headerRow + 1; i < grid.length; i++) {
    const r = grid[i] ?? [];
    const rawLabel = normalizeLabel(r[colFamily]);
    const ordre = toNumber(r[colOrdre]);
    const sortie = toNumber(r[colSortie]);

    if (/^SOMME\s*:?$/.test(rawLabel) || /^TOTAL/.test(rawLabel)) {
      fileTotals = { ordre: ordre ?? 0, sortie: sortie ?? 0 };
      continue;
    }
    if (ordre === null && sortie === null) continue; // ligne vide ou famille sans activité

    const family = rawLabel === '' ? UNASSIGNED : rawLabel;
    const prev = byFamily.get(family);
    if (prev) {
      prev.ordre += ordre ?? 0;
      prev.sortie += sortie ?? 0;
    } else {
      byFamily.set(family, { period, family, ordre: ordre ?? 0, sortie: sortie ?? 0 });
    }
  }

  const rows = [...byFamily.values()].sort((a, b) => a.family.localeCompare(b.family, 'fr'));
  if (rows.length === 0) warnings.push('Aucune ligne de chiffre détectée.');

  if (fileTotals) {
    const sumOrdre = rows.reduce((s, r) => s + r.ordre, 0);
    const sumSortie = rows.reduce((s, r) => s + r.sortie, 0);
    if (Math.abs(sumOrdre - fileTotals.ordre) > 1 || Math.abs(sumSortie - fileTotals.sortie) > 1) {
      warnings.push(
        `Écart avec le total du fichier : ordre ${sumOrdre.toFixed(2)} vs ${fileTotals.ordre.toFixed(2)}, ` +
        `sortie ${sumSortie.toFixed(2)} vs ${fileTotals.sortie.toFixed(2)}.`,
      );
    }
  }

  return { period, rows, fileTotals, warnings };
}
