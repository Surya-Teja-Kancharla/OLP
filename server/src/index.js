require('dotenv').config();
const express = require('express');
const app = require('./app');
const pool = require('./config/db');
const lessonRoutes = require('./routes/lesson.routes'); // ✅ new import
const quizRoutes = require("./routes/quiz.routes");

const PORT = process.env.PORT || 5000;

// ✅ Middleware setup (if not already in app.js)
app.use(express.json());

// ✅ Lesson Routes
app.use("/api/lessons", lessonRoutes);

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
