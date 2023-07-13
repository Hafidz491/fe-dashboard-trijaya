import { React, useContext, useState, createContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  });

  function login(token, dataUser) {
    localStorage.setItem('token', token);
    setCurrentUser(dataUser);
  }

  function logout() {
    localStorage.removeItem('token');
  }

  const value = {
    token,
    login,
    logout,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
