const { chromium } = require('playwright');
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('https://otus.ru/')

await page.setViewportSize({ width: 1920, height: 1053 })

await page.waitForSelector('.header3__button-sign-in')
await page.click('.header3__button-sign-in')

await page.waitForSelector('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input')
await page.click('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input')

await page.type('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input', 'nlapshin1989@gmail.com')

await page.waitForSelector('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line > .new-button')
await page.click('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line > .new-button')

await browser.close()













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
