const {
  getAllLocations,
  getLocationById,
  createLocation,
  assignLocation,
  updateLocation,
  deleteLocation
} = require('../../services/location.service')
const {
  validateLocation,
  validateUpdateLocation,
  validateAssignLocation
} = require('../../utils/validation/validation')

const httpGetAllLocations = async (req, res) => {
  try {
    const locations = await getAllLocations()
    res.status(locations.status).json(locations.response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const httpGetLocationById = async (req, res) => {
  try {
    const { locationId } = req.params
    const location = await getLocationById(locationId)
    res.status(location.status).json(location.response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const httpCreateLocation = async (req, res) => {
  try {
    const { error } = validateLocation(req.body)
    if (error) {
      res.status(400).send({ error: error.details[0].message })
    }

    const { name, address } = req.body
    const newLocation = {
      name,
      address
    }
    const location = await createLocation(newLocation)
    res.status(location.status).json(location.response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const httpAssignLocation = async (req, res) => {
  try {
    const { error } = validateAssignLocation(req.body)
    if (error) {
      res.status(400).send({ error: error.details[0].message })
    }

    const { personId, locationId } = req.body
    const location = await assignLocation(locationId, personId)
    res.status(location.status).json(location.response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const httpUpdateLocation = async (req, res) => {
  try {
    const { error } = validateUpdateLocation(req.body)
    if (error) {
      res.status(400).send({ error: error.details[0].message })
    }

    const { locationId } = req.params
    const { name, address } = req.body
    const updatedLocation = {
      name,
      address
    }
    const location = await updateLocation(locationId, updatedLocation)
    res.status(location.status).json(location.response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const httpDeleteLocation = async (req, res) => {
  try {
    const { locationId } = req.params
    const location = await deleteLocation(locationId)
    res.status(location.status).json(location.response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  httpGetAllLocations,
  httpGetLocationById,
  httpCreateLocation,
  httpAssignLocation,
  httpUpdateLocation,
  httpDeleteLocation
}
