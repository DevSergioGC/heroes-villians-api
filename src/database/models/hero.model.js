const DataTypes = require('sequelize');
const sequelize = require('../db.js');

const Hero = sequelize.define(
  'hero',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    principalPower: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = Hero;
