const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const quizRoutes = require("./routes/quiz.routes");
const forumRoutes = require("./routes/forum.routes");
const playerRoutes = require("./routes/player.routes");
const lessonCompletionRoutes = require("./routes/lessonCompletion.routes");
const courseContentRoutes = require("./routes/courseContent.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true, // ✅ allows cookies and JWTs to be sent securely
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// ✅ Register all routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/lesson-completion", lessonCompletionRoutes);
app.use("/api/course-content", courseContentRoutes);

// ✅ Health Check Endpoint (useful for Render)
app.get("/", (req, res) => {
  res.json({ success: true, message: "OLP Backend running 🚀", env: process.env.NODE_ENV });
});

// ✅ Error Handler
app.use(errorHandler);

module.exports = app;
