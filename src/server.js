const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div style="font-size: 2px;">
      Hello world
    <div>
  `)
})

app.listen(8080, () => {
  console.log('Server is started on 8080 port')
})
