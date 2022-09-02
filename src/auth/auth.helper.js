module.exports = {
  credentials: {
    login: 'demo',
    password: 'demo'
  },

  page: {
    login: {
      selectors: {
        login: 'input[name=username]',
        password: 'input[name=password]',
        loginBtn: 'button[type=button].is-primary',
      }
    }
  }
}
