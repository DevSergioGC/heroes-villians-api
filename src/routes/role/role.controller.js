const {
  getAllRoles,
  getRoleById,
  createRole
} = require('../../services/role.service')

const httpGetAllRoles = async (req, res) => {
  try {
    const roles = await getAllRoles()
    res.status(200).json(roles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const httpGetRoleById = async (req, res) => {
  try {
    const { roleId } = req.params
    const role = await getRoleById(roleId)
    res.status(200).json(role)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const httpCreateRole = async (req, res) => {
  try {
    const { body } = req
    const role = await createRole(body)
    res.status(201).json(role)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  httpGetAllRoles,
  httpGetRoleById,
  httpCreateRole
}
