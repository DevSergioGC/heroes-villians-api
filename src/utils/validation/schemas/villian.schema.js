const Joi = require('joi');

const villianSchema = Joi.object({
  threatStyle: Joi.string().required()
});

const updateVillianSchema = Joi.object({
  threatStyle: Joi.string()
});

module.exports = {
  villianSchema,
  updateVillianSchema
};
