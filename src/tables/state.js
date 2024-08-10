const pool=require('../database/db')


async function createStateTable() {
    const createStateTableQuery = `
      CREATE TABLE IF NOT EXISTS state (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

try {
    const result=await  pool.query(createStateTableQuery)
    console.log('statetable are created successfully');

    
} catch (err) {
    console.error(err);
    
}
}
createStateTable();