import { expect, test } from '@playwright/test';

test('Header stays on one row and supports keyboard, touch and closing menus', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Hoofdnavigatie' });
  const menu = page.getByRole('button', { name: 'Menu openen of sluiten' });
  const mindfulness = page.locator('[aria-controls="mindfulness-navigation"]');
  for (const width of [1440, 1121, 1024, 390]) {
    await page.setViewportSize({ width, height: 900 });
    if (width <= 1120) {
      await expect(nav).toBeHidden();
      await menu.click();
    } else {
      await expect(menu).toBeHidden();
      const links = await nav.locator(':scope > .nav-link, :scope > .nav-dropdown').evaluateAll(items => items.map(item => item.getBoundingClientRect().top));
      expect(Math.max(...links) - Math.min(...links)).toBeLessThan(3);
    }
    await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0);
    await mindfulness.focus();
    await page.keyboard.press('Enter');
    await expect(mindfulness).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(nav.getByRole('link', { name: 'Wat is mindfulness?' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(mindfulness).toBeFocused();
    await expect(nav.getByRole('link', { name: 'Veelgestelde vragen' })).toBeHidden();
    await mindfulness.click();
    await page.screenshot({ path: `test-results/header-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await nav.getByRole('link', { name: 'Veelgestelde vragen' }).click();
    await expect(page).toHaveURL(/\/faq$/);
    await expect(mindfulness).toHaveAttribute('aria-expanded', 'false');
    if (width <= 1120) {
      await expect(nav).toBeHidden();
      await menu.click();
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
      await expect(nav).toBeHidden();
    } else {
      await mindfulness.click();
      await page.locator('h1').click();
      await expect(mindfulness).toHaveAttribute('aria-expanded', 'false');
    }
  }
  await page.getByRole('link', { name: 'Ga naar de homepage' }).click();
  await expect(page).toHaveURL('/');
});

test('Training menu links to overview and each training on desktop and mobile', async ({ page }) => {
  await page.goto('/');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/trainingen', '/trainingen/mindfulness-basistraining', '/trainingen/mindfulness-op-het-werk']) {
      if (width <= 1120) await page.getByRole('button', { name: 'Menu openen of sluiten' }).click();
      await page.getByRole('button', { name: 'Mindfulness', exact: true }).click();
      const button = page.getByRole('button', { name: 'Trainingen', exact: true });
      await button.click();
      await expect(page.locator('#mindfulness-navigation')).toBeHidden();
      await page.keyboard.press('Escape');
      await expect(button).toBeFocused();
      await expect(page.locator('#training-navigation')).toBeHidden();
      await page.keyboard.press('Enter');
      if (path === '/trainingen') await page.screenshot({ path: `test-results/header-trainingen-${width}.png` });
      await page.locator(`#training-navigation a[href="${path}"]`).click();
      await expect(page).toHaveURL(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('#training-navigation')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test('Footer links to FAQ, blog and every training without overflow', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/faq', '/blog', '/trainingen', '/trainingen/mindfulness-basistraining', '/trainingen/mindfulness-op-het-werk']) {
      await footer.locator(`a[href="${path}"]`).click();
      await expect(page).toHaveURL(path);
      await expect(page.locator('h1')).toBeVisible();
    }
    await footer.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/footer-${width}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
