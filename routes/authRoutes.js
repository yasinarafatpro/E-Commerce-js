const express = require('express')
const router = express.Router()
const addUser = require('../modules/service/userService')
const userRegisterValidation = require('../modules/validation/userValidation')
const joiErrorFormatter = require('../utils/validationErrorFormatter')
const mongoseErroeFormatter = require('../utils/validationErrorFormatter')
const passport = require('passport')
const guestAuthenticate = require('../middleWares/guestMiddleware')
const authMiddleWare = require('../middleWares/authMiddleWare')
const flashDataMiddleware = require('../middleWares/flashDataMiddleware')

router.get('/register', guestAuthenticate, flashDataMiddleware, (req, res) => {
  return res.render('register')
})
router.post('/register', guestAuthenticate, async (req, res) => {
  try {
    const validationResult = userRegisterValidation.validate(req.body,
      { abortEarly: false })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/register')
    }
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    // console.log(user)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registration successfull'
      },
      formData: req.body
    })
  } catch (error) {
    console.error(error)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Validation error'
      },
      errors: mongoseErroeFormatter(error),
      formData: req.body
    })
  }
})
router.get('/login', guestAuthenticate, flashDataMiddleware, (req, res) => {
  return res.render('login')
})
router.post('/login', guestAuthenticate, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // console.log('Err:', err)
    // console.log('User:', user)
    // console.log('Info:', info)
    // res.redirect('/login')
    if (err) {
      console.error('Err: ', err)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Login Failed'
        }
      }
      return res.redirect('/login')
    }
    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.error
        }
      }
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Err:', err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login Failed'
          }
        }
      }
      return res.redirect('/home')
    })
  })(req, res, next)
})

router.get('/logout', authMiddleWare, (req, res) => {
  req.logout()
  req.session.flashData = {
    message: {
      type: 'success',
      body: 'Logout Success'
    }
  }
  res.redirect('/home')
})
module.exports = router
