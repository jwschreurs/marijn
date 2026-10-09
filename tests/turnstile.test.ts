import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readTurnstileConfig, verifyTurnstile } from '../src/lib/turnstile';
import { confirmationMessage, trySendConfirmation } from '../src/lib/form-confirmation';

const config = { siteKey: 'site', secretKey: 'secret', hostnames: ['marijnmetaandacht.nl'] };
test('Spam verification fails closed for missing, forged, expired or mismatched tokens and service outages', async () => {
  assert.equal(readTurnstileConfig({}), null);
  assert.equal(readTurnstileConfig({ TURNSTILE_SITE_KEY: 'site', TURNSTILE_SECRET_KEY: 'secret', TURNSTILE_HOSTNAMES: '*.example.com' }), null);
  assert.equal(readTurnstileConfig({ TURNSTILE_SITE_KEY: '1x00000000000000000000AA', TURNSTILE_SECRET_KEY: 'secret', VERCEL_ENV: 'production' }), null);
  let calls = 0;
  const valid: typeof fetch = async (_url, init) => {
    calls++;
    assert.equal(new URLSearchParams(String(init?.body)).get('secret'), 'secret');
    return Response.json({ success: true, hostname: 'marijnmetaandacht.nl', action: 'inquiry' });
  };
  for (const token of ['', null, 'x'.repeat(2049)]) assert.equal(await verifyTurnstile(config, token, 'inquiry', valid), false);
  assert.equal(calls, 0);
  assert.equal(await verifyTurnstile(config, 'token', 'inquiry', valid), true);
  for (const result of [
    { success: false, 'error-codes': ['timeout-or-duplicate'] },
    { success: true, hostname: 'evil.example', action: 'inquiry' },
    { success: true, hostname: 'marijnmetaandacht.nl', action: 'registration' },
    { success: 'true', hostname: 'marijnmetaandacht.nl', action: 'inquiry' },
    {},
  ]) assert.equal(await verifyTurnstile(config, 'token', 'inquiry', async () => Response.json(result)), false);
  assert.equal(await verifyTurnstile(config, 'token', 'inquiry', async () => new Response(null, { status: 503 })), false);
  assert.equal(await verifyTurnstile(config, 'token', 'inquiry', async () => { throw new Error('offline'); }), false);
});
test('Confirmation has fixed copy, correct reply address and failures cannot invalidate the owner delivery', async () => {
  for (const kind of ['inquiry', 'registration'] as const) {
    const message = confirmationMessage(kind);
    assert.equal(message.replyTo, 'info@marijnmetaandacht.nl');
    assert.match(message.text, /Heb je zelf geen formulier ingevuld/);
  }
  assert.match(confirmationMessage('registration').text, /nog niet definitief/);
  let sends = 0;
  assert.equal(await trySendConfirmation('inquiry', 'visitor@example.invalid', async () => true, async (recipient, message) => {
    sends++;
    assert.equal(recipient, 'visitor@example.invalid');
    assert.equal(message.subject, confirmationMessage('inquiry').subject);
  }), true);
  assert.equal(sends, 1);
  assert.equal(await trySendConfirmation('inquiry', 'visitor@example.invalid', async () => false, async () => { sends++; }), false);
  assert.equal(await trySendConfirmation('inquiry', 'info@marijnmetaandacht.nl', async () => true, async () => { sends++; }), false);
  assert.equal(sends, 1);
  assert.equal(await trySendConfirmation('registration', 'visitor@example.invalid', async () => true, async () => { throw new Error('mail rejected'); }), false);
  assert.equal(await trySendConfirmation('registration', 'visitor@example.invalid', async () => { throw new Error('database offline'); }, async () => { sends++; }), false);
});
