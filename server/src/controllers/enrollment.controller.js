const db = require("../config/db");
const Enrollment = require("../models/Enrollment");

// ✅ Enroll in a course
async function enroll(req, res) {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;

    if (!course_id) {
      return res.status(400).json({ success: false, message: "Course ID required" });
    }

    const result = await db.query(
      `INSERT INTO enrollments (course_id, user_id, progress)
       VALUES ($1, $2, 0)
       ON CONFLICT (course_id, user_id) DO NOTHING
       RETURNING *`,
      [course_id, user_id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Enroll error:", err);
    res.status(500).json({ success: false, message: "Failed to enroll in course" });
  }
}

// ✅ Get all enrollments for the current user (with progress)
async function myEnrollments(req, res) {
  try {
    const user_id = req.user.id;
    const result = await db.query(
      `SELECT 
         e.course_id,
         e.progress,
         c.title,
         c.description
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.user_id = $1
       ORDER BY c.id ASC`,
      [user_id]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("❌ MyEnrollments error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch enrollments" });
  }
}

// ✅ Update progress manually (used by backend + course player)
async function updateProgress(req, res) {
  try {
    const { course_id, progress } = req.body;
    const user_id = req.user.id;

    if (!course_id || progress == null) {
      return res.status(400).json({ success: false, message: "Course ID and progress required" });
    }

    const result = await db.query(
      `UPDATE enrollments 
       SET progress = $1 
       WHERE course_id = $2 AND user_id = $3 
       RETURNING *`,
      [progress, course_id, user_id]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Update progress error:", err);
    res.status(500).json({ success: false, message: "Failed to update progress" });
  }
}

module.exports = { enroll, myEnrollments, updateProgress };
