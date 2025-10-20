const pool = require('../config/db');

const ForumPost = {
  async create({ course_id, user_id, content, parent_id = null }) {
    const q = `INSERT INTO forum_posts (course_id, user_id, content, parent_id)
               VALUES ($1,$2,$3,$4) RETURNING *`;
    const vals = [course_id, user_id, content, parent_id];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async listByCourse(course_id, limit = 50) {
    const q = `SELECT p.*, u.name as author FROM forum_posts p
               LEFT JOIN users u ON u.id = p.user_id
               WHERE p.course_id = $1
               ORDER BY p.created_at DESC LIMIT $2`;
    const { rows } = await pool.query(q, [course_id, limit]);
    return rows;
  },

  async upvote(post_id) {
    const q = `UPDATE forum_posts SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(q, [post_id]);
    return rows[0];
  },

  async delete(post_id) {
    const q = `DELETE FROM forum_posts WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(q, [post_id]);
    return rows[0];
  }
};

module.exports = ForumPost;
