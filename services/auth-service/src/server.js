const http = require('http')

const controller = require('./controllers/auth-controllers')


const port = process.env.PORT || 4003

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}


const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
    try {
  if (req.method === 'POST' && url.pathname === '/v1/auth/login') {
    return await controller.login(req, res)
    
  }
  if (req.method === 'POST' && url.pathname === '/v1/auth/register') {

    return await controller.register(req, res)
  }
    } catch (err) {
    console.error(err)
    sendJson(res, 500, { error: 'Erreur interne' })
  }


})

server.listen(port, () => {
  console.log(`Auth API listening on port ${port}`)
})