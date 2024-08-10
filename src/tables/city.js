const pool=require('../database/db')


async function createCityTable() {
    const createCityTableQuery = `
      CREATE TABLE IF NOT EXISTS city (
        id SERIAL PRIMARY KEY,
        stateId INTEGER,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (stateId) REFERENCES state(id) ON DELETE CASCADE
      );
    `;

try {
    const result=await  pool.query(createCityTableQuery)
    console.log('citytable are created successfully');

    
} catch (err) {
    console.error(err);
    
}
}
createCityTable();