const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const Villian = sequelize.define(
  'villian',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    threatStyle: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notNull: {
          msg: 'Please enter your threat style'
        },
        notEmpty: {
          msg: 'Please enter your threat style'
        }
      }
    }
  },
  {
    timestamps: false
  }
);

module.exports = Villian;
