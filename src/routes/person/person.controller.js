const {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
} = require('../../services/person.service')
const {
  validatePerson,
  validateUpdatePerson
} = require('../../utils/validation/validation')

const httpGetAllPersons = async (req, res) => {
  const persons = await getAllPersons()
  res.status(200).json(persons)
}
const httpGetPersonById = async (req, res) => {
  const { personId } = req.params
  const person = await getPersonById(personId)
  res.status(200).json(person)
}
const httpCreatePerson = async (req, res) => {
  const { error } = validatePerson(req.body)
  if (error) {
    res.status(400).send({ error: error.details[0].message })
  }

  const { name, age } = req.body
  const newPerson = {
    name,
    age
  }
  const person = await createPerson(newPerson)
  res.status(201).json(person)
}
const httpUpdatePerson = async (req, res) => {
  const { error } = validateUpdatePerson(req.body)
  if (error) {
    res.status(400).send({ error: error.details[0].message })
  }

  const { personId } = req.params
  const { name, age } = req.body
  const updatedPerson = {
    name,
    age
  }
  const person = await updatePerson(personId, updatedPerson)
  res.status(200).json(person)
}
const httpDeletePerson = async (req, res) => {
  const { personId } = req.params
  const person = await deletePerson(personId)
  res.status(200).json(person)
}

module.exports = {
  httpGetAllPersons,
  httpGetPersonById,
  httpCreatePerson,
  httpUpdatePerson,
  httpDeletePerson
}
