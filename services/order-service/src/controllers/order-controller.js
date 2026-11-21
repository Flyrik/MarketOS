const service = require('../services/order-service')

async function getAllOrders(req, res) {
  const orders = await service.getAll()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: orders }))
}

async function getOrderById(req, res, id) {
  const order = await service.getById(id)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: order }))
}

async function createOrder(req, res) {
  // 1. Lire le body (en Node natif, ça arrive en morceaux)
  let body = ''
  for await (const chunk of req) {
    body += chunk
  }
  const data = JSON.parse(body)

  // 2. Appeler le service
  const order = await service.create(data.customer_id, data.status, data.total_cents)

  // 3. Renvoyer avec statut 201 (created)
  res.writeHead(201, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: order }))
}

module.exports = { getAllOrders, getOrderById, createOrder }