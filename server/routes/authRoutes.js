const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign Up - New user registration
router.post('/signup', authController.signup);

// Login - User login
router.post('/login', authController.login);

// Logout - User logout
router.post('/logout', authController.logout);

// Get current user info
router.get('/me', authController.getCurrentUser);

// Update user profile
router.put('/update-profile', authController.updateProfile);

module.exports = router;