/**
 * Auth Middleware
 * Verifies JWT tokens and attaches user info to req.user
 */

const { verify } = require('../utils/jwt.helper');
const User = require('../models/User');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // ✅ Only log tokens in development
    if(process.env.NODE_ENV === "development") {
      console.log("🔍 Received Token:", token);
    }

    // ✅ Verify token
    const decoded = verify(token);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Attach user to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Error:', err.message);
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}

module.exports = { authenticate };
