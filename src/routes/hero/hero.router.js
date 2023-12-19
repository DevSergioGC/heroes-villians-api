const express = require('express');
const {
  httpGetAllHeroes,
  httpGetHeroById,
  httpCreateHero,
  httpUpdateHero,
  httpDeleteHero
} = require('./hero.controller');
const { authenticateJWT, isAdmin } = require('../../utils/jwt.middleware');

const router = express.Router();

router
  .get('/', authenticateJWT, httpGetAllHeroes)
  .get('/:heroId', authenticateJWT, httpGetHeroById)
  .post('/', authenticateJWT, isAdmin, httpCreateHero)
  .put('/:heroId', authenticateJWT, isAdmin, httpUpdateHero)
  .delete('/:heroId', authenticateJWT, isAdmin, httpDeleteHero);

module.exports = router;
