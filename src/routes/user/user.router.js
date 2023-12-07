const express = require('express')
const {
  httpGetAllUsers,
  httpGetUserById,
  httpCreateUser
} = require('./user.controller')

const router = express.Router()

router
  .get('/', httpGetAllUsers)
  .get('/:userId', httpGetUserById)
  .post('/', httpCreateUser)

module.exports = router
