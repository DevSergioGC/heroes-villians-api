const DataTypes = require('sequelize')
const sequelize = require('../db.js')
const Person = require('./person.model.js')

const Hero = sequelize.define('hero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  principalPower: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
})

Hero.belongsTo(Person)

module.exports = Hero
