const Person = require('../database/models/person.model')
const Location = require('../database/models/location.model')
const { isNull } = require('../utils/utils')

const getAllPersons = async () => {
  try {
    const person = await Person.findAll({
      attributes: ['id', 'name', 'age'],
      include: [
        {
          model: Location,
          as: 'location',
          attributes: ['name', 'address']
        }
      ]
    })
    if (isNull(person)) {
      return { status: 404, response: { error: 'Persons not found' } }
    }

    return { response: { person }, status: 200 }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const getPersonById = async (personId) => {
  try {
    const person = await Person.findByPk(personId, {
      attributes: ['id', 'name', 'age'],
      include: [
        {
          model: Location,
          as: 'location',
          attributes: ['name', 'address']
        }
      ]
    })
    if (isNull(person)) {
      return { status: 404, response: { error: 'Person not found' } }
    }

    return { response: { person }, status: 200 }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const createPerson = async (person) => {
  try {
    const newPerson = await Person.create(person)
    return { response: { newPerson }, status: 201 }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const createPersonO = async (person) => {
  try {
    const newPerson = await Person.create(person)
    return newPerson.id
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const updatePerson = async (personId, updatedPerson) => {
  try {
    const person = await Person.findByPk(personId)
    if (isNull(person)) {
      return { status: 404, response: { error: 'Person not found' } }
    }
    const newUpdatePerson = await person.update(updatedPerson)

    return await { response: { newUpdatePerson }, status: 200 }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const deletePerson = async (personId) => {
  try {
    const person = await Person.findByPk(personId)
    if (isNull(person)) {
      return { status: 404, response: { error: 'Person not found' } }
    }

    await person.destroy()
    return { status: 200, response: { message: 'Person delete successfully' } }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  createPersonO,
  updatePerson,
  deletePerson
}
