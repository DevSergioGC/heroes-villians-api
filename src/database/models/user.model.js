const DataTypes = require('sequelize')
const sequelize = require('../db.js')
// const Role = require('./role.model.js')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
})

// User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })

module.exports = User
