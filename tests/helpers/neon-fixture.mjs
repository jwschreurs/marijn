// Test-only Neon HTTP adapter backed by real PostgreSQL execution in PGlite.
// Never imported by the application or deployed as a route.
import { PGlite } from '@electric-sql/pglite';
import { readFile, mkdir, writeFile, appendFile } from 'node:fs/promises';
import { scryptSync } from 'node:crypto';
if (process.env.CMS_TEST_MODE !== '1') throw new Error('This fixture only runs with CMS_TEST_MODE=1.');
const db = new PGlite();
await db.exec(await readFile(new URL('../../database/setup.sql', import.meta.url), 'utf8'));
process.env.DATABASE_URL = 'postgresql://fixture:fixture@cms-fixture.neon.tech/test';
const salt = '0'.repeat(32);
const hash = scryptSync('uitsluitend-lokaal-testwachtwoord', salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }).toString('hex');
process.env.ADMIN_PASSWORD_HASH = 'scrypt:' + salt + ':' + hash;
await db.exec(await readFile(new URL('../../database/formulieren.sql', import.meta.url), 'utf8'));
process.env.MS365_TENANT_ID = '00000000-0000-4000-8000-000000000001';
process.env.MS365_CLIENT_ID = '00000000-0000-4000-8000-000000000002';
process.env.MS365_CLIENT_SECRET = 'fixture-only-not-a-real-secret';
process.env.MS365_SENDER = 'info@example.invalid';
await mkdir('test-results', { recursive: true });
await writeFile('test-results/form-mails.jsonl', '');
process.env.TURNSTILE_SITE_KEY = 'fixture-site-key';
process.env.TURNSTILE_SECRET_KEY = 'fixture-secret-key';
process.env.TURNSTILE_HOSTNAMES = 'localhost';
process.env.VERCEL = '1';
const usedTokens = new Set();
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (String(url).startsWith('https://challenges.cloudflare.com/turnstile/v0/siteverify')) {
    const token = new URLSearchParams(options.body).get('response');
    if (!token?.startsWith('fixture:') || usedTokens.has(token)) return Response.json({ success: false });
    usedTokens.add(token);
    return Response.json({ success: true, hostname: 'localhost', action: token.split(':')[1] });
  }
  if (String(url).startsWith('https://login.microsoftonline.com/')) return Response.json({ access_token: 'fixture-only-token' });
  if (String(url).startsWith('https://graph.microsoft.com/')) {
    const { message } = JSON.parse(options.body);
    if (message.toRecipients[0].emailAddress.address === 'confirmation-fails@example.invalid') return new Response(null, { status: 403 });
    if (message.replyTo[0].emailAddress.address === 'reject@example.invalid') return new Response(null, { status: 403 });
    if (message.replyTo[0].emailAddress.address === 'uncertain@example.invalid') throw new Error('Fixture connection lost');
    await appendFile('test-results/form-mails.jsonl', JSON.stringify(message) + '\n');
    return new Response(null, { status: 202 });
  }
  if (!String(url).includes('neon.tech')) return originalFetch(url, options);
  try {
    const { query, params } = JSON.parse(options.body);
    const result = await db.query(query, params);
    const rows = result.rows.map(row => result.fields.map(field => {
      const value = row[field.name];
      if (value == null) return null;
      if (field.dataTypeID === 114 || field.dataTypeID === 3802) return JSON.stringify(value);
      if (value instanceof Date) return value.toISOString().replace('T', ' ').replace('Z', '+00');
      if (typeof value === 'boolean') return value ? 't' : 'f';
      return String(value);
    }));
    return Response.json({ fields: result.fields, rows, rowCount: result.affectedRows ?? rows.length, command: 'SELECT' });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
};
