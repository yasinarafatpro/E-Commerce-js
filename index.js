const express = require('express')
require('./utils/db.config')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(2500, function () {
  console.log('server is running at port 2500')
})
module.exports = app
