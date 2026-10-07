import { parseOverrides, type ContentOverrides, type ContentSnapshot } from './content-schema';

export type Sql = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Record<string, unknown>[]>;
export async function readSnapshot(sql: Sql): Promise<ContentSnapshot> {
  const rows = await sql`SELECT overrides, revision, updated_at FROM site_content WHERE id = 1`;
  if (rows.length !== 1) throw new Error('Voer eerst de database-inrichting uit.');
  const row = rows[0];
  if (typeof row.revision !== 'number' || !Number.isSafeInteger(row.revision) || row.revision < 0) throw new Error('Ongeldige tekstversie.');
  return {
    overrides: parseOverrides(row.overrides, false), revision: row.revision,
    updatedAt: row.updated_at ? new Date(String(row.updated_at)).toISOString() : null,
  };
}
export async function writeSnapshot(sql: Sql, values: ContentOverrides, revision: number) {
  const overrides = parseOverrides(values);
  const rows = await sql`UPDATE site_content
    SET overrides = overrides || ${JSON.stringify(overrides)}::jsonb,
        revision = revision + 1, updated_at = now()
    WHERE id = 1 AND revision = ${revision}
    RETURNING revision, updated_at`;
  if (rows.length !== 1) return null;
  return { revision: Number(rows[0].revision), updatedAt: new Date(String(rows[0].updated_at)).toISOString() };
}
