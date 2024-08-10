const pool=require('../database/db')

async function user_document(){
    const create_userDoc_table=`CREATE TABLE IF NOT EXISTS user_doc (
    id SERIAL PRIMARY KEY,
    userId INT,
    doc_type VARCHAR(200),
    img VARCHAR(200),
    status VARCHAR(10) CHECK (status IN ('active', 'inactive')) DEFAULT 'inactive',
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