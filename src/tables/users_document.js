const pool=require('../database/db')

async function user_document(){
    const create_userDoc_table=`CREATE TABLE IF NOT EXISTS users_doc (
    id SERIAL PRIMARY KEY,
    userId INT,
    doc_type VARCHAR(200),
    img VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('valid', 'not valid')) DEFAULT 'not valid',
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
`;


    try {
        const result = await pool.query(create_userDoc_table)
        console.log('user document table created');
        
    } catch (err) {
        console.error('user document table not created',err)
    }
}

user_document();