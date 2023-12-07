const express = require('express')
const sequelize = require('./database/db')
const Person = require('./database/models/person.model')
const Hero = require('./database/models/hero.model')
const Villian = require('./database/models/villian.model')

const app = express()

app.use(express.json())

sequelize.sync({ force: false }).then(() => {
  console.log('Database and tables synced')
})

module.exports = app
