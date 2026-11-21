const service = require('../services/auth-services')

async function login(req, res) {
  let body = ''
  for await (const chunk of req) { body += chunk }
  const data = JSON.parse(body)
  const token = await service.login(data.email, data.password)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ token }))
}

async function register(req, res) {
  let body = ''
  for await (const chunk of req) { body += chunk }
  const data = JSON.parse(body)
  const user = await service.register(data.email, data.password)
  res.writeHead(201, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Compte créé' }))
}

module.exports = { login, register }