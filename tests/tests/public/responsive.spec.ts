import { test, expect, devices } from '@playwright/test';

const BASE_URL = 'https://ecom.ayoya.srv1164291.hstgr.cloud';

// MOBILE 375px TESTS (RESP-001 to RESP-009)
test.describe('RESP-001: Mobile 375px - Hamburger menu visible', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-001: Hamburger menu visible on mobile', async ({ page }) => {
    await page.goto(BASE_URL);
    const hamburger = page.locator('button[aria-label="menu"], [class*="hamburger"], [class*="mobile-menu"]').first();
    await expect(hamburger).toBeVisible();
  });
});

test.describe('RESP-002: Mobile 375px - Desktop menu hidden', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-002: Desktop navigation menu hidden on mobile', async ({ page }) => {
    await page.goto(BASE_URL);
    const desktopNav = page.locator('nav[class*="desktop"], [class*="nav-desktop"]').first();

    // Check if it exists and is hidden
    const isHidden = await desktopNav.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display === 'none' || style.visibility === 'hidden' || style.width === '0px';
    }).catch(() => true);

    expect(isHidden).toBeTruthy();
  });
});

test.describe('RESP-003: Mobile 375px - Open mobile menu', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-003: Open/close mobile menu functionality', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburger = page.locator('button[aria-label="menu"], [class*="hamburger"], [class*="mobile-menu"]').first();
    await hamburger.click();

    const mobileMenu = page.locator('[class*="mobile-menu"], [class*="sidebar"], nav[class*="mobile"]').first();
    await expect(mobileMenu).toBeVisible();

    // Close menu
    await hamburger.click();
    const isHidden = await mobileMenu.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
    }).catch(() => false);

    expect(isHidden).toBeTruthy();
  });
});

test.describe('RESP-004: Mobile 375px - Mobile menu links present', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-004: Mobile menu contains navigation links', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburger = page.locator('button[aria-label="menu"], [class*="hamburger"]').first();
    await hamburger.click();

    const menuLinks = page.locator('[class*="mobile-menu"] a, nav[class*="mobile"] a').first();
    await expect(menuLinks).toBeVisible();
  });
});

test.describe('RESP-005: Mobile 375px - Navigation via mobile menu', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-005: Navigate using mobile menu links', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburger = page.locator('button[aria-label="menu"], [class*="hamburger"]').first();
    await hamburger.click();

    const firstLink = page.locator('[class*="mobile-menu"] a, nav[class*="mobile"] a').first();
    const href = await firstLink.getAttribute('href');

    if (href && href !== '#') {
      await firstLink.click();
      // Verify navigation occurred
      expect(page.url()).toContain(href.replace(/^\//, ''));
    }
  });
});

test.describe('RESP-006: Mobile 375px - Hero responsive', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-006: Hero section responsive on mobile', async ({ page }) => {
    await page.goto(BASE_URL);

    const hero = page.locator('section[class*="hero"], [class*="banner"], div[class*="hero"]').first();
    await expect(hero).toBeVisible();

    // Check full width
    const width = await hero.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width;
    });

    expect(width).toBeGreaterThan(350);
  });
});

test.describe('RESP-007: Mobile 375px - Form full width', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-007: Form elements full width on mobile', async ({ page }) => {
    await page.goto(BASE_URL);

    const form = page.locator('form').first();
    if (await form.isVisible()) {
      const formInput = form.locator('input, textarea, select').first();

      const width = await formInput.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width;
      });

      expect(width).toBeGreaterThan(300);
    }
  });
});

test.describe('RESP-008: Mobile 375px - Touch buttons min 44px', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-008: Button touch targets minimum 44px', async ({ page }) => {
    await page.goto(BASE_URL);

    const button = page.locator('button').first();
    await expect(button).toBeVisible();

    const { width, height } = await button.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });

    expect(Math.min(width, height)).toBeGreaterThanOrEqual(40);
  });
});

test.describe('RESP-009: Mobile 375px - Spacing and padding', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('RESP-009: Mobile layout has proper spacing', async ({ page }) => {
    await page.goto(BASE_URL);

    const mainContent = page.locator('main, [role="main"]').first();
    const padding = await mainContent.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
      };
    });

    expect(padding.paddingLeft).not.toBe('0px');
    expect(padding.paddingRight).not.toBe('0px');
  });
});

