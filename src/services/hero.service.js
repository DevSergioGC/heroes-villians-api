const Person = require('../database/models/person.model')
const Hero = require('../database/models/hero.model')

const getAllHeroes = async () => {
  const heroes = await Hero.findAll({
    include: [
      {
        model: Person,
        as: 'person'
      }
    ]
  })
  if (!heroes || heroes.length === 0) {
    return { error: 'No heroes found' }
  }

  return heroes
}
const getHeroById = async (heroId) => {
  const hero = await Hero.findByPk(heroId, {
    include: [
      {
        model: Person,
        as: 'person'
      }
    ]
  })
  if (!hero || hero.length === 0) {
    return { error: 'Hero does not exist' }
  }

  return hero
}
const createHero = async (hero) => {
  return await Hero.create(hero)
}
const updateHero = async (heroId, updatedHero) => {
  const hero = await Hero.findByPk(heroId)
  if (!hero || hero.length === 0) {
    return { error: 'Hero does not exist' }
  }

  return await hero.update(updatedHero)
}
const deleteHero = async (heroId) => {
  const hero = await Hero.findByPk(heroId)
  if (!hero || hero.length === 0) {
    return { error: 'Hero does not exist' }
  }

  await hero.destroy()
  return { message: 'Hero deleted successfully' }
}

module.exports = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero
}
