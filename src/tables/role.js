const pool = require('../database/db');

async function createRoleTable() {
  const createRoleTableQuery = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      role_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT NULL
    );
  `;

  try {
    const result = await pool.query(createRoleTableQuery);
    console.log('ROLE_TABLE CREATED SUCCESSFULLY');
  } catch (err) {
    console.error('ROLE_TABLE NOT CREATED', err);
  } 
  
}

createRoleTable();
