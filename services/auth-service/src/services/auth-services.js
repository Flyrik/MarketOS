const repo = require('../repositories/auth-repositories')
const jwt = require('jsonwebtoken')

async function login(email, password) {
  const user = await repo.findByEmail(email)
  if (!user) {
    throw new Error('User not found')
  }
  if (user.password_hash !== password) {
    throw new Error('Invalid password')
  }
  const roles = await repo.getRoles(user.id)
  const token = jwt.sign(
    { sub: user.id, roles: roles },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  )
  return token
}

async function register(email, password) {
  return repo.register(email, password)
}

module.exports = { login, register }