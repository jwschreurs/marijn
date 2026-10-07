'use client';

import { useActionState } from 'react';
import { login } from '@/app/beheer/actions';

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: '' });
  return <form action={action} className="admin-login-form">
    <label htmlFor="admin-password">Wachtwoord</label>
    <input id="admin-password" name="password" type="password" required maxLength={256}
      autoComplete="current-password" aria-describedby={state.error ? 'login-error' : undefined} />
    {state.error && <p id="login-error" role="alert" className="admin-error">{state.error}</p>}
    <button type="submit" className="button primary" disabled={pending}>{pending ? 'Bezig met inloggen…' : 'Inloggen'}</button>
  </form>;
}
