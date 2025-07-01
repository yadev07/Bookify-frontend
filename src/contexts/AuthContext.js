import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (auth) localStorage.setItem('auth', JSON.stringify(auth));
    else localStorage.removeItem('auth');
  }, [auth]);

  const login = (data) => setAuth(data);
  const logout = () => setAuth(null);
  const updateAuth = (updates) => {
    setAuth(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
}; 