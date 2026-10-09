import type { Page } from '@playwright/test';

// Browser-only test double, never imported by the app. No real CAPTCHA or mail traffic.
export async function mockTurnstile(page: Page, invalidFirst = false) {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
    contentType: 'application/javascript',
    body: `(() => {
      let first = ${invalidFirst};
      const widgets = new Map();
      window.turnstile = {
        render(container, options) {
          const id = crypto.randomUUID();
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = 'Testcontrole laten verlopen';
          button.onclick = () => { options['expired-callback'](); button.textContent = 'Testcontrole vernieuwen'; button.onclick = () => solve(); };
          container.style.width = options.size === 'compact' ? '150px' : '300px';
          container.style.minHeight = options.size === 'compact' ? '140px' : '65px';
          container.append(button);
          const solve = () => {
            const token = first ? 'invalid-token' : 'fixture:' + options.action + ':' + crypto.randomUUID();
            first = false;
            options.callback(token);
          };
          const timer = setTimeout(solve, 10);
          widgets.set(id, { container, solve, timer });
          return id;
        },
        remove(id) { const widget = widgets.get(id); if (widget) { clearTimeout(widget.timer); widget.container.replaceChildren(); widgets.delete(id); } },
        reset(id) { widgets.get(id)?.solve(); }
      };
    })();`,
  }));
}
