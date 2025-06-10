import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    if (userData.user && userData.user.password) {
      localStorage.setItem('token', userData.user.password);
    }
    if (userData.user) {
      setUser(userData.user);
    } else {
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin:
      user?.id_rol === 1 ||
      user?.rol === "administrador" ||
      user?.nombre_rol === "administrador"
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Middleware para leer el token en el header de autorización
export const authMiddleware = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}; 