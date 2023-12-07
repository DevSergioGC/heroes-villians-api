const Role = require('../database/models/role.model')

const getAllRoles = async () => {
  return await Role.findAll()
}

const getRoleById = async (roleId) => {
  return await Role.findByPk(roleId)
}

const createRole = async (role) => {
  return await Role.create(role)
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole
}
