const { chromium } = require('playwright');
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('https://otus.ru/')

await page.setViewportSize({ width: 1920, height: 1053 })

const selectors = {
  dialogAuthButton: '.header2__auth'
}

await page.waitForSelector(selectors.dialogAuthButton)
await page.click(selectors.dialogAuthButton)

await page.waitForSelector('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input')
await page.click('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input')

await page.type('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line:nth-child(3) > .new-input', 'test@com')

await page.waitForSelector('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line > .new-button')
await page.click('.new-log-reg__login > .new-log-reg__body > .new-log-reg__form > .new-input-line > .new-button')

await browser.close()
