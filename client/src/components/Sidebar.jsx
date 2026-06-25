import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  Home,
  Package,
  Tag,
  ShoppingBag,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  const links = user
    ? [
        { to: "/", icon: <Home size={18} />, label: "Home" },
        { to: "/category/all", icon: <Package size={18} />, label: "Products" },
        { to: "/category/electronics", icon: <Tag size={18} />, label: "Electronics" },
        {
          to: "/cart",
          icon: <ShoppingBag size={18} />,
          label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}`,
        },
        { to: "/profile", icon: <User size={18} />, label: "Profile" },
        { to: "/orders", icon: <Package size={18} />, label: "My Orders" },
        ...(user.isAdmin
          ? [{ to: "/admin", icon: <Settings size={18} />, label: "Admin Dashboard" }]
          : []),
      ]
    : [
        { to: "/", icon: <Home size={18} />, label: "Home" },
        { to: "/category/all", icon: <Package size={18} />, label: "Products" },
        { to: "/cart", icon: <ShoppingBag size={18} />, label: "Cart" },
        { to: "/login", icon: <LogIn size={18} />, label: "Sign In" },
        { to: "/signup", icon: <UserPlus size={18} />, label: "Create Account" },
      ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <span className="sidebar__brand">Menu</span>
          <button className="sidebar__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="sidebar__user-name">{user.name}</p>
              <p className="sidebar__user-email">{user.email}</p>
            </div>
          </div>
        )}

        <nav className="sidebar__nav">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="sidebar__link"
              onClick={onClose}
            >
              <span className="sidebar__link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {user && (
          <div className="sidebar__footer">
            <button className="sidebar__logout" onClick={handleLogout}>
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        )}
      </aside>

      {isOpen && <div className="sidebar__backdrop" onClick={onClose} />}
    </>
  );
};

export default Sidebar;