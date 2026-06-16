const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      total: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      total: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get sales statistics
exports.getSalesStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalItems = await Order.aggregate([
      { $group: { _id: null, total: { $sum: { $size: '$items' } } } }
    ]);

    res.status(200).json({
      totalOrders,
      totalItemsSold: totalItems[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get revenue analytics
exports.getRevenueStats = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$finalAmount' },
          totalDiscount: { $sum: '$discount' }
        }
      }
    ]);

    res.status(200).json({
      totalRevenue: revenue[0]?.totalRevenue || 0,
      totalDiscount: revenue[0]?.totalDiscount || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get category-wise sales
exports.getCategoryStats = async (req, res) => {
  try {
    const categoryStats = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          totalSales: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.totalPrice' }
        }
      }
    ]);

    res.status(200).json({ categoryStats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get total orders count
exports.getOrdersStats = async (req, res) => {
  try {
    const pending = await Order.countDocuments({ status: 'Pending' });
    const confirmed = await Order.countDocuments({ status: 'Confirmed' });
    const shipped = await Order.countDocuments({ status: 'Shipped' });
    const delivered = await Order.countDocuments({ status: 'Delivered' });
    const cancelled = await Order.countDocuments({ status: 'Cancelled' });

    res.status(200).json({
      pending,
      confirmed,
      shipped,
      delivered,
      cancelled
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve order (Admin only)
exports.approveOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: 'Confirmed' },
      { new: true }
    );

    res.status(200).json({
      message: 'Order approved',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject order (Admin only)
exports.rejectOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    // Refund user
    const user = await User.findById(order.userId);
    user.balance += order.finalAmount;
    await user.save();

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({
      message: 'Order rejected and refunded',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get dashboard data (Admin only)
exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$finalAmount' }
        }
      }
    ]);

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenue[0]?.totalRevenue || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};