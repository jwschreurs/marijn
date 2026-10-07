import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getContentFields, parseOverrides, resolveContent } from '../src/lib/content-schema';

test('Published text replaces copy without changing routes, arrays or defaults', () => {
  const before = resolveContent({});
  const content = resolveContent(parseOverrides({
    'copy.home.heading1': 'Een nieuwe titel',
    'siteConfig.email': 'nieuw@voorbeeld.nl',
    'trainingen.0.investment.price': '€ 500,-',
  }));
  assert.equal(content.copy.home.heading1, 'Een nieuwe titel');
  assert.equal(content.siteConfig.email, 'nieuw@voorbeeld.nl');
  assert.equal(content.trainingen[0].investment?.price, '€ 500,-');
  assert.equal(content.trainingen[0].slug, before.trainingen[0].slug);
  assert.deepEqual(resolveContent({}), before);
});
test('Only known text fields can be published', () => {
  for (const value of [
    { 'trainingen.0.slug': 'andere-route' }, { 'copy.home.heading1': 42 },
    { 'copy.home.heading1': '' }, { 'copy.home.heading1': 'a'.repeat(5001) },
    { 'siteConfig.email': 'test@example.nl\r\nbcc:ander@example.nl' },
    { 'siteConfig.phone': 'javascript:alert(1)' }, [],
    JSON.parse('{"__proto__":{"polluted":true}}'),
  ]) assert.throws(() => parseOverrides(value));
});
test('Older publications tolerate removed fields and retain defaults for new fields', () => {
  assert.deepEqual(parseOverrides({ removedField: 'oude tekst', 'copy.home.heading1': 'Bewaard' }, false),
    { 'copy.home.heading1': 'Bewaard' });
  assert.ok(getContentFields().length > 250);
  assert.equal(new Set(getContentFields().map(field => field.id)).size, getContentFields().length);
  assert.ok(getContentFields().every(field => !field.id.endsWith('.slug')));
});
