import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>🛒 Your Cart is Empty!</h2>
          <p>Start shopping to add items</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            ← Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const taxAmount = Math.round(totalPrice * 0.05);
  const finalAmount = totalPrice + taxAmount;

  return (
    <div className="cart-page">
      <h1>🛒 Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Total</span>
            <span>Action</span>
          </div>

          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-info">
                <h4>{item.name}</h4>
              </div>
              <div className="item-price">
                ₹{item.price.toLocaleString()}
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(idx, item.quantity - 1)}>−</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => updateQuantity(idx, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(idx)}>🗑️</button>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <div className="summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%):</span>
              <span>₹{taxAmount.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{finalAmount.toLocaleString()}</span>
            </div>

            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              🚀 Checkout
            </button>
            <button className="continue-btn" onClick={() => navigate('/')}>
              ← Shopping
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;