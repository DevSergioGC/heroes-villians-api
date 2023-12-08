const express = require('express')
const {
  httpGetAllLocations,
  httpGetLocationById,
  httpCreateLocation,
  httpAssignLocation,
  httpUpdateLocation,
  httpDeleteLocation
} = require('./location.controller')

const router = express.Router()

router
  .get('/', httpGetAllLocations)
  .get('/:locationId', httpGetLocationById)
  .post('/', httpCreateLocation)
  .post('/assign', httpAssignLocation)
  .put('/:locationId', httpUpdateLocation)
  .delete('/:locationId', httpDeleteLocation)

module.exports = router
