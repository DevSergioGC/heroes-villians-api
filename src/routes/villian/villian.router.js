const express = require('express')
const {
  httpGetAllVillians,
  httpGetVillianById,
  httpCreateVillian,
  httpUpdateVillian,
  httpDeleteVillian
} = require('./villian.controller')
const { authenticateJWT, isAdmin } = require('../../utils/jwt.middleware')

const router = express.Router()

router
  .get('/', authenticateJWT, httpGetAllVillians)
  .get('/:villianId', authenticateJWT, httpGetVillianById)
  .post('/', authenticateJWT, isAdmin, httpCreateVillian)
  .put('/:villianId', authenticateJWT, isAdmin, httpUpdateVillian)
  .delete('/:villianId', authenticateJWT, isAdmin, httpDeleteVillian)

module.exports = router
