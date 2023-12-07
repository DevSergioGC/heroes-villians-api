const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/database.sqlite'
})

module.exports = sequelize
