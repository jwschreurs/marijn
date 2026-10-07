import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

function derive(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 },
      (error, key) => error ? reject(error) : resolve(key));
  });
}
export function isPasswordHash(value: string | undefined): value is string {
  return Boolean(value && /^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(value));
}
export async function hashPassword(password: string) {
  if (password.length < 14 || password.length > 256) throw new Error('Gebruik een wachtwoord van 14 tot 256 tekens.');
  const salt = randomBytes(16).toString('hex');
  return 'scrypt:' + salt + ':' + (await derive(password, salt)).toString('hex');
}
export async function verifyPassword(password: string, stored: string) {
  if (!isPasswordHash(stored) || password.length > 256) return false;
  const [, salt, encoded] = stored.split(':');
  return timingSafeEqual(await derive(password, salt), Buffer.from(encoded, 'hex'));
}
