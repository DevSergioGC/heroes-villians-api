const { Villian, Person, Location } = require('../database/models/index');
const { isNull, getPagination, getPagingData } = require('../utils/utils');

const getAllVillians = async (page, size) => {
  try {
    const { limit, offset } = getPagination(page, size);
    const villians = await Villian.findAndCountAll({
      attributes: ['id', 'threatStyle'],
      include: [
        {
          model: Person,
          as: 'villianPerson',
          attributes: ['id', 'name', 'age'],
          include: [
            {
              model: Location,
              as: 'location',
              attributes: ['id', 'name', 'address']
            }
          ]
        }
      ],
      limit,
      offset
    }).then((data) => {
      const response = getPagingData(data, page, limit);
      return response;
    });
    if (isNull(villians)) {
      return { status: 404, response: { error: 'No villians found' } };
    }

    return { response: { villians }, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const getVillianById = async (villianId) => {
  try {
    const villian = await Villian.findByPk(villianId, {
      attributes: ['threatStyle'],
      include: [
        {
          model: Person,
          as: 'villianPerson',
          attributes: ['id', 'name', 'age'],
          include: [
            {
              model: Location,
              as: 'location',
              attributes: ['name', 'address']
            }
          ]
        }
      ]
    });
    if (isNull(villian)) {
      return { status: 404, response: { error: 'Villian not found' } };
    }

    return { response: { villian }, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const createVillian = async (villian) => {
  try {
    const newVillian = await Villian.create(villian);
    return { response: { newVillian }, status: 201 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const updateVillian = async (villianId, updatedVillian) => {
  try {
    const villian = await Villian.findByPk(villianId);
    if (isNull(villian)) {
      return { status: 404, response: { error: 'Villian not found' } };
    }

    const newVillian = await villian.update(updatedVillian);
    return { response: { newVillian }, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const deleteVillian = async (villianId) => {
  try {
    const villian = await Villian.findByPk(villianId);
    if (isNull(villian)) {
      return { status: 404, response: { error: 'Villian not found' } };
    }

    await villian.destroy();
    return {
      status: 200,
      response: { message: 'Villian deleted successfully' }
    };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};

module.exports = {
  getAllVillians,
  getVillianById,
  createVillian,
  updateVillian,
  deleteVillian
};
