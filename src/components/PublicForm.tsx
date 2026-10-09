'use client';

import { useEffect, useRef, useState, useSyncExternalStore, useTransition, type FormEvent, type ReactNode } from 'react';
import { submitPublicForm } from '@/app/form-actions';
import type { FormKind, FormResult } from '@/lib/public-form-schema';

const subscribeToHydration = () => () => {};

type Props = {
  kind: FormKind; className: string; children: ReactNode; buttonLabel: string;
  email: string; configured: boolean; describedBy?: string;
};
export function PublicForm({ kind, className, children, buttonLabel, email, configured, describedBy }: Props) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const feedback = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const submission = useRef<{ id: string; snapshot: string } | null>(null);
  useEffect(() => { if (result) feedback.current?.focus(); }, [result]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || !configured) return;
    const data = new FormData(event.currentTarget);
    const snapshot = JSON.stringify(Array.from(data.entries()));
    if (!submission.current || submission.current.snapshot !== snapshot) submission.current = { id: crypto.randomUUID(), snapshot };
    const id = submission.current.id;
    sending.current = true;
    setResult(null);
    startTransition(async () => {
      try { setResult(await submitPublicForm(kind, data, id)); }
      catch { setResult({ status: 'error', message: 'We kunnen niet bevestigen of je formulier is verzonden. Je invoer blijft staan. Neem contact op via ' + email + ' voordat je opnieuw verstuurt.' }); }
      finally { sending.current = false; }
    });
  }
  return (
    <form className={className} onSubmit={submit} aria-describedby={describedBy} aria-busy={pending}>
      {result?.status !== 'success' && <>
        {!configured && <p className="form-feedback form-feedback-error">Online versturen is momenteel niet beschikbaar. Je kunt mailen naar <a href={'mailto:' + email}>{email}</a>.</p>}
        <fieldset className="public-form-fields" disabled={pending}>
          <legend className="sr-only">{kind === 'registration' ? 'Inschrijving' : 'Contactaanvraag'}</legend>
          {children}
          <div className="form-honeypot" aria-hidden="true">
            <label>Laat dit veld leeg<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <button type="submit" className="button primary" disabled={pending || !ready || !configured}>{pending ? 'Bezig met verzenden…' : buttonLabel}</button>
        </fieldset>
        <noscript><p>Schakel JavaScript in om het formulier te versturen, of mail naar <a href={'mailto:' + email}>{email}</a>.</p></noscript>
      </>}
      {result && <div ref={feedback} tabIndex={-1} role={result.status === 'success' ? 'status' : 'alert'} className={'form-feedback form-feedback-' + result.status}>{result.message}</div>}
    </form>
  );
}
