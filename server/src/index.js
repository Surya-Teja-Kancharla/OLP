require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');


const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to PostgreSQL');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
    process.exit(1);
  }
}

start();
