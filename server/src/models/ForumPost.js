const pool = require('../config/db');

const ForumPost = {
  async create({ course_id, user_id, content, parent_id = null }) {
    const q = `INSERT INTO forum_posts (course_id, user_id, content, parent_id)
               VALUES ($1,$2,$3,$4) RETURNING *`;
    const vals = [course_id, user_id, content, parent_id];
    const { rows } = await pool.query(q, vals);
    return rows[0];
  },

  async listByCourse(course_id, limit = 100) {
    const q = `
      SELECT p.*, u.name AS author
      FROM forum_posts p
      LEFT JOIN users u ON u.id = p.user_id
      WHERE p.course_id = $1
      ORDER BY p.created_at ASC
      LIMIT $2
    `;
    const { rows } = await pool.query(q, [course_id, limit]);

    // Map each post by ID
    const map = {};
    rows.forEach((p) => {
      map[p.id] = { ...p, replies: [], replyCount: 0 };
    });

    const roots = [];

    // Build nested structure
    rows.forEach((p) => {
      if (p.parent_id) {
        const parent = map[p.parent_id];
        if (parent) {
          parent.replies.push(map[p.id]);
        }
      } else {
        roots.push(map[p.id]);
      }
    });

    // Compute reply counts recursively
    const countReplies = (node) => {
      let total = node.replies.length;
      node.replies.forEach((r) => (total += countReplies(r)));
      node.replyCount = total;
      return total;
    };

    roots.forEach(countReplies);
    return roots;
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
