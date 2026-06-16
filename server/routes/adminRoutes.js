const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all users (Admin only)
router.get('/users', adminController.getAllUsers);

// Get user by ID
router.get('/users/:userId', adminController.getUserById);

// Delete user (Admin only)
router.delete('/users/:userId', adminController.deleteUser);

// Get all products
router.get('/products', adminController.getAllProducts);

// Get sales statistics
router.get('/stats/sales', adminController.getSalesStats);

// Get revenue analytics
router.get('/stats/revenue', adminController.getRevenueStats);

// Get category-wise sales
router.get('/stats/category', adminController.getCategoryStats);

// Get total orders count
router.get('/stats/orders', adminController.getOrdersStats);

// Approve order (Admin only)
router.put('/orders/:orderId/approve', adminController.approveOrder);

// Reject order (Admin only)
router.put('/orders/:orderId/reject', adminController.rejectOrder);

// Get dashboard data (Admin only)
router.get('/dashboard', adminController.getDashboardData);

module.exports = router;