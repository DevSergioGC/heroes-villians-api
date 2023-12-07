const express = require('express')
const {
  httpGetAllRoles,
  httpGetRoleById,
  httpCreateRole
} = require('./user.controller')

const router = express.Router()

router
  .get('/', httpGetAllRoles)
  .get('/:roleId', httpGetRoleById)
  .post('/', httpCreateRole)

module.exports = router
