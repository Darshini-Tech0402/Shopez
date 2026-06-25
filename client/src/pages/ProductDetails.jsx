import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import {
  ShoppingCart, Heart, Star, Shield, Truck, RotateCcw,
  ChevronLeft, Plus, Minus, Zap, Check, Share2,
} from "lucide-react";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getProductsByCategory } = useProduct();
  const { addToCart, isInCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const product = getProductById(id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) {
    return (
      <div className="pd-notfound">
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)} className="pd-back-btn">
          <ChevronLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  const {
    name, price, description, category,
    rating = 4.5, numReviews = 0, countInStock,
    discount, brand, image, images,
  } = product;

  const productImage = !imgError && (image || (images && images[0]))
    ? image || images[0]
    : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

  const discountedPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : price?.toFixed(2);
  const related = getProductsByCategory(category).filter(
    (p) => (p._id || p.id) !== id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const renderStars = (r) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16}
        fill={i < Math.floor(r) ? "#f59e0b" : "none"}
        color={i < Math.floor(r) ? "#f59e0b" : "#334155"}
      />
    ));

  return (
    <div className="pd">
      {/* Breadcrumb */}
      <div className="pd__breadcrumb">
        <div className="pd__breadcrumb-inner">
          <button onClick={() => navigate(-1)} className="pd__back">
            <ChevronLeft size={16} /> Back
          </button>
          <span className="pd__breadcrumb-sep">/</span>
          <span className="pd__breadcrumb-cat">{category}</span>
          <span className="pd__breadcrumb-sep">/</span>
          <span className="pd__breadcrumb-name">{name}</span>
        </div>
      </div>

      <div className="pd__inner">
        {/* Left: Image */}
        <div className="pd__gallery">
          <div className="pd__img-wrap">
            {discount && <span className="pd__discount-badge">-{discount}%</span>}
            <img
              src={productImage}
              alt={name}
              className="pd__img"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="pd__thumbnails">
            {[productImage, productImage, productImage].map((img, i) => (
              <div key={i} className={`pd__thumb ${i === 0 ? "pd__thumb--active" : ""}`}>
                <img src={img} alt={`View ${i + 1}`} onError={() => setImgError(true)} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="pd__info">
          {brand && <span className="pd__brand">{brand}</span>}
          <h1 className="pd__name">{name}</h1>

          {/* Rating */}
          <div className="pd__rating">
            <div className="pd__stars">{renderStars(rating)}</div>
            <span className="pd__rating-val">{rating?.toFixed(1)}</span>
            <span className="pd__rating-count">({numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="pd__price-wrap">
            <span className="pd__price">${discountedPrice}</span>
            {discount && (
              <>
                <span className="pd__original">${price?.toFixed(2)}</span>
                <span className="pd__save">Save {discount}%</span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className={`pd__stock ${countInStock === 0 ? "pd__stock--out" : countInStock <= 5 ? "pd__stock--low" : "pd__stock--in"}`}>
            {countInStock === 0
              ? "Out of Stock"
              : countInStock <= 5
              ? `Only ${countInStock} left in stock`
              : "In Stock — Ready to Ship"}
          </div>

          {/* Quantity */}
          {countInStock > 0 && (
            <div className="pd__qty-wrap">
              <span className="pd__qty-label">Quantity</span>
              <div className="pd__qty">
                <button className="pd__qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} />
                </button>
                <span className="pd__qty-val">{quantity}</span>
                <button className="pd__qty-btn" onClick={() => setQuantity(Math.min(countInStock, quantity + 1))}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pd__actions">
            <button
              className={`pd__add-btn ${added ? "pd__add-btn--added" : ""}`}
              onClick={handleAddToCart}
              disabled={countInStock === 0 || added}
            >
              {added ? <><Check size={18} /> Added to Cart</> : <><ShoppingCart size={18} /> Add to Cart</>}
            </button>
            <button
              className={`pd__wishlist-btn ${wishlist ? "pd__wishlist-btn--active" : ""}`}
              onClick={() => setWishlist(!wishlist)}
            >
              <Heart size={18} fill={wishlist ? "#f43f5e" : "none"} />
            </button>
            <button className="pd__share-btn">
              <Share2 size={18} />
            </button>
          </div>

          {/* Buy Now */}
          {countInStock > 0 && (
            <button className="pd__buy-now" onClick={() => { handleAddToCart(); navigate("/cart"); }}>
              <Zap size={17} /> Buy Now
            </button>
          )}

          {/* Guarantees */}
          <div className="pd__guarantees">
            <div className="pd__guarantee">
              <Truck size={16} color="#14f195" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="pd__guarantee">
              <RotateCcw size={16} color="#00e5ff" />
              <span>30-day hassle-free returns</span>
            </div>
            <div className="pd__guarantee">
              <Shield size={16} color="#a855f7" />
              <span>2-year warranty included</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="pd__tabs">
            {["description", "specs", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`pd__tab ${activeTab === tab ? "pd__tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="pd__tab-content">
            {activeTab === "description" && (
              <p className="pd__description">{description || "Premium quality product with exceptional craftsmanship and attention to detail."}</p>
            )}
            {activeTab === "specs" && (
              <div className="pd__specs">
                {[
                  ["Brand", brand || "ShopEZ"],
                  ["Category", category],
                  ["Stock", countInStock > 0 ? `${countInStock} units` : "Out of Stock"],
                  ["Rating", `${rating?.toFixed(1)} / 5.0`],
                  ["Reviews", `${numReviews} customer reviews`],
                ].map(([k, v]) => (
                  <div key={k} className="pd__spec-row">
                    <span className="pd__spec-key">{k}</span>
                    <span className="pd__spec-val">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="pd__reviews-tab">
                <div className="pd__reviews-summary">
                  <div className="pd__reviews-score">{rating?.toFixed(1)}</div>
                  <div>
                    <div className="pd__stars">{renderStars(rating)}</div>
                    <p className="pd__reviews-count">Based on {numReviews} reviews</p>
                  </div>
                </div>
                <p className="pd__reviews-note">Detailed reviews coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pd__related">
          <div className="pd__related-inner">
            <h2 className="pd__related-title">You Might Also Like</h2>
            <div className="pd__related-grid">
              {related.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;