const {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero
} = require('../../services/hero.service')
const {
  createPerson,
  updatePerson,
  deletePerson
} = require('../../services/person.service')
const {
  validateHero,
  validateUpdateHero,
  validatePerson,
  validateUpdatePerson
} = require('../../utils/validation/validation')

const httpGetAllHeroes = async (req, res) => {
  try {
    const heroes = await getAllHeroes()
    res.status(200).json(heroes)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpGetHeroById = async (req, res) => {
  const { heroId } = req.params
  try {
    const hero = await getHeroById(heroId)
    res.status(200).json(hero)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpCreateHero = async (req, res) => {
  const person = {
    name: req.body.name,
    age: req.body.age
  }
  const personValidation = validatePerson(person)
  if (personValidation.error) {
    res.status(400).send({ error: personValidation.error.details[0].message })
  }
  try {
    const { id } = await createPerson(person)
    const heroBody = {
      principalPower: req.body.principalPower
    }
    const heroValidation = validateHero(heroBody)
    if (heroValidation.error) {
      res.status(400).send({ error: heroValidation.error.details[0].message })
      deletePerson(id)
    }
    const newHero = {
      principalPower: req.body.principalPower,
      personId: id
    }
    const hero = await createHero(newHero)
    res.status(201).json(hero)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpUpdateHero = async (req, res) => {
  const { name, age, principalPower } = req.body
  const heroBody = {
    principalPower
  }
  const heroValidation = validateUpdateHero(heroBody)
  if (heroValidation.error) {
    res.status(400).send({ error: heroValidation.error.details[0].message })
  }
  const { heroId } = req.params
  const updatedHero = {
    principalPower
  }
  try {
    const hero = await updateHero(heroId, updatedHero)

    const personBody = {
      name,
      age
    }
    const personValidation = validateUpdatePerson(personBody)
    if (personValidation.error) {
      res.status(400).send({ error: personValidation.error.details[0].message })
    }
    const updatedPerson = {
      name,
      age
    }
    await updatePerson(hero.personId, updatedPerson)
    res.status(200).json(hero)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpDeleteHero = async (req, res) => {
  const { heroId } = req.params
  try {
    const { personId } = await getHeroById(heroId)
    await deletePerson(personId)
    const heroDeleted = await deleteHero(heroId)
    res.status(200).json(heroDeleted)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = {
  httpGetAllHeroes,
  httpGetHeroById,
  httpCreateHero,
  httpUpdateHero,
  httpDeleteHero
}
