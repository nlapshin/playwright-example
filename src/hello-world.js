const playwright = require('playwright');


// 1. Откроем браузер.
// 2. Откроем страницу.
// 3. Проверим что она открылась.
// 4. Сделаем скриншот.

async function launcher() {
  // Опции или в переменные окружения или передавать как аргумент
  const browser = await playwright.chromium.launch({
    headless: false, // true по-умолчанию, false
    slowMo: 200 // режим замедление
  });

  const context = await browser.newContext(); // подложить сессию.
  const page = await context.newPage();

  return { browser, page };
}

const selectors = {
  title: '.title-new__text h1'
}

async function getTitleElement(page) {
  return await page.locator(selectors.title)
}

async function getTitleText(page) {
  return await page.locator(selectors.title).textContent();
}

// в конфиг или переменную окружения.
const BASE_URL = 'https://otus.ru/' // не дадут это делать, staging.otus.ru или test.otus.ru

(async () => {
    // beforeEach
    const { browser, page } = await launcher();

    // Осуществить переход на нужную страницу.
    await page.goto(BASE_URL);

    const text = await getTitleText(page);
    // как получить текст из элемента в чистом DOM
    // document.querySelector('.title-new__text h1').innerText

    if (text === 'Авторские онлайн‑курсы для профессионалов') {
      console.log(true);
    }

    await page.screenshot({ 
      path: `screenshots/example-chromium.png`, 
      fullPage: true 
    });

    // afterEach
    await browser.close();
})();














// (async () => {
//   for (const browserType of ['chromium', 'firefox', 'webkit']) {
//     const browser = await playwright[browserType].launch({
//       headless: false,
//       slowMo: 500
//     });

//     const context = await browser.newContext();
//     const page = await context.newPage('https://otus.ru/');

//     await page.goto('https://otus.ru/')
//     await page.screenshot({ path: `screenshots/example-${browserType}.png` });

//     await browser.close();
//   }
// })();
