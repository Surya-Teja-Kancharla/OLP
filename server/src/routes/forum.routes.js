const express = require('express');
const router = express.Router();
const { createPost, listPosts, upvotePost, deletePost } = require('../controllers/forum.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/rbac.middleware');

router.get('/', listPosts);
router.post('/', authenticate, createPost);
router.post('/:id/upvote', authenticate, upvotePost);
router.delete('/:id', authenticate, deletePost); // implement role check in controller if needed

module.exports = router;
