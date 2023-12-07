const Joi = require('joi')

const heroSchema = Joi.object({
  principalPower: Joi.string().required(),
  personId: Joi.number().required()
})

const updateHeroSchema = Joi.object({
  principalPower: Joi.string()
})

module.exports = {
  heroSchema,
  updateHeroSchema
}
