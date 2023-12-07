const express = require('express')
const {
  httpGetAllUsers,
  httpGetUserById,
  httpCreateUser,
  httpDeleteUser
} = require('./user.controller')

const router = express.Router()

router
  .get('/', httpGetAllUsers)
  .get('/:userId', httpGetUserById)
  .post('/', httpCreateUser)
  .delete('/:userId', httpDeleteUser)

module.exports = router
