const pool = require('pg')

module.exports = new pool.Pool({
    connectionString: process.env.DATABASE_URL
})