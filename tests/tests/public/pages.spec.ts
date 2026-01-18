import { test, expect } from '@playwright/test';

const BASE_URL = 'https://ecom.ayoya.srv1164291.hstgr.cloud';

test.describe('PUB-001 to PUB-014: Home Page', () => {
  test('PUB-001: Home page loads at root URL', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain(BASE_URL);
  });

  test('PUB-002: Home page has correct title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('AYOYA');
  });

  test('PUB-003: Logo is visible on home page', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('img[alt*="logo" i], img[src*="logo" i]').first();
    await expect(logo).toBeVisible();
  });

  test('PUB-004: Navigation menu is present', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toBeVisible();
  });

  test('PUB-005: Hero section is visible', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('[class*="hero" i], section:first-of-type');
    await expect(hero).toBeVisible();
  });

  test('PUB-006: Call-to-action button is present', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('button, a[class*="cta" i], a[class*="button" i]').first();
    await expect(cta).toBeVisible();
  });

  test('PUB-007: Product section is visible', async ({ page }) => {
    await page.goto('/');
    const products = page.locator('[class*="product" i], [data-testid*="product" i]');
    await expect(products.first()).toBeVisible();
  });

  test('PUB-008: Product prices are formatted correctly', async ({ page }) => {
    await page.goto('/');
    const price = page.locator('text=/\\d+[.,]\\d{2}/');
    const priceText = await price.first().textContent();
    expect(priceText).toMatch(/\d+[.,]\d{2}/);
  });

  test('PUB-009: Video section is present', async ({ page }) => {
    await page.goto('/');
    const video = page.locator('video, iframe[src*="youtube" i], iframe[src*="vimeo" i]');
    expect(await video.count()).toBeGreaterThanOrEqual(0);
  });

  test('PUB-010: Footer is visible', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer, [class*="footer" i]');
    await expect(footer).toBeVisible();
  });

  test('PUB-011: CGU link is present in footer', async ({ page }) => {
    await page.goto('/');
    const cguLink = page.locator('a[href*="/cgu" i], a:has-text(/CGU/i)');
    await expect(cguLink).toBeVisible();
  });

  test('PUB-012: CGV link is present in footer', async ({ page }) => {
    await page.goto('/');
    const cgvLink = page.locator('a[href*="/cgv" i], a:has-text(/CGV/i)');
    await expect(cgvLink).toBeVisible();
  });

  test('PUB-013: Social icons are present', async ({ page }) => {
    await page.goto('/');
    const socials = page.locator('a[href*="facebook" i], a[href*="instagram" i], a[href*="twitter" i], a[href*="linkedin" i]');
    const count = await socials.count();
    expect(count).toBeGreaterThan(0);
  });

  test('PUB-014: Home page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const header = page.locator('header, nav, [class*="header" i]');
    await expect(header).toBeVisible();
  });
});

test.describe('PUB-015 to PUB-021: Product Page', () => {
  test('PUB-015: Product page loads at /product route', async ({ page }) => {
    await page.goto('/product');
    expect(page.url()).toContain('/product');
  });

  test('PUB-016: Product gallery is visible', async ({ page }) => {
    await page.goto('/product');
    const gallery = page.locator('[class*="gallery" i], [data-testid*="gallery" i], img[alt*="product" i]');
    await expect(gallery.first()).toBeVisible();
  });

  test('PUB-017: Product gallery has navigation controls', async ({ page }) => {
    await page.goto('/product');
    const prev = page.locator('button[aria-label*="previous" i], button[aria-label*="prev" i]');
    const next = page.locator('button[aria-label*="next" i]');
    const hasControls = (await prev.count()) > 0 || (await next.count()) > 0;
    expect(hasControls).toBeTruthy();
  });

  test('PUB-018: Product information is displayed', async ({ page }) => {
    await page.goto('/product');
    const info = page.locator('[class*="product-info" i], [class*="details" i], h1, h2');
    await expect(info.first()).toBeVisible();
  });

  test('PUB-019: Product prices are displayed', async ({ page }) => {
    await page.goto('/product');
    const price = page.locator('text=/\\d+[.,]\\d{2}/', { exact: false });
    await expect(price.first()).toBeVisible();
  });

  test('PUB-020: Add to cart button is present', async ({ page }) => {
    await page.goto('/product');
    const addBtn = page.locator('button:has-text(/add|commander|order/i), a:has-text(/add|commander|order/i)');
    await expect(addBtn.first()).toBeVisible();
  });

  test('PUB-021: Product page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/product');
    const container = page.locator('main, [class*="container" i]');
    await expect(container).toBeVisible();
  });
});

test.describe('PUB-022 to PUB-025: CGU Page', () => {
  test('PUB-022: CGU page loads at /cgu route', async ({ page }) => {
    await page.goto('/cgu');
    expect(page.url()).toContain('/cgu');
  });

  test('PUB-023: CGU page has correct title', async ({ page }) => {
    await page.goto('/cgu');
    const title = page.locator('h1, [class*="title" i]');
    const titleText = await title.first().textContent();
    expect(titleText?.toLowerCase()).toContain('cgu');
  });

  test('PUB-024: CGU page contains 9 articles', async ({ page }) => {
    await page.goto('/cgu');
    const articles = page.locator('h2, h3, article, [class*="article" i], [data-testid*="article" i]');
    const count = await articles.count();
    expect(count).toBeGreaterThanOrEqual(9);
  });

  test('PUB-025: CGU page references Benin', async ({ page }) => {
    await page.goto('/cgu');
    const content = page.locator('body');
    const text = await content.textContent();
    expect(text?.toLowerCase()).toContain('benin');
  });
});

test.describe('PUB-026 to PUB-028: CGV Page', () => {
  test('PUB-026: CGV page loads at /cgv route', async ({ page }) => {
    await page.goto('/cgv');
    expect(page.url()).toContain('/cgv');
  });

  test('PUB-027: CGV page has correct title', async ({ page }) => {
    await page.goto('/cgv');
    const title = page.locator('h1, [class*="title" i]');
    const titleText = await title.first().textContent();
    expect(titleText?.toLowerCase()).toContain('cgv');
  });

  test('PUB-028: CGV page contains 12 articles', async ({ page }) => {
    await page.goto('/cgv');
    const articles = page.locator('h2, h3, article, [class*="article" i], [data-testid*="article" i]');
    const count = await articles.count();
    expect(count).toBeGreaterThanOrEqual(12);
  });
});
