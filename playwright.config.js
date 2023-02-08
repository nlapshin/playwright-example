const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['html', {
    open: 'never',
    host: '0.0.0.0',
    port: 9223,
  }]],
});
