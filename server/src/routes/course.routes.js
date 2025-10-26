const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");
const { createCourse } = require("../controllers/course.controller");

/**
 * ✅ Create a new course (Instructor or Admin only)
 */
router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "instructor" && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only instructors or admins can create courses",
      });
    }

    const { title, description, category } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Course title is required" });
    }

    const result = await db.query(
      `INSERT INTO courses (title, description, category, instructor_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description || "", category || "", req.user.id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error creating course:", err.message);
    res.status(500).json({ success: false, message: "Failed to create course" });
  }
});

/**
 * ✅ Get all courses (Admin → all; Instructor → own; Student → all)
 */
router.get("/", authenticate, async (req, res) => {
  try {
    let query;
    let params = [];

    if (req.user.role === "instructor") {
      query = `
        SELECT 
          c.id, c.title, c.description, c.category, c.instructor_id,
          u.name AS instructor_name,
          COUNT(e.user_id) AS enrolled_count,
          c.created_at
        FROM courses c
        LEFT JOIN users u ON c.instructor_id = u.id
        LEFT JOIN enrollments e ON c.id = e.course_id
        WHERE c.instructor_id = $1
        GROUP BY c.id, u.name
        ORDER BY c.created_at DESC;
      `;
      params = [req.user.id];
    } else {
      query = `
        SELECT 
          c.id, c.title, c.description, c.category, c.instructor_id,
          u.name AS instructor_name,
          COUNT(e.user_id) AS enrolled_count,
          c.created_at
        FROM courses c
        LEFT JOIN users u ON c.instructor_id = u.id
        LEFT JOIN enrollments e ON c.id = e.course_id
        GROUP BY c.id, u.name
        ORDER BY c.created_at DESC;
      `;
    }

    const result = await db.query(query, params);
    res.json({ success: true, data: result.rows || [] });
  } catch (err) {
    console.error("❌ Error fetching courses:", err.message);
    res.status(500).json({ success: false, message: "Failed to load courses" });
  }
});

/**
 * ✅ Get a specific course
 */
router.get("/:id", authenticate, async (req, res) => {
  const courseId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    const courseRes = await db.query(
      `SELECT id, title, description, category, instructor_id
       FROM courses WHERE id = $1`,
      [courseId]
    );

    if (courseRes.rows.length === 0)
      return res.status(404).json({ success: false, message: "Course not found" });

    const course = courseRes.rows[0];
    const lessonsRes = await db.query(
      `SELECT id, title, type, url
       FROM course_content WHERE course_id = $1 ORDER BY id ASC`,
      [courseId]
    );

    const completedRes = await db.query(
      `SELECT lesson_id FROM lesson_completion WHERE user_id = $1`,
      [userId]
    );
    const completedIds = completedRes.rows.map((r) => r.lesson_id);

    const contents = lessonsRes.rows.map((lesson) => ({
      ...lesson,
      completed: completedIds.includes(lesson.id),
    }));

    res.json({ success: true, course, contents });
  } catch (err) {
    console.error("❌ Error fetching course details:", err.message);
    res.status(500).json({ success: false, message: "Server error loading course" });
  }
});

/**
 * ✅ Delete a course (Admin only)
 */
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Only admins can delete courses" });
  }

  try {
    console.log(`🧹 Deletion request received for course ID ${id}`);

    const exists = await db.query("SELECT * FROM courses WHERE id = $1", [id]);
    if (exists.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    await db.query("BEGIN");

    // 1️⃣ Delete lesson completions tied to this course
    await db.query(
      `
      DELETE FROM lesson_completion
      WHERE lesson_id IN (
        SELECT id FROM course_content WHERE course_id = $1
      );
    `,
      [id]
    );

    // 2️⃣ Delete lessons/content
    await db.query("DELETE FROM course_content WHERE course_id = $1", [id]);

    // 3️⃣ Delete enrollments
    await db.query("DELETE FROM enrollments WHERE course_id = $1", [id]);

    // 4️⃣ Finally, delete the course
    const result = await db.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);

    await db.query("COMMIT");

    console.log(`✅ Deleted course '${result.rows[0].title}' (ID ${id}) successfully`);
    res.json({
      success: true,
      message: `Course '${result.rows[0].title}' deleted successfully`,
      data: result.rows[0],
    });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("❌ Deletion failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to delete course" });
  }
});

module.exports = router;
