const DataTypes = require('sequelize')
const sequelize = require('../db.js')
const Person = require('./person.model.js')

const Location = sequelize.define(
  'location',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: {
          msg: 'Please enter your name'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notEmpty: {
          msg: 'Please enter your address'
        },
        notNull: {
          msg: 'Please enter your address'
        }
      }
    }
  },
  {
    timestamps: false
  }
)

Location.assignNewLocation = async (locationId, personId) => {
  try {
    const location = await Location.findByPk(locationId)
    if (!location || location.length === 0) {
      return { status: 404, response: { error: 'Location does not exist' } }
    }
    const PersonModel = sequelize.models.person
    const person = await PersonModel.findByPk(personId)

    if (!person || person.length === 0) {
      return { status: 404, response: { error: 'Person does not exist' } }
    }
    const updatedPerson = {
      locationId
    }
    const newPersonUpdate = await person.update(updatedPerson)
    return { status: 200, response: newPersonUpdate }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}

// Location.hasMany(Person, {
//   foreignKey: 'locationId',
//   as: 'people'
// })

module.exports = Location
