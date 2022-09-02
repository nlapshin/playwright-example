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
  })
})
