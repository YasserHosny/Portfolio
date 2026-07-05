import { test, expect } from '@playwright/test';

/**
 * Every public route must load with 200, have a title, and expose exactly one <h1>
 * containing meaningful text. The h1 rule catches SEO/accessibility regressions
 * — historically we had 5 pages missing their h1 entirely.
 */
const ROUTES: Array<{ path: string; title: RegExp; h1Matches: RegExp }> = [
  { path: '/',              title: /Yasser Hosny.*Founder Engineer/i, h1Matches: /scalable software products/i },
  { path: '/product-lab',   title: /Product Lab/i,                    h1Matches: /Product ideas/i },
  { path: '/projects',      title: /Projects/i,                       h1Matches: /Projects on GitHub/i },
  { path: '/case-studies',  title: /Case Studies/i,                   h1Matches: /Problem.*Role.*Solution.*Impact/i },
  { path: '/about',         title: /About/i,                          h1Matches: /Yasser Hosny/i },
  { path: '/updates',       title: /Updates/i,                        h1Matches: /Certifications/i },
  { path: '/contact',       title: /Contact/i,                        h1Matches: /Let's build/i },
];

for (const route of ROUTES) {
  test.describe(`route ${route.path}`, () => {
    test('renders with h1 + title + no console errors', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);

      // Exactly one h1, matching expected copy
      const h1s = page.locator('h1');
      await expect(h1s).toHaveCount(1);
      await expect(h1s.first()).toHaveText(route.h1Matches);

      // No console errors
      expect(consoleErrors, `console errors on ${route.path}: ${consoleErrors.join(' | ')}`).toEqual([]);
    });
  });
}
