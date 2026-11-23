const repo = require('../repositories/auth-repositories')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')  

async function login(email, password) {
  const user = await repo.findByEmail(email)
  // Il recup le sel dans le hach du mdp. Et ensuite il refait sel + password -> hach et compare avec le hash stocké dans la base de données. Si c'est le même, alors le mot de passe est correct.
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid credentials')
  }
  const roles = await repo.getRoles(user.id)
  const token = jwt.sign(
    { sub: user.id, roles: roles, iss: 'market-auth' },
    process.env.JWT_SECRET ,
    { expiresIn: '15m' }
  )
  return token
}

async function register(email, password) {
  const hash = await bcrypt.hash(password, 10)  // On hash le mot de passe avant de le stocker dans la base de données
  return repo.register(email, hash) 
}

module.exports = { login, register }