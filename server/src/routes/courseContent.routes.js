const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * ✅ Add new course content (Instructor or Admin only)
 */
router.post("/", authenticate, async (req, res) => {
  try {
    const { course_id, type, title, url, duration } = req.body;

    if (!course_id || !title || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    if (req.user.role !== "instructor" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access." });
    }

    const result = await db.query(
      `INSERT INTO course_content (course_id, type, url, duration, title)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [course_id, type, url || null, duration || null, title]
    );

    res.status(201).json({
      success: true,
      message: "Content added successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error adding content:", err.message);
    res.status(500).json({ success: false, message: "Failed to add content." });
  }
});

/**
 * ✅ Get all course contents for a specific course
 */
router.get("/:courseId", authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await db.query(
      `SELECT * FROM course_content WHERE course_id = $1 ORDER BY id ASC`,
      [courseId]
    );

    res.json({
      success: true,
      data: result.rows || [],
    });
  } catch (err) {
    console.error("❌ Error fetching content:", err.message);
    res.status(500).json({ success: false, message: "Failed to load content." });
  }
});

module.exports = router;
