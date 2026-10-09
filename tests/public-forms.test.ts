import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { parsePublicForm } from '../src/lib/public-form-schema';
import { MailDeliveryError, readMailConfig, sendMicrosoftMail } from '../src/lib/microsoft-mail';
import { claimDelivery, finishDelivery, takeFormAttempt, reserveConfirmation } from '../src/lib/public-form-storage';
import type { Sql } from '../src/lib/content-storage';

const form = (values: Record<string, string> = {}) => {
  const data = new FormData();
  for (const [key, value] of Object.entries({ naam: 'Test Deelnemer', email: 'test@example.invalid', ...values })) data.set(key, value);
  return data;
};
test('Forms validate required fields, choices, lengths and header injection', () => {
  const registration = parsePublicForm('registration', form({ 'reden-deelname': 'Rust\nen aandacht', 'dagelijks-oefenen': 'bespreken-tijdens-intake' }), []);
  assert.match(registration.text, /Rust\nen aandacht/);
  assert.match(registration.text, /Bespreken tijdens intake/);
  assert.equal(registration.replyTo, 'test@example.invalid');
  const invalidInputs: Record<string, string>[] = [{ naam: '' }, { email: 'test@example.invalid\r\nBcc: victim@example.invalid' }, { naam: 'x'.repeat(151) }, { 'dagelijks-oefenen': '__proto__' }, { telefoon: '<script>' }, { 'reden-deelname': 'x'.repeat(5001) }];
  for (const values of invalidInputs) assert.throws(() => parsePublicForm('registration', form(values), []));
  assert.throws(() => parsePublicForm('unknown', form(), []));
  assert.throws(() => parsePublicForm('inquiry', form({ interesse: 'Verzonnen' }), ['Training']));
  assert.match(parsePublicForm('inquiry', form({ interesse: 'Training', bericht: '<script>tekst</script>' }), ['Training']).text, /<script>tekst<\/script>/);
  const duplicated = form(); duplicated.append('email', 'other@example.invalid');
  assert.throws(() => parsePublicForm('registration', duplicated, []));
  const file = form(); file.set('naam', new Blob(['not a name']));
  assert.throws(() => parsePublicForm('registration', file, []));
});

