const Joi = require('joi')

const roleSchema = Joi.object({
  roleName: Joi.string().required(),
  description: Joi.string()
})

const updateRoleSchema = Joi.object({
  roleName: Joi.string(),
  description: Joi.string()
})

module.exports = {
  roleSchema,
  updateRoleSchema
}
