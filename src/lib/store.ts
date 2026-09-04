import type { Row } from './types.ts';
import seed from '../data/seed.json';
import { supabase, supabaseEnabled } from './supabase.ts';

const LS_KEY = 'ccf.rows.v1';
const LS_SEEDED = 'ccf.seeded.v1';

export type StoreMode = 'supabase' | 'local';
export const storeMode: StoreMode = supabaseEnabled ? 'supabase' : 'local';

function readLocal(): Row[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as Row[];
  } catch {
    /* stockage indisponible : on repart du jeu livré */
  }
  return [];
}

function writeLocal(rows: Row[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(rows));
}

/** Remplace toutes les lignes d'un mois par celles fournies. */
function mergeMonth(rows: Row[], period: string, incoming: Row[]): Row[] {
  return [...rows.filter((r) => r.period !== period), ...incoming].sort(
    (a, b) => a.period.localeCompare(b.period) || a.family.localeCompare(b.family, 'fr'),
  );
}

export async function loadRows(): Promise<Row[]> {
  if (supabase) {
    // Pagination : Supabase plafonne à 1000 lignes par requête.
    const all: Row[] = [];
    const page = 1000;
    for (let from = 0; ; from += page) {
      const { data, error } = await supabase
        .from('monthly_sales')
        .select('period, family, ordre, sortie')
        .order('period')
        .range(from, from + page - 1);
      if (error) throw new Error(error.message);
      all.push(...((data ?? []) as Row[]));
      if (!data || data.length < page) break;
    }
    return all;
  }

  const local = readLocal();
  if (local.length > 0 || localStorage.getItem(LS_SEEDED) === '1') return local;
  // Premier lancement : on charge l'historique livré avec l'application.
  const initial = seed as Row[];
  writeLocal(initial);
  localStorage.setItem(LS_SEEDED, '1');
  return initial;
}

export async function saveMonth(period: string, incoming: Row[]): Promise<void> {
  if (supabase) {
    const { error: delErr } = await supabase.from('monthly_sales').delete().eq('period', period);
    if (delErr) throw new Error(delErr.message);
    if (incoming.length) {
      const { error } = await supabase.from('monthly_sales').insert(incoming);
      if (error) throw new Error(error.message);
    }
    return;
  }
  writeLocal(mergeMonth(readLocal(), period, incoming));
  localStorage.setItem(LS_SEEDED, '1');
}

export async function deleteMonth(period: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('monthly_sales').delete().eq('period', period);
    if (error) throw new Error(error.message);
    return;
  }
  writeLocal(readLocal().filter((r) => r.period !== period));
}

/** Repart du jeu de données livré (mode local uniquement). */
export async function resetToSeed(): Promise<Row[]> {
  const initial = seed as Row[];
  if (supabase) {
    await supabase.from('monthly_sales').delete().neq('period', '');
    const chunk = 500;
    for (let i = 0; i < initial.length; i += chunk) {
      const { error } = await supabase.from('monthly_sales').insert(initial.slice(i, i + chunk));
      if (error) throw new Error(error.message);
    }
    return initial;
  }
  writeLocal(initial);
  localStorage.setItem(LS_SEEDED, '1');
  return initial;
}
