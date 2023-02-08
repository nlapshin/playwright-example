import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  await tweets.evaluate(node => node.innerText)

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});



// const playwright = require('playwright');
// const chai = require('chai')
// const expect = chai.expect

// const fs = require('fs');
// // readFile(promise) и writeFile(promise)

// // mocha + chai 

// // await browserContext.cookies(); - это получить cookies
// // await browserContext.addCookies(); - это добавить.

// // browser - сам браузер
// // browserContext - реализация изолированных вкладок
// // Это преднастройка

// // page - работает на странице.
// // Открыли страницу и проверяем. Как узнать?
// // Получать cookie или добавлять interseptors


// // Есть модуль auth

// /*
// if (await auth.isLogin() === false) {
//   await auth.login()
// }
// */


// let page, browser, context

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

// describe('authenticationtest:login', () => {
//   beforeEach(async function() {
//     browser = await playwright.chromium.launch({
//       headless: false,
//       // slowMo: 2000
//     });
      
//     context = await browser.newContext()
//     page = await context.newPage()
//   })

//   afterEach(async function() {
//     await page.screenshot({ path: `schreenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
//     await browser.close()
//   })

//   it('should exists', async() => {
//     await page.goto('https://authenticationtest.com/simpleFormAuth');
    
//     const title = await page.title()
//     expect(title).to.equal('Authentication Test')
//   });

//   it.only('should successfully login and redirect to main page', async() => {
//     // await page.pause();

//     await page.on('request', request => console.log('>>', request.method(), request.url()));
//     await page.on('response', response => console.log('<<', response.status(), response.url()));

//     // Переход на ссылку
//     await page.goto('https://authenticationtest.com/simpleFormAuth');

//     // локатор + заполняю текст
//     await page.locator(selectors.login).fill(credentials.login);
//     await page.locator(selectors.password).fill(credentials.password);

//     // жму кнопку логин
//     await page.click(selectors.loginBtn);

//     // Ждем какое-то время
//     // Ждем появился селектор waitForSelector
//     // Ждем событие или load state. networkidle - сеть, ничегонеделанье
    
//     // ждем пока совершится переход.
//     await page.waitForLoadState('networkidle');

//     // Проверять что мы авторизовались
//     const title = await page.locator(selectors.loginSuccess).textContent();

//     expect(title).to.equal('Login Success')
//   })
// })

// // как передать cookie и token(узнать где токен хранится)
