const Person = require('../database/models/person.model')
const Villian = require('../database/models/villian.model')

const getAllVillians = async () => {
  const villians = await Villian.findAll({
    include: [
      {
        model: Person,
        as: 'person'
      }
    ]
  })
  if (!villians || villians.length === 0) {
    return { error: 'No villians found' }
  }

  return villians
}
const getVillianById = async (villianId) => {
  const villian = await Villian.findByPk(villianId, {
    include: [
      {
        model: Person,
        as: 'person'
      }
    ]
  })
  if (!villian || villian.length === 0) {
    return { error: 'Villian does not exist' }
  }

  return villian
}
const createVillian = async (villian) => {
  return await Villian.create(villian)
}
const updateVillian = async (villianId, updatedVillian) => {
  const villian = await Villian.findByPk(villianId)
  if (!villian || villian.length === 0) {
    return { error: 'Villian does not exist' }
  }

  return await villian.update(updatedVillian)
}
const deleteVillian = async (villianId) => {
  const villian = await Villian.findByPk(villianId)
  if (!villian || villian.length === 0) {
    return { error: 'Villian does not exist' }
  }

  await villian.destroy()
  return { message: 'Villian deleted successfully' }
}

module.exports = {
  getAllVillians,
  getVillianById,
  createVillian,
  updateVillian,
  deleteVillian
}
