const pool = require("../config/db");

const Course = {
  async create({ title, description, category, instructor_id }) {
    const query = `
      INSERT INTO courses (title, description, category, instructor_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [title, description, category, instructor_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async list({ limit = 20, offset = 0 }) {
    const query = `
      SELECT 
        c.id,
        c.title,
        c.description,
        c.category,
        c.instructor_id,
        u.name AS instructor_name,
        c.created_at
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      ORDER BY c.created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const { rows } = await pool.query(query, [limit, offset]);
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM courses WHERE id = $1`, [id]);
    return rows[0];
  },

  async update(id, { title, description, category }) {
    const query = `
      UPDATE courses
      SET title=$1, description=$2, category=$3, updated_at=NOW()
      WHERE id=$4
      RETURNING *;
    `;
    const values = [title, description, category, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    await pool.query(`DELETE FROM courses WHERE id = $1`, [id]);
  },
};

module.exports = Course;
