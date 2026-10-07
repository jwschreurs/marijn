import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { database, hasDatabase } from '@/lib/database';
import { isPasswordHash } from '@/lib/password';
import { deleteSession, insertSession, sessionExists, takeLoginAttempt } from '@/lib/session-storage';

export const SESSION_COOKIE = 'marijn-admin';
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
export function isAdminConfigured() { return hasDatabase() && isPasswordHash(process.env.ADMIN_PASSWORD_HASH); }
function credentialVersion() { return digest(process.env.ADMIN_PASSWORD_HASH ?? ''); }
export async function isAdmin() {
  if (!isAdminConfigured()) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  return sessionExists(database(), digest(token), credentialVersion());
}
export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Je sessie is verlopen. Log opnieuw in voordat je publiceert.');
}
const cookieOptions = {
  httpOnly: true, secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const, path: '/beheer',
};
export async function createAdminSession() {
  const token = randomBytes(32).toString('hex');
  await insertSession(database(), digest(token), credentialVersion());
  (await cookies()).set(SESSION_COOKIE, token, { ...cookieOptions, maxAge: 8 * 60 * 60 });
}
export async function removeAdminSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token && hasDatabase()) await deleteSession(database(), digest(token));
  jar.set(SESSION_COOKIE, '', { ...cookieOptions, maxAge: 0 });
}
export async function consumeLoginAttempt() {
  const incoming = await headers();
  // Vercel supplies this header. Locally all attempts share one bucket.
  const ip = process.env.VERCEL === '1' ? incoming.get('x-vercel-forwarded-for') ?? 'unknown' : 'local';
  return takeLoginAttempt(database(), 'ip:' + digest(ip));
}
