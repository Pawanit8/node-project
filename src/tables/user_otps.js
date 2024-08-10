const pool = require('../database/db');


async function otpGenrateTable() {
  const table=`CREATE TABLE IF NOT EXISTS user_otps (
    id SERIAL PRIMARY KEY,
    userId INT,
    otp varchar(10),
    max_attempt INT default 3,
    otp_count INT Default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);`;


try{
    const result=await pool.query(table)
    console.log('user_otp Table created successfully');
} catch (err) {
  console.error('Error creating table', err.stack);
}
}
otpGenrateTable();