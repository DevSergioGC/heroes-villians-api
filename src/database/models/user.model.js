const DataTypes = require('sequelize')
const sequelize = require('../db.js')

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

module.exports = User
