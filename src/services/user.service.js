const User = require('../database/models/user.model')
const { generateJWT } = require('../utils/jwt.middleware')

const getAllUsers = async () => {
  const user = await User.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  if (!user || user.length === 0) {
    return { status: 404, response: { message: 'No users found' } }
  }
  return { response: { user }, status: 200 }
}
const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ['password']
    }
  })
  if (!user || user.length === 0) {
    return { response: { message: 'User does not exist' }, status: 404 }
  }
  return { response: { user }, status: 200 }
}
const createUser = async (user) => {
  const userCreated = await User.create(user)
  return { response: { userCreated }, status: 201 }
}
const login = async (user) => {
  const { username, password } = user

  const foundUser = await User.findOne({
    where: {
      username
    }
  })

  if (!foundUser) {
    return {
      status: 404,
      response: {
        message: 'User not found'
      }
    }
  }

  if (!User.checkPassword(password, foundUser.password)) {
    return {
      status: 401,
      response: {
        message: 'Invalid credentials'
      }
    }
  }

  const token = generateJWT(foundUser)
  return {
    status: 200,
    response: {
      message: 'User logged in successfully',
      token
    }
  }
}
const deleteUser = async (userId) => {
  const user = await User.findByPk(userId)
  if (!user || user.length === 0) {
    return { response: { message: 'User does not exist' }, status: 404 }
  }
  await user.destroy()
  return { response: { message: 'User deleted successfully' }, status: 200 }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
  deleteUser
}
