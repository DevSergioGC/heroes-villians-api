const Person = require('../database/models/person.model')
const Location = require('../database/models/location.model')

const getAllPersons = async () => {
  const person = await Person.findAll({
    attributes: ['name', 'age'],
    include: [
      {
        model: Location,
        as: 'location',
        attributes: ['name', 'address']
      }
    ]
  })
  if (!person || person.length === 0) {
    return { error: 'No person found' }
  }

  return person
}
const getPersonById = async (personId) => {
  const person = await Person.findByPk(personId)
  if (!person || person.length === 0) {
    return { error: 'Person does not exist' }
  }

  return person
}
const createPerson = async (person) => {
  return await Person.create(person)
}
const updatePerson = async (personId, updatedPerson) => {
  const person = await Person.findByPk(personId)
  if (!person || person.length === 0) {
    return { error: 'Person does not exist' }
  }

  return await person.update(updatedPerson)
}
const deletePerson = async (personId) => {
  const person = await Person.findByPk(personId)
  if (!person || person.length === 0) {
    return { error: 'Person does not exist' }
  }

  await person.destroy()
  return { message: 'Person deleted successfully' }
}

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
}
