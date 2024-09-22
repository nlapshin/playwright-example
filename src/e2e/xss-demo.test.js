import { test, chromium } from '@playwright/test';
import { makeXssDemoPage } from '../pages/xssDemo.page';

test('XSS vulnerability test on xssDemo page', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const xssDemoPage = makeXssDemoPage(page);

  await xssDemoPage.navigate();

  const xssPayload = 'test';
  const expectedText = 'test';

  // const xssPayload = '<script>alert("XSS")</script>';
  // const expectedText = 'alert("XSS")';

  await xssDemoPage.enterAndSubmitInput(xssPayload, expectedText);
});
