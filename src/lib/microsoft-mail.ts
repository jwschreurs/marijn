import type { FormMessage } from './public-form-schema';

export type MicrosoftMailConfig = { tenantId: string; clientId: string; clientSecret: string; sender: string };
export class MailDeliveryError extends Error {
  constructor(public readonly outcome: 'failed' | 'uncertain', public readonly code: string) { super(code); }
}
export function readMailConfig(env: Record<string, string | undefined>): MicrosoftMailConfig | null {
  const { MS365_TENANT_ID: tenantId, MS365_CLIENT_ID: clientId, MS365_CLIENT_SECRET: clientSecret, MS365_SENDER: sender } = env;
  const guid = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
  if (!tenantId || !guid.test(tenantId) || !clientId || !guid.test(clientId) || !clientSecret || !sender || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(sender)) return null;
  return { tenantId, clientId, clientSecret, sender };
}
// Only called from the server action. Never log credentials, tokens or message contents.
export async function sendMicrosoftMail(config: MicrosoftMailConfig, recipient: string, message: FormMessage, request: typeof fetch = fetch) {
  let token: unknown;
  try {
    const response = await request('https://login.microsoftonline.com/' + config.tenantId + '/oauth2/v2.0/token', {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ client_id: config.clientId, client_secret: config.clientSecret, scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials' }),
    });
    if (!response.ok) throw new MailDeliveryError('failed', 'token-http-' + response.status);
    const body: unknown = await response.json();
    token = body && typeof body === 'object' && 'access_token' in body ? body.access_token : null;
    if (typeof token !== 'string' || !token) throw new MailDeliveryError('failed', 'token-missing');
  } catch (error) {
    if (error instanceof MailDeliveryError) throw error;
    throw new MailDeliveryError('failed', 'token-unavailable');
  }
  let response: Response;
  try {
    response = await request('https://graph.microsoft.com/v1.0/users/' + encodeURIComponent(config.sender) + '/sendMail', {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(15_000),
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: {
        subject: message.subject, body: { contentType: 'Text', content: message.text },
        toRecipients: [{ emailAddress: { address: recipient } }],
        replyTo: [{ emailAddress: { address: message.replyTo } }],
      } }),
    });
  } catch { throw new MailDeliveryError('uncertain', 'send-unavailable'); }
  if (response.status !== 202) throw new MailDeliveryError(response.status >= 500 ? 'uncertain' : 'failed', 'send-http-' + response.status);
}
