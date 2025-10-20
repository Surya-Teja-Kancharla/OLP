const ForumPost = require('../models/ForumPost');
const xss = require('xss');

async function createPost(req, res) {
  try {
    const user_id = req.user.id;
    const { course_id, content, parent_id } = req.body;
    if (!course_id || !content) return res.status(400).json({ success: false, message: 'course_id and content required' });
    const sanitized = xss(content);
    const post = await ForumPost.create({ course_id, user_id, content: sanitized, parent_id: parent_id || null });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

async function listPosts(req, res) {
  try {
    const course_id = req.query.course_id;
    if (!course_id) return res.status(400).json({ success: false, message: 'course_id query param required' });
    const posts = await ForumPost.listByCourse(course_id);
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

async function upvotePost(req, res) {
  try {
    const post_id = req.params.id;
    const post = await ForumPost.upvote(post_id);
    if (!post) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

async function deletePost(req, res) {
  try {
    const post_id = req.params.id;
    // authorization: either author or admin/instructor - keep simple: check role or author
    const post = await ForumPost.delete(post_id);
    if (!post) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

module.exports = { createPost, listPosts, upvotePost, deletePost };
