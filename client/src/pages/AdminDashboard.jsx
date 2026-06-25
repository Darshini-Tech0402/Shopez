import React, { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Package, TrendingUp, Users, DollarSign,
  Plus, Edit2, Trash2, X, Check, Search,
  BarChart2, ShoppingBag,
} from "lucide-react";
import "./AdminDashboard.css";

const stats = [
  { label: "Total Revenue", value: "$48,295", change: "+12.5%", icon: <DollarSign size={20} />, color: "#14F195" },
  { label: "Total Orders", value: "1,284", change: "+8.2%", icon: <ShoppingBag size={20} />, color: "#7C3AED" },
  { label: "Total Products", value: "38", change: "+4", icon: <Package size={20} />, color: "#00E5FF" },
  { label: "Total Customers", value: "3,921", change: "+18.7%", icon: <Users size={20} />, color: "#F59E0B" },
];

const AdminDashboard = () => {
  const { allProducts, addProduct, updateProduct, deleteProduct } = useProduct();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [form, setForm] = useState({
    name: "", price: "", category: "", image: "",
    description: "", countInStock: "", discount: "", brand: "",
  });

  if (!user?.isAdmin) { navigate("/"); return null; }

  const filtered = allProducts.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name:"",price:"",category:"",image:"",description:"",countInStock:"",discount:"",brand:"" });
    setEditingProduct(null); setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name || "", price: p.price || "", category: p.category || "",
      image: p.image || "", description: p.description || "",
      countInStock: p.countInStock || "", discount: p.discount || "", brand: p.brand || "",
    });
    setEditingProduct(p); setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const productData = { ...form, price: parseFloat(form.price), countInStock: parseInt(form.countInStock) || 0, discount: parseInt(form.discount) || 0 };
    if (editingProduct) {
      updateProduct(editingProduct._id || editingProduct.id, productData);
    } else {
      addProduct({ ...productData, _id: Date.now().toString(), id: Date.now().toString(), rating: 4.5, numReviews: 0, createdAt: new Date().toISOString() });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id); setConfirmDelete(null);
  };

  return (
    <div className="admin">
      <div className="admin__inner">
        {/* Header */}
        <div className="admin__header">
          <div>
            <p className="admin__eyebrow">Admin Panel</p>
            <h1 className="admin__title">Dashboard</h1>
          </div>
          <button className="admin__add-btn" onClick={openAdd}>
            <Plus size={17} /> Add Product
          </button>
        </div>

        {/* Tabs */}
        <div className="admin__tabs">
          {[
            { id: "overview", label: "Overview", icon: <BarChart2 size={16} /> },
            { id: "products", label: "Products", icon: <Package size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`admin__tab ${activeTab === tab.id ? "admin__tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            <div className="admin__stats">
              {stats.map((s) => (
                <div key={s.label} className="admin__stat-card">
                  <div className="admin__stat-icon" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                    {s.icon}
                  </div>
                  <div className="admin__stat-info">
                    <p className="admin__stat-label">{s.label}</p>
                    <p className="admin__stat-value">{s.value}</p>
                    <p className="admin__stat-change">{s.change} this month</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin__overview-grid">
              <div className="admin__card">
                <h3 className="admin__card-title">Recent Activity</h3>
                {[
                  { action: "New order placed", detail: "#ORD-1284 — $349.99", time: "2 min ago", color: "#14f195" },
                  { action: "Product updated", detail: "MacBook Pro M3", time: "15 min ago", color: "#00e5ff" },
                  { action: "New customer", detail: "sarah@example.com", time: "1h ago", color: "#a855f7" },
                  { action: "Order shipped", detail: "#ORD-1281 — $129.00", time: "3h ago", color: "#f59e0b" },
                ].map((item, i) => (
                  <div key={i} className="admin__activity-item">
                    <div className="admin__activity-dot" style={{ background: item.color }} />
                    <div>
                      <p className="admin__activity-action">{item.action}</p>
                      <p className="admin__activity-detail">{item.detail}</p>
                    </div>
                    <span className="admin__activity-time">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="admin__card">
                <h3 className="admin__card-title">Top Categories</h3>
                {[
                  { name: "Electronics", pct: 42, color: "#7c3aed" },
                  { name: "Clothing", pct: 28, color: "#ec4899" },
                  { name: "Home", pct: 15, color: "#00e5ff" },
                  { name: "Books", pct: 10, color: "#14f195" },
                  { name: "Sports", pct: 5, color: "#f59e0b" },
                ].map((cat) => (
                  <div key={cat.name} className="admin__cat-row">
                    <span className="admin__cat-name">{cat.name}</span>
                    <div className="admin__cat-bar-wrap">
                      <div className="admin__cat-bar" style={{ width: `${cat.pct}%`, background: cat.color }} />
                    </div>
                    <span className="admin__cat-pct">{cat.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Products */}
        {activeTab === "products" && (
          <div className="admin__products">
            <div className="admin__products-header">
              <div className="admin__search-wrap">
                <Search size={15} className="admin__search-icon" />
                <input
                  type="text" placeholder="Search products..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  className="admin__search"
                />
              </div>
              <p className="admin__products-count">{filtered.length} products</p>
            </div>

            <div className="admin__table-wrap">
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p._id || p.id}>
                      <td>
                        <div className="admin__product-cell">
                          <img
                            src={p.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop"}
                            alt={p.name}
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop"; }}
                          />
                          <span>{p.name?.length > 35 ? p.name.slice(0, 35) + "…" : p.name}</span>
                        </div>
                      </td>
                      <td><span className="admin__cat-tag">{p.category}</span></td>
                      <td><span className="admin__price">${p.price?.toFixed(2)}</span></td>
                      <td>
                        <span className={`admin__stock-tag ${p.countInStock === 0 ? "admin__stock-tag--out" : p.countInStock <= 5 ? "admin__stock-tag--low" : "admin__stock-tag--in"}`}>
                          {p.countInStock === 0 ? "Out" : p.countInStock}
                        </span>
                      </td>
                      <td><span className="admin__rating">★ {p.rating?.toFixed(1)}</span></td>
                      <td>
                        <div className="admin__row-actions">
                          <button className="admin__edit-btn" onClick={() => openEdit(p)}>
                            <Edit2 size={14} />
                          </button>
                          <button className="admin__del-btn" onClick={() => setConfirmDelete(p._id || p.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="admin__modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin__modal-header">
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button className="admin__modal-close" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="admin__modal-body">
              <div className="admin__modal-grid">
                {[
                  { key: "name", label: "Product Name", placeholder: "e.g. iPhone 15 Pro" },
                  { key: "price", label: "Price ($)", placeholder: "e.g. 999.99", type: "number" },
                  { key: "category", label: "Category", placeholder: "e.g. electronics" },
                  { key: "brand", label: "Brand", placeholder: "e.g. Apple" },
                  { key: "countInStock", label: "Stock Quantity", placeholder: "e.g. 50", type: "number" },
                  { key: "discount", label: "Discount (%)", placeholder: "e.g. 10", type: "number" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key} className="admin__modal-field">
                    <label>{label}</label>
                    <input
                      type={type || "text"} placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <div className="admin__modal-field admin__modal-field--full">
                <label>Image URL</label>
                <input
                  type="text" placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div className="admin__modal-field admin__modal-field--full">
                <label>Description</label>
                <textarea
                  rows={3} placeholder="Product description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
            <div className="admin__modal-footer">
              <button className="admin__modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin__modal-save" onClick={handleSave}>
                <Check size={16} /> {editingProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="admin__modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="admin__confirm" onClick={(e) => e.stopPropagation()}>
            <div className="admin__confirm-icon"><Trash2 size={28} /></div>
            <h3>Delete Product?</h3>
            <p>This action cannot be undone.</p>
            <div className="admin__confirm-actions">
              <button className="admin__confirm-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="admin__confirm-delete" onClick={() => handleDelete(confirmDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;