import { expect } from '@playwright/test';

export function makeXssDemoPage(page) {
  const url = 'https://authenticationtest.com/xssDemo/';

  const selectors = {
    search: 'input[name=search]',
    submit: 'input[type=submit][value=Search]',
    outputDir: '.container .row div:nth-child(1) .card .card-body'
  };

  const searchField = page.locator(selectors.search);
  const submitButton = page.locator(selectors.submit);
  const outputDir = page.locator(selectors.outputDir);

  return {
    async navigate() {
      await page.goto(url);
    },

    async enterSearchInput(inputText) {
      await searchField.fill(inputText);
    },

    async submitInput() {
      await submitButton.click();
    },

    async verifyOutputContains(expectedText) {
      await expect(outputDir).toContainText(expectedText);
    },

    // Проверять бизнес логику.
    async enterAndSubmitInput(inputText, expectedText) {
      await this.enterSearchInput(inputText);
      await this.submitInput();
      await this.verifyOutputContains(expectedText);
    }
  }
}


const obj = {
  name: 'nik',

  showName() {
    console.log(obj.name);
    console.log(this.name); // this === obj
  }
}
