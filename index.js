const express = require('express')
const bodyParser = require('body-parser')
require('./utils/db.config')
const authRouths = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})
app.use('/', authRouths)

app.listen(2500, function () {
  console.log('server is running at port 2500')
})
module.exports = app
