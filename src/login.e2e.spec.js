const playwright = require('playwright');
const chai = require('chai')
const expect = chai.expect

let page, browser, context

const loginUrl = 'https://authenticationtest.com/simpleFormAuth';

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

async function bootstrapTest() {
  browser = await playwright.chromium.launch({
    headless: false,
    slowMo: 200
  });
    
  context = await browser.newContext()
  page = await context.newPage()
}

async function closeTest(testName) {
  await page.screenshot({ path: `schreenshots/${testName}.png` })
    await browser.close()
}

async function login(username, password) {
  await page.goto(loginUrl);

  await page.locator(selectors.login).type(username);
  await page.locator(selectors.password).fill(password);

  await page.click(selectors.loginBtn);

  // waitFor
  await page.waitForLoadState('networkidle');
  
  return await page.locator(selectors.loginSuccess).textContent();
}

describe('authenticationtest:login', () => {
  beforeEach(async function() {
    await bootstrapTest();
  })

  afterEach(async function() {
    await closeTest(this.currentTest.title.replace(/\s+/g, '_'));
  })

  it('should exists', async() => {
    await page.goto('https://authenticationtest.com/simpleFormAuth');
    
    const title = await page.title()
    expect(title).to.equal('Authentication Test')
  })

  it('should successfully login and redirect to main page', async() => {
    const title = await login(credentials.login, credentials.password)

    expect(title).to.equal('Login Success')
  })

  it('should failure during authorization', async() => {
    const title = await login(credentials.login, credentials.password + '123456')

    expect(title).to.equal('Login Failure')
  })

  it('should failure during authorization', async() => {
    const title = await login(credentials.login + '12345', credentials.password + '123456')

    expect(title).to.equal('Login Failure')
  })

  it('should failure during authorization', async() => {
    const title = await login('', '')

    expect(title).to.equal('Login Failure')
  })
})
