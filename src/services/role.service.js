const Role = require('../database/models/role.model')
const User = require('../database/models/user.model')

const getAllRoles = async () => {
  return await Role.findAll({
    include: [
      {
        model: User,
        as: 'users'
      }
    ]
  })
}

const getRoleById = async (roleId) => {
  return await Role.findByPk(roleId, {
    include: [
      {
        model: User,
        as: 'users'
      }
    ]
  })
}

const createRole = async (role) => {
  return await Role.create(role)
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole
}
