const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Person = sequelize.define(
  'person',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: {
          msg: 'Please enter your name'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Age must be a number'
        },
        min: {
          args: 16,
          msg: 'Age must be greater or equal than 16'
        }
      }
    }
  },
  {
    timestamps: false
  }
);

module.exports = Person;
