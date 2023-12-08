const Location = require('../database/models/location.model')
const Person = require('../database/models/person.model')

const getAllLocations = async () => {
  try {
    const locations = await Location.findAll()
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
    const location = await Location.findByPk(locationId)
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
const assignLocation = async (locationId, personId) => {
  try {
    const location = await Location.findByPk(locationId)
    const person = await Person.findByPk(personId)

    if (!location || location.length === 0) {
      return { status: 404, response: { error: 'Location does not exist' } }
    }
    if (!person || person.length === 0) {
      return { status: 404, response: { error: 'Person does not exist' } }
    }

    const assign = await Location.assignNewLocation(locationId, personId)
    // person.setLocation(location)
    return { status: 200, response: assign }
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
  assignLocation,
  updateLocation,
  deleteLocation
}
