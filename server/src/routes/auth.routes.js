/**
 * Authentication Routes
 * Handles signup and login requests
 */

const express = require('express');
const router = express.Router();

// ✅ Import controller
const { signup, login } = require('../controllers/auth.controller');

// ✅ Routes

// Register a new user
router.post('/signup', signup);

// Login existing user
router.post('/login', login);

module.exports = router;
