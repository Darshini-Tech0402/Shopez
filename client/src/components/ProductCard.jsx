import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        {discount > 0 && <span className="discount-tag">{discount}% OFF</span>}
        <button className="quick-cart-btn" onClick={handleAddToCart}>🛒 Add to Cart</button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-rating">
          ⭐ <strong>{product.rating}</strong>
          <span className="review-count">({product.reviews} reviews)</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <span className="product-original">₹{product.originalPrice.toLocaleString()}</span>
        </div>
        <div className="product-actions">
          <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <Link to={`/product/${product.id}`} className="view-btn" onClick={e => e.stopPropagation()}>View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;