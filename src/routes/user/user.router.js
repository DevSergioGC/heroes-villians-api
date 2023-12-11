const express = require('express')
const {
  httpGetAllUsers,
  httpGetUserById,
  httpCreateUser,
  httpLoginUser,
  httpDeleteUser
} = require('./user.controller')
const { authenticateJWT, isAdmin } = require('../../utils/jwt.middleware')

const router = express.Router()

router
  .get('/', authenticateJWT, isAdmin, httpGetAllUsers)
  .get('/:userId', authenticateJWT, isAdmin, httpGetUserById)
  .post('/', httpCreateUser)
  .post('/login', httpLoginUser)
  .delete('/:userId', authenticateJWT, isAdmin, httpDeleteUser)

module.exports = router
