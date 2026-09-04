/**
 * Verrou d'accès simple : l'application est un outil de pilotage interne,
 * le mot de passe filtre l'accès à l'interface, il ne chiffre pas les données.
 * Pour un vrai cloisonnement, activer Supabase Auth (voir README).
 */
const PASSWORD = 'Remi51100$$$';
const SESSION_KEY = 'ccf.auth.v1';

export function checkPassword(input: string): boolean {
  return input === PASSWORD;
}

export function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function unlock(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* mode navigation privée restreint : la session reste en mémoire */
  }
}

export function lock(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* rien à nettoyer */
  }
}
