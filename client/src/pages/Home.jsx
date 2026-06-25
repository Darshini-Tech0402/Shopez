import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import {
  ArrowRight, Zap, Star, Shield, Truck, RotateCcw,
  Headphones, TrendingUp, Sparkles, ChevronRight,
} from "lucide-react";
import "./Home.css";

const categories = [
  { name: "Electronics", slug: "electronics", emoji: "⚡", color: "#7C3AED", desc: "Latest tech & gadgets" },
  { name: "Fashion", slug: "clothing", emoji: "👗", color: "#EC4899", desc: "Premium style drops" },
  { name: "Books", slug: "books", emoji: "📚", color: "#14F195", desc: "Knowledge is power" },
  { name: "Home", slug: "home", emoji: "🏠", color: "#00E5FF", desc: "Elevate your space" },
  { name: "Sports", slug: "sports", emoji: "🏋️", color: "#F59E0B", desc: "Gear up & perform" },
  { name: "Beauty", slug: "beauty", emoji: "✨", color: "#F43F5E", desc: "Glow different" },
];

const features = [
  { icon: <Truck size={22} />, title: "Free Shipping", desc: "On all orders over $50", color: "#7C3AED" },
  { icon: <RotateCcw size={22} />, title: "Easy Returns", desc: "30-day hassle-free returns", color: "#00E5FF" },
  { icon: <Shield size={22} />, title: "Secure Payment", desc: "256-bit SSL encryption", color: "#14F195" },
  { icon: <Headphones size={22} />, title: "24/7 Support", desc: "Round the clock help", color: "#F59E0B" },
];

const reviews = [
  { name: "Sarah M.", rating: 5, text: "ShopEZ completely changed how I shop online. The experience is unreal — fast, clean, and the products are legit premium.", avatar: "S", role: "Verified Buyer" },
  { name: "James K.", rating: 5, text: "Ordered a MacBook and it arrived in 2 days. The packaging was insane and the product was perfect. 10/10.", avatar: "J", role: "Verified Buyer" },
  { name: "Priya L.", rating: 5, text: "The UI alone made me want to buy everything. Finally an e-commerce site that actually looks and feels expensive.", avatar: "P", role: "Verified Buyer" },
  { name: "Marcus T.", rating: 4, text: "Great selection, fast delivery. The cart experience is seamless. Will definitely be shopping here again.", avatar: "M", role: "Verified Buyer" },
];

const Home = () => {
  const { getFeaturedProducts, getNewArrivals, getBestSellers, loading } = useProduct();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(8);
  const bestSellers = getBestSellers(4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <div className="home">
      {/* Hero */}
      <HeroBanner />

      {/* Features Strip */}
      <section className="home__features">
        <div className="home__features-inner">
          {features.map((f, i) => (
            <div className="home__feature" key={i}>
              <div className="home__feature-icon" style={{ background: `${f.color}18`, color: f.color, border: `1px solid ${f.color}30` }}>
                {f.icon}
              </div>
              <div>
                <p className="home__feature-title">{f.title}</p>
                <p className="home__feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <div>
              <p className="home__section-eyebrow">Browse by Category</p>
              <h2 className="home__section-title">Shop Your World</h2>
            </div>
            <Link to="/category/all" className="home__see-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home__categories">
            {categories.map((cat) => (
              <Link to={`/category/${cat.slug}`} key={cat.slug} className="home__cat-card">
                <div className="home__cat-emoji" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}>
                  <span>{cat.emoji}</span>
                </div>
                <p className="home__cat-name">{cat.name}</p>
                <p className="home__cat-desc">{cat.desc}</p>
                <div className="home__cat-arrow" style={{ color: cat.color }}>
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="home__section home__section--dark">
        <div className="home__section-inner">
          <div className="home__section-header">
            <div>
              <p className="home__section-eyebrow">
                <Sparkles size={13} /> Handpicked For You
              </p>
              <h2 className="home__section-title">Featured Products</h2>
            </div>
            <Link to="/category/all" className="home__see-all">
              See All <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <div className="home__skeleton-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="home__skeleton-card">
                  <div className="home__skeleton-img" />
                  <div className="home__skeleton-line" />
                  <div className="home__skeleton-line home__skeleton-line--short" />
                </div>
              ))}
            </div>
          ) : (
            <div className="home__products-grid">
              {featured.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="home__promo">
        <div className="home__promo-inner">
          <div className="home__promo-content">
            <div className="home__promo-badge">
              <Zap size={13} /> Limited Time
            </div>
            <h2 className="home__promo-title">
              Flash Sale — Up to <span className="home__promo-accent">60% Off</span>
            </h2>
            <p className="home__promo-sub">
              Exclusive deals on top electronics, fashion, and lifestyle products. Don't miss out.
            </p>
            <Link to="/category/electronics" className="home__promo-btn">
              Shop the Sale <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home__promo-stats">
            <div className="home__promo-stat">
              <span className="home__promo-stat-val">500+</span>
              <span className="home__promo-stat-label">Products on Sale</span>
            </div>
            <div className="home__promo-stat">
              <span className="home__promo-stat-val">24h</span>
              <span className="home__promo-stat-label">Remaining</span>
            </div>
            <div className="home__promo-stat">
              <span className="home__promo-stat-val">Free</span>
              <span className="home__promo-stat-label">Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header">
            <div>
              <p className="home__section-eyebrow">
                <TrendingUp size={13} /> Just Dropped
              </p>
              <h2 className="home__section-title">New Arrivals</h2>
            </div>
            <Link to="/category/all" className="home__see-all">
              See All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home__products-grid">
            {newArrivals.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="home__section home__section--dark">
        <div className="home__section-inner">
          <div className="home__section-header">
            <div>
              <p className="home__section-eyebrow">
                <Star size={13} /> Most Loved
              </p>
              <h2 className="home__section-title">Best Sellers</h2>
            </div>
            <Link to="/category/all" className="home__see-all">
              See All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home__products-grid home__products-grid--4">
            {bestSellers.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="home__section">
        <div className="home__section-inner">
          <div className="home__section-header home__section-header--center">
            <p className="home__section-eyebrow"><Star size={13} /> Social Proof</p>
            <h2 className="home__section-title">What Customers Say</h2>
          </div>
          <div className="home__reviews">
            {reviews.map((r, i) => (
              <div key={i} className="home__review-card">
                <div className="home__review-stars">
                  {Array.from({ length: r.rating }).map((_, si) => (
                    <Star key={si} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="home__review-text">"{r.text}"</p>
                <div className="home__review-author">
                  <div className="home__review-avatar">{r.avatar}</div>
                  <div>
                    <p className="home__review-name">{r.name}</p>
                    <p className="home__review-role">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="home__newsletter">
        <div className="home__newsletter-inner">
          <div className="home__newsletter-glow" />
          <p className="home__section-eyebrow"><Sparkles size={13} /> Stay in the Loop</p>
          <h2 className="home__newsletter-title">Get Exclusive Deals First</h2>
          <p className="home__newsletter-sub">
            Join 50,000+ shoppers who get early access to sales, new arrivals, and members-only discounts.
          </p>
          {subscribed ? (
            <div className="home__newsletter-success">
              <Zap size={18} /> You're in! Watch your inbox for exclusive deals.
            </div>
          ) : (
            <form className="home__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="home__newsletter-input"
                required
              />
              <button type="submit" className="home__newsletter-btn">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}
          <p className="home__newsletter-note">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;