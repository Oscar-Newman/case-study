// Use the .env file to retrieve values for pool
require('dotenv').config();

// Use the pg library to import Pool object
const {Pool} = require('pg');

// Create pool with fields from .env file
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// export pool to be used elsewhere in project dir
module.exports = pool;