const DataTypes = require('sequelize')
const sequelize = require('../db.js')

const Roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  description: DataTypes.STRING
})

module.exports = Roles
