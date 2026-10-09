'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import type { FormKind } from '@/lib/public-form-schema';

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string; action: string; language: string; size: string; 'response-field': boolean;
    callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void;
  }) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }
export function TurnstileChallenge({ siteKey, kind, onToken }: {
  siteKey: string; kind: FormKind; onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const api = window.turnstile;
    if (!loaded || !api || !container.current) return;
    const id = api.render(container.current, {
      sitekey: siteKey, action: kind, language: 'nl', size: 'compact', 'response-field': false,
      callback: token => { onToken(token); setFailed(false); setVerified(true); },
      'expired-callback': () => { onToken(''); setVerified(false); },
      'error-callback': () => { onToken(''); setFailed(true); setVerified(false); },
    });
    widget.current = id;
    return () => { api.remove(id); widget.current = null; };
  }, [loaded, siteKey, kind, onToken]);
  return <div className="form-bot-check">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      onReady={() => setLoaded(true)}
      onError={() => { onToken(''); setFailed(true); }} />
    <p className="form-note" aria-live="polite">{verified ? 'Spamcontrole voltooid.' : 'Doorloop de spamcontrole voordat je het formulier verstuurt.'}</p>
    <div ref={container} />
    {failed && <p className="form-note" role="alert">
      De spamcontrole is niet gelukt. Je invoer blijft staan.{' '}
      {loaded
        ? <button type="button" onClick={() => { onToken(''); setVerified(false); setFailed(false); if (widget.current !== null) window.turnstile?.reset(widget.current); }}>Probeer de controle opnieuw</button>
        : 'Controleer je verbinding of browserblokkering. Je kunt ook rechtstreeks mailen.'}
    </p>}
    <p className="form-note">Deze spamcontrole gebruikt Cloudflare Turnstile. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Privacy bij Cloudflare</a></p>
  </div>;
}
