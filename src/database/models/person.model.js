const DataTypes = require('sequelize')
const sequelize = require('../db.js')

const Person = sequelize.define('person', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  age: DataTypes.INTEGER
})

module.exports = Person
