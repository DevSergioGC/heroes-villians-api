const User = require('../database/models/user.model')

const getAllUsers = async () => {
  const user = await User.findAll()
  if (!user || user.length === 0) {
    return { status: 404, response: { message: 'No users found' } }
  }
  return { response: { user }, status: 200 }
}
const getUserById = async (userId) => {
  const user = await User.findByPk(userId)
  if (!user || user.length === 0) {
    return { response: { message: 'User does not exist' }, status: 404 }
  }
  return { response: { user }, status: 200 }
}
const createUser = async (user) => {
  const userCreated = await User.create(user)
  return { response: { userCreated }, status: 201 }
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
  deleteUser
}
