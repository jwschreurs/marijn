import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleBody } from '../src/components/ArticleBody';
import { isSafeArticleLink, parseRichText, plainTextToRich, richTextToPlain } from '../src/lib/rich-text';
import { parseCollection } from '../src/lib/articles';

const document = { type: 'doc', content: [
  { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Aandacht' }] },
  { type: 'paragraph', content: [{ type: 'text', text: 'Rust', marks: [{ type: 'bold' }, { type: 'italic' }, { type: 'link', attrs: { href: '/contact', onclick: 'alert(1)' } }] }] },
  { type: 'orderedList', attrs: { start: 3 }, content: [{ type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Oefenen' }] }] }] },
] };

test('Rich articles retain semantic formatting after storage validation', () => {
  const [post] = parseCollection('blog', JSON.stringify([{ id: 'test', slug: 'aandacht', title: 'Aandacht', date: '2026-11-03', summary: 'Intro', body: 'verouderd', published: true, richBody: document }]));
  assert.equal(post.body, 'Aandacht\n\nRust\n\nOefenen');
  const html = renderToStaticMarkup(<ArticleBody body={post.body} richBody={post.richBody} />);
  assert.match(html, /<h2>/);
  assert.match(html, /<a href="\/contact"><em><strong>Rust<\/strong><\/em><\/a>/);
  assert.match(html, /<ol start="3">/);
  assert.doesNotMatch(html, /onclick/);
});

test('Legacy text stays literal and preserves paragraphs and line breaks', () => {
  const body = '**Geen markdown**\nEen regel\n\n<script>alert(1)</script>';
  assert.equal(richTextToPlain(plainTextToRich(body)), body);
  const html = renderToStaticMarkup(<ArticleBody body={body} />);
  assert.match(html, /\*\*Geen markdown\*\*/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.equal((html.match(/<p>/g) ?? []).length, 2);
});

test('Reject unsafe links and unknown markup before publication', () => {
  for (const href of ['javascript:alert(1)', 'data:text/html,test', '//example.com', '/\\example.com', 'java\nscript:alert(1)', 'https://', '']) assert.equal(isSafeArticleLink(href), false, href);
  for (const href of ['https://example.com/path', 'http://example.com', '/contact', 'mailto:info@example.com']) assert.equal(isSafeArticleLink(href), true, href);
  for (const node of [
    { type: 'image', attrs: { src: 'x' } }, { type: 'heading', attrs: { level: 1 } },
    { type: 'paragraph', content: [{ type: 'text', text: 'x', marks: [{ type: 'link', attrs: { href: 'javascript:alert(1)' } }] }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'x', marks: [{ type: 'script' }] }] },
    { type: 'orderedList', attrs: { start: -1 }, content: [{ type: 'listItem', content: [{ type: 'paragraph' }] }] },
  ]) assert.throws(() => parseRichText({ type: 'doc', content: [node] }));
  assert.throws(() => parseRichText(plainTextToRich('a'.repeat(30001))));
});

test('An empty formatted document cannot bypass required article text', () => {
  assert.throws(() => parseCollection('blog', JSON.stringify([{ id: 'test', slug: 'test', title: 'Test', date: '2026-11-03', summary: 'Intro', body: 'stale', published: true, richBody: plainTextToRich('') }])));
});
