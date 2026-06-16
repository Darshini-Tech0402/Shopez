import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopez_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const isLoggedIn = !!user;

  const login = (userData) => {
    const userObj = { ...userData, token: 'mock-jwt-token-' + Date.now() };
    setUser(userObj);
    localStorage.setItem('shopez_user', JSON.stringify(userObj));
  };

  const signup = (userData) => {
    const userObj = { ...userData, token: 'mock-jwt-token-' + Date.now() };
    setUser(userObj);
    localStorage.setItem('shopez_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopez_user');
    localStorage.removeItem('shopez_cart');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}