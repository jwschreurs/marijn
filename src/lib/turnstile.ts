import type { FormKind } from './public-form-schema';
export type TurnstileConfig = { siteKey: string; secretKey: string; hostnames: string[] };
export function readTurnstileConfig(env: Record<string, string | undefined>): TurnstileConfig | null {
  const siteKey = env.TURNSTILE_SITE_KEY?.trim();
  const secretKey = env.TURNSTILE_SECRET_KEY?.trim();
  const hostnames = (env.TURNSTILE_HOSTNAMES ?? 'marijnmetaandacht.nl,www.marijnmetaandacht.nl')
    .split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  if (!siteKey || !secretKey || !hostnames.length || hostnames.some(host => !/^[a-z0-9.-]+$/.test(host))) return null;
  // Official dummy keys must never protect a production deployment.
  if (env.VERCEL_ENV === 'production' && [siteKey, secretKey].some(key => /^[123]x0+/.test(key))) return null;
  return { siteKey, secretKey, hostnames };
}
export async function verifyTurnstile(config: TurnstileConfig, token: unknown, action: FormKind, request: typeof fetch = fetch): Promise<boolean> {
  if (typeof token !== 'string' || !token.trim() || token.length > 2048) return false;
  try {
    const response = await request('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret: config.secretKey, response: token }),
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object') return false;
    return 'success' in result && result.success === true
      && 'hostname' in result && typeof result.hostname === 'string' && config.hostnames.includes(result.hostname.toLowerCase())
      && 'action' in result && result.action === action;
  } catch { return false; }
}
