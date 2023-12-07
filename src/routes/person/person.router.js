const express = require('express')
const {
  httpGetAllPersons,
  httpGetPersonById,
  httpCreatePerson,
  httpUpdatePerson,
  httpDeletePerson
} = require('./person.controller')

const router = express.Router()

router
  .get('/', httpGetAllPersons)
  .get('/:personId', httpGetPersonById)
  .post('/', httpCreatePerson)
  .put('/:personId', httpUpdatePerson)
  .delete('/:personId', httpDeletePerson)

module.exports = router
