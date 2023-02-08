const playwright = require('playwright');
const { test, expect } = require('@playwright/test');

// this.getStartedLink = page.locator('a', { hasText: 'Get started' });
// this.gettingStartedHeader = page.locator('h1', { hasText: 'Getting started' });
// this.pomLink = page.locator('li', { hasText: 'Playwright Test' }).locator('a', { hasText: 'Page Object Model' });
// this.tocList = page.locator('article div.markdown ul > li > a');

// async getStarted() {
//   await this.getStartedLink.first().click();
//   await expect(this.gettingStartedHeader).toBeVisible();
// }

// async pageObjectModel() {
//   await this.getStarted();
//   await this.pomLink.click();
// }

class BasePage {
  constructor(baseUrl) {
    this.browser = null;
    this.page = null;
    this.baseUrl = baseUrl;
  }

  async init() {
    this.browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 5000
    });
    
    const context = await this.browser.newContext()
    this.page = await context.newPage(this.baseUrl)
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async close() {
    this.browser.close()
  }
}

class PlaywrightDevPage extends BasePage {
  constructor(baseUrl) { // не может быть асинхронным
    super(baseUrl) // super - ссылка на базовый класс

    this.something = 'value'
  }

  static createPlaywright () {
    return new PlaywrightDevPage('https://playwright.dev')
  }

  async init() {
    await super.init()

    console.log('init called')
  }

  // Это называет вычисляемое свойство
  get startedLink() {
    return this.page.locator('a', { hasText: 'Get started' });
  }

  get startedHeader() {
    return this.page.locator('h1', { hasText: 'Installation' });
  }

  get pomLink() {
    return this.page.locator('li', { hasText: 'Playwright Test' }).locator('a', { hasText: 'Page Object Model' });
  }

  get tocList() {
    return this.page.locator('article div.markdown ul > li > a');
  }

  async getStarted() {
    await this.startedLink.first().click();
    await expect(this.startedHeader).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
}

// jest.toMatchSnapshot()

test('should be do successful snapshot testing', async() => {
  const baseUrl = 'https://playwright.dev'
  const pom = new PlaywrightDevPage(baseUrl)

  await pom.init()
  await pom.goto()

  await pom.pageObjectModel()

  await pom.close()
})


























// const playwright = require('playwright');
// const chai = require('chai')
// const expect = chai.expect

// let page, browser, context

// const selectors = {
//   login: 'input[name=username]',
//   password: 'input[name=password]',
//   loginBtn: 'button[type=button].is-primary',
// }

// const credentials = {
//   login: 'demo',
//   password: 'demo'
// }

// describe('Vikunja:login', () => {
//   beforeEach(async function() {
//     browser = await playwright.chromium.launch({
//       headless: false,
//       slowMo: 2000
//     });
      
//     context = await browser.newContext()
//     page = await context.newPage('https://try.vikunja.io')
//   })

//   afterEach(async function() {
//     await page.screenshot({ path: `schreenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
//     await browser.close()
//   })

//   it('should exists', async() => {
//     await page.goto('https://try.vikunja.io/login');
    
//     const title = await page.title()
//     expect(title).to.equal('Login | Vikunja')
//   })

//   it('should successfully login and redirect to main page', async() => {
//     await page.goto('https://try.vikunja.io/login');

//     await page.locator(selectors.login).fill(credentials.login);
//     await page.locator(selectors.password).fill(credentials.password);

//     await page.click(selectors.loginBtn);

//     await page.waitForLoadState('networkidle');
    
//     const title = await page.title()
//     expect(title).to.equal('Current Tasks | Vikunja')
//   })
// })
