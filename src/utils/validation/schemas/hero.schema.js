const Joi = require('joi')

const heroSchema = Joi.object({
  principalPower: Joi.string().required()
})

const updateHeroSchema = Joi.object({
  principalPower: Joi.string()
})

module.exports = {
  heroSchema,
  updateHeroSchema
}
