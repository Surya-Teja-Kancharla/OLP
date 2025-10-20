const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * 🎯 GET /api/quizzes/:courseId/:lessonId
 * Fetch quiz questions for a specific lesson in a course
 */
router.get("/:courseId/:lessonId", authenticate, async (req, res) => {
  const { courseId, lessonId } = req.params;

  try {
    const quizResult = await db.query(
      `SELECT id, course_id, lesson_id, questions, passing_score 
       FROM Quizzes 
       WHERE course_id = $1 AND lesson_id = $2`,
      [courseId, lessonId]
    );

    if (quizResult.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No quiz found for this lesson." });

    const quiz = quizResult.rows[0];

    res.json({
      success: true,
      quiz: {
        id: quiz.id,
        course_id: quiz.course_id,
        lesson_id: quiz.lesson_id,
        questions: quiz.questions,
        passing_score: quiz.passing_score,
      },
    });
  } catch (err) {
    console.error("❌ Quiz fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to load quiz" });
  }
});

/**
 * 🧩 POST /api/quizzes/:courseId/:lessonId/submit
 * Submit answers for a specific quiz and record attempts (max 5)
 */
router.post("/:courseId/:lessonId/submit", authenticate, async (req, res) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user.id;
  const { answers } = req.body;

  try {
    const quizResult = await db.query(
      `SELECT id, questions, passing_score 
       FROM Quizzes 
       WHERE course_id = $1 AND lesson_id = $2`,
      [courseId, lessonId]
    );

    if (quizResult.rows.length === 0)
      return res.status(404).json({ message: "Quiz not found" });

    const quiz = quizResult.rows[0];
    const questions = quiz.questions;

    // ✅ Check attempt limit
    const attemptsRes = await db.query(
      `SELECT COUNT(*) FROM QuizSubmissions WHERE quiz_id = $1 AND user_id = $2`,
      [quiz.id, userId]
    );
    const attempts = parseInt(attemptsRes.rows[0].count);
    if (attempts >= 5)
      return res
        .status(403)
        .json({ success: false, message: "Maximum quiz attempts reached (5)" });

    // ✅ Calculate score
    let score = 0;
    questions.forEach((q, i) => {
      if (
        answers[i] &&
        answers[i].trim().toLowerCase() === q.answer.trim().toLowerCase()
      ) {
        score++;
      }
    });

    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= quiz.passing_score;

    // ✅ Record submission
    await db.query(
      `INSERT INTO QuizSubmissions 
       (quiz_id, user_id, score, attempts, passed, submitted_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [quiz.id, userId, percentage, attempts + 1, passed]
    );

    res.json({
      success: true,
      score: percentage,
      passed,
      attemptsLeft: 5 - (attempts + 1),
      message: passed
        ? "🎉 Congratulations! You passed this quiz."
        : "Try again — review the material and reattempt.",
    });
  } catch (err) {
    console.error("❌ Quiz submission error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit quiz answers" });
  }
});

module.exports = router;
