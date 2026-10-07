import 'server-only';
import { cache } from 'react';
import { connection } from 'next/server';
import { database, hasDatabase } from '@/lib/database';
import { resolveContent } from '@/lib/content-schema';
import { readSnapshot } from '@/lib/content-storage';

export async function readContentSnapshot() { return readSnapshot(database()); }
export const getSiteContent = cache(async () => {
  // Never freeze database content into a deployment.
  await connection();
  if (!hasDatabase()) return resolveContent({});
  const snapshot = await readContentSnapshot();
  return resolveContent(snapshot.overrides);
});
