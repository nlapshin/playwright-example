const playwright = require('playwright');

// playwright.chromium.launch

(async () => {
    // Мы запускаем браузер.
    const browser = await playwright.chromium.launch({
      headless: false // По умолчанию true
    });

    // Мы создали контекст.
    const context = await browser.newContext();
    // Создаем новую страницу.
    const page = await context.newPage();

    console.log('page run');

    // Переход на нужный url
    await page.goto('https://otus.ru/', {
      timeout: 60000
    });

    const title = (await page.locator('h2.sc-1r3ji37-2').textContent()).trim();

    console.log('title', title);

    // Мы делаем скриншот
    await page.screenshot({ path: `screenshots/example-chromium.png`, fullPage: true });

    await browser.close();


  // for (const browserType of ['chromium', 'firefox', 'webkit']) {
    // Мы запускаем браузер.
    // {
    //   headless: false,
    //   slowMo: 500,
    // }
  // }
})();
