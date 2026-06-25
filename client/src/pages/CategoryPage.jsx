import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import "./CategoryPage.css";

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const CategoryPage = () => {
  const { category } = useParams();
  const {
    getProductsByCategory, allProducts, sortBy,
    setSortBy, loading,
  } = useProduct();

  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [localSort, setLocalSort] = useState("default");

  const isAll = !category || category === "all";
  const raw = isAll ? allProducts : getProductsByCategory(category);

  const products = [...raw]
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (localSort === "price-asc") return a.price - b.price;
      if (localSort === "price-desc") return b.price - a.price;
      if (localSort === "rating") return (b.rating || 0) - (a.rating || 0);
      if (localSort === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return 0;
    });

  const pageTitle = isAll ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => { window.scrollTo(0, 0); }, [category]);

  return (
    <div className="catpage">
      {/* Header */}
      <div className="catpage__header">
        <div className="catpage__header-inner">
          <div>
            <p className="catpage__eyebrow">Browse</p>
            <h1 className="catpage__title">{pageTitle}</h1>
            <p className="catpage__count">{products.length} product{products.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="catpage__controls">
            <button className="catpage__filter-btn" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={16} />
              Filters
              {showFilters && <X size={14} />}
            </button>
            <div className="catpage__sort-wrap">
              <ChevronDown size={14} className="catpage__sort-icon" />
              <select
                className="catpage__sort"
                value={localSort}
                onChange={(e) => setLocalSort(e.target.value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="catpage__filters">
          <div className="catpage__filters-inner">
            <div className="catpage__filter-group">
              <label className="catpage__filter-label">Max Price: ${maxPrice.toLocaleString()}</label>
              <input
                type="range" min={0} max={10000} step={50}
                value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="catpage__range"
              />
              <div className="catpage__range-labels">
                <span>$0</span><span>$10,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="catpage__body">
        <div className="catpage__inner">
          {loading ? (
            <div className="catpage__grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="catpage__skeleton">
                  <div className="catpage__skeleton-img" />
                  <div className="catpage__skeleton-line" />
                  <div className="catpage__skeleton-line catpage__skeleton-line--short" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="catpage__empty">
              <p className="catpage__empty-title">No products found</p>
              <p className="catpage__empty-sub">Try adjusting your filters or browse all products.</p>
            </div>
          ) : (
            <div className="catpage__grid">
              {products.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;