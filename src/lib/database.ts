import 'server-only';
import { neon } from '@neondatabase/serverless';
export function hasDatabase() { return Boolean(process.env.DATABASE_URL); }
export function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Database is nog niet gekoppeld.');
  return neon(url, { fetchOptions: { cache: 'no-store', signal: AbortSignal.timeout(10_000) } });
}
