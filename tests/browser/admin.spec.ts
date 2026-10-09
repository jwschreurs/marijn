import { expect, test } from '@playwright/test';
import { mockTurnstile } from '../helpers/turnstile-browser';
import { readFile } from 'node:fs/promises';

test('Login, publication without rebuild, conflicts, escaping, logout and responsive routes', async ({ page, request }) => {
  await page.context().route('https://challenges.cloudflare.com/**', route => route.abort());
  await mockTurnstile(page);
  const manifest = JSON.parse(await readFile('.next/server/server-reference-manifest.json', 'utf8')) as {
    node: Record<string, { exportedName: string }>;
  };
  const action = Object.entries(manifest.node).find(([, value]) => value.exportedName === 'publishContent')?.[0];
  expect(action).toBeTruthy();
  const blocked = await request.post('/beheer', {
    headers: { 'Next-Action': action!, 'Content-Type': 'text/plain;charset=UTF-8', Origin: 'http://localhost:3101' },
    data: JSON.stringify([{ 'copy.home.heading1': 'Onbevoegd' }, 0]),
  });
  expect(await blocked.text()).toContain('Je sessie is verlopen');
  await page.goto('/beheer');
  await expect(page).toHaveURL(/\/beheer\/inloggen$/);
  await page.getByLabel('Wachtwoord', { exact: true }).fill('verkeerd');
  await page.getByRole('button', { name: 'Inloggen', exact: true }).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('Het wachtwoord klopt niet');
  await page.getByLabel('Wachtwoord', { exact: true }).fill('uitsluitend-lokaal-testwachtwoord');
  await page.getByRole('button', { name: 'Inloggen', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Website beheren' })).toBeVisible();
  const cookie = (await page.context().cookies()).find(item => item.name === 'marijn-admin');
  expect(cookie?.httpOnly).toBe(true);
  expect(cookie?.secure).toBe(true);
  expect(cookie?.sameSite).toBe('Strict');

  const stale = await page.context().newPage();
  await stale.goto('/beheer');
  const original = await page.getByLabel('Kop 1', { exact: true }).inputValue();
  const published = 'Rust vanuit het beheer — zonder nieuwe build';
  await page.getByLabel('Kop 1', { exact: true }).fill(published);
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');
  const publicPage = await page.context().newPage();
  await publicPage.goto('/');
  await expect(publicPage.getByRole('heading', { level: 1 })).toHaveText(published);
  await stale.getByLabel('Kop 1', { exact: true }).fill('Verouderde wijziging');
  await stale.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(stale.locator('main').getByRole('alert')).toContainText('ander venster');
  await publicPage.reload();
  await expect(publicPage.getByRole('heading', { level: 1 })).toHaveText(published);
  await stale.close({ runBeforeUnload: false });

  await page.getByLabel('Kop 1', { exact: true }).fill('<script>alert("test")</script>');
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');
  await publicPage.reload();
  await expect(publicPage.getByRole('heading', { level: 1 })).toHaveText('<script>alert("test")</script>');
  await page.getByLabel('Kop 1', { exact: true }).fill(original);
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('button', { name: 'Wijzigingen publiceren' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: 'test-results/beheer-' + width + '.png', fullPage: true });
    for (const route of ['/', '/over-mij', '/over-marijn', '/mindfulness', '/trainingen', '/agenda', '/contact', '/inschrijven', '/trainingen/mindfulness-basistraining', '/trainingen/mindfulness-op-het-werk']) {
      await publicPage.setViewportSize({ width, height: 900 });
      const response = await publicPage.goto(route);
      expect(response?.status(), route).toBe(200);
      expect(await publicPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
      for (const image of await publicPage.locator('img').all()) await image.scrollIntoViewIfNeeded();
      await expect.poll(() => publicPage.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)), { message: route }).toBe(true);
      await expect(publicPage.locator('head meta[name="google-site-verification"]')).toHaveAttribute('content', 'AKS8MgVMQlkgjIvl0aD3PnSpN_2aS2ERT1tmzDfVTrk');
    }
  }
  await publicPage.goto('/trainingen/mindfulness-basistraining');
  await expect(publicPage.getByRole('combobox', { name: 'Interesse', exact: true })).toHaveValue('Mindfulness Based Stress Reduction (MBSR)');
  await page.getByRole('button', { name: 'Uitloggen' }).click();
  await expect(page).toHaveURL(/\/beheer\/inloggen$/);
  await page.goto('/beheer');
  await expect(page).toHaveURL(/\/beheer\/inloggen$/);
});
