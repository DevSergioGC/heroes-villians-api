const Person = require('./person.model');
const Hero = require('./hero.model');
const Villian = require('./villian.model');
const Location = require('./location.model');
const User = require('./user.model');

Hero.belongsTo(Person, {
  foreignKey: 'personId',
  as: 'heroPerson'
});

Location.hasMany(Person, {
  foreignKey: 'locationId',
  as: 'people'
});

Person.belongsTo(
  Location,
  {
    foreignKey: 'locationId',
    as: 'location',
    onDelete: 'CASCADE'
  }
);

Villian.belongsTo(Person, { as: 'villianPerson', foreignKey: 'personId' });

module.exports = {
  Person,
  Hero,
  Villian,
  Location,
  User
};
