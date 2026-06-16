import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, tax, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="cart-empty">
      <div className="cart-empty-icon">🛒</div>
      <h2>Your cart is empty!</h2>
      <p>Looks like you haven't added anything yet.</p>
      <Link to="/" className="cart-empty-btn">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My Cart 🛒</h1>
        <button className="cart-clear-btn" onClick={clearCart}>Clear All</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <p className="cart-item-category">{item.category}</p>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-subtotal">
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>
              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal ({cart.length} items)</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>Tax (5%)</span><span>₹{tax.toLocaleString()}</span></div>
          <div className="summary-row"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          {shipping === 0 && <p className="free-ship-msg">🎉 You got free shipping!</p>}
          {shipping > 0 && <p className="ship-info">Add ₹{(1000 - subtotal).toLocaleString()} more for free shipping</p>}
          <div className="summary-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout →</button>
          <Link to="/" className="continue-btn">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;