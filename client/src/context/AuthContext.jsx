import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("shopez_user");
      const storedToken = localStorage.getItem("shopez_token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      localStorage.removeItem("shopez_user");
      localStorage.removeItem("shopez_token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Try real API first
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          const userData = data.user || data;
          const token = data.token;
          setUser(userData);
          localStorage.setItem("shopez_user", JSON.stringify(userData));
          if (token) localStorage.setItem("shopez_token", token);
          setLoading(false);
          return { success: true, user: userData };
        }
      } catch (apiErr) {
        // API not available, use local auth
        console.log("API unavailable, using local auth");
      }

      // LOCAL AUTH FALLBACK
      // Check if user exists in localStorage registry
      const usersRegistry = JSON.parse(
        localStorage.getItem("shopez_users_registry") || "[]"
      );

      const existingUser = usersRegistry.find((u) => u.email === email);

      if (!existingUser) {
        setLoading(false);
        return { success: false, error: "No account found with this email. Please sign up first." };
      }

      if (existingUser.password !== password) {
        setLoading(false);
        return { success: false, error: "Incorrect password. Please try again." };
      }

      const userData = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin || false,
      };

      const fakeToken = "local_token_" + Date.now();
      setUser(userData);
      localStorage.setItem("shopez_user", JSON.stringify(userData));
      localStorage.setItem("shopez_token", fakeToken);
      setLoading(false);
      return { success: true, user: userData };

    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Try real API first
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          const userData = data.user || data;
          const token = data.token;
          setUser(userData);
          localStorage.setItem("shopez_user", JSON.stringify(userData));
          if (token) localStorage.setItem("shopez_token", token);
          setLoading(false);
          return { success: true, user: userData };
        }
      } catch (apiErr) {
        // API not available, use local auth
        console.log("API unavailable, using local signup");
      }

      // LOCAL SIGNUP FALLBACK
      const usersRegistry = JSON.parse(
        localStorage.getItem("shopez_users_registry") || "[]"
      );

      // Check if email already exists
      const emailExists = usersRegistry.find((u) => u.email === email);
      if (emailExists) {
        setLoading(false);
        return { success: false, error: "An account with this email already exists." };
      }

      // Create new user
      const newUser = {
        _id: "local_" + Date.now(),
        name,
        email,
        password, // stored locally only
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };

      // Save to registry
      usersRegistry.push(newUser);
      localStorage.setItem("shopez_users_registry", JSON.stringify(usersRegistry));

      const userData = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      };

      const fakeToken = "local_token_" + Date.now();
      setUser(userData);
      localStorage.setItem("shopez_user", JSON.stringify(userData));
      localStorage.setItem("shopez_token", fakeToken);
      setLoading(false);
      return { success: true, user: userData };

    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("shopez_user");
    localStorage.removeItem("shopez_token");
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("shopez_user", JSON.stringify(newUser));
  };

  const getToken = () => localStorage.getItem("shopez_token");

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
    getToken,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;