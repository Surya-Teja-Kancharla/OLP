const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * 🎯 GET /api/quizzes/:courseId
 * Fetch quiz for a course
 */
router.get("/:courseId", authenticate, async (req, res) => {
  const { courseId } = req.params;

  try {
    const quizResult = await db.query(
      `SELECT id, course_id, questions, passing_score
       FROM quizzes
       WHERE course_id = $1`,
      [courseId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No quiz found for this course." });
    }

    const quiz = quizResult.rows[0];

    // ✅ Parse JSONB or JSON string safely
    let questions = [];
    try {
      questions = typeof quiz.questions === "string" ? JSON.parse(quiz.questions) : quiz.questions;
    } catch (err) {
      console.error("Invalid quiz.questions JSON:", err);
      questions = [];
    }

    res.json({
      success: true,
      quiz: {
        id: quiz.id,
        course_id: quiz.course_id,
        title: `Course ${courseId} Quiz`,
        questions,
        passing_score: quiz.passing_score,
      },
    });
  } catch (err) {
    console.error("❌ Quiz fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to load quiz" });
  }
});

/**
 * 🧩 POST /api/quizzes/:courseId/submit
 * Submit answers for a specific course quiz
 */
router.post("/:courseId/submit", authenticate, async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;
  const { answers } = req.body;

  try {
    const quizResult = await db.query(
      `SELECT id, questions, passing_score
       FROM quizzes
       WHERE course_id = $1`,
      [courseId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    const quiz = quizResult.rows[0];

    // ✅ Parse questions
    let questions = [];
    try {
      questions = typeof quiz.questions === "string" ? JSON.parse(quiz.questions) : quiz.questions;
    } catch {
      questions = [];
    }

    // ✅ Check attempt limit
    const attemptsRes = await db.query(
      `SELECT COUNT(*) FROM quiz_submissions WHERE quiz_id = $1 AND user_id = $2`,
      [quiz.id, userId]
    );
    const attempts = parseInt(attemptsRes.rows[0].count);
    if (attempts >= 5) {
      return res.status(403).json({
        success: false,
        message: "Maximum quiz attempts reached (5)",
      });
    }

    // ✅ Grade quiz
    let correct = 0;
    questions.forEach((q, i) => {
      const correctAnswer = q.answer?.trim().toLowerCase();
      const userAnswer = (answers[i] || "").trim().toLowerCase();
      if (userAnswer === correctAnswer) correct++;
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= quiz.passing_score;

    // ✅ Record submission
    await db.query(
      `INSERT INTO quiz_submissions (quiz_id, user_id, score, attempts, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [quiz.id, userId, percentage, attempts + 1]
    );

    res.json({
      success: true,
      score: percentage,
      passed,
      attemptsLeft: 5 - (attempts + 1),
      message: passed
        ? "🎉 Congratulations! You passed this quiz."
        : "❌ Try again after reviewing the material.",
    });
  } catch (err) {
    console.error("❌ Quiz submission error:", err);
    res.status(500).json({ success: false, message: "Failed to submit quiz answers" });
  }
});

module.exports = router;
