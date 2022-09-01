const playwright = require('playwright');

(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {
    const browser = await playwright[browserType].launch({
      headless: false,
      slowMo: 500
    });

    const context = await browser.newContext();
    const page = await context.newPage('https://otus.ru/');

    await page.goto('https://otus.ru/')
    await page.screenshot({ path: `screenshots/example-${browserType}.png` });

    await browser.close();
  }
})();
