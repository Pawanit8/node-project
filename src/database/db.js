const { SELECT } = require('sequelize/lib/query-types');

require('dotenv').config()
const Pool = require('pg').Pool;
// Create a new pool instance with configuration
const pool = new Pool({
  user: process.env.DB_USER,        // PostgreSQL username
  host: process.env.DB_HOST,        // PostgreSQL server host
  database: process.env.DB_DATABASE,// Name of the database
  password: process.env.DB_PASSWORD,// PostgreSQL password
  port: process.env.DB_PORT,        // PostgreSQL port
});

module.exports = pool;
