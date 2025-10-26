// server/config/db.js
const { Pool } = require("pg");
require("dotenv").config();

const {
  DATABASE_URL,
  NODE_ENV,
  RENDER,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

// Detect environment
const isProduction = NODE_ENV === "production" || RENDER === "true";

const pool = isProduction
  ? new Pool({
      connectionString:
        DATABASE_URL ||
        `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      ssl: {
        require: true,              // ✅ Required by Render
        rejectUnauthorized: false,  // ✅ Skip certificate verification
      },
    })
  : new Pool({
      host: DB_HOST || "localhost",
      port: DB_PORT || 5432,
      user: DB_USER || "postgres",
      password: DB_PASSWORD || "postgres",
      database: DB_NAME || "Online_Learning_Platform",
      ssl: false,                  // ✅ No SSL locally
    });

// Optional: retry on startup (Render DB can be slow to wake up)
async function testConnection(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query("SELECT NOW()");
      console.log(
        isProduction
          ? "✅ Connected to Render PostgreSQL successfully"
          : "✅ Connected to Local PostgreSQL successfully"
      );
      return;
    } catch (err) {
      console.error(`⚠️ Connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

testConnection();

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
  process.exit(-1);
});

module.exports = pool;
