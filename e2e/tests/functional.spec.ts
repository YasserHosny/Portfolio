import { test, expect } from '@playwright/test';

/**
 * Functional flows: navigation, images actually load, contact form validates
 * and submits successfully, /projects filters actually filter.
 */

test.describe('functional flows', () => {
  test('header nav takes you to each route (desktop)', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 860, 'nav collapses into burger below 860px — see burger menu test');
    await page.goto('/');
    const links = ['Product Lab', 'Projects', 'Case Studies', 'About', 'Updates', 'Contact'];
    for (const label of links) {
      await page.locator('yh-header nav.nav').getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${label.toLowerCase().replace(/\s+/g, '-')}$`));
    }
    // Back home via brand
    await page.locator('yh-header a.brand').click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('burger menu opens on mobile and navigates', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width >= 860, 'burger only shows below 860px');
    await page.goto('/');
    // Burger should be visible, nav should not yet be interactive
    const burger = page.locator('yh-header button.burger');
    await expect(burger).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    // Open it
    await burger.click();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    // Click one link, verify navigation + auto-close
    await page.locator('yh-header nav.nav').getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  test('images actually load (naturalWidth > 0)', async ({ page }) => {
    await page.goto('/about');
    const broken = await page.evaluate(() => {
      return [...document.querySelectorAll('img')]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute('src'));
    });
    expect(broken, `broken images: ${broken.join(', ')}`).toEqual([]);
  });

  test('all API endpoints return 200', async ({ request }) => {
    const endpoints = [
      '/api/health',
      '/api/profile',
      '/api/product-lab',
      '/api/projects',
      '/api/case-studies',
      '/api/updates',
      '/api/capabilities',
    ];
    for (const path of endpoints) {
      const res = await request.get(path);
      expect(res.status(), `${path}`).toBe(200);
    }
  });

  test('contact form validates and submits', async ({ page }) => {
    await page.goto('/contact');

    // Submit empty form → form should not fire request; validation kicks in
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.locator('.err').first()).toBeVisible();

    // Fill valid values
    await page.locator('#name').fill('Playwright E2E');
    await page.locator('#email').fill('e2e@example.com');
    await page.locator('#company').fill('Test Suite');
    await page.locator('#message').fill('This is an automated end-to-end test submission from Playwright.');

    // Intercept the POST so we do not spam the real Zoho inbox
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Thanks — mocked in E2E.' }),
      });
    });

    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.locator('.banner--success')).toBeVisible();
  });

  test('/projects filter chips filter the visible cards', async ({ page }) => {
    await page.goto('/projects');
    const cards = page.locator('yh-project-card');
    const totalCount = await cards.count();
    expect(totalCount).toBeGreaterThan(0);

    // Click the C# filter (only 1 project — AutoMapper)
    await page.getByRole('button', { name: /^C#/ }).click();
    const filtered = await cards.count();
    expect(filtered).toBe(1);
    await expect(cards.first()).toContainText('AutoMapper');

    // Back to All
    await page.getByRole('button', { name: /^All/ }).click();
    await expect(cards).toHaveCount(totalCount);
  });
});
