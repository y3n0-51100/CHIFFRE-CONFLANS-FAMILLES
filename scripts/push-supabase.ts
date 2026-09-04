/**
 * Charge src/data/seed.json dans la table Supabase `monthly_sales`.
 * Usage :
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_KEY=<clé> node --experimental-strip-types scripts/push-supabase.ts
 * La clé peut être la clé publiable (anon) si les policies l'autorisent,
 * ou la clé de service pour un chargement initial.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import type { Row } from '../src/lib/types.ts';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
if (!url || !key) {
  console.error('SUPABASE_URL et SUPABASE_KEY sont requis.');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rows = JSON.parse(readFileSync(join(root, 'src', 'data', 'seed.json'), 'utf8')) as Row[];
const db = createClient(url, key);

const chunk = 500;
for (let i = 0; i < rows.length; i += chunk) {
  const slice = rows.slice(i, i + chunk);
  const { error } = await db.from('monthly_sales').upsert(slice, { onConflict: 'period,family' });
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  console.log(`${Math.min(i + chunk, rows.length)}/${rows.length}`);
}
console.log('Chargement terminé.');
