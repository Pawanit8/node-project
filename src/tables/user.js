
const pool = require('../database/db');
const multer=require('multer')

async function createUsersTable() {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        roleId INT,
        firstname VARCHAR(100),
        lastname  VARCHAR(100),
        gender VARCHAR(15),
        mobile_no VARCHAR(15),
        language  VARCHAR(30),
        img VARCHAR(100) DEFAULT NULL,
        address VARCHAR(200),
        dob DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(10) CHECK (status IN ('active','inactive')) DEFAULT 'active',
        FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
      );
    `;
    try {
      const result = await pool.query(createUserTableQuery);
      console.log('user Table created successfully');
    } catch (err) {
      console.error('Error creating table', err.stack);
    }
}
createUsersTable();
