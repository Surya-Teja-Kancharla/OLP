const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/auth.controller");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout (optional but clean)
router.post("/logout", logout);

module.exports = router;
