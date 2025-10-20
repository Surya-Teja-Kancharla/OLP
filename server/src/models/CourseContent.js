const pool = require('../config/db');

const CourseContent = {
  async add({ course_id, type, url, duration, title }) {
    const q = `INSERT INTO course_content (course_id, type, url, duration, title)
               VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const vals = [course_id, type, url, duration || null, title || null];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async listByCourse(course_id) {
    const q = `SELECT * FROM course_content WHERE course_id = $1 ORDER BY id`;
    const { rows } = await pool.query(q, [course_id]);
    return rows;
  }
};

module.exports = CourseContent;
