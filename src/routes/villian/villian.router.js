const express = require('express')
const {
  httpGetAllVillians,
  httpGetVillianById,
  httpCreateVillian,
  httpUpdateVillian,
  httpDeleteVillian
} = require('./villian.controller')

const router = express.Router()

router
  .get('/', httpGetAllVillians)
  .get('/:villianId', httpGetVillianById)
  .post('/', httpCreateVillian)
  .put('/:villianId', httpUpdateVillian)
  .delete('/:villianId', httpDeleteVillian)

module.exports = router
