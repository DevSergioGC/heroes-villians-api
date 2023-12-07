const express = require('express')
const {
  httpGetAllHeroes,
  httpGetHeroById,
  httpCreateHero,
  httpUpdateHero,
  httpDeleteHero
} = require('./hero.controller')

const router = express.Router()

router
  .get('/', httpGetAllHeroes)
  .get('/:heroId', httpGetHeroById)
  .post('/', httpCreateHero)
  .put('/:heroId', httpUpdateHero)
  .delete('/:heroId', httpDeleteHero)

module.exports = router
