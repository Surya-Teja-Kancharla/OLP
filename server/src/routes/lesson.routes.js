const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * POST /lessons/:id/complete
 * Marks a lesson as completed and updates overall course progress
 */
router.post("/:id/complete", authenticate, async (req, res) => {
  const userId = req.user.id;
  const lessonId = parseInt(req.params.id);
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ success: false, message: "courseId required" });
  }

  try {
    // ✅ 1. Record completion if not already done
    await db.query(
      `INSERT INTO lesson_completion (user_id, lesson_id, completed_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id, lesson_id) DO NOTHING;`,
      [userId, lessonId]
    );

    // ✅ 2. Count completed lessons for this user & course
    const completed = await db.query(
      `SELECT COUNT(*) FROM lesson_completion
       WHERE user_id=$1 AND lesson_id IN 
       (SELECT id FROM CourseContent WHERE course_id=$2);`,
      [userId, courseId]
    );

    const total = await db.query(
      `SELECT COUNT(*) FROM CourseContent WHERE course_id=$1;`,
      [courseId]
    );

    const completedCount = parseInt(completed.rows[0].count);
    const totalCount = parseInt(total.rows[0].count);
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // ✅ 3. Update enrollment progress
    await db.query(
      `UPDATE Enrollments SET progress=$1 WHERE user_id=$2 AND course_id=$3;`,
      [progress, userId, courseId]
    );

    res.json({ success: true, progress });
  } catch (err) {
    console.error("Lesson completion error:", err);
    res.status(500).json({ success: false, message: "Failed to update progress" });
  }
});

module.exports = router;
