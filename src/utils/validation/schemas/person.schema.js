const Joi = require('joi');

const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(18).max(100),
  locationId: Joi.number().integer()
});

const updatePersonSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(18).max(100),
  locationId: Joi.number().integer()
});

module.exports = {
  personSchema,
  updatePersonSchema
};
