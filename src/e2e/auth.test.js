// const playwright = require('playwright');
// const chai = require('chai')
// const expect = chai.expect

// let page, browser, context

// const loginUrl = 'https://authenticationtest.com/simpleFormAuth';

// const selectors = {
//   login: 'input[name=email]',
//   password: 'input[name=password]',
//   loginBtn: 'input[type=submit]',
//   loginSuccess: '.container h1'
// }

// const credentials = {
//   login: 'simpleForm@authenticationtest.com',
//   password: 'pa$$w0rd'
// }

// // Те действия которые будем выполнять постоянно.
// // Запустить браузер - создать контехт - создать страницу.
// async function bootstrapTest() {
//   browser = await playwright.chromium.launch({
//     headless: false,
//     // slowMo: 2000 // Что это за опция?
//   });
    
//   context = await browser.newContext()
//   page = await context.newPage()
// }

// // Закрытие.
// // Создать скриншот и закрыть браузер
// async function closeTest(testName) {
//   await page.screenshot({ path: `schreenshots/${timestamp}-${testName}.png` })
//   await browser.close()
// }

// // Сам логин
// //
// async function login(username, password) {
//   await page.goto(loginUrl);

//   await page.locator(selectors.login).type(username);
//   await page.locator(selectors.password).fill(password);

//   await page.click(selectors.loginBtn);

//   // waitFor
//   // waitFor (Something)
//   // Дожидаемся закгузки + выбрать отсечку
//   await page.waitForLoadState('networkidle');

//   // Получаем сообщение из элемента
//   const msg = await page.locator(selectors.loginSuccess).textContent();
//   // Лучше получить token, положить его и сходить куда-нибудь.
  
//   return msg;
// }

import { test, chromium } from '@playwright/test';
import { makeLoginPage } from '../pages/auth.page';

const credentials = {
  login: 'simpleForm@authenticationtest.com',
  password: 'pa$$w0rd'
}

test('should exists', async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const loginPage = makeLoginPage(page);

  await loginPage.navigate();
  await loginPage.shouldExist();
});

test('should successfully login and redirect to main page', async() => {
  const browser = await chromium.launch({ headless: false, slowMo: 2000 });
  const page = await browser.newPage();

  const loginPage = makeLoginPage(page);

  await loginPage.navigate();
  await loginPage.fillLogin(credentials.login);
  await loginPage.fillPassword(credentials.password);
  await loginPage.submitInput();
  await loginPage.verifyOutputContains('Login Success');
});

test('should failure during authorization', async() => {
  const browser = await chromium.launch({ headless: false, slowMo: 2000 });
  const page = await browser.newPage();

  const loginPage = makeLoginPage(page);

  await loginPage.navigate();
  await loginPage.fillLogin(credentials.login);
  await loginPage.fillPassword(credentials.password + '123456');
  await loginPage.submitInput();
  await loginPage.verifyOutputContains('Login Failure');
});


// describe('authenticationtest:login', () => {
  

//   it('should successfully login and redirect to main page', async() => {
//     const title = await login(credentials.login, credentials.password)

//     expect(title).to.equal('Login Success')
//   })

//   it('should failure during authorization', async() => {
//     const title = await login(credentials.login, credentials.password + '123456')

//     expect(title).to.equal('Login Failure')
//   })

//   it('should failure during authorization', async() => {
//     const title = await login(credentials.login + '12345', credentials.password + '123456')

//     expect(title).to.equal('Login Failure')
//   })

//   it('should failure during authorization', async() => {
//     const title = await login('', '')

//     expect(title).to.equal('Login Failure')
//   })
// })
