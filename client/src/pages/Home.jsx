import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Shop the Best <span>Deals</span></h1>
          <p>Discover thousands of products across all categories with amazing discounts</p>
          <div className="hero-stats">
            <div className="stat"><strong>10K+</strong><span>Products</span></div>
            <div className="stat"><strong>50K+</strong><span>Customers</span></div>
            <div className="stat"><strong>4.9⭐</strong><span>Rating</span></div>
          </div>
          <Link to="/category/Electronics" className="hero-btn">Shop Now 🛍️</Link>
        </div>
        <div className="hero-emojis">
          <span>👗</span><span>📱</span><span>👠</span><span>💄</span><span>📚</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-row">
          <button className={`cat-btn ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => setSelectedCategory('All')}>
            🛍️ All
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              className={`cat-btn ${selectedCategory === c.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(c.name)}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH + PRODUCTS */}
      <section className="section">
        <div className="products-header">
          <h2 className="section-title">{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
          <input
            className="filter-search"
            type="text"
            placeholder="Search in products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="results-count">{filtered.length} products found</p>
        {filtered.length === 0 ? (
          <div className="no-results">
            <p>😕 No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* PROMO */}
      <section className="promo-section section">
        <div className="promo-card pink">
          <h3>Summer Fashion 👗</h3>
          <p>Up to 50% off on latest trends</p>
          <Link to="/category/Fashion" className="promo-btn">Shop Now</Link>
        </div>
        <div className="promo-card purple">
          <h3>Beauty Essentials 💄</h3>
          <p>Glow up with premium beauty products</p>
          <Link to="/category/Beauty" className="promo-btn">Explore</Link>
        </div>
        <div className="promo-card dark">
          <h3>Tech Deals 📱</h3>
          <p>Latest gadgets at unbeatable prices</p>
          <Link to="/category/Electronics" className="promo-btn">View Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;