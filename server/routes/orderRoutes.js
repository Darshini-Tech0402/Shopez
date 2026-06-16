const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place new order
router.post('/place-order', orderController.placeOrder);

// Get all orders of current user
router.get('/my-orders', orderController.getUserOrders);

// Get single order by ID
router.get('/:orderId', orderController.getOrderById);

// Update order status (Admin only)
router.put('/update-status/:orderId', orderController.updateOrderStatus);

// Cancel order
router.put('/cancel/:orderId', orderController.cancelOrder);

// Get all orders (Admin only)
router.get('/', orderController.getAllOrders);

// Download invoice
router.get('/:orderId/invoice', orderController.downloadInvoice);

// Track order
router.get('/:orderId/track', orderController.trackOrder);

module.exports = router;