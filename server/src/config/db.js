const { Pool } = require('pg');
require('dotenv').config();

const {
  DATABASE_URL,
  DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
} = process.env;

const pool = DATABASE_URL
  ? new Pool({ connectionString: DATABASE_URL })
  : new Pool({
      host: DB_HOST || 'localhost',
      port: DB_PORT || 5432,
      user: DB_USER || 'postgres',
      password: DB_PASSWORD || 'postgres',
      database: DB_NAME || 'Online_Learning_Platform',
    });

pool.on('error', (err) => {
  console.error('Unexpected PG client error', err);
  process.exit(-1);
});

module.exports = pool;
