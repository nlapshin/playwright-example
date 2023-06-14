const playwright = require('playwright');
const { test, expect } = require('@playwright/test')

// playwright.chromium.launch

test('first test', async () => {
  // Мы запускаем браузер.
  const browser = await playwright.chromium.launch({
    headless: false
  });

  // Мы создали контекст.
  const context = await browser.newContext();
  // Создаем новую страницу.
  const page = await context.newPage();

  // Переход на нужный url
  await page.goto('https://google.ru/')

  const title = await page.title();
  expect(title).toEqual('Тест')

  // Мы делаем скриншот
  await page.screenshot({ path: `screenshots/example-chromium.png`, fullPage: true });

  await browser.close();

})
    