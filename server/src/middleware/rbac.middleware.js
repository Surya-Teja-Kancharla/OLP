function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden - insufficient role' });
    }
    next();
  };
}

module.exports = { authorizeRoles };
