import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Eye, EyeOff, Zap, ArrowRight,
  Mail, Lock, User, Phone, MapPin,
} from "lucide-react";
import "./Signup.css";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match. Please try again.");
      return;
    }

    setLoading(true);
    const result = await signup(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth">
      {/* Left Panel */}
      <div className="auth__left">
        <div className="auth__left-glow" />
        <div className="auth__left-content">
          <Link to="/" className="auth__logo">
            <div className="auth__logo-icon">
              <Zap size={20} />
            </div>
            Shop<span>EZ</span>
          </Link>
          <h2 className="auth__left-title">
            Join the Future of Shopping.
          </h2>
          <p className="auth__left-sub">
            Create your free account and unlock exclusive deals,
            early drops, and premium products.
          </p>
          <div className="auth__perks">
            {[
              "Free shipping on your first order",
              "Early access to new arrivals",
              "Members-only flash sales",
              "24/7 premium support",
            ].map((perk) => (
              <div key={perk} className="auth__perk">
                <div className="auth__perk-dot" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth__right">
        <div className="auth__form-wrap">
          <div className="auth__form-header">
            <h1 className="auth__form-title">Create account</h1>
            <p className="auth__form-sub">
              Start your premium shopping journey
            </p>
          </div>

          {error && <div className="auth__error">{error}</div>}

          <form className="auth__form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="auth__field">
              <label>Full Name *</label>
              <div className="auth__input-wrap">
                <User size={16} className="auth__input-icon" />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth__field">
              <label>Email Address *</label>
              <div className="auth__input-wrap">
                <Mail size={16} className="auth__input-icon" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="auth__field">
              <label>Phone Number</label>
              <div className="auth__input-wrap">
                <Phone size={16} className="auth__input-icon" />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            {/* Address */}
            <div className="auth__field">
              <label>Delivery Address</label>
              <div className="auth__input-wrap">
                <MapPin size={16} className="auth__input-icon" />
                <input
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, City, State"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth__field">
              <label>Password *</label>
              <div className="auth__input-wrap">
                <Lock size={16} className="auth__input-icon" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                />
                <button
                  type="button"
                  className="auth__toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="auth__field">
              <label>Confirm Password *</label>
              <div className="auth__input-wrap">
                <Lock size={16} className="auth__input-icon" />
                <input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                />
                <button
                  type="button"
                  className="auth__toggle-pass"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Password strength indicator */}
            {form.password && (
              <div className="auth__strength">
                <div className="auth__strength-bars">
                  <div className={`auth__strength-bar ${form.password.length >= 1 ? "auth__strength-bar--active" : ""}`} />
                  <div className={`auth__strength-bar ${form.password.length >= 4 ? "auth__strength-bar--active" : ""}`} />
                  <div className={`auth__strength-bar ${form.password.length >= 6 ? "auth__strength-bar--medium" : ""}`} />
                  <div className={`auth__strength-bar ${form.password.length >= 10 ? "auth__strength-bar--strong" : ""}`} />
                </div>
                <span className="auth__strength-label">
                  {form.password.length < 4
                    ? "Weak"
                    : form.password.length < 6
                    ? "Fair"
                    : form.password.length < 10
                    ? "Good"
                    : "Strong"}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="auth__submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="auth__spinner" /> Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="auth__terms">
            By signing up you agree to our{" "}
            <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>

          <p className="auth__switch">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;