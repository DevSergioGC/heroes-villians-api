const Location = require('../database/models/location.model')
const Person = require('../database/models/person.model')

const getAllLocations = async () => {
  try {
    const locations = await Location.findAll({
      include: [
        {
          model: Person,
          as: 'persons',
          attributes: ['name', 'age']
        }
      ]
    })
    if (!locations || locations.length === 0) {
      return { status: 404, response: { error: 'No locations found' } }
    }
    return { status: 200, response: locations }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const getLocationById = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId, {
      include: [
        {
          model: Person,
          as: 'persons',
          attributes: ['name', 'age']
        }
      ]
    })
    if (!location || location.length === 0) {
      return { status: 404, response: { error: 'Location does not exist' } }
    }
    return { status: 200, response: location }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const createLocation = async (location) => {
  try {
    const newLocation = await Location.create(location)
    return { status: 201, response: newLocation }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const updateLocation = async (locationId, updatedLocation) => {
  try {
    const location = await Location.findByPk(locationId)
    if (!location || location.length === 0) {
      return { status: 404, response: { error: 'Location does not exist' } }
    }
    const updated = await location.update(updatedLocation)
    return { status: 200, response: updated }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}
const deleteLocation = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId)
    if (!location || location.length === 0) {
      return { status: 404, response: { error: 'Location does not exist' } }
    }
    await location.destroy()
    return {
      status: 200,
      response: { message: 'Location deleted successfully' }
    }
  } catch (error) {
    return { status: 500, response: { error: error.message } }
  }
}

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
}
