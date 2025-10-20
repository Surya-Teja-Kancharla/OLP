const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * ✅ Get all courses
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, title, description, category
      FROM courses
      ORDER BY id ASC
    `);

    res.json({
      success: true,
      data: result.rows || [],
    });
  } catch (err) {
    console.error("❌ Error fetching all courses:", err.message);
    res.status(500).json({ success: false, message: "Failed to load courses" });
  }
});

/**
 * ✅ Get a specific course with its lessons and completion info
 */
router.get("/:id", authenticate, async (req, res) => {
  const courseId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    // 1️⃣ Fetch course details
    const courseRes = await db.query(
      `SELECT id, title, description, category, instructor_id
       FROM courses WHERE id = $1`,
      [courseId]
    );

    if (courseRes.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const course = courseRes.rows[0];

    // 2️⃣ Fetch lessons (correct table name)
    const lessonsRes = await db.query(
      `SELECT id, title, type, url
       FROM course_content
       WHERE course_id = $1
       ORDER BY id ASC`,
      [courseId]
    );

    // 3️⃣ Fetch completed lessons (correct table name)
    const completedRes = await db.query(
      `SELECT lesson_id FROM lesson_completion WHERE user_id = $1`,
      [userId]
    );
    const completedIds = completedRes.rows.map((r) => r.lesson_id);

    // 4️⃣ Merge data
    const contents = lessonsRes.rows.map((lesson) => ({
      ...lesson,
      completed: completedIds.includes(lesson.id),
    }));

    // 5️⃣ Final JSON response
    res.json({
      success: true,
      course,
      contents,
    });
  } catch (err) {
    console.error("❌ Error fetching course details:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while loading course data",
    });
  }
});

module.exports = router;
