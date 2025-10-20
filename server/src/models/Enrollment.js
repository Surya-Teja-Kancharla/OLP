const pool = require('../config/db');

const Enrollment = {
  async enroll({ course_id, user_id }) {
    const q = `INSERT INTO enrollments (course_id, user_id, progress)
               VALUES ($1,$2,$3) ON CONFLICT (course_id,user_id) DO NOTHING RETURNING *`;
    const { rows } = await pool.query(q, [course_id, user_id, 0]);
    return rows[0];
  },

  async getUserEnrollments(user_id) {
    const q = `SELECT e.*, c.title, c.description FROM enrollments e
               JOIN courses c ON c.id = e.course_id WHERE e.user_id = $1`;
    const { rows } = await pool.query(q, [user_id]);
    return rows;
  },

  async updateProgress(course_id, user_id, progress) {
    const q = `UPDATE enrollments SET progress = $1 WHERE course_id=$2 AND user_id=$3 RETURNING *`;
    const { rows } = await pool.query(q, [progress, course_id, user_id]);
    return rows[0];
  }
};

module.exports = Enrollment;
