const express = require('express')
const {
  httpGetAllLocations,
  httpGetLocationById,
  httpCreateLocation,
  httpAssignLocation,
  httpUpdateLocation,
  httpDeleteLocation
} = require('./location.controller')
const { authenticateJWT, isAdmin } = require('../../utils/jwt.middleware')

const router = express.Router()

router
  .get('/', authenticateJWT, httpGetAllLocations)
  .get('/:locationId', authenticateJWT, httpGetLocationById)
  .post('/', authenticateJWT, isAdmin, httpCreateLocation)
  .post('/assign', authenticateJWT, isAdmin, httpAssignLocation)
  .put('/:locationId', authenticateJWT, isAdmin, httpUpdateLocation)
  .delete('/:locationId', authenticateJWT, isAdmin, httpDeleteLocation)

module.exports = router
