const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * ✅ POST /api/player/complete/:lessonId
 * Marks or unmarks a lesson as completed (toggle style)
 */
router.post("/complete/:lessonId", authenticate, async (req, res) => {
  const { lessonId } = req.params;
  const userId = req.user.id;

  try {
    // 1️⃣ Ensure lesson exists
    const lessonCheck = await pool.query(
      `SELECT id FROM course_content WHERE id = $1`,
      [lessonId]
    );

    if (lessonCheck.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }

    // 2️⃣ Check if this user already completed this lesson
    const existing = await pool.query(
      `SELECT id FROM lesson_completion WHERE user_id = $1 AND lesson_id = $2`,
      [userId, lessonId]
    );

    // 3️⃣ If already completed → unmark it (toggle behavior)
    if (existing.rows.length > 0) {
      await pool.query(
        `DELETE FROM lesson_completion WHERE user_id = $1 AND lesson_id = $2`,
        [userId, lessonId]
      );
      return res.json({
        success: true,
        toggled: false,
        message: "Lesson unmarked as completed",
      });
    }

    // 4️⃣ Otherwise mark as completed
    await pool.query(
      `INSERT INTO lesson_completion (user_id, lesson_id, completed_at)
       VALUES ($1, $2, NOW())`,
      [userId, lessonId]
    );

    return res.json({
      success: true,
      toggled: true,
      message: "Lesson marked as completed successfully",
    });
  } catch (err) {
    console.error("❌ Error toggling lesson completion:", err.message);
    return res.status(500).json({
      success: false,
      message: "Database error while marking lesson complete",
    });
  }
});

/**
 * ✅ GET /api/player/completed
 * Returns all completed lesson IDs for the current user
 */
router.get("/completed", authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT lesson_id FROM lesson_completion WHERE user_id = $1`,
      [userId]
    );

    return res.json({
      success: true,
      completed: result.rows.map((r) => r.lesson_id),
    });
  } catch (err) {
    console.error("❌ Error fetching completed lessons:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching completed lessons",
    });
  }
});

module.exports = router;
