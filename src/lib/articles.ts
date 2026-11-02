export type FaqItem = { id: string; question: string; answer: string };
export type BlogPost = { id: string; slug: string; title: string; summary: string; body: string; date: string; published: boolean };
export type CollectionKind = 'faq' | 'blog';

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Ongeldig item.');
  return value as Record<string, unknown>;
}
function text(value: unknown, label: string, max: number, required = true): string {
  if (typeof value !== 'string' || (required && !value.trim()) || value.length > max || value.includes('\u0000')) {
    throw new Error(`${label}: gebruik maximaal ${max} tekens${required ? ' en laat dit veld niet leeg' : ''}.`);
  }
  return value;
}
export function parseCollection(kind: 'faq', serialized: string): FaqItem[];
export function parseCollection(kind: 'blog', serialized: string): BlogPost[];
export function parseCollection(kind: CollectionKind, serialized: string): FaqItem[] | BlogPost[];
export function parseCollection(kind: CollectionKind, serialized: string): FaqItem[] | BlogPost[] {
  const items: unknown = JSON.parse(serialized);
  if (!Array.isArray(items) || items.length > 100) throw new Error('Gebruik maximaal 100 items per onderdeel.');
  const ids = new Set<string>();
  const slugs = new Set<string>();
  return items.map(value => {
    const item = record(value);
    const id = text(item.id, 'Item', 80);
    if (!/^[a-zA-Z0-9-]+$/.test(id) || ids.has(id)) throw new Error('Items moeten een unieke identificatie hebben.');
    ids.add(id);
    if (kind === 'faq') return { id, question: text(item.question, 'Vraag', 300), answer: text(item.answer, 'Antwoord', 5000) };
    if (typeof item.published !== 'boolean') throw new Error('Kies concept of gepubliceerd.');
    const slug = text(item.slug, 'Webadres', 120);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug)) throw new Error('Gebruik een uniek webadres met kleine letters, cijfers en streepjes.');
    slugs.add(slug);
    const date = text(item.date, 'Datum', 10);
    const parsedDate = new Date(`${date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) throw new Error('Vul een geldige datum in.');
    return { id, slug, date, published: item.published, title: text(item.title, 'Titel', 200), summary: text(item.summary, 'Samenvatting', 1000, item.published), body: text(item.body, 'Artikel', 30000, item.published) };
  }) as FaqItem[] | BlogPost[];
}

export function publicPosts(posts: BlogPost[]) {
  return posts.filter(post => post.published).sort((a, b) => b.date.localeCompare(a.date));
}
