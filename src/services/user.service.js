const User = require('../database/models/user.model');
const { generateJWT } = require('../utils/jwt.middleware');
const { isNull } = require('../utils/utils');

const getAllUsers = async () => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    });
    if (isNull(user)) {
      return { status: 404, response: { error: 'No users found' } };
    }
    return { response: { user }, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password']
      }
    });
    if (isNull(user)) {
      return { response: { error: 'User not found' }, status: 404 };
    }
    return { response: { user }, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const createUser = async (user) => {
  try {
    const userCreated = await User.create(user);
    return { response: { userCreated }, status: 201 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const login = async (user) => {
  try {
    const { username, password } = user;

    const foundUser = await User.findOne({
      where: {
        username
      }
    });

    if (!foundUser) {
      return {
        status: 404,
        response: {
          error: 'User not found'
        }
      };
    }

    if (!User.checkPassword(password, foundUser.password)) {
      return {
        status: 401,
        response: {
          error: 'Invalid credentials'
        }
      };
    }

    const token = generateJWT(foundUser);
    return {
      status: 200,
      response: {
        message: 'User logged in successfully',
        token
      }
    };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};
const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (isNull(user)) {
      return { response: { error: 'User not found' }, status: 404 };
    }
    await user.destroy();
    return { response: { message: 'User deleted successfully' }, status: 200 };
  } catch (error) {
    return { status: 500, response: { error: error.message } };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
  deleteUser
};
