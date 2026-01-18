import { Page } from '@playwright/test';

export const ADMIN_CREDENTIALS = {
  email: 'admin@ayoya.bj',
  password: 'ayoya_admin_2024'
};

export const LOGISTICS_CREDENTIALS = {
  email: 'logistique@ayoya.bj',
  password: 'ayoya_logistique_2024'
};

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/admin/login');
  await page.fill('input[type="email"]', ADMIN_CREDENTIALS.email);
  await page.fill('input[type="password"]', ADMIN_CREDENTIALS.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin/settings');
}

export async function loginAsLogistics(page: Page): Promise<void> {
  await page.goto('/logistics');
  await page.fill('input[type="text"]', LOGISTICS_CREDENTIALS.email);
  await page.fill('input[type="password"]', LOGISTICS_CREDENTIALS.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/logistics/dashboard');
}
