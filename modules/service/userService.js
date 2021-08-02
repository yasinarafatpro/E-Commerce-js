/* eslint-disable no-unused-vars */

const User = require('../models/User')
/**
 * create a newUser and return it
 * @param {object} userInput
 */
const addUser = async (userInput) => {
  const user = new User(userInput)
  await user.save()
  return user
}
module.exports = addUser
