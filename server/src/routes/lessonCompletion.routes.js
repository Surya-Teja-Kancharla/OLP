const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

// ✅ Mark a lesson as completed
router.post("/", authenticate, async (req, res) => {
  const { lesson_id } = req.body;
  const user_id = req.user.id;

  if (!lesson_id) {
    return res.status(400).json({ success: false, message: "lesson_id required" });
  }

  try {
    await db.query(
      `INSERT INTO lesson_completion (user_id, lesson_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, lesson_id) DO NOTHING`,
      [user_id, lesson_id]
    );

    res.json({ success: true, message: "Lesson marked as completed" });
  } catch (err) {
    console.error("❌ Mark completion error:", err);
    res.status(500).json({ success: false, message: "Failed to mark lesson completed" });
  }
});

// ✅ Get all completed lessons for current user in a course
router.get("/:courseId", authenticate, async (req, res) => {
  const { courseId } = req.params;
  const user_id = req.user.id;

  try {
    const result = await db.query(
      `SELECT lc.lesson_id
       FROM lesson_completion lc
       JOIN course_content cc ON lc.lesson_id = cc.id
       WHERE cc.course_id = $1 AND lc.user_id = $2`,
      [courseId, user_id]
    );

    res.json({ success: true, completedLessons: result.rows.map((r) => r.lesson_id) });
  } catch (err) {
    console.error("❌ Fetch completed lessons error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch completed lessons" });
  }
});

module.exports = router;
