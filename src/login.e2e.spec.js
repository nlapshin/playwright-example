import { test, expect } from '@playwright/test';

const selectors = {
  login: 'input[name=email]',
  password: 'input[name=password]',
  loginBtn: 'input[type=submit]',
  loginSuccess: '.container h1'
};

const credentials = {
  login: 'simpleForm@authenticationtest.com',
  password: 'pa$$w0rd'
};

test.describe('authenticationtest:login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simpleFormAuth/');
  });

  test('should exist', async ({ page }) => {
    const title = await page.title();

    expect(title).toBe('Authentication Test');
  });

  test('should successfully login and redirect to main page', async ({ page }) => {
    await page.locator(selectors.login).fill(credentials.login);
    await page.locator(selectors.password).fill(credentials.password);

    await page.locator(selectors.loginBtn).click();

    await page.waitForLoadState('networkidle');

    const title = await page.locator(selectors.loginSuccess).textContent();

    expect(title).toBe('Login Success');
  });
});
