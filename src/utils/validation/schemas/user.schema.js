const Joi = require('joi')

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(8).max(32),
  roleId: Joi.number().required()
})

module.exports = { userSchema }
