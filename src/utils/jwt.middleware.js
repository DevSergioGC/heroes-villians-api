const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    req.user = user
    next()
  })
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'Forbidden. Admin access required.' })
  }
}

const generateJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin
    },
    secretKey,
    {
      expiresIn: '3h'
    }
  )

  return token
}

module.exports = {
  authenticateJWT,
  isAdmin,
  generateJWT
}
