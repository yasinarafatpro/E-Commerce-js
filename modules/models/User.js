const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [64, 'name to higher then 64 characters'],
    minlength: [2, 'name can not be smaller then 2 characters']
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required'],
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

// unique email
userSchema.path('email').validate(async (email) => {
  const emailCount = await mongoose.models.users.countDocuments({ email })
  return !emailCount
}, 'This Email already exists!')

// bcrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))next()
  this.password = await bcrypt.hash(this.password, saltRounds)
  return next()
})

// compare password
userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const User = mongoose.model('users', userSchema)
module.exports = User
