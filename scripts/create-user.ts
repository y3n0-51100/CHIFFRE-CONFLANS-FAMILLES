/**
 * Création d'un compte nominatif.
 *
 * À lancer depuis un poste de confiance, avec la clé de service Supabase —
 * jamais depuis le navigateur, jamais versionnée :
 *
 *   SUPABASE_URL=https://xxxx.supabase.co \
 *   SUPABASE_SERVICE_KEY=<clé service_role> \
 *   npm run user:create -- marie@exemple.fr "Marie Dupont" chef_rayon "LITERIE,SIEGE"
 *
 * Le mot de passe initial est généré et affiché une seule fois : le transmettre
 * à la personne, qui pourra le changer depuis Supabase.
 */
import { createClient } from '@supabase/supabase-js';

const [email, nom, role = 'vendeur', rayons = ''] = process.argv.slice(2);
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!email || !nom) {
  console.error('Usage : npm run user:create -- <email> "<Nom Prénom>" [directeur|chef_rayon|vendeur] ["FAMILLE1,FAMILLE2"]');
  process.exit(1);
}
if (!url || !key) {
  console.error('SUPABASE_URL et SUPABASE_SERVICE_KEY sont requis.');
  process.exit(1);
}
if (!['directeur', 'chef_rayon', 'vendeur'].includes(role)) {
  console.error(`Rôle inconnu : ${role}`);
  process.exit(1);
}

const password = Array.from(crypto.getRandomValues(new Uint8Array(9)))
  .map((b) => 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b % 55])
  .join('');

const admin = createClient(url, key, { auth: { persistSession: false } });

const { data, error } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});
if (error) {
  console.error(`Création refusée : ${error.message}`);
  process.exit(1);
}

const { error: profileError } = await admin.from('profiles').insert({
  id: data.user.id,
  nom,
  role,
  rayons: rayons ? rayons.split(',').map((r) => r.trim().toUpperCase()).filter(Boolean) : [],
});
if (profileError) {
  console.error(`Compte créé mais fiche non enregistrée : ${profileError.message}`);
  process.exit(1);
}

console.log(`Compte créé pour ${nom} (${email}), rôle ${role}.`);
console.log(`Mot de passe initial : ${password}`);
console.log('À transmettre en main propre : il ne sera plus affiché.');
