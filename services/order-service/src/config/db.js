//Crée la connexion à la base de données

import pg from 'pg'

const pg = require('pg') 

const Pool = pg.Pool


const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'market',
  user: process.env.DB_USER || 'orders_svc',
  password: process.env.DB_PASSWORD,
})

module.exports = pool