import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Zap, ArrowRight, Mail, Lock } from "lucide-react";
import "./Login.css";

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error || "Invalid email or password.");
  };

  // Social login — creates/logs in with a demo account
  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError("");

    const socialUsers = {
      Google: {
        name: "Google User",
        email: "google.user@gmail.com",
        password: "google123",
      },
      Apple: {
        name: "Apple User",
        email: "apple.user@icloud.com",
        password: "apple123",
      },
      Github: {
        name: "Github User",
        email: "github.user@github.com",
        password: "github123",
      },
    };

    const socialUser = socialUsers[provider];

    // Try login first, if fails then signup
    let result = await login(socialUser.email, socialUser.password);

    if (!result.success) {
      // Account doesn't exist, create it
      result = await signup(
        socialUser.name,
        socialUser.email,
        socialUser.password
      );
    }

    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(`${provider} login failed. Please try again.`);
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
            The Future of Shopping is Here.
          </h2>
          <p className="auth__left-sub">
            Premium products. Seamless experience. Join 50,000+ smart shoppers.
          </p>
          <div className="auth__left-stats">
            {[
              ["50K+", "Happy Customers"],
              ["4.9★", "Rating"],
              ["Free", "Returns"],
            ].map(([v, l]) => (
              <div key={l} className="auth__left-stat">
                <span className="auth__left-stat-val">{v}</span>
                <span className="auth__left-stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth__right">
        <div className="auth__form-wrap">
          <div className="auth__form-header">
            <h1 className="auth__form-title">Welcome back</h1>
            <p className="auth__form-sub">Sign in to your ShopEZ account</p>
          </div>

          {error && <div className="auth__error">{error}</div>}

          {/* Social Login Buttons */}
          <div className="auth__socials">
            {["Google", "Apple", "Github"].map((provider) => (
              <button
                key={provider}
                className="auth__social-btn"
                onClick={() => handleSocialLogin(provider)}
                disabled={loading}
              >
                <span className="auth__social-icon">
                  {provider === "Google" && "G"}
                  {provider === "Apple" && ""}
                  {provider === "Github" && "</>"}
                </span>
                {provider}
              </button>
            ))}
          </div>

          <div className="auth__divider">
            <span>or sign in with email</span>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__field">
              <label>Email Address</label>
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

            <div className="auth__field">
              <div className="auth__field-header">
                <label>Password</label>
                <a href="#" className="auth__forgot">
                  Forgot password?
                </a>
              </div>
              <div className="auth__input-wrap">
                <Lock size={16} className="auth__input-icon" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              className="auth__submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="auth__spinner" /> Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="auth__switch">
            Don't have an account?{" "}
            <Link to="/signup">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;