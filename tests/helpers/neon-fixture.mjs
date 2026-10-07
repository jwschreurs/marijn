// Test-only Neon HTTP adapter backed by real PostgreSQL execution in PGlite.
// Never imported by the application or deployed as a route.
import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { scryptSync } from 'node:crypto';
if (process.env.CMS_TEST_MODE !== '1') throw new Error('This fixture only runs with CMS_TEST_MODE=1.');
const db = new PGlite();
await db.exec(await readFile(new URL('../../database/setup.sql', import.meta.url), 'utf8'));
process.env.DATABASE_URL = 'postgresql://fixture:fixture@cms-fixture.neon.tech/test';
const salt = '0'.repeat(32);
const hash = scryptSync('uitsluitend-lokaal-testwachtwoord', salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }).toString('hex');
process.env.ADMIN_PASSWORD_HASH = 'scrypt:' + salt + ':' + hash;
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
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
