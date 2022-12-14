const playwright = require('playwright');
const chai = require('chai')
const expect = chai.expect

let page, browser, context

const selectors = {
  login: 'input[name=username]',
  password: 'input[name=password]',
  loginBtn: 'button[type=button].is-primary',
}

const credentials = {
  login: 'demo',
  password: 'demo'
}

describe('Vikunja:login', () => {
  beforeEach(async function() {
    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 2000
    });
      
    context = await browser.newContext()
    page = await context.newPage('https://try.vikunja.io')
  })

  afterEach(async function() {
    await page.screenshot({ path: `schreenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
    await browser.close()
  })

  it('should exists', async() => {
    await page.goto('https://try.vikunja.io/login');
    
    const title = await page.title()
    expect(title).to.equal('Login | Vikunja')
  })

  it('should successfully login and redirect to main page', async() => {
    await page.goto('https://try.vikunja.io/login');

    await page.locator(selectors.login).fill(credentials.login);
    await page.locator(selectors.password).fill(credentials.password);

    await page.click(selectors.loginBtn);

    await page.waitForLoadState('networkidle');
    
    const title = await page.title()
    expect(title).to.equal('Current Tasks | Vikunja')
  })
})
