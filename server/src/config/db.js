const { Pool } = require("pg");
require("dotenv").config();

const {
  DATABASE_URL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  RENDER, // optional flag
} = process.env;

// ✅ Check if we're running on Render
const isRender = !!DATABASE_URL || RENDER === "true";

const pool = isRender
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: {
        require: true,                // 🔒 Render PostgreSQL requires SSL
        rejectUnauthorized: false,    // ✅ Allow Render's managed cert
      },
    })
  : new Pool({
      host: DB_HOST || "localhost",
      port: DB_PORT || 5432,
      user: DB_USER || "postgres",
      password: DB_PASSWORD || "postgres",
      database: DB_NAME || "Online_Learning_Platform",
    });

pool
  .connect()
  .then(() =>
    console.log(
      isRender
        ? "✅ Connected to Render PostgreSQL successfully"
        : "✅ Connected to Local PostgreSQL successfully"
    )
  )
  .catch((err) =>
    console.error("❌ Failed to connect to PostgreSQL:", err)
  );

pool.on("error", (err) => {
  console.error("Unexpected PG client error", err);
  process.exit(-1);
});

module.exports = pool;
