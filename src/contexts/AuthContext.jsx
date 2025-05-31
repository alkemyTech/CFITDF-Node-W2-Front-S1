// src/contexts/AuthContext.jsx
import { createContext, useState } from 'react';
import api from '../services/api'; // Asegúrate de tener este archivo configurado (ver paso anterior)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para login
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Asume que el backend devuelve { token, user }
      return true;
    } catch (error) {
      console.error('Error en login:', error.response?.data?.message || error.message);
      return false;
    }
  };

  // Función para registro
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Error en registro:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};