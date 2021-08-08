/* eslint-disable no-lone-blocks */
const express = require('express')
const bodyParser = require('body-parser')
require('./utils/db.config')
const authRouths = require('./routes/authRoutes')
const app = express()
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '0dceb32d28e90a39d5803eb2a35f5fb25009f38f',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use('/', authRouths)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`you have visited ${req.session.views} times`)

  return res.render('index')
})

app.listen(2500, function () {
  console.log('server is running at port 2500')
})
module.exports = app
