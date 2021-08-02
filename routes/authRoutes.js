/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const addUser = require('../modules/service/userService')
const userRegisterValidation = require('../modules/validation/userValidation')

router.get('/register', (req, res) => {
  return res.render('register', { message: 'please complete the login form' })
})
router.post('/register', async (req, res) => {
  try {
    const validationResult = userRegisterValidation.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
      return res.render('register', { message: 'validation error' })
    }
    const user = await addUser(req.body)
    console.log(user)
    return res.render('register', { message: 'login successfull' })
  } catch (error) {
    console.error(error)
    return res.status(400).render('register', { message: 'somethin went wrong' })
  }
})
module.exports = router
