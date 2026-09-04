import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Le mode Supabase n'est actif que si les deux variables d'environnement sont fournies. */
export const supabaseEnabled = Boolean(url && key);

/** Délai au-delà duquel on considère la base injoignable (réseau magasin coupé, projet en pause). */
const TIMEOUT_MS = 15000;

/** fetch avec expiration : sans lui, une coupure réseau laisse l'interface en chargement infini. */
const fetchWithTimeout: typeof fetch = async (input, init) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (e) {
    if ((e as Error).name === 'AbortError') {
      throw new Error(`Base Supabase injoignable (délai de ${TIMEOUT_MS / 1000} s dépassé).`);
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
};

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, key as string, {
      auth: { persistSession: false },
      global: { fetch: fetchWithTimeout },
    })
  : null;
