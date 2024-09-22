const { expect } = require('@playwright/test');

class XssDemoPage {
  constructor(page) {
    this.page = page;
    this.inputField = page.locator('#user-input');
    this.submitButton = page.locator('#submit-button');
    this.outputDiv = page.locator('#output');
  }

  // Метод для перехода на страницу XSS Demo
  async navigate() {
    await this.page.goto('https://authenticationtest.com/xssDemo/');
  }

  // Метод для ввода данных в поле
  async enterInput(inputText) {
    await this.inputField.fill(inputText);
  }

  // Метод для нажатия на кнопку отправки
  async submitInput() {
    await this.submitButton.click();
  }

  // Метод для проверки результата на наличие XSS
  async verifyOutputContains(expectedText) {
    await expect(this.outputDiv).toContainText(expectedText);
  }

  // Метод для выполнения полной цепочки: ввести данные, отправить и проверить
  async enterAndSubmitInput(inputText, expectedText) {
    await this.enterInput(inputText);
    await this.submitInput();
    await this.verifyOutputContains(expectedText);
  }
}

module.exports = { XssDemoPage };
