import type { Sql } from './content-storage';

export async function sessionExists(sql: Sql, tokenHash: string, credentialVersion: string) {
  const rows = await sql`SELECT token_hash FROM admin_sessions
    WHERE token_hash = ${tokenHash} AND expires_at > now()
    AND credential_version = ${credentialVersion}`;
  return rows.length === 1;
}
export async function insertSession(sql: Sql, tokenHash: string, credentialVersion: string) {
  await sql`DELETE FROM admin_sessions WHERE expires_at < now() OR credential_version <> ${credentialVersion}`;
  await sql`INSERT INTO admin_sessions (token_hash, credential_version, expires_at)
    VALUES (${tokenHash}, ${credentialVersion}, now() + interval '8 hours')`;
}
export async function deleteSession(sql: Sql, tokenHash: string) {
  await sql`DELETE FROM admin_sessions WHERE token_hash = ${tokenHash}`;
}
export async function takeLoginAttempt(sql: Sql, bucket: string) {
  const rows = await sql`
    INSERT INTO admin_login_limits (bucket, attempts, window_start)
    VALUES (${bucket}, 1, now()), ('global', 1, now())
    ON CONFLICT (bucket) DO UPDATE SET
      attempts = CASE WHEN admin_login_limits.window_start < now() - interval '15 minutes'
        THEN 1 ELSE admin_login_limits.attempts + 1 END,
      window_start = CASE WHEN admin_login_limits.window_start < now() - interval '15 minutes'
        THEN now() ELSE admin_login_limits.window_start END
    RETURNING bucket, attempts`;
  await sql`DELETE FROM admin_login_limits WHERE window_start < now() - interval '1 day'`;
  return rows.every(row => Number(row.attempts) <= (row.bucket === 'global' ? 40 : 5));
}
