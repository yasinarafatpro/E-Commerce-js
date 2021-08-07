const express = require('express')
const router = express.Router()
const addUser = require('../modules/service/userService')
const userRegisterValidation = require('../modules/validation/userValidation')
const joiErrorFormatter = require('../utils/validationErrorFormatter')
const mongoseErroeFormatter = require('../utils/validationErrorFormatter')

router.get('/register', (req, res) => {
  return res.render('register', { message: {}, formData: {}, errors: {} })
})
router.post('/register', async (req, res) => {
  try {
    const validationResult = userRegisterValidation.validate(req.body,
      { abortEarly: false })
    if (validationResult.error) {
      return res.render('register', {
        message: {
          type: 'error',
          body: 'validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      })
    }
    // eslint-disable-next-line no-unused-vars
    const user = await addUser(req.body)
    // console.log(user)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registration successfull'
      },
      errors: {},
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
module.exports = router
