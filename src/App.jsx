import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalogo from './pages/Catalogo';
import Prestamos from './pages/Prestamos';
import Usuarios from './pages/Usuarios';
import Admin from './pages/Admin';
import Unauthorized from './pages/Unauthorized';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              <Route 
                path="/catalogo" 
                element={
                  <ProtectedRoute>
                    <Catalogo />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/prestamos" 
                element={
                  <ProtectedRoute>
                    <Prestamos />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/usuarios" 
                element={
                  <ProtectedRoute requiredRole="administrador">
                    <Usuarios />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="administrador">
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
