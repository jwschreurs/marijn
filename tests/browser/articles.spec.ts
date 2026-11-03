import { expect, test } from '@playwright/test';

test('Manage FAQ and blog through existing publication flow', async ({ page }) => {
  await page.goto('/beheer/inloggen');
  await page.getByLabel('Wachtwoord', { exact: true }).fill('uitsluitend-lokaal-testwachtwoord');
  await page.getByRole('button', { name: 'Inloggen', exact: true }).click();
  await page.getByLabel('Pagina of onderdeel').selectOption('Veelgestelde vragen');
  await page.getByRole('button', { name: 'Vraag toevoegen', exact: true }).click();
  await page.getByLabel('Vraag', { exact: true }).last().fill('Een nieuwe vraag?');
  await page.getByLabel('Antwoord', { exact: true }).last().fill('Een nieuw antwoord.');
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');
  const publicPage = await page.context().newPage();
  await publicPage.goto('/faq');
  await expect(publicPage.getByRole('heading', { name: 'Een nieuwe vraag?' })).toBeVisible();
  await page.getByLabel('Pagina of onderdeel').selectOption('Blog');
  await page.getByRole('button', { name: 'Blogbericht toevoegen' }).click();
  await page.getByLabel('Titel', { exact: true }).fill('Aandacht onderweg');
  await page.getByLabel('Webadres: /blog/').fill('aandacht-onderweg');
  await page.getByLabel('Samenvatting', { exact: true }).fill('Een moment van aandacht.');
  await page.getByRole('textbox', { name: 'Artikel', exact: true }).fill('Eerste alinea.');
  await page.getByRole('textbox', { name: 'Artikel', exact: true }).press('End');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Tweede alinea.');
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');
  await publicPage.goto('/blog');
  await expect(publicPage.getByRole('heading', { name: 'Aandacht onderweg' })).toHaveCount(0);
  await publicPage.goto('/blog/aandacht-onderweg');
  await expect(publicPage.getByRole('heading', { name: 'Aandacht onderweg' })).toHaveCount(0);
  await page.reload();
  await page.getByLabel('Pagina of onderdeel').selectOption('Blog');
  await expect(page.getByLabel('Titel', { exact: true })).toHaveValue('Aandacht onderweg');
  await page.getByRole('combobox', { name: 'Status', exact: true }).selectOption('published');
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');
  for (const width of [390, 1024, 1440]) {
    await publicPage.setViewportSize({ width, height: 900 });
    for (const route of ['/faq', '/blog', '/blog/aandacht-onderweg']) {
      await publicPage.goto(route);
      expect(await publicPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width !== 1024) await publicPage.screenshot({ path: `test-results/articles-${route.replaceAll('/', '-')}-${width}.png`, fullPage: true });
    }
    await expect(publicPage.getByRole('heading', { name: 'Aandacht onderweg' })).toBeVisible();
    await expect(publicPage.getByText('Tweede alinea.', { exact: true })).toBeVisible();
  }
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Verwijderen', exact: true }).click();
  await page.getByRole('button', { name: 'Wijzigingen publiceren' }).click();
  await expect(page.getByRole('status')).toContainText('Je wijzigingen zijn gepubliceerd');
  await publicPage.reload();
  await expect(publicPage.getByRole('heading', { name: 'Aandacht onderweg' })).toHaveCount(0);
  await publicPage.goto('/blog');
  await expect(publicPage.getByRole('link', { name: 'Aandacht onderweg', exact: true })).toHaveCount(0);
});
