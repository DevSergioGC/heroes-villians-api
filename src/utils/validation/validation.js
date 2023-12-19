const { personSchema, updatePersonSchema } = require('./schemas/person.schema');
const { heroSchema, updateHeroSchema } = require('./schemas/hero.schema');
const {
  villianSchema,
  updateVillianSchema
} = require('./schemas/villian.schema');
const { userSchema } = require('./schemas/user.schema');
const {
  locationSchema,
  updateLocationSchema,
  assignLocationSchema
} = require('./schemas/location.schema');

const validatePerson = (data) => personSchema.validate(data);
const validateUpdatePerson = (data) => updatePersonSchema.validate(data);
const validateHero = (data) => heroSchema.validate(data);
const validateUpdateHero = (data) => updateHeroSchema.validate(data);
const validateVillian = (data) => villianSchema.validate(data);
const validateUpdateVillian = (data) => updateVillianSchema.validate(data);
const validateUser = (data) => userSchema.validate(data);
const validateLocation = (data) => locationSchema.validate(data);
const validateUpdateLocation = (data) => updateLocationSchema.validate(data);
const validateAssignLocation = (data) => assignLocationSchema.validate(data);

module.exports = {
  validatePerson,
  validateUpdatePerson,
  validateHero,
  validateUpdateHero,
  validateVillian,
  validateUpdateVillian,
  validateUser,
  validateLocation,
  validateUpdateLocation,
  validateAssignLocation
};
