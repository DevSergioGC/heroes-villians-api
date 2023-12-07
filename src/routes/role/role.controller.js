const {
  getAllRoles,
  getRoleById,
  createRole
} = require('../../services/role.service')
const { validateRole } = require('../../utils/validation/validation')

const httpGetAllRoles = async (req, res) => {
  try {
    const roles = await getAllRoles()
    res.status(200).json(roles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const httpGetRoleById = async (req, res) => {
  const { roleId } = req.params
  const role = await getRoleById(roleId)
  res.status(200).json(role)
}
const httpCreateRole = async (req, res) => {
  const { error } = validateRole(req.body)
  if (error) {
    res.status(400).send({ error: error.details[0].message })
  }

  const { roleName, description } = req.body
  const newRole = {
    roleName,
    description
  }
  const role = await createRole(newRole)
  res.status(201).json(role)
}

module.exports = {
  httpGetAllRoles,
  httpGetRoleById,
  httpCreateRole
}
