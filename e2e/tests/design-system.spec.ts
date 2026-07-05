import { test, expect } from '@playwright/test';

/**
 * Guard against silent CSS regressions.
 *
 * Historical incident: Angular 18's `inlineCritical` optimization loaded the
 * full stylesheet with `media="print"` and relied on a JS swap that never
 * fired — the site rendered with only the tiny critical-CSS snippet. Body
 * background survived (via inlined :root vars) but every design-system
 * class (.eyebrow, .surface, .grid, h1 sizing, etc.) silently failed to
 * apply. Manual QA missed it because the page was still "visible."
 *
 * These assertions check the *computed* style of design-system classes.
 * If they degrade to browser defaults again, this suite fails immediately.
 */

const routeWithEyebrow = '/product-lab';

test.describe('design system computed styles', () => {
  test('main stylesheet loads with media=all (not media=print)', async ({ page }) => {
    await page.goto('/');
    const stylesheetMedia = await page.evaluate(() => {
      const link = [...document.querySelectorAll('link[rel="stylesheet"]')]
        .find((l) => (l as HTMLLinkElement).href.includes('styles-')) as HTMLLinkElement | undefined;
      return link ? link.media : null;
    });
    // Empty string or "all" both mean "screen"; "print" is the regression.
    expect(stylesheetMedia).not.toBe('print');
  });

  test('.eyebrow uses JetBrains Mono in teal at ~12px uppercase', async ({ page }) => {
    await page.goto(routeWithEyebrow);
    const eb = page.locator('yh-section-header .eyebrow').first();
    await expect(eb).toBeVisible();
    const s = await eb.evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return { fontFamily: cs.fontFamily, fontSize: cs.fontSize, textTransform: cs.textTransform, color: cs.color };
    });
    expect(s.fontFamily.toLowerCase()).toContain('jetbrains mono');
    expect(s.fontSize).toBe('12px');
    expect(s.textTransform).toBe('uppercase');
    // Teal accent: rgb(20, 184, 166)
    expect(s.color).toBe('rgb(20, 184, 166)');
  });

  test('.surface has dark card background + rounded border', async ({ page }) => {
    await page.goto(routeWithEyebrow);
    const surface = page.locator('.surface').first();
    await expect(surface).toBeVisible();
    const s = await surface.evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return {
        background: cs.background,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        borderColor: cs.borderColor,
      };
    });
    expect(s.background).toContain('linear-gradient');
    expect(s.borderRadius).toBe('18px');
    // Padding should be non-zero (24px = 1.5rem at default root size)
    expect(s.padding).not.toBe('0px');
    expect(s.borderColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('.grid actually uses CSS grid on desktop', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 900, 'grid collapses to 1 column below 900px');
    await page.goto(routeWithEyebrow);
    const grid = page.locator('.grid.grid--2').first();
    await expect(grid).toBeVisible();
    const s = await grid.evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return { display: cs.display, cols: cs.gridTemplateColumns };
    });
    expect(s.display).toBe('grid');
    // Two-column grid should have two comma-separated tracks
    expect(s.cols.split(' ').length).toBeGreaterThanOrEqual(2);
  });

  test('body has the dark navy background', async ({ page }) => {
    await page.goto('/');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    // #0B1120 = rgb(11, 17, 32)
    expect(bg).toBe('rgb(11, 17, 32)');
  });
});
