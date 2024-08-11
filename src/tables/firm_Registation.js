const pool =require('../database/db')

async function create_FirmReg_table(){
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS firms_reg (
  id SERIAL PRIMARY KEY,
  userId INT,
  firm_name VARCHAR(100),
  Gst_number int,
  firm_open_date DATE,
  firm_Address VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(10) CHECK (status IN ('active','inactive')) DEFAULT 'active',
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
`;
try {
const result = await pool.query(createUserTableQuery);
console.log('firm registation Table created successfully');
} catch (err) {
console.error('Error creating table', err.stack);
}
}

create_FirmReg_table();
