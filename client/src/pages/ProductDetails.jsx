import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(id);

  if (!product) return (
    <div className="pd-not-found">
      <h2>Product not found 😕</h2>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="pd-page">
      <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>

      <div className="pd-container">
        <div className="pd-image-section">
          <img src={product.image} alt={product.name} className="pd-image" />
          {discount > 0 && <span className="pd-discount-badge">{discount}% OFF</span>}
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-rating">
            ⭐ <strong>{product.rating}</strong>
            <span>({product.reviews} reviews)</span>
            {product.inStock ? <span className="pd-in-stock">✓ In Stock</span> : <span className="pd-out">Out of Stock</span>}
          </div>

          <p className="pd-desc">{product.description}</p>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString()}</span>
            <span className="pd-original">₹{product.originalPrice.toLocaleString()}</span>
            <span className="pd-save">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
          </div>

          <div className="pd-qty-row">
            <label>Quantity:</label>
            <div className="pd-qty-ctrl">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="pd-cart-btn" onClick={handleAddToCart} disabled={!product.inStock}>
              {added ? '✓ Added!' : '🛒 Add to Cart'}
            </button>
            <button className="pd-buy-btn" onClick={handleBuyNow} disabled={!product.inStock}>
              Buy Now ⚡
            </button>
          </div>

          <div className="pd-features">
            <div className="pd-feature">🚚 Free delivery above ₹1000</div>
            <div className="pd-feature">🔄 Easy 30-day returns</div>
            <div className="pd-feature">🔒 Secure payments</div>
            <div className="pd-feature">💯 100% authentic products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;