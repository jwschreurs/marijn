import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import { readSnapshot, writeSnapshot, type Sql } from '../src/lib/content-storage';
import { deleteSession, insertSession, sessionExists, takeLoginAttempt } from '../src/lib/session-storage';

test('Database integration: publication, conflicts, sessions and distributed login limits', async t => {
  const db = new PGlite();
  const schema = await readFile(new URL('../database/setup.sql', import.meta.url), 'utf8');
  await db.exec(schema);
  const sql: Sql = async (strings, ...values) => {
    const query = strings.reduce((text, part, i) => text + (i ? '$' + i : '') + part, '');
    return (await db.query<Record<string, unknown>>(query, values)).rows;
  };
  try {
    await t.test('First publish persists and stale/concurrent revisions never overwrite it', async () => {
      const initial = await readSnapshot(sql);
      assert.equal(initial.revision, 0);
      const first = await writeSnapshot(sql, { 'copy.home.heading1': "Tekst met 'quotes' en <script>" }, 0);
      assert.equal(first?.revision, 1);
      assert.equal(await writeSnapshot(sql, { 'copy.home.heading1': 'Overschreven' }, 0), null);
      assert.equal((await readSnapshot(sql)).overrides['copy.home.heading1'], "Tekst met 'quotes' en <script>");
      const race = await Promise.all([
        writeSnapshot(sql, { 'copy.home.heading1': 'Venster één' }, 1),
        writeSnapshot(sql, { 'copy.home.heading1': 'Venster twee' }, 1),
      ]);
      assert.equal(race.filter(Boolean).length, 1);
      await db.exec(schema);
      assert.equal((await readSnapshot(sql)).revision, 2);
      await assert.rejects(writeSnapshot(sql, { 'trainingen.0.slug': 'gevaarlijk' }, 2));
      assert.equal((await readSnapshot(sql)).revision, 2);
    });
    await t.test('Sessions require the correct token and current credential, expire and can be revoked', async () => {
      await insertSession(sql, 'token-hash', 'credential-v1');
      assert.equal(await sessionExists(sql, 'token-hash', 'credential-v1'), true);
      assert.equal(await sessionExists(sql, 'forged-token', 'credential-v1'), false);
      assert.equal(await sessionExists(sql, 'token-hash', 'credential-v2'), false);
      await sql`UPDATE admin_sessions SET expires_at = now() - interval '1 second'`;
      assert.equal(await sessionExists(sql, 'token-hash', 'credential-v1'), false);
      await insertSession(sql, 'new-token', 'credential-v2');
      await deleteSession(sql, 'new-token');
      assert.equal(await sessionExists(sql, 'new-token', 'credential-v2'), false);
    });
    await t.test('Concurrent login attempts are limited and reset only after the time window', async () => {
      const attempts = await Promise.all(Array.from({ length: 8 }, () => takeLoginAttempt(sql, 'ip:test')));
      assert.equal(attempts.filter(Boolean).length, 5);
      await sql`UPDATE admin_login_limits SET window_start = now() - interval '16 minutes'`;
      assert.equal(await takeLoginAttempt(sql, 'ip:test'), true);
      await sql`UPDATE admin_login_limits SET attempts = 40 WHERE bucket = 'global'`;
      assert.equal(await takeLoginAttempt(sql, 'ip:other'), false);
    });
  } finally { await db.close(); }
});
