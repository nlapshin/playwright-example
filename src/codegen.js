const puppeteer = require('puppeteer');
const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.goto('https://otus.ru/')

await page.setViewport({ width: 1815, height: 964 })

await page.waitForNavigation()

await page.waitForSelector('.header3 > .header3__container > .header3__nav > .header3__nav-item > .header3__button-sign-in')
await page.click('.header3 > .header3__container > .header3__nav > .header3__nav-item > .header3__button-sign-in')

await page.waitForSelector('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input')
await page.click('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input')

await page.type('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input', 'nlapshin1989@gmail.com')

await page.waitForSelector('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line > .new-button')
await page.click('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line > .new-button')

await browser.close()
