export type RichMark = { type: 'bold' | 'italic' | 'link'; attrs?: { href: string } };
export type RichNode = {
  type: 'doc' | 'paragraph' | 'heading' | 'bulletList' | 'orderedList' | 'listItem' | 'text' | 'hardBreak';
  content?: RichNode[];
  text?: string;
  attrs?: { level?: number; start?: number };
  marks?: RichMark[];
};

export function isSafeArticleLink(value: string): boolean {
  if (value.length > 2000 || /[\s\u0000-\u001f\u007f\\]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    const url = new URL(value);
    return ['https:', 'http:', 'mailto:'].includes(url.protocol);
  } catch { return false; }
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Ongeldige artikelopmaak.');
  return value as Record<string, unknown>;
}

// Shared validation for storage and editing. Only supported nodes/attributes survive.
export function parseRichText(value: unknown): RichNode {
  let count = 0;
  const blocks = ['paragraph', 'heading', 'bulletList', 'orderedList'];
  function parse(value: unknown, allowed: string[], depth: number): RichNode {
    if (++count > 5000 || depth > 12) throw new Error('Het artikel bevat te veel opmaak.');
    const node = object(value);
    if (typeof node.type !== 'string' || !allowed.includes(node.type)) throw new Error('Deze artikelopmaak wordt niet ondersteund.');
    const type = node.type as RichNode['type'];
    if (type === 'text') {
      if (typeof node.text !== 'string' || !node.text || node.text.includes('\u0000')) throw new Error('Ongeldige artikeltekst.');
      const result: RichNode = { type, text: node.text };
      if (node.marks !== undefined) {
        if (!Array.isArray(node.marks) || node.marks.length > 3) throw new Error('Ongeldige tekstopmaak.');
        const seen = new Set<string>();
        result.marks = node.marks.map(value => {
          const mark = object(value);
          if (typeof mark.type !== 'string' || seen.has(mark.type)) throw new Error('Ongeldige tekstopmaak.');
          seen.add(mark.type);
          if (mark.type === 'bold' || mark.type === 'italic') return { type: mark.type };
          if (mark.type === 'link') {
            const { href } = object(mark.attrs);
            if (typeof href !== 'string' || !isSafeArticleLink(href)) throw new Error('Gebruik een geldige link met https://, http://, mailto: of een intern pad.');
            return { type: 'link', attrs: { href } };
          }
          throw new Error('Deze tekstopmaak wordt niet ondersteund.');
        });
      }
      return result;
    }
    if (type === 'hardBreak') return { type };
    if (node.content !== undefined && !Array.isArray(node.content)) throw new Error('Ongeldige artikelinhoud.');
    const children = (node.content ?? []) as unknown[];
    const childTypes = type === 'paragraph' || type === 'heading' ? ['text', 'hardBreak']
      : type === 'bulletList' || type === 'orderedList' ? ['listItem'] : blocks;
    const result: RichNode = { type, content: children.map(child => parse(child, childTypes, depth + 1)) };
    if (type === 'heading') {
      const { level } = object(node.attrs);
      if (level !== 2 && level !== 3) throw new Error('Gebruik een tussenkop van niveau 2 of 3.');
      result.attrs = { level };
    }
    if (type === 'orderedList') {
      const start = node.attrs === undefined ? 1 : object(node.attrs).start ?? 1;
      if (typeof start !== 'number' || !Number.isSafeInteger(start) || start < 1 || start > 10000) throw new Error('Ongeldige lijstnummering.');
      result.attrs = { start };
    }
    if (type === 'listItem' && result.content?.[0]?.type !== 'paragraph') throw new Error('Een lijstitem moet met een alinea beginnen.');
    if (['doc', 'bulletList', 'orderedList'].includes(type) && !children.length) throw new Error('Ongeldige lege opmaak.');
    return result;
  }
  const doc = parse(value, ['doc'], 0);
  if (richTextToPlain(doc).length > 30000) throw new Error('Artikel: gebruik maximaal 30000 tekens.');
  return doc;
}

export function richTextToPlain(node: RichNode): string {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'hardBreak') return '\n';
  return (node.content ?? []).map(richTextToPlain).join(node.type === 'paragraph' || node.type === 'heading' ? '' : '\n\n');
}

export function plainTextToRich(body: string): RichNode {
  return { type: 'doc', content: body.split(/\n\s*\n/).map(paragraph => ({
    type: 'paragraph', content: paragraph ? [{ type: 'text', text: paragraph }] : [],
  })) };
}
