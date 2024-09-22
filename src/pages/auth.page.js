import { expect } from '@playwright/test';

export function makeLoginPage(page) {
  const url = 'https://authenticationtest.com/simpleFormAuth';

  const selectors = {
    login: 'input[name=email]',
    password: 'input[name=password]',
    loginBtn: 'input[type=submit]',
    loginSuccess: '.container h1'
  }

  const loginField = page.locator(selectors.login);
  const passwordField = page.locator(selectors.password);
  const loginInButton = page.locator(selectors.loginBtn);
  const loginSuccessElem = page.locator(selectors.loginSuccess);

  return {
    async navigate() {
      await page.goto(url);
    },

    async fillLogin(login) {
      await loginField.fill(login);
    },

    async fillPassword(password) {
      await passwordField.fill(password);
    },

    async submitInput() {
      await loginInButton.click();
    },

    async shouldExist() {
      await expect(await page.title()).toContain('Authentication Test');
    },

    async verifyOutputContains(expectedText) {
      await expect(loginSuccessElem).toContainText(expectedText);
    },
  }
}
