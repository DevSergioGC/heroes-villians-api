const express = require('express')
const {
  httpGetAllPersons,
  httpGetPersonById,
  httpCreatePerson,
  httpUpdatePerson,
  httpDeletePerson
} = require('./person.controller')
const { authenticateJWT, isAdmin } = require('../../utils/jwt.middleware')

const router = express.Router()

router
  .get('/', authenticateJWT, httpGetAllPersons)
  .get('/:personId', authenticateJWT, httpGetPersonById)
  .post('/', authenticateJWT, isAdmin, httpCreatePerson)
  .put('/:personId', authenticateJWT, isAdmin, httpUpdatePerson)
  .delete('/:personId', authenticateJWT, isAdmin, httpDeletePerson)

module.exports = router
