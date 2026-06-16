// Check if user is ADMIN
const roleCheck = (req, res, next) => {
  try {
    // Check if user has ADMIN role
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied - Admin only' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = roleCheck;