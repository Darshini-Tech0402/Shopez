import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleLink = () => onClose();

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🛍️ Shopez</span>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        {isLoggedIn && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">👤</div>
            <div>
              <p className="sidebar-username">{user?.name}</p>
              <p className="sidebar-email">{user?.email}</p>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          <p className="sidebar-section-title">Main Menu</p>
          <Link to="/" className="sidebar-link" onClick={handleLink}>🏠 Home</Link>
          <Link to="/cart" className="sidebar-link" onClick={handleLink}>
            🛒 Cart {cartCount > 0 && <span className="sidebar-badge">{cartCount}</span>}
          </Link>
          <Link to="/checkout" className="sidebar-link" onClick={handleLink}>💳 Checkout</Link>

          <p className="sidebar-section-title">Categories</p>
          <Link to="/category/Electronics" className="sidebar-link" onClick={handleLink}>📱 Electronics</Link>
          <Link to="/category/Fashion" className="sidebar-link" onClick={handleLink}>👗 Fashion</Link>
          <Link to="/category/Beauty" className="sidebar-link" onClick={handleLink}>💄 Beauty</Link>
          <Link to="/category/Footwear" className="sidebar-link" onClick={handleLink}>👠 Footwear</Link>
          <Link to="/category/Accessories" className="sidebar-link" onClick={handleLink}>💍 Accessories</Link>
          <Link to="/category/Home Decor" className="sidebar-link" onClick={handleLink}>🏠 Home Decor</Link>
          <Link to="/category/Books" className="sidebar-link" onClick={handleLink}>📚 Books</Link>

          <p className="sidebar-section-title">Account</p>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="sidebar-link" onClick={handleLink}>👤 My Profile</Link>
              <button className="sidebar-link sidebar-logout" onClick={handleLogout}>🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="sidebar-link" onClick={handleLink}>🔐 Login</Link>
              <Link to="/signup" className="sidebar-link" onClick={handleLink}>✍️ Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;