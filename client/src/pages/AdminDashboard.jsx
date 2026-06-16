import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [localProducts, setLocalProducts] = useState(products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', price: '', originalPrice: '', description: '', image: '', rating: '4.5', inStock: true });

  if (!isLoggedIn) return (
    <div className="admin-login-prompt">
      <h2>🔐 Admin Access Required</h2>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );

  const handleForm = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setLocalProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), rating: Number(form.rating) } : p));
      setEditingProduct(null);
    } else {
      const newProduct = { ...form, id: Date.now(), price: Number(form.price), originalPrice: Number(form.originalPrice), rating: Number(form.rating), reviews: 0 };
      setLocalProducts(prev => [...prev, newProduct]);
    }
    setForm({ name: '', category: '', price: '', originalPrice: '', description: '', image: '', rating: '4.5', inStock: true });
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({ name: product.name, category: product.category, price: product.price, originalPrice: product.originalPrice, description: product.description, image: product.image, rating: product.rating, inStock: product.inStock });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) setLocalProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🛠️ Admin Dashboard</h1>
        <button className="admin-add-btn" onClick={() => { setShowForm(!showForm); setEditingProduct(null); setForm({ name: '', category: '', price: '', originalPrice: '', description: '', image: '', rating: '4.5', inStock: true }); }}>
          {showForm ? '✕ Close' : '+ Add Product'}
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat"><span>📦</span><strong>{localProducts.length}</strong><p>Total Products</p></div>
        <div className="admin-stat"><span>✅</span><strong>{localProducts.filter(p => p.inStock).length}</strong><p>In Stock</p></div>
        <div className="admin-stat"><span>💰</span><strong>₹{Math.min(...localProducts.map(p => p.price)).toLocaleString()}</strong><p>Min Price</p></div>
        <div className="admin-stat"><span>💎</span><strong>₹{Math.max(...localProducts.map(p => p.price)).toLocaleString()}</strong><p>Max Price</p></div>
      </div>

      {showForm && (
        <div className="admin-form-card">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-field"><label>Product Name *</label><input name="name" value={form.name} onChange={handleForm} placeholder="Product name" required /></div>
              <div className="admin-field"><label>Category *</label>
                <select name="category" value={form.category} onChange={handleForm} required>
                  <option value="">Select category</option>
                  {['Electronics', 'Fashion', 'Beauty', 'Footwear', 'Accessories', 'Home Decor', 'Books'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-field"><label>Price (₹) *</label><input name="price" type="number" value={form.price} onChange={handleForm} placeholder="1999" required /></div>
              <div className="admin-field"><label>Original Price (₹) *</label><input name="originalPrice" type="number" value={form.originalPrice} onChange={handleForm} placeholder="2999" required /></div>
              <div className="admin-field"><label>Rating</label><input name="rating" type="number" min="1" max="5" step="0.1" value={form.rating} onChange={handleForm} /></div>
              <div className="admin-field"><label>Image URL</label><input name="image" value={form.image} onChange={handleForm} placeholder="https://..." /></div>
              <div className="admin-field admin-field-full"><label>Description *</label><textarea name="description" value={form.description} onChange={handleForm} placeholder="Product description" rows={3} required /></div>
              <div className="admin-field"><label className="admin-checkbox"><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleForm} /> In Stock</label></div>
            </div>
            <button type="submit" className="admin-submit-btn">{editingProduct ? 'Update Product' : 'Add Product'}</button>
          </form>
        </div>
      )}

      <div className="admin-products-table">
        <table>
          <thead>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Rating</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {localProducts.map(p => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.name} className="admin-product-img" /></td>
                <td className="admin-product-name">{p.name}</td>
                <td><span className="admin-category-tag">{p.category}</span></td>
                <td><strong>₹{p.price.toLocaleString()}</strong></td>
                <td>⭐ {p.rating}</td>
                <td><span className={`admin-stock ${p.inStock ? 'in' : 'out'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                <td>
                  <div className="admin-actions">
                    <button className="edit-btn" onClick={() => handleEdit(p)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;