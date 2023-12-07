const DataTypes = require('sequelize')
const sequelize = require('../db.js')
const User = require('./user.model.js')

const Role = sequelize.define('role', {
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

Role.hasMany(User, { foreignKey: 'roleId', sourceKey: 'id' }, { onDelete: 'restrict' })

module.exports = Role