const config = { tenantId: '00000000-0000-4000-8000-000000000001', clientId: '00000000-0000-4000-8000-000000000002', clientSecret: 'test-only-secret', sender: 'info@example.invalid' };
test('Microsoft mail uses app authentication, fixed recipient, plain text and visitor Reply-To', async () => {
  assert.equal(readMailConfig({}), null);
  assert.equal(readMailConfig({ MS365_TENANT_ID: '../common', MS365_CLIENT_ID: config.clientId, MS365_CLIENT_SECRET: 'x', MS365_SENDER: config.sender }), null);
  assert.deepEqual(readMailConfig({ MS365_TENANT_ID: config.tenantId, MS365_CLIENT_ID: config.clientId, MS365_CLIENT_SECRET: config.clientSecret, MS365_SENDER: config.sender }), config);
  const calls: { url: string; init?: RequestInit }[] = [];
  const fake: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return calls.length === 1 ? Response.json({ access_token: 'test-token' }) : new Response(null, { status: 202 });
  };
  await sendMicrosoftMail(config, 'info@marijnmetaandacht.nl', parsePublicForm('registration', form(), []), fake);
  assert.match(calls[0].url, /login.microsoftonline.com/);
  assert.equal(new URLSearchParams(String(calls[0].init?.body)).get('grant_type'), 'client_credentials');
  assert.match(calls[1].url, /users\/info%40example.invalid\/sendMail$/);
  const body = JSON.parse(String(calls[1].init?.body));
  assert.equal(body.message.toRecipients[0].emailAddress.address, 'info@marijnmetaandacht.nl');
  assert.equal(body.message.replyTo[0].emailAddress.address, 'test@example.invalid');
  assert.equal(body.message.body.contentType, 'Text');
  assert.equal(body.message.ccRecipients, undefined);
  assert.equal(calls[1].init?.cache, 'no-store');
});
test('Microsoft rejection or ambiguous delivery never counts as success or triggers a retry', async () => {
  for (const status of [400, 401, 403, 429, 500]) {
    let calls = 0;
    const fake: typeof fetch = async () => ++calls === 1 ? Response.json({ access_token: 'test-token' }) : new Response(null, { status });
    await assert.rejects(sendMicrosoftMail(config, config.sender, parsePublicForm('registration', form(), []), fake), (error: unknown) => error instanceof MailDeliveryError && error.outcome === (status >= 500 ? 'uncertain' : 'failed'));
    assert.equal(calls, 2);
  }
  let calls = 0;
  const timeout: typeof fetch = async () => { if (++calls === 1) return Response.json({ access_token: 'test-token' }); throw new Error('connection lost'); };
  await assert.rejects(sendMicrosoftMail(config, config.sender, parsePublicForm('registration', form(), []), timeout), (error: unknown) => error instanceof MailDeliveryError && error.outcome === 'uncertain');
  assert.equal(calls, 2);
  await assert.rejects(sendMicrosoftMail(config, config.sender, parsePublicForm('registration', form(), []), async () => Response.json({ error: 'invalid_client' }, { status: 401 })), (error: unknown) => error instanceof MailDeliveryError && error.outcome === 'failed');
});
test('Database deduplicates concurrent sends, permits rejected retries, blocks uncertain delivery and limits abuse', async () => {
  const db = new PGlite();
  try {
    const schema = await readFile(new URL('../database/formulieren.sql', import.meta.url), 'utf8');
    await db.exec(schema); await db.exec(schema);
    const sql: Sql = async (strings, ...values) => (await db.query<Record<string, unknown>>(strings.reduce((text, part, i) => text + (i ? '$' + i : '') + part, ''), values)).rows;
    const id = '00000000-0000-4000-8000-000000000001';
    const race = await Promise.all(Array.from({ length: 5 }, () => claimDelivery(sql, id, 'hash')));
    assert.equal(race.filter(value => value === 'claimed').length, 1);
    await finishDelivery(sql, id, 'failed');
    assert.equal(await claimDelivery(sql, id, 'different'), 'conflict');
    assert.equal(await claimDelivery(sql, id, 'hash'), 'claimed');
    await finishDelivery(sql, id, 'uncertain');
    assert.equal(await claimDelivery(sql, id, 'hash'), 'uncertain');
    await finishDelivery(sql, id, 'sent');
    assert.equal(await claimDelivery(sql, id, 'hash'), 'sent');
    const confirmations = await Promise.all(Array.from({ length: 8 }, () => reserveConfirmation(sql, 'recipient-hash')));
    assert.equal(confirmations.filter(Boolean).length, 1);
    await sql`UPDATE public_form_limits SET window_start = now() - interval '61 minutes' WHERE bucket = 'confirmation:recipient-hash'`;
    assert.equal(await reserveConfirmation(sql, 'recipient-hash'), true);
    const attempts = await Promise.all(Array.from({ length: 8 }, () => takeFormAttempt(sql, 'ip:test')));
    assert.equal(attempts.filter(Boolean).length, 5);
    await sql`UPDATE public_form_limits SET window_start = now() - interval '61 minutes'`;
    assert.equal(await takeFormAttempt(sql, 'ip:test'), true);
    await sql`UPDATE public_form_limits SET attempts = 50 WHERE bucket = 'global'`;
    assert.equal(await takeFormAttempt(sql, 'ip:other'), false);
    await sql`UPDATE public_form_deliveries SET created_at = now() - interval '2 days'`;
    assert.equal(await claimDelivery(sql, id, 'new-day'), 'claimed');
  } finally { await db.close(); }
});
