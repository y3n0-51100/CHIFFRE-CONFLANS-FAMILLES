import { useState } from 'react';
import { signInShared, signInWithAccount, type Session } from '../lib/session.ts';
import { supabaseEnabled } from '../lib/supabase.ts';

type Mode = 'compte' | 'poste';

export default function Login({ onSession }: { onSession: (s: Session) => void }) {
  // Le compte nominatif n'a de sens qu'une fois des comptes créés : par défaut,
  // l'écran s'ouvre sur le mot de passe du magasin, le mode réellement utilisé.
  const [mode, setMode] = useState<Mode>('poste');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === 'poste') {
      const s = signInShared(password);
      if (s) onSession(s);
      else { setError('Mot de passe incorrect.'); setPassword(''); }
      return;
    }
    setBusy(true);
    try {
      onSession(await signInWithAccount(email.trim(), password));
    } catch (err) {
      setError((err as Error).message);
      setPassword('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={submit}>
        <span className="login-mark" aria-hidden="true"><i /><i /><i /></span>
        <h1>BUT Conflans</h1>
        <p>Pilotage du magasin 275 — accès réservé</p>

        {supabaseEnabled && (
          <div className="segmented" style={{ marginBottom: 16 }}>
            <button type="button" className={mode === 'poste' ? 'active' : ''} onClick={() => { setMode('poste'); setError(null); }}>
              Mot de passe du magasin
            </button>
            <button type="button" className={mode === 'compte' ? 'active' : ''} onClick={() => { setMode('compte'); setError(null); }}>
              Compte personnel
            </button>
          </div>
        )}

        {mode === 'compte' && (
          <input
            type="email" autoFocus placeholder="Adresse e-mail" autoComplete="username"
            value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }}
          />
        )}
        <input
          type="password" autoFocus={mode === 'poste'} placeholder="Mot de passe" autoComplete="current-password"
          key={mode}
          value={password} onChange={(e) => { setPassword(e.target.value); setError(null); }}
        />
        {error && <p className="login-error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Connexion…' : 'Accéder'}
        </button>
        <p className="note" style={{ textAlign: 'center' }}>
          {mode === 'compte'
            ? "Compte personnel : chaque saisie est signée de votre nom. Demande qu'un compte ait été créé."
            : 'Mot de passe du magasin : accès complet, sans traçabilité des saisies.'}
        </p>
      </form>
    </div>
  );
}
