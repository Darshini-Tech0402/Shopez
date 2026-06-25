import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import {
  ShoppingBag, Search, User, Menu, X,
  ChevronDown, LogOut, Package, Settings, Zap,
} from "lucide-react";
import "./Navbar.css";

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { setSearchQuery } = useProduct();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    navigate("/");
    setSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/category/all", label: "Products" },
    { to: "/category/electronics", label: "Electronics" },
    { to: "/category/clothing", label: "Fashion" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <Zap size={18} />
            </div>
            <span className="navbar__logo-text">
              Shop<span className="navbar__logo-accent">EZ</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar__link ${
                    location.pathname === link.to ? "navbar__link--active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">

            {/* Search */}
            <div className="navbar__search-wrap" ref={searchRef}>
              <button
                className="navbar__icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <div className={`navbar__search-dropdown ${searchOpen ? "navbar__search-dropdown--open" : ""}`}>
                <form onSubmit={handleSearch} className="navbar__search-form">
                  <Search size={16} className="navbar__search-icon" />
                  <input
                    autoFocus={searchOpen}
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="navbar__search-input"
                  />
                  <button type="submit" className="navbar__search-btn">Go</button>
                </form>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="navbar__icon-btn navbar__cart-btn">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="navbar__cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* Profile OR Auth Buttons */}
            {user ? (
              <div className="navbar__profile-wrap" ref={profileRef}>
                <button
                  className="navbar__profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="navbar__avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`navbar__chevron ${profileOpen ? "navbar__chevron--open" : ""}`}
                  />
                </button>
                <div className={`navbar__dropdown ${profileOpen ? "navbar__dropdown--open" : ""}`}>
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{user.name}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>
                  <div className="navbar__dropdown-divider" />
                  <Link to="/profile" className="navbar__dropdown-item">
                    <User size={15} /> Profile
                  </Link>
                  <Link to="/orders" className="navbar__dropdown-item">
                    <Package size={15} /> Orders
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="navbar__dropdown-item">
                      <Settings size={15} /> Admin
                    </Link>
                  )}
                  <div className="navbar__dropdown-divider" />
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              /* LOGIN + SIGNUP BUTTONS SIDE BY SIDE */
              <div className="navbar__auth-btns">
                <Link to="/login" className="navbar__login-btn navbar__login-btn--outline">
                  Login
                </Link>
                <Link to="/signup" className="navbar__login-btn">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="navbar__hamburger"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (onMenuToggle) onMenuToggle(!mobileMenuOpen);
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileMenuOpen ? "navbar__mobile-menu--open" : ""}`}>
        <div className="navbar__mobile-inner">
          <form onSubmit={handleSearch} className="navbar__mobile-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          <ul className="navbar__mobile-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="navbar__mobile-link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cart" className="navbar__mobile-link">
                Cart{cartCount > 0 && ` (${cartCount})`}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="navbar__mobile-link">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="navbar__mobile-link">
                    Orders
                  </Link>
                </li>
                {user.isAdmin && (
                  <li>
                    <Link to="/admin" className="navbar__mobile-link">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    className="navbar__mobile-link navbar__mobile-logout"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="navbar__mobile-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="navbar__mobile-link navbar__mobile-signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;