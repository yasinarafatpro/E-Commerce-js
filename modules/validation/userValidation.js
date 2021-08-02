const Joi = require('joi')

const registrationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(64)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .min(3)
    .required(),

  repeat_password: Joi.ref('password')
})
module.exports = registrationSchema
