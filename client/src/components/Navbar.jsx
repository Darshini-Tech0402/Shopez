import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import './Navbar.css';

const Navbar = ({ onMenuOpen }) => {
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setSearchResults(searchProducts(q).slice(0, 5));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleResultClick = (id) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/product/${id}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button className="hamburger-btn" onClick={onMenuOpen} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>

        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Shopez</span>
        </Link>

        <div className="search-wrapper">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="search-input"
            />
          </div>
          {showResults && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map(p => (
                <div key={p.id} className="search-result-item" onClick={() => handleResultClick(p.id)}>
                  <img src={p.image} alt={p.name} />
                  <div>
                    <p className="result-name">{p.name}</p>
                    <p className="result-price">₹{p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/checkout" className="nav-link">Checkout</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-link">👤 {user?.name?.split(' ')[0]}</Link>
              <button className="nav-logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;