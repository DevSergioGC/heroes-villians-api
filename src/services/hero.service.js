const { Hero, Person, Location } = require('../database/models/index');
const { isNull } = require('../utils/utils');

const getAllHeroes = async () => {
  try {
    const heroes = await Hero.findAll({
      attributes: ['id', 'principalPower'],
      include: [
        {
          model: Person,
          as: 'heroPerson',
          foreignKey: 'personId',
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
    if (isNull(heroes)) {
      return { status: 404, response: { error: 'Heroes not found' } };
    }
    return { status: 200, response: heroes };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const getHeroById = async (heroId) => {
  try {
    const hero = await Hero.findByPk(heroId, {
      attributes: ['id', 'principalPower'],
      include: [
        {
          model: Person,
          as: 'person',
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
    if (isNull(hero)) {
      return { status: 404, response: { error: 'Hero not found' } };
    }
    return { status: 200, response: hero };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const createHero = async (hero) => {
  try {
    const newHero = await Hero.create(hero);
    return { response: newHero, status: 201 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const updateHero = async (heroId, updatedHero) => {
  try {
    const hero = await Hero.findByPk(heroId);
    if (isNull(hero)) {
      return { status: 404, response: { error: 'Hero not found' } };
    }

    const newHero = await hero.update(updatedHero);
    return { response: newHero, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const deleteHero = async (heroId) => {
  try {
    const hero = await Hero.findByPk(heroId);
    if (isNull(hero)) {
      return { status: 404, response: { error: 'Hero not found' } };
    }

    await hero.destroy();
    return { status: 200, response: { message: 'Hero delete successfully' } };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};

module.exports = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero
};
