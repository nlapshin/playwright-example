import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  retries: 1,
  workers: 1,
  testDir: './src',
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'https://authenticationtest.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  // globalSetup: './global-setup.js', // Файл с настройками перед запуском тестов
  // globalTeardown: './global-teardown.js', // Файл с действиями после завершения
});
