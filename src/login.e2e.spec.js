const playwright = require('playwright');
const chai = require('chai')
const expect = chai.expect

let page, browser, context

const selectors = {
  login: 'input[name=email]',
  password: 'input[name=password]',
  loginBtn: 'input[type=submit]',
  loginSuccess: '.container h1'
}

const credentials = {
  login: 'simpleForm@authenticationtest.com',
  password: 'pa$$w0rd'
}

describe('authenticationtest:login', () => {
  beforeEach(async function() {
    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 2000
    });
      
    context = await browser.newContext()
    page = await context.newPage('https://authenticationtest.com/simpleFormAuth/')
  })

  afterEach(async function() {
    await page.screenshot({ path: `schreenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
    await browser.close()
  })

  it('should exists', async() => {
    await page.goto('https://authenticationtest.com/simpleFormAuth');
    
    const title = await page.title()
    expect(title).to.equal('Authentication Test')
  })

  it('should successfully login and redirect to main page', async() => {
    await page.goto('https://authenticationtest.com/simpleFormAuth');

    await page.locator(selectors.login).fill(credentials.login);
    await page.locator(selectors.password).fill(credentials.password);

    await page.click(selectors.loginBtn);

    await page.waitForLoadState('networkidle');
    
    const title = await page.locator(selectors.loginSuccess).textContent();

    expect(title).to.equal('Login Success')
  })
})
