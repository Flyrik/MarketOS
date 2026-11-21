const repo = require('../repositories/order-repository')

async function getAll() {
    return repo.getAllOrders()

}

async function getById(id) {
    return repo.getOrderById(id)
}

async function create(customerId, status, totalCents) {
    return repo.createOrder(customerId, status, totalCents)
}

async function updateStatus(id, status ) {
    return repo.updateOrderStatus(id, status)
}

module.exports = { getAll, getById, create, updateStatus }