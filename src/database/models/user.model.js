const DataTypes = require('sequelize');
const sequelize = require('../db.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const User = sequelize.define(
  'user',
  {
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
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, saltRounds);
      }
    }
  }
);

User.checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

module.exports = User;
