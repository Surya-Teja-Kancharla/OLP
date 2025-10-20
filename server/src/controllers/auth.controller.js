/**
 * Authentication Controller
 * Handles user signup and login operations
 */

const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/password.helper');
const { sign } = require('../utils/jwt.helper');

/* ======================================================
   USER SIGNUP
   ====================================================== */
async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists.' });
    }

    // Hash the password
    const password_hash = await hashPassword(password);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password_hash,
      role: role || 'student',
    });

    // Generate token
    const token = sign({
      id: newUser.id,
      role: newUser.role,
      email: newUser.email,
    });

    // Respond with success
    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ success: false, message: 'Registration failed.' });
  }
}

/* ======================================================
   USER LOGIN
   ====================================================== */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = sign({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
}

module.exports = { signup, login };
