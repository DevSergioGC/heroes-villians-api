const DataTypes = require('sequelize')
const sequelize = require('../db.js')
const User = require('./user.model.js')

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

Roles.hasMany(User, { foreignKey: 'roleId', sourceKey: 'id' })

module.exports = Roles
