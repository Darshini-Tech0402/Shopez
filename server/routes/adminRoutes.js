const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/auth");

// All admin routes require auth + admin role
router.use(protect, admin);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;