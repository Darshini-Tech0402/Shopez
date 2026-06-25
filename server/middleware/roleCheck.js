const roleCheck = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userRole = req.user.isAdmin ? "admin" : "user";

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: `Role '${userRole}' is not authorized to access this route`,
      });
    }

    next();
  };
};

module.exports = roleCheck;