// server/config/db.js
const { Pool } = require("pg");
require("dotenv").config();

const {
  DATABASE_URL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  NODE_ENV,
  RENDER
} = process.env;

// ✅ Determine environment
const isProduction = NODE_ENV === "production" || RENDER === "true";

// ✅ Create Pool instance
const pool = isProduction
  ? new Pool({
      connectionString:
        DATABASE_URL,
      ssl: { require: true, rejectUnauthorized: false } // 🔒 Render needs SSL
    })
  : new Pool({
      host: DB_HOST || "localhost",
      port: DB_PORT || 5432,
      user: DB_USER || "postgres",
      password: DB_PASSWORD || "postgres",
      database: DB_NAME || "Online_Learning_Platform",
      ssl: false // ✅ No SSL locally
    });

// ✅ Test and log connection
pool
  .connect()
  .then(() =>
    console.log(
      isProduction
        ? "✅ Connected to Render PostgreSQL successfully"
        : "✅ Connected to Local PostgreSQL successfully"
    )
  )
  .catch((err) => console.error("❌ Failed to connect to PostgreSQL:", err));

pool.on("error", (err) => {
  console.error("Unexpected PG client error", err);
  process.exit(-1);
});

module.exports = pool;
