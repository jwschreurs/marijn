import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hashPassword, verifyPassword } from '../src/lib/password';

test('Password hashing uses unique salts and rejects wrong or malformed credentials', async () => {
  const password = 'uitsluitend-een-testwachtwoord';
  const one = await hashPassword(password);
  const two = await hashPassword(password);
  assert.notEqual(one, two);
  assert.equal(await verifyPassword(password, one), true);
  assert.equal(await verifyPassword('verkeerd-wachtwoord', one), false);
  assert.equal(await verifyPassword(password, 'invalid'), false);
  assert.equal(await verifyPassword('a'.repeat(257), one), false);
  await assert.rejects(hashPassword('kort'));
});
