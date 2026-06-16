import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <h3 className="footer-brand">🛍️ Shopez</h3>
        <p className="footer-desc">Your favorite online shopping destination. Quality products, amazing prices, fast delivery.</p>
      </div>
      <div>
        <h4 className="footer-heading">Quick Links</h4>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">Categories</h4>
        <ul className="footer-links">
          <li><Link to="/category/Electronics">Electronics</Link></li>
          <li><Link to="/category/Fashion">Fashion</Link></li>
          <li><Link to="/category/Beauty">Beauty</Link></li>
          <li><Link to="/category/Footwear">Footwear</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">We Accept</h4>
        <div className="payment-icons">
          <span>💳</span><span>🏧</span><span>📱</span><span>💵</span>
        </div>
        <p className="footer-secure">🔒 100% Secure Payments</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 Shopez. All rights reserved. Made with 💖</p>
    </div>
  </footer>
);

export default Footer;