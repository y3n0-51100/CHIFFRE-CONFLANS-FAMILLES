/**
 * Identité et droits.
 *
 * Deux façons d'entrer :
 *  - **compte nominatif** (Supabase Auth) : e-mail + mot de passe personnels, rôle et
 *    rayons lus dans la table `profiles`. Chaque saisie est signée du nom de la personne.
 *  - **poste partagé** : le mot de passe unique historique, conservé pour ne pas bloquer
 *    l'usage actuel. Il ouvre tout, mais ne trace rien : à réserver au poste de direction.
 *
 * Le mot de passe partagé vit dans le code servi au navigateur : il se lit dans le bundle.
 * Dès que l'accès dépasse le bureau, il faut des comptes (voir README, section Sécurité).
 */
import { supabase, supabaseEnabled } from './supabase.ts';
import { checkPassword, isUnlocked, lock as lockShared, unlock as unlockShared } from './auth.ts';

export type Role = 'directeur' | 'chef_rayon' | 'vendeur';

export const ROLE_LABELS: Record<Role, string> = {
  directeur: 'Direction',
  chef_rayon: 'Chef de rayon',
  vendeur: 'Vendeur',
};

export type Session = {
  name: string;
  email: string | null;
  role: Role;
  /** Familles confiées (vide = tout le magasin). */
  rayons: string[];
  /** `compte` = identité nominative, `poste` = mot de passe partagé. */
  mode: 'compte' | 'poste';
};

export const SHARED_SESSION: Session = {
  name: 'Poste magasin',
  email: null,
  role: 'directeur',
  rayons: [],
  mode: 'poste',
};

/** Écrans visibles par rôle. Le prévisionnel porte le R.C.A.I : direction seule. */
const VISIBLE: Record<Role, string[]> = {
  directeur: ['aujourdhui', 'suivi', 'previsionnel', 'synthese', 'familles', 'budget', 'stock', 'brief', 'import'],
  chef_rayon: ['aujourdhui', 'suivi', 'synthese', 'familles', 'stock', 'brief'],
  vendeur: ['aujourdhui', 'familles'],
};

export const canSee = (session: Session, tab: string): boolean => VISIBLE[session.role].includes(tab);

/** Une personne n'a le droit de saisir que si elle n'est pas simple vendeur. */
export const canEdit = (session: Session): boolean => session.role !== 'vendeur';

/** Périmètre de familles : null = tout le magasin. */
export const scopeOf = (session: Session): string[] | null =>
  session.rayons.length > 0 ? session.rayons : null;

async function profileOf(userId: string, email: string): Promise<Session> {
  const fallback: Session = { name: email, email, role: 'vendeur', rayons: [], mode: 'compte' };
  if (!supabase) return fallback;
  const { data } = await supabase
    .from('profiles')
    .select('nom, role, rayons')
    .eq('id', userId)
    .maybeSingle();
  if (!data) return fallback;
  return {
    name: (data.nom as string) || email,
    email,
    role: (data.role as Role) ?? 'vendeur',
    rayons: (data.rayons as string[]) ?? [],
    mode: 'compte',
  };
}

/** Session en cours au démarrage : compte Supabase, sinon déverrouillage partagé. */
export async function restoreSession(): Promise<Session | null> {
  if (supabaseEnabled && supabase) {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (user?.email) return profileOf(user.id, user.email);
  }
  return isUnlocked() ? SHARED_SESSION : null;
}

export async function signInWithAccount(email: string, password: string): Promise<Session> {
  if (!supabase) throw new Error("Les comptes nominatifs demandent la configuration Supabase.");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message === 'Invalid login credentials'
    ? 'Identifiant ou mot de passe incorrect.'
    : error.message);
  const user = data.user;
  if (!user?.email) throw new Error('Compte sans adresse e-mail.');
  return profileOf(user.id, user.email);
}

/** Entrée par le mot de passe unique du magasin. */
export function signInShared(password: string): Session | null {
  if (!checkPassword(password)) return null;
  unlockShared();
  return SHARED_SESSION;
}

export async function signOut(): Promise<void> {
  lockShared();
  if (supabase) await supabase.auth.signOut();
}

/** Signature apposée sur chaque écriture, pour savoir qui a saisi quoi. */
export const stamp = (session: Session) => ({
  updatedBy: session.name,
  updatedAt: new Date().toISOString(),
});
