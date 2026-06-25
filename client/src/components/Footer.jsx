import React from "react";
import { Link } from "react-router-dom";
import { Zap, Mail, ArrowRight, Globe, AtSign, Code } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <div className="footer__logo-icon">
              <Zap size={16} />
            </div>
            <span>
              Shop<span className="footer__logo-accent">EZ</span>
            </span>
          </Link>
          <p className="footer__tagline">
            The future of shopping is here. Premium products, seamless
            experience.
          </p>
          <div className="footer__socials">
  <a href="#" className="footer__social" aria-label="Twitter">
    <Globe size={16} />
  </a>
  <a href="#" className="footer__social" aria-label="Instagram">
    <AtSign size={16} />
  </a>
  <a href="#" className="footer__social" aria-label="Github">
    <Code size={16} />
  </a>
  <a href="#" className="footer__social" aria-label="Email">
    <Mail size={16} />
  </a>
</div>
        </div>

        {/* Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Shop</h4>
          <ul className="footer__col-links">
            <li><Link to="/category/all">All Products</Link></li>
            <li><Link to="/category/electronics">Electronics</Link></li>
            <li><Link to="/category/clothing">Fashion</Link></li>
            <li><Link to="/category/books">Books</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Account</h4>
          <ul className="footer__col-links">
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Company</h4>
          <ul className="footer__col-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h4 className="footer__col-title">Stay Updated</h4>
          <p className="footer__newsletter-text">
            Get the latest drops and exclusive deals.
          </p>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="you@example.com"
              className="footer__newsletter-input"
            />
            <button className="footer__newsletter-btn">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} ShopEZ. All rights reserved.
        </p>
        <p className="footer__made">
          Built with{" "}
          <span className="footer__heart">♥</span> for the future
        </p>
      </div>
    </footer>
  );
};

export default Footer;