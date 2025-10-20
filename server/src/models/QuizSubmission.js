// models/QuizSubmission.js
const pool = require('../config/db');

const QuizSubmission = {
  async submit({ quiz_id, user_id, answers, score, attempts }) {
    const q = `
      INSERT INTO quiz_submissions (quiz_id, user_id, answers, score, attempts)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
    `;
    const vals = [quiz_id, user_id, answers, score, attempts];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async findByUser(user_id) {
    const { rows } = await pool.query(`SELECT * FROM quiz_submissions WHERE user_id = $1`, [user_id]);
    return rows;
  },
};

module.exports = QuizSubmission;
