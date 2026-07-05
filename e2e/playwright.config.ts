import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the portfolio E2E suite.
 *
 * Default BASE_URL is the local docker-compose stack (http://localhost:8080).
 * Override with `BASE_URL=https://yasser-hosny.iron-sys.com` to run against production.
 */
const BASE_URL = process.env['BASE_URL'] ?? 'http://localhost:8080';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 2 : undefined,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      // Chromium-with-mobile-viewport (rather than devices['iPhone 13'] which
      // pulls WebKit) so we do not need a second browser download in CI.
      name: 'chromium-mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
