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

  test('should showcase both Outstanding Technical Achievement Awards', async ({ page }) => {
    const achievements = page.locator('.achievement-callout');
    await expect(achievements).toHaveCount(2);
    await expect(achievements.first()).toContainText('IBM Verify for Government');
    await expect(achievements.nth(1)).toContainText('MFA Policy Engine');

    const heroStatPill = page.locator('.stat-pill', { hasText: 'Tech Achievement Awards' });
    await expect(heroStatPill).toContainText('2x');
  });

  test('should render technology panel with interactive categories and search', async ({ page }) => {
    const cards = page.locator('.tech-card');
    const totalCount = await cards.count();
    expect(totalCount).toBeGreaterThanOrEqual(20);

    // Filter by Security & IAM (SpiceDB, FedRAMP, OIDC, etc.)
    await page.click('button[data-category="security"]');
    const securityCards = page.locator('.tech-card[data-category="security"]');
    await expect(securityCards.first()).toBeVisible();
    const secCount = await securityCards.count();
    expect(secCount).toBeGreaterThanOrEqual(6);

    // Filter by AI & Innovation (Gemini AI & BobAI)
    await page.click('button[data-category="ai"]');
    const aiCards = page.locator('.tech-card[data-category="ai"]');
    await expect(aiCards).toHaveCount(2);
    await expect(aiCards.first()).toContainText('Gemini AI');
    await expect(aiCards.nth(1)).toContainText('BobAI');

    // Search for SpiceDB
    await page.click('button[data-category="all"]');
    await page.fill('#tech-search-input', 'SpiceDB');
    const spiceCards = page.locator('.tech-card');
    await expect(spiceCards).toHaveCount(1);
    await expect(spiceCards.first()).toContainText('SpiceDB');

    // Search for RabbitMQ
    await page.fill('#tech-search-input', 'RabbitMQ');
    const rabbitCards = page.locator('.tech-card');
    await expect(rabbitCards).toHaveCount(1);
    await expect(rabbitCards.first()).toContainText('RabbitMQ');

    // Search for CouchDB / NoSQL
    await page.fill('#tech-search-input', 'CouchDB');
    const noSqlCards = page.locator('.tech-card');
    await expect(noSqlCards).toHaveCount(1);
    await expect(noSqlCards.first()).toContainText('DynamoDB');

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

  test('should feature Projects tab, top-of-page app links, and RankAnything showcase section', async ({ page }) => {
    // 1. Projects tab in main nav
    const projectsNav = page.locator('.nav-menu .nav-link', { hasText: 'Projects' });
    await expect(projectsNav).toBeVisible();
    await expect(projectsNav).toHaveAttribute('href', '#projects');

    // 2. Direct app link near top of page in header actions
    const headerAppLink = page.locator('.header-app-link');
    await expect(headerAppLink).toHaveAttribute('href', 'https://app.colton-williams.com');
    await expect(headerAppLink).toHaveAttribute('target', '_blank');
    await expect(headerAppLink).toContainText('RankAnything');
    await expect(headerAppLink).toContainText('PoC');

    // 3. Hero button for RankAnything
    const heroAppBtn = page.locator('.btn-hero-app');
    await expect(heroAppBtn).toBeVisible();
    await expect(heroAppBtn).toHaveAttribute('href', 'https://app.colton-williams.com');
    await expect(heroAppBtn).toContainText('RankAnything (PoC)');

    // 4. Dedicated Projects section
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection.locator('.project-title')).toContainText('RankAnything');
    await expect(projectsSection.locator('.project-kicker')).toContainText('Proof of Concept');
    await expect(projectsSection.locator('.project-desc')).toContainText('Austin');
    await expect(projectsSection.locator('.project-tech-tags')).toContainText('Docker Compose');
    await expect(projectsSection.locator('.project-tech-tags')).toContainText('Cloudflare Tunnels');

    // Launch button inside project showcase card
    const projectLaunchBtn = projectsSection.locator('.project-actions a.btn-primary');
    await expect(projectLaunchBtn).toHaveAttribute('href', 'https://app.colton-williams.com');
    await expect(projectLaunchBtn).toHaveAttribute('target', '_blank');

    // 5. Footer links
    const footerProjectsLink = page.locator('.footer-links a', { hasText: 'Projects' });
    await expect(footerProjectsLink).toHaveAttribute('href', '#projects');
    const footerAppLink = page.locator('.footer-links a', { hasText: 'RankAnything (PoC)' });
    await expect(footerAppLink).toHaveAttribute('href', 'https://app.colton-williams.com');
  });
});
