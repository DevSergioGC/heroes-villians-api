const {
  getAllUsers,
  getUserById,
  createUser,
  login,
  deleteUser
} = require('../../services/user.service');
const { validateUser } = require('../../utils/validation/validation');

const httpGetAllUsers = async (req, res) => {
  try {
    const { page, size } = req.query;
    const users = await getAllUsers(page, size);
    res.status(users.status).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpGetUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    res.status(user.status).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpCreateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  }

  try {
    const { username, password, isAdmin } = req.body;
    const newUser = {
      username,
      password,
      isAdmin
    };
    const user = await createUser(newUser);
    res.status(user.status).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const httpLoginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  const { error } = validateUser(user);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const token = await login(user);
    return res.status(token.status).json(token);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const httpDeleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUser(userId);
    res.status(deletedUser.status).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  httpGetAllUsers,
  httpGetUserById,
  httpCreateUser,
  httpLoginUser,
  httpDeleteUser
};
