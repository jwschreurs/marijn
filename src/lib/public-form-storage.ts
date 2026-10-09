import type { Sql } from './content-storage';
export async function takeFormAttempt(sql: Sql, bucket: string) {
  const rows = await sql`INSERT INTO public_form_limits (bucket, attempts, window_start)
    VALUES (${bucket}, 1, now()), ('global', 1, now())
    ON CONFLICT (bucket) DO UPDATE SET
      attempts = CASE WHEN public_form_limits.window_start < now() - interval '1 hour' THEN 1 ELSE public_form_limits.attempts + 1 END,
      window_start = CASE WHEN public_form_limits.window_start < now() - interval '1 hour' THEN now() ELSE public_form_limits.window_start END
    RETURNING bucket, attempts`;
  await sql`DELETE FROM public_form_limits WHERE window_start < now() - interval '1 day'`;
  return rows.every(row => Number(row.attempts) <= (row.bucket === 'global' ? 50 : 5));
}
export async function claimDelivery(sql: Sql, id: string, fingerprint: string) {
  await sql`DELETE FROM public_form_deliveries WHERE created_at < now() - interval '1 day'`;
  const rows = await sql`INSERT INTO public_form_deliveries (id, fingerprint, status) VALUES (${id}, ${fingerprint}, 'sending')
    ON CONFLICT (id) DO UPDATE SET status = 'sending'
    WHERE public_form_deliveries.status = 'failed' AND public_form_deliveries.fingerprint = EXCLUDED.fingerprint
    RETURNING id`;
  if (rows.length) return 'claimed';
  const existing = await sql`SELECT fingerprint, status FROM public_form_deliveries WHERE id = ${id}`;
  if (existing[0]?.fingerprint !== fingerprint) return 'conflict';
  return existing[0]?.status === 'sent' ? 'sent' : 'uncertain';
}
export async function finishDelivery(sql: Sql, id: string, status: 'sent' | 'failed' | 'uncertain') {
  await sql`UPDATE public_form_deliveries SET status = ${status} WHERE id = ${id}`;
}

// At most one confirmation per address per hour, across all instances and forms.
export async function reserveConfirmation(sql: Sql, recipientHash: string) {
  const bucket = "confirmation:" + recipientHash;
  const rows = await sql`INSERT INTO public_form_limits (bucket, attempts, window_start)
    VALUES (${bucket}, 1, now())
    ON CONFLICT (bucket) DO UPDATE SET attempts = 1, window_start = now()
    WHERE public_form_limits.window_start < now() - interval '1 hour'
    RETURNING bucket`;
  return rows.length === 1;
}
