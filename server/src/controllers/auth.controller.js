/**
 * Authentication Controller
 * Handles user signup, login, and logout operations
 */

const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/password.helper");
const { sign } = require("../utils/jwt.helper");

/* ======================================================
   USER SIGNUP
   ====================================================== */
async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    }

    const password_hash = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password_hash,
      role: role || "student",
    });

    const token = sign({
      id: newUser.id,
      role: newUser.role,
      email: newUser.email,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed." });
  }
}

/* ======================================================
   USER LOGIN
   ====================================================== */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = sign({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Login failed." });
  }
}

/* ======================================================
   USER LOGOUT
   ====================================================== */
/**
 * Note:
 * JWT-based logout is typically handled on the client
 * (by deleting the stored token). However, you can still
 * provide a logout endpoint for consistency.
 */
async function logout(req, res) {
  try {
    // On logout, client should delete token from localStorage/cookies.
    // Optionally, you can add the token to a blacklist (Redis, DB, etc.)
    return res.status(200).json({
      success: true,
      message: "Logout successful. Please remove token on client side.",
    });
  } catch (err) {
    console.error("Logout Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Logout failed." });
  }
}

module.exports = { signup, login, logout };
