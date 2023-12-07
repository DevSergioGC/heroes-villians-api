const {
  createVillian,
  getAllVillians,
  getVillianById,
  updateVillian,
  deleteVillian
} = require('../../services/villian.service')
const {
  createPerson,
  updatePerson,
  deletePerson
} = require('../../services/person.service')
const {
  validateVillian,
  validateUpdateVillian,
  validatePerson,
  validateUpdatePerson
} = require('../../utils/validation/validation')

const httpGetAllVillians = async (req, res) => {
  try {
    const villians = await getAllVillians()
    res.status(200).json(villians)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpGetVillianById = async (req, res) => {
  const { villianId } = req.params
  try {
    const villian = await getVillianById(villianId)
    res.status(200).json(villian)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpCreateVillian = async (req, res) => {
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
    const villianBody = {
      threatStyle: req.body.threatStyle
    }
    const villianValidation = validateVillian(villianBody)
    if (villianValidation.error) {
      res
        .status(400)
        .send({ error: villianValidation.error.details[0].message })
      deletePerson(id)
    }
    const newVillian = {
      threatStyle: req.body.threatStyle,
      personId: id
    }
    const villian = await createVillian(newVillian)
    res.status(201).json(villian)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpUpdateVillian = async (req, res) => {
  const { name, age, threatStyle } = req.body
  const heroBody = {
    threatStyle
  }
  const villianValidation = validateUpdateVillian(heroBody)
  if (villianValidation.error) {
    res.status(400).send({ error: villianValidation.error.details[0].message })
  }
  const { villianId } = req.params
  const updatedVillian = {
    threatStyle
  }
  try {
    const villian = await updateVillian(villianId, updatedVillian)

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
    await updatePerson(villian.personId, updatedPerson)
    res.status(200).json(villian)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpDeleteVillian = async (req, res) => {
  const { villianId } = req.params
  try {
    const { personId } = await getVillianById(villianId)
    await deletePerson(personId)
    const villianDeleted = await deleteVillian(villianId)
    res.status(200).json(villianDeleted)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = {
  httpGetAllVillians,
  httpGetVillianById,
  httpCreateVillian,
  httpUpdateVillian,
  httpDeleteVillian
}
