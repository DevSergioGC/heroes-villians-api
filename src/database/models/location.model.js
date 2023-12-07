const DataTypes = require('sequelize')
const sequelize = require('../db.js')

const Location = sequelize.define('location', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  address: DataTypes.STRING
})

module.exports = Location
