const Location = require('../database/models/location.model');
const Person = require('../database/models/person.model');
const { isNull, getPagination, getPagingData } = require('../utils/utils');

const getAllLocations = async (page, size) => {
  try {
    const { limit, offset } = getPagination(page, size);

    const locations = await Location.findAndCountAll({
      include: [
        {
          model: Person,
          as: 'people',
          attributes: ['name', 'age']
        }
      ],
      limit,
      offset
    }).then((data) => {
      const response = getPagingData(data, page, limit);
      return response;
    });
    if (isNull(locations)) {
      return { status: 404, response: { error: 'No locations found' } };
    }
    return { status: 200, response: locations };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const getLocationById = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId, {
      include: [
        {
          model: Person,
          as: 'people',
          attributes: ['name', 'age']
        }
      ]
    });
    if (isNull(location)) {
      return { status: 404, response: { error: 'Location not found' } };
    }
    return { status: 200, response: location };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const createLocation = async (location) => {
  try {
    const newLocation = await Location.create(location);
    return { status: 201, response: newLocation };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const assignLocation = async (locationId, personId) => {
  try {
    const location = await Location.findByPk(locationId);
    const person = await Person.findByPk(personId);

    if (isNull(location)) {
      return { status: 404, response: { error: 'Location not found' } };
    }
    if (!person || person.length === 0) {
      return { status: 404, response: { error: 'Person not found' } };
    }

    const assign = await Location.assignNewLocation(locationId, personId);
    return { status: 200, response: assign };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const updateLocation = async (locationId, updatedLocation) => {
  try {
    const location = await Location.findByPk(locationId);
    if (isNull(location)) {
      return { status: 404, response: { error: 'Location not found' } };
    }
    const updated = await location.update(updatedLocation);
    return { status: 200, response: updated };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const deleteLocation = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId);
    if (isNull(location)) {
      return { status: 404, response: { error: 'Location not found' } };
    }
    await location.destroy();
    return {
      status: 200,
      response: { message: 'Location deleted successfully' }
    };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  assignLocation,
  updateLocation,
  deleteLocation
};
