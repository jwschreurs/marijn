import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseOverrides, resolveContent } from '../src/lib/content-schema';
import { parseCollection, publicPosts } from '../src/lib/articles';

const post = { id: 'test', slug: 'aandacht', title: 'Aandacht', date: '2026-11-02', summary: 'Een samenvatting', body: 'Een artikel', published: true };
test('Collections round-trip through existing content storage and support deleting all items', () => {
  const content = resolveContent(parseOverrides({ 'collections.blog': JSON.stringify([post]), 'collections.faq': '[]' }));
  assert.deepEqual(content.blogPosts, [post]);
  assert.deepEqual(content.faqItems, []);
  assert.ok(resolveContent({}).faqItems.length > 0);
});
test('Drafts can be incomplete and are excluded from public articles', () => {
  const posts = parseCollection('blog', JSON.stringify([post, { ...post, id: 'draft', slug: 'concept', summary: '', body: '', published: false }]));
  assert.deepEqual(publicPosts(posts), [post]);
  assert.throws(() => parseCollection('blog', JSON.stringify([{ ...post, body: '' }])));
});
test('Reject unsafe or duplicate addresses, invalid dates, oversized and malformed records', () => {
  for (const items of [
    [{ ...post, slug: '../beheer' }], [post, { ...post, id: 'other' }],
    [post, { ...post, slug: 'other' }], [{ ...post, date: '2026-02-30' }],
    [{ ...post, published: 'true' }], [{ ...post, body: 'a'.repeat(30001) }],
    [null], {},
  ]) assert.throws(() => parseCollection('blog', JSON.stringify(items)));
  assert.throws(() => parseCollection('faq', '[{"id":"test","question":"","answer":"Antwoord"}]'));
});
