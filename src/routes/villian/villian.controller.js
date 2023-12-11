const {
  createVillian,
  getAllVillians,
  getVillianById,
  updateVillian,
  deleteVillian
} = require('../../services/villian.service')
const {
  createPersonO,
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
    res.status(villians.status).json(villians.response)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}
const httpGetVillianById = async (req, res) => {
  const { villianId } = req.params
  try {
    const villian = await getVillianById(villianId)
    res.status(villian.status).json(villian.response)
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
    const id = await createPersonO(person)
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
    res.status(villian.status).json(villian.response)
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
    res.status(villian.status).json(villian.response)
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
    res.status(villianDeleted.status).json(villianDeleted.response)
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
