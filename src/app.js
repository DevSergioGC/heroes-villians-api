/* eslint-disable no-unused-vars */
const express = require('express')
const sequelize = require('./database/db')

// ? Routes
const personRoutes = require('./routes/person/person.router')
const heroRoutes = require('./routes/hero/hero.router')
const villianRoutes = require('./routes/villian/villian.router')
const userRoutes = require('./routes/user/user.router')
const locationRoutes = require('./routes/location/location.router')

// ? Models
const Person = require('./database/models/person.model')
const Hero = require('./database/models/hero.model')
const Villian = require('./database/models/villian.model')
const User = require('./database/models/user.model')

const app = express()

app.use(express.json())

app.use('/person', personRoutes)
app.use('/hero', heroRoutes)
app.use('/villian', villianRoutes)
app.use('/user', userRoutes)
app.use('/location', locationRoutes)

sequelize.sync({ force: false }).then(() => {
  console.log('Database and tables synced')
})

module.exports = app
