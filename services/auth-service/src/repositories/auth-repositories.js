const pool = require('../config/db')


async function findByEmail(email) {
  const result = await pool.query('SELECT * FROM auth.users WHERE email = $1', [email])
  return result.rows[0]
}

async function getRoles(userId){
    const result = await pool.query('SELECT r.name FROM auth.user_roles ar JOIN auth.roles r ON ar.role_id = r.id WHERE ar.user_id = $1', [userId])
    return result.rows.map(row => row.name)
}

async function register(email, password) {
    const result = await pool.query('INSERT INTO auth.users (email, password_hash) VALUES ($1, $2) RETURNING *', [email, password])
    return result.rows[0]
}
    
module.exports = { findByEmail, getRoles , register }