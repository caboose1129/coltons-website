import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Colton Williams Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    const fileUrl = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUrl, { waitUntil: 'load' });
  });

  test('should have descriptive title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Colton Williams/i);
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toContainText('Colton Williams');
  });

  test('should dynamically calculate and render years of experience', async ({ page }) => {
    // Wait for counter to initialize
    await page.waitForTimeout(1500);

    const heroYears = page.locator('#dynamic-hero-years');
    await expect(heroYears).toBeVisible();
    const text = await heroYears.textContent();
    // Career started June 2015, so years must be >= 10
    const num = parseInt(text?.replace(/\D/g, '') || '0', 10);
    expect(num).toBeGreaterThanOrEqual(10);

    // Bio tenure text
    const bioYears = page.locator('#dynamic-bio-years');
    await expect(bioYears).toContainText('years');
  });

  test('should render technology panel with interactive categories and search', async ({ page }) => {
    const cards = page.locator('.tech-card');
    const totalCount = await cards.count();
    expect(totalCount).toBeGreaterThanOrEqual(15);

    // Filter by Security & IAM
    await page.click('button[data-category="security"]');
    const securityCards = page.locator('.tech-card[data-category="security"]');
    await expect(securityCards.first()).toBeVisible();
    const secCount = await securityCards.count();
    expect(secCount).toBeGreaterThanOrEqual(4);

    // Search for Terraform
    await page.click('button[data-category="all"]');
    await page.fill('#tech-search-input', 'Terraform');
    const searchCards = page.locator('.tech-card');
    await expect(searchCards).toHaveCount(1);
    await expect(searchCards.first()).toContainText('Terraform');

    // Clear search
    await page.click('#tech-clear-btn');
    await expect(cards).toHaveCount(totalCount);
  });

  test('should toggle dark/light theme seamlessly', async ({ page }) => {
    const metaTheme = page.locator('meta[name="color-scheme"]');
    const initialScheme = await metaTheme.getAttribute('content');

    // Click theme toggle
    await page.click('#theme-toggle');
    const updatedScheme = await metaTheme.getAttribute('content');
    expect(updatedScheme).not.toBe(initialScheme);
  });
});
