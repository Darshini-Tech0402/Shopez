import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Heart, Star, Eye, Zap } from "lucide-react";
import "./ProductCard.css";

const FALLBACK_IMAGES = {
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop",
  clothing: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop",
  books: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=600&fit=crop",
  home: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&h=600&fit=crop",
  sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=600&fit=crop",
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
  default: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const {
    _id,
    id,
    name,
    price,
    image,
    images,
    rating = 4.2,
    numReviews = 0,
    countInStock,
    discount,
    category,
  } = product;

  const productId = _id || id;

  const getFallback = () =>
    FALLBACK_IMAGES[category?.toLowerCase()] || FALLBACK_IMAGES.default;

  const productImage =
    !imgError && (image || (images && images[0]))
      ? image || images[0]
      : getFallback();

  const discountedPrice = discount
    ? (price * (1 - discount / 100)).toFixed(2)
    : price?.toFixed(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(!wishlist);
  };

  const handleImgError = () => {
    setImgError(true);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(rating) ? "#f59e0b" : "none"}
        color={i < Math.floor(rating) ? "#f59e0b" : "#475569"}
      />
    ));

  return (
    <Link to={`/product/${productId}`} className="pcard">

      {/* Badges */}
      <div className="pcard__badges">
        {discount > 0 && (
          <span className="pcard__badge pcard__badge--discount">
            -{discount}%
          </span>
        )}
        {countInStock === 0 && (
          <span className="pcard__badge pcard__badge--oos">Sold Out</span>
        )}
        {countInStock > 0 && countInStock <= 5 && (
          <span className="pcard__badge pcard__badge--low">
            Only {countInStock} left
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        className={`pcard__wishlist ${wishlist ? "pcard__wishlist--active" : ""}`}
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        <Heart size={15} fill={wishlist ? "#f43f5e" : "none"} />
      </button>

      {/* Image */}
      <div className="pcard__image-wrap">
        <img
          src={productImage}
          alt={name}
          className="pcard__image"
          loading="lazy"
          onError={handleImgError}
        />
        <div className="pcard__image-overlay">
          <span className="pcard__quick-view">
            <Eye size={15} />
            Quick View
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="pcard__body">
        {category && (
          <span className="pcard__category">{category}</span>
        )}
        <h3 className="pcard__name">{name}</h3>

        {/* Rating */}
        <div className="pcard__rating">
          <div className="pcard__stars">{renderStars(rating)}</div>
          <span className="pcard__rating-text">
            {Number(rating).toFixed(1)}
            {numReviews > 0 && (
              <span className="pcard__reviews"> ({numReviews})</span>
            )}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="pcard__footer">
          <div className="pcard__pricing">
            <span className="pcard__price">${discountedPrice}</span>
            {discount > 0 && (
              <span className="pcard__original">${price?.toFixed(2)}</span>
            )}
          </div>
          <button
            className={`pcard__add-btn ${added ? "pcard__add-btn--added" : ""}`}
            onClick={handleAddToCart}
            disabled={countInStock === 0 || added}
            aria-label="Add to cart"
          >
            {added ? <Zap size={15} /> : <ShoppingCart size={15} />}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;