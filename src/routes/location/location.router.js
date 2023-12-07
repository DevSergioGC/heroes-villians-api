const express = require('express')
const {
  httpGetAllLocations,
  httpGetLocationById,
  httpCreateLocation,
  httpUpdateLocation,
  httpDeleteLocation
} = require('./role.controller')

const router = express.Router()

router
  .get('/', httpGetAllLocations)
  .get('/:locationId', httpGetLocationById)
  .post('/', httpCreateLocation)
  .put('/:locationId', httpUpdateLocation)
  .delete('/:locationId', httpDeleteLocation)

module.exports = router
