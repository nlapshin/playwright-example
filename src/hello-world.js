const playwright = require('playwright');

// playwright.chromium.launch

(async () => {
    // Мы запускаем браузер.
    const browser = await playwright.chromium.launch({
      headless: false
    });

    // Мы создали контекст.
    const context = await browser.newContext();
    // Создаем новую страницу.
    const page = await context.newPage();

    // Переход на нужный url
    await page.goto('https://otus.ru/', {
      timeout: 60000
    })

    const title = (await page.locator('.title-new__text h1').textContent()).trim();

    if (title === 'Авторские онлайн‑курсы для профессионалов') {
      console.log('Все хорошо');
    } else {
      throw new Error('Ошибка');
    }

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
