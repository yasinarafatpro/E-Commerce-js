/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [64, 'name to higher then 64 characters'],
    minlength: [2, 'name can not be smaller then 2 characters']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    maxlength: [128, 'email can\'t be higher then 128 characters'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})
const User = mongoose.model('users', userSchema)
module.exports = User
