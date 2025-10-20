/**
 * User Model
 * Handles all DB operations related to Users
 */

const pool = require('../config/db');

const User = {
  async create({ name, email, password_hash, role = 'student' }) {
    const q = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at
    `;
    const vals = [name, email, password_hash, role];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async findByEmail(email) {
    const q = `
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = $1
    `;
    const { rows } = await pool.query(q, [email]);
    return rows[0];
  },

  async findById(id) {
    const q = `
      SELECT id, name, email, role
      FROM users
      WHERE id = $1
    `;
    const { rows } = await pool.query(q, [id]);
    return rows[0];
  },

  async listAll() {
    const q = `
      SELECT id, name, email, role, created_at
      FROM users
      ORDER BY id DESC
    `;
    const { rows } = await pool.query(q);
    return rows;
  }
};

module.exports = User;
