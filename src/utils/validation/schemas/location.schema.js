const Joi = require('joi')

const locationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required()
})

const updateLocationSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string()
})

const assignLocationSchema = Joi.object({
  personId: Joi.number().integer().required(),
  locationId: Joi.number().integer().required()
})

module.exports = {
  locationSchema,
  updateLocationSchema,
  assignLocationSchema
}
