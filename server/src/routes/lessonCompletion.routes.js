const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

// ✅ Mark lesson as completed + update progress
router.post("/", authenticate, async (req, res) => {
  const { lesson_id } = req.body;
  const user_id = req.user.id;

  if (!lesson_id) {
    return res.status(400).json({ success: false, message: "lesson_id required" });
  }

  try {
    // 1️⃣ Insert completion record
    await db.query(
      `INSERT INTO lesson_completion (user_id, lesson_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, lesson_id) DO NOTHING`,
      [user_id, lesson_id]
    );

    // 2️⃣ Identify the course of this lesson
    const courseRes = await db.query(
      `SELECT course_id FROM course_content WHERE id = $1`,
      [lesson_id]
    );
    const course_id = courseRes.rows[0]?.course_id;
    if (!course_id) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // 3️⃣ Count total lessons and completed lessons
    const totalRes = await db.query(
      `SELECT COUNT(*) AS total FROM course_content WHERE course_id = $1`,
      [course_id]
    );
    const completedRes = await db.query(
      `SELECT COUNT(*) AS completed FROM lesson_completion lc
       JOIN course_content cc ON lc.lesson_id = cc.id
       WHERE lc.user_id = $1 AND cc.course_id = $2`,
      [user_id, course_id]
    );

    const total = parseInt(totalRes.rows[0].total);
    const completed = parseInt(completedRes.rows[0].completed);
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    // 4️⃣ Update progress in enrollments table
    await db.query(
      `UPDATE enrollments
       SET progress = $1
       WHERE user_id = $2 AND course_id = $3`,
      [progress, user_id, course_id]
    );

    res.json({
      success: true,
      message:
        progress === 100
          ? "🎉 Course completed!"
          : "Lesson marked as completed!",
      progress,
      course_id,
      completed,
      total,
    });
  } catch (err) {
    console.error("❌ Mark completion error:", err);
    res.status(500).json({ success: false, message: "Failed to mark completion" });
  }
});

// ✅ Fetch completed lessons and progress
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

    const progressRes = await db.query(
      `SELECT progress FROM enrollments WHERE user_id = $1 AND course_id = $2`,
      [user_id, courseId]
    );

    res.json({
      success: true,
      completedLessons: result.rows.map((r) => r.lesson_id),
      progress: progressRes.rows[0]?.progress || 0,
    });
  } catch (err) {
    console.error("❌ Fetch completed lessons error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch progress" });
  }
});

module.exports = router;
