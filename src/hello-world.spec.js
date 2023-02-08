const playwright = require('playwright');
const { expect } = require('chai');

const BASE_URL = 'https://otus.ru/'

const launcher = {
  browser: null,
  context: null,
  page: null,

  async start(baseUrl) {
    // this == launcher

    this.browser = await playwright.chromium.launch({
      headless: false
    });
  
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage(baseUrl);
  
    await this.page.goto('https://otus.ru/')
  },
  
  async close() {
    await this.browser.close();
  }
}


describe('otus', () => {
  beforeEach(async() => {
    await launcher.start(BASE_URL)
  })

  afterEach(async() => {
    await launcher.close()
  })

  describe('main page', () => {
    it('should have header title which equal `Авторские онлайн‑курсы для профессионалов`', async () => {
      const headerTitle = await launcher.page.locator('.title-new h1').textContent();

      expect(headerTitle).to.equal('Авторские онлайн‑курсы для профессионалов');
    })

    // const mainPage = {
    //   singInBtn: '.HeaderMenu--logged-out > .header-menu-wrapper > .d-lg-flex > .position-relative > .HeaderMenu-link'
    // }

    // it('should test', () => {
    //   const { chromium } = require('playwright');
    //   const browser = await chromium.launch()
    //   const page = await browser.newPage()
    //   const navigationPromise = page.waitForNavigation()

    //   await page.goto('https://github.com/')

    //   await page.setViewportSize({ width: 1272, height: 691 })

    //   await page.waitForSelector(mainPage.singInBtn)
    //   await page.click(mainPage.singInBtn)

    //   await page.waitForSelector('.HeaderMenu--logged-out > .header-menu-wrapper > .d-lg-flex > .position-relative > .HeaderMenu-link')
    //   await page.click('.HeaderMenu--logged-out > .header-menu-wrapper > .d-lg-flex > .position-relative > .HeaderMenu-link')

    //   await navigationPromise

    //   await navigationPromise

    //   await page.waitForSelector('#login_field')
    //   await page.click('#login_field')

    //   await page.type('#login_field', 'nlapshin1989@gmail.com')

    //   await page.waitForSelector('#login > .auth-form-body > form > .position-relative > .btn')
    //   await page.click('#login > .auth-form-body > form > .position-relative > .btn')

    //   await navigationPromise

    //   await browser.close()
    // })
  })
})
