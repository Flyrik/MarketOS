// Importe le module HTTP natif de Node.js — c'est lui qui crée le serveur
const http = require('http')


const controller = require('./controllers/order-controller')

const port = process.env.PORT || 4002

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')

  try {
    // GET /v1/orders → toutes les commandes
    if (req.method === 'GET' && url.pathname === '/v1/orders') {
      return await controller.getAllOrders(req, res)
    }

    // GET /v1/orders/3 → commande par id
    const match = url.pathname.match(/^\/v1\/orders\/(\d+)$/)
    if (req.method === 'GET' && match) {
      return await controller.getOrderById(req, res, Number(match[1]))
    }
    if (req.method === 'POST' && url.pathname === '/v1/orders') {
      return await controller.createOrder(req, res)
    }
    if (req.method === 'PUT' && match) {
      return await controller.updateOrder(req, res, Number(match[1]))
    }

    // Route pas trouvée
    sendJson(res, 404, { error: 'Route introuvable' })

  } catch (err) {
    console.error(err)
    sendJson(res, 500, { error: 'Erreur interne' })
  }
})

server.listen(port, () => {
  console.log(`Orders API listening on port ${port}`)
})