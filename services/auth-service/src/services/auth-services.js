const repo = require('../repositories/auth-repositories')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')  

async function login(email, password) {
  const user = await repo.findByEmail(email)
  // même erreur si l'email n'existe pas : on ne révèle pas quels comptes existent
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid credentials')
  }
  const roles = await repo.getRoles(user.id)
  const token = jwt.sign(
    { sub: user.id, roles: roles, issuer: 'market-auth' },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '15m' }
  )
  return token
}

async function register(email, password) {
  const hash = await bcrypt.hash(password, 10)  // On hash le mot de passe avant de le stocker dans la base de données
  return repo.register(email, hash) 
}

module.exports = { login, register }