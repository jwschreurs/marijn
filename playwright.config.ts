import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  workers: 1, timeout: 90_000,
  use: { baseURL: 'http://localhost:3101', channel: 'msedge', screenshot: 'only-on-failure' },
  webServer: {
    command: 'node --import ./tests/helpers/neon-fixture.mjs node_modules/next/dist/bin/next start --port 3101',
    url: 'http://localhost:3101',
    reuseExistingServer: false,
    env: { CMS_TEST_MODE: '1' },
    timeout: 60_000,
  },
});
