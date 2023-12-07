const Joi = require('joi')

const locationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required()
})

const updateLocationSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string()
})

module.exports = {
  locationSchema,
  updateLocationSchema
}
