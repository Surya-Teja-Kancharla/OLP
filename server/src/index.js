require("dotenv").config();
const express = require("express");
const app = require("./app");
const pool = require("./config/db");
const lessonRoutes = require("./routes/lesson.routes");
const quizRoutes = require("./routes/quiz.routes");

const PORT = process.env.PORT || 5000;

// ✅ Use JSON parser once (if not already applied in app.js)
app.use(express.json());

// ✅ Mount your routes
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);

async function start() {
  try {
    // Test database connection
    await pool.query("SELECT NOW()");

    // Identify environment
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.RENDER === "true";
    const env = isProduction ? "Render (Production)" : "Local (Development)";

    // ✅ Log only in local development
    if (!isProduction) {
      console.log(`✅ Connected to PostgreSQL — ${env}`);
      console.log(`🚀 Server running on port ${PORT}`);
    }

    // Always start the server (but log only locally)
    app.listen(PORT, () => {
      if (!isProduction) {
        console.log(`📡 Listening on http://localhost:${PORT}`);
      }
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  }
}

start();
