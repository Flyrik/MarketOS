const pool = require('../config/db')

async function getAllOrders() {
  const result = await pool.query('SELECT * FROM orders.orders')
  return result.rows
}

async function getOrderById(id) {
    const result = await pool.query('SELECT * FROM orders.orders WHERE id = $1', [id])
    return result.rows[0]
}

async function createOrder(customerId, status, totalCents) {
  const result = await pool.query(
    'INSERT INTO orders.orders (customer_id, status, total_cents) VALUES ($1, $2, $3) RETURNING *',
    [customerId, status, totalCents]
  )
  return result.rows[0]
}

async function updateOrderStatus(id, status) {
  const result = await pool.query(
    'UPDATE orders.orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  )
  return result.rows[0]
}



module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus }