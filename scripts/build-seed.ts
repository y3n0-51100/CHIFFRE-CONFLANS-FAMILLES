/**
 * Convertit les exports mensuels de data/sources/*.xlsx en src/data/seed.json,
 * le jeu de données livré avec l'application.
 * Usage : npm run seed
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseWorkbook } from '../src/lib/parse.ts';
import type { Row } from '../src/lib/types.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'data', 'sources');
const outFile = join(root, 'src', 'data', 'seed.json');

const files = readdirSync(srcDir).filter((f) => /\.xlsx$/i.test(f)).sort();
const rows: Row[] = [];
let warnings = 0;

for (const f of files) {
  const buf = readFileSync(join(srcDir, f));
  const parsed = await parseWorkbook(buf, f);
  rows.push(...parsed.rows);
  for (const w of parsed.warnings) {
    warnings++;
    console.warn(`  ! ${f} : ${w}`);
  }
  const tot = parsed.rows.reduce((s, r) => s + r.ordre, 0);
  console.log(`${f} -> ${parsed.period}  ${parsed.rows.length} familles  ordre ${tot.toFixed(2)}`);
}

rows.sort((a, b) => a.period.localeCompare(b.period) || a.family.localeCompare(b.family, 'fr'));
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(rows));
console.log(`\n${rows.length} lignes, ${files.length} fichiers, ${warnings} avertissement(s) -> ${outFile}`);
