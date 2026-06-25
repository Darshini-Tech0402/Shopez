import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShoppingBag, Star, Zap, TrendingUp } from "lucide-react";
import "./HeroBanner.css";

const slides = [
  {
    id: 1,
    eyebrow: "New Season Drop",
    headline: "Shop the",
    headlineAccent: "Future.",
    sub: "Discover premium products curated for those who refuse to settle. Free shipping on orders over $50.",
    cta: "Explore Collection",
    ctaLink: "/category/all",
    badge: "🔥 500+ New Arrivals",
    stat1: { value: "50K+", label: "Happy Customers" },
    stat2: { value: "4.9★", label: "Average Rating" },
    stat3: { value: "Free", label: "Returns" },
    accent: "#7C3AED",
    accentAlt: "#00E5FF",
  },
  {
    id: 2,
    eyebrow: "Limited Time Deal",
    headline: "Up to",
    headlineAccent: "60% Off.",
    sub: "Flash sale on top electronics, fashion, and more. Deals this good don't last — grab yours before they're gone.",
    cta: "Shop Deals",
    ctaLink: "/category/electronics",
    badge: "⚡ Ends in 24h",
    stat1: { value: "200+", label: "Brands" },
    stat2: { value: "24/7", label: "Support" },
    stat3: { value: "Fast", label: "Delivery" },
    accent: "#A855F7",
    accentAlt: "#14F195",
  },
  {
    id: 3,
    eyebrow: "Premium Fashion",
    headline: "Wear What",
    headlineAccent: "Defines You.",
    sub: "Exclusive drops from top designers. Style that speaks louder than words — arrive in looks that turn heads.",
    cta: "Shop Fashion",
    ctaLink: "/category/clothing",
    badge: "✨ Designer Picks",
    stat1: { value: "1000+", label: "Styles" },
    stat2: { value: "New", label: "Weekly Drops" },
    stat3: { value: "Easy", label: "Returns" },
    accent: "#00E5FF",
    accentAlt: "#A855F7",
  },
];

const floatingCards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
    name: "Premium Watch",
    price: "$299",
    rating: "4.9",
    delay: "0s",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=120&h=120&fit=crop",
    name: "Wireless Buds",
    price: "$159",
    rating: "4.8",
    delay: "0.4s",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=120&h=120&fit=crop",
    name: "Running Shoes",
    price: "$189",
    rating: "4.7",
    delay: "0.8s",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const goToNext = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="hero">
      {/* Background Effects */}
      <div className="hero__bg">
        <div
          className="hero__orb hero__orb--1"
          style={{ background: `radial-gradient(circle, ${slide.accent}30 0%, transparent 70%)` }}
        />
        <div
          className="hero__orb hero__orb--2"
          style={{ background: `radial-gradient(circle, ${slide.accentAlt}20 0%, transparent 70%)` }}
        />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">
        {/* Left: Content */}
        <div className={`hero__content ${animating ? "hero__content--out" : "hero__content--in"}`}>
          {/* Badge */}
          <div className="hero__badge">
            <Sparkles size={13} />
            <span>{slide.badge}</span>
          </div>

          {/* Eyebrow */}
          <p className="hero__eyebrow">{slide.eyebrow}</p>

          {/* Headline */}
          <h1 className="hero__headline">
            {slide.headline}{" "}
            <span
              className="hero__headline-accent"
              style={{
                background: `linear-gradient(135deg, ${slide.accent}, ${slide.accentAlt})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {slide.headlineAccent}
            </span>
          </h1>

          {/* Sub */}
          <p className="hero__sub">{slide.sub}</p>

          {/* CTAs */}
          <div className="hero__ctas">
            <Link to={slide.ctaLink} className="hero__cta-primary">
              <ShoppingBag size={18} />
              {slide.cta}
              <ArrowRight size={16} />
            </Link>
            <Link to="/category/all" className="hero__cta-secondary">
              View All
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {[slide.stat1, slide.stat2, slide.stat3].map((stat, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Floating Cards */}
        <div className="hero__visual">
          <div className="hero__cards-wrap">
            {floatingCards.map((card) => (
              <div
                key={card.id}
                className="hero__float-card"
                style={{ animationDelay: card.delay }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="hero__float-card-img"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop";
                  }}
                />
                <div className="hero__float-card-info">
                  <p className="hero__float-card-name">{card.name}</p>
                  <div className="hero__float-card-row">
                    <span className="hero__float-card-price">{card.price}</span>
                    <span className="hero__float-card-rating">
                      <Star size={11} fill="#f59e0b" color="#f59e0b" />
                      {card.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Center Badge */}
            <div className="hero__center-badge">
              <TrendingUp size={20} color="#14F195" />
              <span className="hero__center-badge-text">Trending</span>
              <span className="hero__center-badge-sub">This Week</span>
            </div>

            {/* Floating Pill */}
            <div className="hero__pill">
              <Zap size={12} color="#00E5FF" />
              <span>Flash Deal Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="hero__scroll-hint">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroBanner;