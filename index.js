/* eslint-disable no-use-before-define */
/* eslint-disable no-lone-blocks */
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')
const MongoStore = require('connect-mongo')
// const mongoDbConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStateges/localStrategy')
const userAuthenticate = require('./middleWares/authMiddleWare')

const authRouths = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '0dceb32d28e90a39d5803eb2a35f5fb25009f38f',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/x-store' })
}))
app.use(passport.initialize())
app.use(passport.session())

app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRouths)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log('User', req.user)
  console.log(`you have visited ${req.session.views} times`)
  return res.render('index')
})
app.get('/home', userAuthenticate, (req, res) => {
  res.send(`you are logged in ${req.user.name}`)
})

app.listen(2500, function () {
  console.log('server is running at port 2500')
})
module.exports = app
