const express = require('express')
const sequelize = require('./database/db')

const app = express()

app.use(express.json())

sequelize.sync({ force: false }).then(() => {
  console.log('Database and tables synced')
})

module.exports = app
