const service = require('../services/auth-services')

async function login(req, res) {
  let body = ''
  for await (const chunk of req) { body += chunk }

  try {
  const data = JSON.parse(body)
  const token = await service.login(data.email, data.password)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ token }))
  } catch (err) {
  const status = err.message === 'Invalid credentials' ? 401 : 400
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: err.message }))
}
}

async function register(req, res) {
  let body = ''
  for await (const chunk of req) { body += chunk }
 
  try {
    const data = JSON.parse(body)
    const user = await service.register(data.email, data.password)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Compte créé' }))
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: err.message }))
  }

}

module.exports = { login, register }