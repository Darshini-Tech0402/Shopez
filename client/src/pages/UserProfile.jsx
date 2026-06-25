import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User, Package, Settings, LogOut, Edit2,
  Check, X, Shield, Mail, Phone,
} from "lucide-react";
import "./UserProfile.css";

const tabs = [
  { id: "profile", label: "Profile", icon: <User size={16} /> },
  { id: "orders", label: "Orders", icon: <Package size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
];

const mockOrders = [
  { id: "#ORD-001", date: "Jun 12, 2025", total: "$349.99", status: "Delivered", items: 2 },
  { id: "#ORD-002", date: "Jun 5, 2025", total: "$129.00", status: "Shipped", items: 1 },
  { id: "#ORD-003", date: "May 28, 2025", total: "$799.99", status: "Processing", items: 3 },
];

const statusColor = {
  Delivered: { bg: "rgba(20,241,149,0.1)", color: "#14f195", border: "rgba(20,241,149,0.2)" },
  Shipped: { bg: "rgba(0,229,255,0.1)", color: "#00e5ff", border: "rgba(0,229,255,0.2)" },
  Processing: { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "rgba(245,158,11,0.2)" },
  Cancelled: { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.2)" },
};

const UserProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "" });
  const [saved, setSaved] = useState(false);

  if (!user) { navigate("/login"); return null; }

  const handleSave = () => {
    updateUser({ name: form.name, email: form.email });
    setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="profile">
      <div className="profile__inner">
        {/* Sidebar */}
        <aside className="profile__sidebar">
          <div className="profile__user-card">
            <div className="profile__avatar-wrap">
              <div className="profile__avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="profile__avatar-ring" />
            </div>
            <h3 className="profile__user-name">{user.name}</h3>
            <p className="profile__user-email">{user.email}</p>
            {user.isAdmin && (
              <span className="profile__admin-badge">
                <Shield size={12} /> Admin
              </span>
            )}
          </div>

          <nav className="profile__nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`profile__nav-btn ${activeTab === tab.id ? "profile__nav-btn--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <button className="profile__nav-btn profile__nav-btn--danger" onClick={handleLogout}>
              <LogOut size={16} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile__main">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile__content">
              <div className="profile__content-header">
                <h2 className="profile__content-title">My Profile</h2>
                {!editing ? (
                  <button className="profile__edit-btn" onClick={() => setEditing(true)}>
                    <Edit2 size={15} /> Edit
                  </button>
                ) : (
                  <div className="profile__edit-actions">
                    <button className="profile__save-btn" onClick={handleSave}>
                      <Check size={15} /> Save
                    </button>
                    <button className="profile__cancel-btn" onClick={() => setEditing(false)}>
                      <X size={15} />
                    </button>
                  </div>
                )}
              </div>

              {saved && (
                <div className="profile__saved-msg">
                  <Check size={15} /> Profile updated successfully!
                </div>
              )}

              <div className="profile__fields">
                <div className="profile__field">
                  <label><User size={14} /> Full Name</label>
                  {editing ? (
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="profile__input" />
                  ) : (
                    <p className="profile__field-val">{user.name}</p>
                  )}
                </div>
                <div className="profile__field">
                  <label><Mail size={14} /> Email Address</label>
                  {editing ? (
                    <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="profile__input" type="email" />
                  ) : (
                    <p className="profile__field-val">{user.email}</p>
                  )}
                </div>
                <div className="profile__field">
                  <label><Phone size={14} /> Phone Number</label>
                  {editing ? (
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="profile__input" placeholder="+1 234 567 8900" />
                  ) : (
                    <p className="profile__field-val profile__field-val--empty">Not provided</p>
                  )}
                </div>
              </div>

              <div className="profile__stats">
                {[["0","Orders"],["0","Wishlist"],["0","Reviews"]].map(([v,l]) => (
                  <div key={l} className="profile__stat">
                    <span className="profile__stat-val">{v}</span>
                    <span className="profile__stat-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="profile__content">
              <div className="profile__content-header">
                <h2 className="profile__content-title">My Orders</h2>
              </div>
              {mockOrders.length === 0 ? (
                <div className="profile__empty">
                  <Package size={40} />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="profile__orders">
                  {mockOrders.map((order) => {
                    const sc = statusColor[order.status] || statusColor.Processing;
                    return (
                      <div key={order.id} className="profile__order-card">
                        <div className="profile__order-left">
                          <p className="profile__order-id">{order.id}</p>
                          <p className="profile__order-date">{order.date} · {order.items} item{order.items !== 1 ? "s" : ""}</p>
                        </div>
                        <div className="profile__order-right">
                          <p className="profile__order-total">{order.total}</p>
                          <span className="profile__order-status" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="profile__content">
              <div className="profile__content-header">
                <h2 className="profile__content-title">Settings</h2>
              </div>
              <div className="profile__settings">
                {[
                  { label: "Email Notifications", desc: "Receive order updates via email", defaultOn: true },
                  { label: "SMS Alerts", desc: "Get shipping notifications via SMS", defaultOn: false },
                  { label: "Promotional Emails", desc: "Receive deals and new arrivals", defaultOn: true },
                  { label: "Two-Factor Auth", desc: "Add extra security to your account", defaultOn: false },
                ].map((s) => (
                  <div key={s.label} className="profile__setting-row">
                    <div>
                      <p className="profile__setting-label">{s.label}</p>
                      <p className="profile__setting-desc">{s.desc}</p>
                    </div>
                    <label className="profile__toggle">
                      <input type="checkbox" defaultChecked={s.defaultOn} />
                      <span className="profile__toggle-slider" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="profile__danger-zone">
                <h3 className="profile__danger-title">Danger Zone</h3>
                <button className="profile__delete-btn">Delete Account</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;