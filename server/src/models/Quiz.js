const pool = require('../config/db');

const Quiz = {
  async create({ course_id, questions, passing_score }) {
    const q = `INSERT INTO quizzes (course_id, questions, passing_score)
               VALUES ($1,$2,$3) RETURNING *`;
    const { rows } = await pool.query(q, [course_id, questions, passing_score]);
    return rows[0];
  },

  async findByCourse(course_id) {
    const { rows } = await pool.query(`SELECT * FROM quizzes WHERE course_id = $1`, [course_id]);
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM quizzes WHERE id = $1`, [id]);
    return rows[0];
  }
};

module.exports = Quiz;
