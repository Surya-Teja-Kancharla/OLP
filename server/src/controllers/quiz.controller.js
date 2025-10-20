const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');

/**
 * Universal quiz grading function
 * Supports both DB question formats:
 * 1. { id, text, options, correctIndex }
 * 2. { question, options, answer }
 */
function gradeQuiz(quiz, answers) {
  const questions = quiz.questions;
  if (!questions || !Array.isArray(questions) || questions.length === 0)
    return { total: 0, correct: 0, score: 0 };

  const total = questions.length;
  let correct = 0;

  // Case 1: answers are [{id:"q1", selectedIndex:2}]
  if (answers.length && typeof answers[0] === 'object') {
    const questionMap = new Map();
    questions.forEach((q, index) => {
      // allow id-based or index-based grading
      questionMap.set(q.id || index, q);
    });

    for (const a of answers) {
      const q = questionMap.get(a.id) || questions[answers.indexOf(a)];
      if (!q) continue;

      // Determine correct index
      let correctIndex = q.correctIndex;
      if (correctIndex === undefined && q.answer) {
        correctIndex = q.options.indexOf(q.answer);
      }

      if (a.selectedIndex === correctIndex) correct++;
    }
  }

  // Case 2: answers are [0, 2, 1]
  else if (typeof answers[0] === 'number') {
    answers.forEach((selectedIndex, i) => {
      const q = questions[i];
      if (!q) return;
      let correctIndex = q.correctIndex;
      if (correctIndex === undefined && q.answer) {
        correctIndex = q.options.indexOf(q.answer);
      }
      if (selectedIndex === correctIndex) correct++;
    });
  }

  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { total, correct, score };
}

async function submitQuiz(req, res) {
  try {
    const user_id = req.user.id;
    const { quiz_id, answers } = req.body;

    if (!quiz_id || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'quiz_id and valid answers[] required' });
    }

    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });

    // Parse stored questions JSON if needed
    if (typeof quiz.questions === 'string') {
      try {
        quiz.questions = JSON.parse(quiz.questions);
      } catch (err) {
        console.error('❌ Invalid quiz.questions JSON in DB');
        quiz.questions = [];
      }
    }

    const { total, correct, score } = gradeQuiz(quiz, answers);

    const attempts = 1; // (can be improved later to fetch previous attempts)

    const submission = await QuizSubmission.submit({
      quiz_id,
      user_id,
      answers: JSON.stringify(answers),
      score,
      attempts,
    });

    res.status(200).json({
      success: true,
      message: 'Quiz submitted successfully.',
      data: { submission, total, correct, score, passed: score >= quiz.passing_score },
    });
  } catch (err) {
    console.error('❌ Submit Quiz Error:', err);
    res.status(500).json({ success: false, message: 'Submit failed' });
  }
}

module.exports = { submitQuiz };
