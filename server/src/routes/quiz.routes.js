const express = require('express');
const router = express.Router();
const { submitQuiz } = require('../controllers/quiz.controller');
const { authenticate } = require('../middleware/auth.middleware');

// for simplicity only submit route; creation of quizzes may be added similarly
router.post('/submit', authenticate, submitQuiz);

module.exports = router;
