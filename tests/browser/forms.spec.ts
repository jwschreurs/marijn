import { test, expect } from '@playwright/test';
import { mockTurnstile } from '../helpers/turnstile-browser';
import { readFile } from 'node:fs/promises';

test.beforeEach(async ({ page }, testInfo) => {
  await page.setExtraHTTPHeaders({ 'x-vercel-forwarded-for': 'fixture-' + testInfo.testId });
  await mockTurnstile(page);
});

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
  const confirmation = messages.find(message => message.toRecipients[0].emailAddress.address === 'registration@example.invalid');
  expect(confirmation.replyTo[0].emailAddress.address).toBe('info@marijnmetaandacht.nl');
  expect(confirmation.body.content).toContain('nog niet definitief');
  expect(confirmation.body.content).not.toContain('Voorbeeldstraat');
  const mail = messages.find(message => message.replyTo[0].emailAddress.address === 'registration@example.invalid');
  expect(mail.toRecipients[0].emailAddress.address).toBe('info@marijnmetaandacht.nl');
  for (const text of ['Test Deelnemer', '0612345678', 'Voorbeeldstraat 1', 'Meer rust en aandacht', 'De tweede bijeenkomst', 'Via een folder', 'Hoe bereid ik mij voor?']) expect(mail.body.content).toContain(text);
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
  expect(messages.filter(message => message.toRecipients[0].emailAddress.address === 'contact@example.invalid')).toHaveLength(1);

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

test('Server blocks invalid bot tokens; expired checks disable sending; a new check preserves the form', async ({ page }) => {
  await mockTurnstile(page, true);
  await page.goto('/contact');
  await page.getByLabel('Naam', { exact: true }).fill('Test botcontrole');
  await page.getByLabel('E-mailadres', { exact: true }).fill('bot-check@example.invalid');
  await page.getByRole('combobox', { name: 'Interesse', exact: true }).selectOption('Kennismakingsgesprek');
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('spamcontrole is niet gelukt');
  const before = await readFile('test-results/form-mails.jsonl', 'utf8');
  expect(before).not.toContain('bot-check@example.invalid');
  await expect(page.getByLabel('Naam', { exact: true })).toHaveValue('Test botcontrole');
  await expect(page.getByRole('button', { name: 'Verstuur aanvraag' })).toBeEnabled();
  await page.getByRole('button', { name: 'Testcontrole laten verlopen' }).click();
  await expect(page.getByRole('button', { name: 'Verstuur aanvraag' })).toBeDisabled();
  await page.getByRole('button', { name: 'Testcontrole vernieuwen' }).click();
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('status')).toContainText('Je aanvraag is verzonden');
});

test('Confirmation failure keeps the successful submission and does not invite resubmission', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Naam', { exact: true }).fill('Test bevestiging');
  await page.getByLabel('E-mailadres', { exact: true }).fill('confirmation-fails@example.invalid');
  await page.getByRole('combobox', { name: 'Interesse', exact: true }).selectOption('Kennismakingsgesprek');
  await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
  await expect(page.locator('main').getByRole('status')).toContainText('Je aanvraag is verzonden');
  await expect(page.locator('main').getByRole('status')).toContainText('Je hoeft het formulier niet opnieuw te versturen');
  await expect(page.getByRole('button', { name: 'Verstuur aanvraag' })).toHaveCount(0);
  const messages = (await readFile('test-results/form-mails.jsonl', 'utf8')).trim().split('\n').map(line => JSON.parse(line));
  expect(messages.filter(message => message.replyTo[0].emailAddress.address === 'confirmation-fails@example.invalid')).toHaveLength(1);
});

test('An address gets at most one confirmation while genuine follow-up messages still reach Marijn', async ({ page }) => {
  for (let i = 0; i < 2; i++) {
    await page.goto('/contact');
    await page.getByLabel('Naam', { exact: true }).fill('Test herhaling');
    await page.getByLabel('E-mailadres', { exact: true }).fill('confirmation-limit@example.invalid');
    await page.getByRole('combobox', { name: 'Interesse', exact: true }).selectOption('Kennismakingsgesprek');
    await page.getByRole('button', { name: 'Verstuur aanvraag' }).click();
    await expect(page.locator('main').getByRole('status')).toContainText('Je aanvraag is verzonden');
  }
  const messages = (await readFile('test-results/form-mails.jsonl', 'utf8')).trim().split('\n').map(line => JSON.parse(line));
  expect(messages.filter(message => message.replyTo[0].emailAddress.address === 'confirmation-limit@example.invalid')).toHaveLength(2);
  expect(messages.filter(message => message.toRecipients[0].emailAddress.address === 'confirmation-limit@example.invalid')).toHaveLength(1);
});
