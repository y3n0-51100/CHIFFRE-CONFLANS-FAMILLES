import { useState } from 'react';
import { checkPassword, unlock } from '../lib/auth.ts';

export default function Login({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(value)) {
      unlock();
      onUnlock();
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={submit}>
        <h1>Chiffre Conflans</h1>
        <p>Analyse du chiffre d'affaires par famille</p>
        <input
          type="password"
          autoFocus
          placeholder="Mot de passe"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
        />
        {error && <p className="login-error">Mot de passe incorrect.</p>}
        <button className="btn btn-primary" type="submit">Accéder</button>
      </form>
    </div>
  );
}
