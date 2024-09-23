
import { test, expect, chromium } from '@playwright/test';
// import { makeLoginPage } from '../pages/auth.page';

// Хардкодом лежат в тут

// 1. Небезопастно. Переменные окружения или secret vaults.
// 2. Сложно будет поддерживать.
// 3. Разные пользователи.


const username = 'simpleForm@authenticationtest.com';
const password = 'pa$$w0rd';

const browserOptions = { headless: false, slowMo: 1000 };

function makePasswordElement(page) {
  const selector = 'input[name=password]';
  const element = page.locator(selector);

  return {
    async fill(password) {
      await element.fill(password)
    }
  }
}

function makeLoginPage(page) {
  const url = 'https://authenticationtest.com/simpleFormAuth';

  const selectors = {
    login: 'input[name=email]',
    loginBtn: 'input[type=submit]',
    loginSuccess: '.container h1',
    rememberMe: '.remember-me',
  };

  const pageElements = {
    password: makePasswordElement(page)
  };

  const elements = {
    loginField: page.locator(selectors.login),
    loginInButton: page.locator(selectors.loginBtn),
    loginOutcomeElem: page.locator(selectors.loginSuccess),
    rememberMeCheckbox: page.locator(selectors.rememberMe),
  };

  return {
    async navigate() {
      await page.goto(url);
    },

    async fillLogin(login) {
      await elements.loginField.fill(login);
    },

    async fillPassword(password) {
      await pageElements.password.fill(password);
    },

    async submitInput() {
      await elements.loginInButton.click();
    },

    async pageIsExist() {
      const title = await page.title();

      expect(title).toContain('Authentication Test');
    },

    async verifyOutputContains(expectedText) {
      await page.waitForLoadState('networkidle');
      const text = await elements.loginOutcomeElem.textContent();

      expect(text).toContain(expectedText);
    },
  }
}

function makeLoginActions(page) {
  const pageLogin = makeLoginPage(page);

  return {
    async login(credentials, expectedText) {
      await pageLogin.navigate();
  
      await pageLogin.fillLogin(credentials.username);
      await pageLogin.fillPassword(credentials.password);
      await pageLogin.submitInput();
    
      await pageLogin.verifyOutputContains(expectedText);
    },
  }
}

// pageLoginElements => pageLogin => pageLoginActions

test('should exists', async() => {
  const browser = await chromium.launch(browserOptions);
  const page = await browser.newPage(); // вот этот page?

  const pageLogin = makeLoginPage(page);

  await pageLogin.navigate();
  await pageLogin.pageIsExist();

  await browser.close();
})

test('should successfully login and redirect to main page', async() => {
  const browser = await chromium.launch(browserOptions);
  const page = await browser.newPage();

  const pageLoginActions = makeLoginActions(page);

  await pageLoginActions.login({ 
    username, 
    password 
  }, 'Login Success');

  await browser.close();
})


test('should failure during authorization', async() => {
  const browser = await chromium.launch(browserOptions);
  const page = await browser.newPage();

  const pageLoginActions = makeLoginActions(page);

  await pageLoginActions.login({ 
    username, 
    password: password + '123456' // faker
  }, 'Login Failure');

  await browser.close();
})






























// test('should exists', async() => {
//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();

//   const loginPage = makeLoginPage(page);

//   await loginPage.navigate();
//   await loginPage.shouldExist();
// });

// test('should successfully login and redirect to main page', async() => {
//   const browser = await chromium.launch({ headless: false, slowMo: 2000 });
//   const page = await browser.newPage();

//   const loginPage = makeLoginPage(page);

//   await loginPage.navigate();
//   await loginPage.fillLogin(credentials.login);
//   await loginPage.fillPassword(credentials.password);
//   await loginPage.submitInput();
//   await loginPage.verifyOutputContains('Login Success');
// });

// test('should failure during authorization', async() => {
//   const browser = await chromium.launch({ headless: false, slowMo: 2000 });
//   const page = await browser.newPage();

//   const loginPage = makeLoginPage(page);

//   await loginPage.navigate();
//   await loginPage.fillLogin(credentials.login);
//   await loginPage.fillPassword(credentials.password + '123456');
//   await loginPage.submitInput();
//   await loginPage.verifyOutputContains('Login Failure');
// });
