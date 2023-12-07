const DataTypes = require('sequelize')
const sequelize = require('../db.js')
const Person = require('./person.model.js')

const Villian = sequelize.define('villian', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  threatStyle: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
})

Villian.belongsTo(Person, { as: 'person', foreignKey: 'personId' })

module.exports = Villian
