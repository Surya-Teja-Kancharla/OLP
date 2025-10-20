/**
 * User Controller
 * Handles user profile and user listing
 */

const User = require('../models/User');

/* ======================================================
   GET CURRENT USER PROFILE
   ====================================================== */
async function getProfile(req, res) {
  try {
    // req.user is set by the authenticate middleware
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
}

/* ======================================================
   LIST ALL USERS (ADMIN ONLY)
   ====================================================== */
async function listUsers(req, res) {
  try {
    const users = await User.listAll();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('List Users Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
}

module.exports = { getProfile, listUsers };
