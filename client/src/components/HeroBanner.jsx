import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Shopez</h1>
        <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
        
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <p>Free Shipping</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💯</span>
            <p>100% Original</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <p>Easy Returns</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <p>Secure Payment</p>
          </div>
        </div>

        <Link to="/" className="cta-button">
          Shop Now 🛍️
        </Link>
      </div>

      <div className="hero-image">
        <div className="hero-products">
          <span className="product-float">👗</span>
          <span className="product-float">👠</span>
          <span className="product-float">💄</span>
          <span className="product-float">📱</span>
          <span className="product-float">🏠</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;