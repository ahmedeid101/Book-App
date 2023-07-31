const { Pool } = require('pg');
const dotenv = require('dotenv');
 
dotenv.config();

const db_config = {
    connectionString: process.env.database_url,
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 200,
    max: 20
}

const pool = new Pool(db_config);

pool.on('connect', () => {
    console.log('New client connected to the database');
});

pool.on('remove', () => {
    console.log('Client removed from the database pool');
});

module.exports = pool;