const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * ✅ POST /api/player/complete/:lessonId
 * Toggle lesson completion (mark or unmark)
 */
router.post("/complete/:lessonId", authenticate, async (req, res) => {
  const { lessonId } = req.params;
  const userId = req.user.id;

  try {
    // 1️⃣ Ensure lesson exists
    const lessonExists = await pool.query(
      "SELECT id FROM coursecontent WHERE id = $1",
      [lessonId]
    );
    if (lessonExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // 2️⃣ Check if already completed
    const existing = await pool.query(
      "SELECT * FROM lesson_completion WHERE user_id = $1 AND lesson_id = $2",
      [userId, lessonId]
    );

    if (existing.rows.length > 0) {
      // 🔄 Unmark if already complete
      await pool.query(
        "DELETE FROM lesson_completion WHERE user_id = $1 AND lesson_id = $2",
        [userId, lessonId]
      );

      return res.json({
        success: true,
        message: "Lesson unmarked as completed",
        toggled: false,
      });
    }

    // ✅ Otherwise, mark as completed
    await pool.query(
      "INSERT INTO lesson_completion (user_id, lesson_id, completed_at) VALUES ($1, $2, NOW())",
      [userId, lessonId]
    );

    return res.json({
      success: true,
      message: "Lesson marked as completed successfully",
      toggled: true,
    });
  } catch (err) {
    console.error("❌ Lesson completion error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update completion status" });
  }
});

/**
 * 📥 GET /api/player/completed
 * Fetch all completed lessons for the current user
 */
router.get("/completed", authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT lesson_id FROM lesson_completion WHERE user_id = $1",
      [userId]
    );

    res.json({
      success: true,
      completed: result.rows.map((r) => r.lesson_id),
    });
  } catch (err) {
    console.error("❌ Error fetching completed lessons:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching completed lessons",
    });
  }
});

module.exports = router;