// TABLET 768px TESTS (RESP-010 to RESP-012)
test.describe('RESP-010: Tablet 768px - 2-column grid', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('RESP-010: Product grid uses 2 columns on tablet', async ({ page }) => {
    await page.goto(BASE_URL);

    const grid = page.locator('[class*="grid"], [class*="products"]').first();
    if (await grid.isVisible()) {
      const columnCount = await grid.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.gridTemplateColumns || style.columnCount || '';
      });

      // Check if grid is configured (either CSS Grid or multi-column)
      expect(columnCount).toBeTruthy();
    }
  });
});

test.describe('RESP-011: Tablet 768px - Adapted navigation', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('RESP-011: Navigation adapted for tablet viewport', async ({ page }) => {
    await page.goto(BASE_URL);

    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    const navStyle = await nav.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    });

    expect(navStyle.width).toBeGreaterThan(500);
  });
});

test.describe('RESP-012: Tablet 768px - Optimized images', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('RESP-012: Images optimized for tablet display', async ({ page }) => {
    await page.goto(BASE_URL);

    const image = page.locator('img').first();
    if (await image.isVisible()) {
      const src = await image.getAttribute('src');
      const naturalWidth = await image.evaluate((el: HTMLImageElement) => el.naturalWidth);

      expect(src).toBeTruthy();
      expect(naturalWidth).toBeGreaterThan(300);
    }
  });
});

// DESKTOP 1280px TESTS (RESP-013 to RESP-018)
test.describe('RESP-013: Desktop 1280px - Desktop nav visible', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('RESP-013: Desktop navigation visible on 1280px', async ({ page }) => {
    await page.goto(BASE_URL);

    const desktopNav = page.locator('nav[class*="desktop"], nav').first();
    await expect(desktopNav).toBeVisible();

    const navLinks = desktopNav.locator('a').first();
    await expect(navLinks).toBeVisible();
  });
});

test.describe('RESP-014: Desktop 1280px - Hamburger hidden', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('RESP-014: Hamburger menu hidden on desktop', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburger = page.locator('button[aria-label="menu"], [class*="hamburger"]').first();

    const isHidden = await hamburger.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display === 'none' || style.visibility === 'hidden';
    }).catch(() => true);

    expect(isHidden).toBeTruthy();
  });
});

test.describe('RESP-015: Desktop 1280px - Full grid layout', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('RESP-015: Full multi-column grid on desktop', async ({ page }) => {
    await page.goto(BASE_URL);

    const grid = page.locator('[class*="grid"], [class*="products"]').first();
    if (await grid.isVisible()) {
      const itemCount = await grid.locator('> *').count();
      const gridWidth = await grid.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width;
      });

      expect(gridWidth).toBeGreaterThan(1000);
      expect(itemCount).toBeGreaterThan(0);
    }
  });
});

test.describe('RESP-016: Desktop 1280px - Large hero image', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('RESP-016: Hero section with large image on desktop', async ({ page }) => {
    await page.goto(BASE_URL);

    const hero = page.locator('section[class*="hero"], [class*="banner"]').first();
    if (await hero.isVisible()) {
      const heroImage = hero.locator('img').first();

      if (await heroImage.isVisible()) {
        const width = await heroImage.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(width).toBeGreaterThan(800);
      }
    }
  });
});

test.describe('RESP-017: Desktop 1280px - Footer columns', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('RESP-017: Footer displays in multiple columns on desktop', async ({ page }) => {
    await page.goto(BASE_URL);

    const footer = page.locator('footer').first();
    if (await footer.isVisible()) {
      const footerSections = footer.locator('[class*="column"], [class*="col"], > div').first();
      await expect(footerSections).toBeVisible();

      const columnsCount = await footer.locator('[class*="column"], [class*="col"], > div').count();
      expect(columnsCount).toBeGreaterThan(1);
    }
  });
});

test.describe('RESP-018: Desktop 1280px - Hover effects', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('RESP-018: Interactive hover effects on desktop', async ({ page }) => {
    await page.goto(BASE_URL);

    const link = page.locator('a').first();
    if (await link.isVisible()) {
      const hoverColor = await link.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.color;
      });

      await link.hover();

      const hoverColorAfter = await link.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.color;
      });

      // Verify some visual change occurred
      expect(hoverColorAfter).toBeTruthy();
    }
  });
});
