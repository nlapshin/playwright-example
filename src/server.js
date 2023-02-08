const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div style="font-size: 52px;">
      Hello world
    <div>
  `)
})

app.listen(8080, () => {
  console.log('Server is started on 8080 port')
})
