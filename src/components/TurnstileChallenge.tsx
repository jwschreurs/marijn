'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import type { FormKind } from '@/lib/public-form-schema';

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string; action: string; language: string; size: string; theme: 'light'; appearance: 'interaction-only'; 'response-field': boolean;
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
      sitekey: siteKey, action: kind, language: 'nl', size: 'compact', theme: 'light', appearance: 'interaction-only', 'response-field': false,
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
    <div className="form-bot-check-heading">
      <span className="form-bot-check-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 4.5 6v5c0 4.5 3 7.8 7.5 10 4.5-2.2 7.5-5.5 7.5-10V6L12 3Z" />
          <path d="m8.5 12 2.3 2.3 4.7-4.7" />
        </svg>
      </span>
      <p className="form-bot-check-status" aria-live="polite">{verified ? 'Spamcontrole voltooid.' : 'Een korte controle tegen spam.'}</p>
    </div>
    <div ref={container} className="form-bot-check-widget" />
    {failed && <p className="form-bot-check-error" role="alert">
      De spamcontrole is niet gelukt. Je invoer blijft staan.{' '}
      {loaded
        ? <button className="form-bot-check-retry" type="button" onClick={() => { onToken(''); setVerified(false); setFailed(false); if (widget.current !== null) window.turnstile?.reset(widget.current); }}>Probeer de controle opnieuw</button>
        : 'Controleer je verbinding of browserblokkering. Je kunt ook rechtstreeks mailen.'}
    </p>}
    <p className="form-bot-check-privacy">Beveiligd met Cloudflare Turnstile. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Privacy</a></p>
  </div>;
}
