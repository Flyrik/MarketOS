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

module.exports = { getAllOrders, getOrderById }