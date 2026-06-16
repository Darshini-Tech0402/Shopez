import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products, categories } = useProducts();
  const filtered = products.filter(p => p.category === categoryName);
  const catInfo = categories.find(c => c.name === categoryName);

  return (
    <div className="cat-page">
      <div className="cat-header">
        <h1>{catInfo?.icon} {categoryName}</h1>
        <p>{filtered.length} products found</p>
      </div>

      <div className="cat-tags">
        {categories.map(c => (
          <Link key={c.id} to={`/category/${c.name}`} className={`cat-tag ${c.name === categoryName ? 'active' : ''}`}>
            {c.icon} {c.name}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="cat-empty">
          <p>No products found in this category.</p>
          <Link to="/">Browse All Products</Link>
        </div>
      ) : (
        <div className="cat-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;