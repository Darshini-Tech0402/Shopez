const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products with filters
router.get('/all', productController.getAllProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Search products
router.get('/search/:keyword', productController.searchProducts);

// Get products by category
router.get('/category/:category', productController.getByCategory);

// Add new product (Admin only)
router.post('/add', productController.addProduct);

// Update product (Admin only)
router.put('/update/:id', productController.updateProduct);

// Delete product (Admin only)
router.delete('/delete/:id', productController.deleteProduct);

// Get product reviews
router.get('/:id/reviews', productController.getProductReviews);

// Add review to product
router.post('/:id/add-review', productController.addReview);

module.exports = router;