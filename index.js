const express = require('express')
const app = express()

app.get('/', (req, res) => {
  return res.send('Yasin Arafat')
})

app.listen(2500, function () {
  console.log('server is running at port 2500')
})
module.exports = app
