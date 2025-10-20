/**
 * User Routes
 */

const express = require('express');
const router = express.Router();

// ✅ import must match your file name exactly
const { getProfile, listUsers } = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');

// Current user's profile
router.get('/me', authenticate, getProfile);

// List all users (admin only, optional)
router.get('/', authenticate, listUsers);

module.exports = router;
