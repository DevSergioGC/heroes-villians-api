const DataTypes = require('sequelize')
const sequelize = require('../db.js')
const bcrypt = require('bcrypt')

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
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: false
  }
})

User.checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}

// User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })

module.exports = User
