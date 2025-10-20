const pool = require('../config/db');

const Course = {
  async create({ title, description, category, instructor_id }) {
    const q = `INSERT INTO courses (title, description, category, instructor_id)
               VALUES ($1,$2,$3,$4) RETURNING *`;
    const vals = [title, description, category, instructor_id];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async update(id, data) {
    const q = `UPDATE courses SET title=$1, description=$2, category=$3 WHERE id=$4 RETURNING *`;
    const vals = [data.title, data.description, data.category, id];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async delete(id) {
    await pool.query(`DELETE FROM course_content WHERE course_id = $1`, [id]);
    const { rows } = await pool.query(`DELETE FROM courses WHERE id = $1 RETURNING *`, [id]);
    return rows[0];
  },

  async findById(id) {
    const q = `SELECT * FROM courses WHERE id = $1`;
    const { rows } = await pool.query(q, [id]);
    return rows[0];
  },

  async list({ limit = 20, offset = 0 } = {}) {
    const q = `SELECT c.*, u.name as instructor_name FROM courses c
               LEFT JOIN users u ON u.id = c.instructor_id
               ORDER BY c.id DESC LIMIT $1 OFFSET $2`;
    const { rows } = await pool.query(q, [limit, offset]);
    return rows;
  }
};

module.exports = Course;
