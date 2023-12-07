const Joi = require('joi')

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(8).max(32)
})

module.exports = userSchema
