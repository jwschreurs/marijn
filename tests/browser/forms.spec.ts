import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('Registration validates, preserves input on rejection and mails every field after retry', async ({ page }) => {
  await page.goto('/inschrijven');
  await expect(page.getByRole('button', { name: 'Verstuur aanmelding' })).toBeEnabled();
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: 'test-results/inschrijven-' + width + '.png', fullPage: true });
  }
  await page.getByRole('button', { name: 'Verstuur aanmelding' }).click();
  await expect(page.getByLabel('Naam', { exact: true })).toBeFocused();
  await page.getByLabel('Naam', { exact: true }).fill('Test Deelnemer');
  await page.getByLabel('E-mailadres', { exact: true }).fill('reject@example.invalid');
  await page.getByLabel('Telefoonnummer', { exact: true }).fill('0612345678');
  await page.getByLabel('Adres', { exact: true }).fill('Voorbeeldstraat 1');
  await page.getByLabel('Startdatum training', { exact: true }).fill('2026-11-04');
  await page.locator('[name="reden-deelname"]').fill('Meer rust en aandacht');
  await page.locator('[name="alle-bijeenkomsten"][value="nee"]').check();
  await page.locator('[name="afwezige-bijeenkomsten"]').fill('De tweede bijeenkomst');
  await page.locator('[name="training-gevonden"][value="anders"]').check();
  await page.locator('[name="training-gevonden-anders"]').fill('Via een folder');
  await page.locator('[name="dagelijks-oefenen"][value="ja"]').check();
  await page.locator('[name="vragen-of-opmerkingen"]').fill('Hoe bereid ik mij voor?');
  await page.getByRole('button', { name: 'Verstuur aanmelding' }).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('Verzenden lukt momenteel niet');
  await expect(page.getByLabel('Naam', { exact: true })).toHaveValue('Test Deelnemer');
  await expect(page.locator('[name="reden-deelname"]')).toHaveValue('Meer rust en aandacht');
  await page.getByLabel('E-mailadres', { exact: true }).fill('registration@example.invalid');
  await page.getByRole('button', { name: 'Verstuur aanmelding' }).click();
  await expect(page.locator('main').getByRole('status')).toContainText('Je aanmelding is verzonden');
  await expect(page.locator('main').getByRole('status')).toBeFocused();
  await expect(page.getByRole('button', { name: 'Verstuur aanmelding' })).toHaveCount(0);
  const messages = (await readFile('test-results/form-mails.jsonl', 'utf8')).trim().split('\n').map(line => JSON.parse(line));
  const mail = messages.find(message => message.replyTo[0].emailAddress.address === 'registration@example.invalid');
  expect(mail.toRecipients[0].emailAddress.address).toBe('info@marijnmetaandacht.nl');
  for (const text of ['Test Deelnemer', '0612345678', 'Voorbeeldstraat 1', '2026-11-04', 'Meer rust en aandacht', 'De tweede bijeenkomst', 'Via een folder', 'Hoe bereid ik mij voor?']) expect(mail.body.content).toContain(text);
});

test('Contact form blocks honeypot and sends one message; uncertain delivery preserves input', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Naam', { exact: true }).fill('Test Contact');
  await page.getByLabel('E-mailadres', { exact: true }).fill('contact@example.invalid');
  await page.getByRole('combobox', { name: 'Interesse', exact: true }).selectOption('Kennismakingsgesprek');
  await page.getByLabel('Bericht', { exact: true }).fill('Ik wil graag kennismaken.');
  await page.locator('[name="website"]').evaluate((input: HTMLInputElement) => { input.value = 'spam'; });
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('kon niet worden verstuurd');
  await page.locator('[name="website"]').evaluate((input: HTMLInputElement) => { input.value = ''; });
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('status')).toContainText('Je aanvraag is verzonden');
  const messages = (await readFile('test-results/form-mails.jsonl', 'utf8')).trim().split('\n').map(line => JSON.parse(line));
  expect(messages.filter(message => message.replyTo[0].emailAddress.address === 'contact@example.invalid')).toHaveLength(1);

  await page.goto('/contact');
  await page.getByLabel('Naam', { exact: true }).fill('Test Onzeker');
  await page.getByLabel('E-mailadres', { exact: true }).fill('uncertain@example.invalid');
  await page.getByRole('combobox', { name: 'Interesse', exact: true }).selectOption('Kennismakingsgesprek');
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('niet bevestigen');
  await expect(page.getByLabel('Naam', { exact: true })).toHaveValue('Test Onzeker');
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('niet bevestigen');
});
