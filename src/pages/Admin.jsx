import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookService } from '../services/bookService';
import { userService } from '../services/userService';
import { loanService } from '../services/loanService';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    activeLoans: 0,
    totalLoans: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [books, users, activeLoans, allLoans] = await Promise.all([
        bookService.getAllBooks(),
        userService.getAllUsers(),
        loanService.getActiveLoans(),
        loanService.getLoanHistory()
      ]);

      setStats({
        totalBooks: books.length,
        totalUsers: users.length,
        activeLoans: activeLoans.length,
        totalLoans: allLoans.length
      });
      setError(null);
    } catch (err) {
      setError('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando estadísticas...</div>;
  }

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Libros</h3>
          <p className="stat-number">{stats.totalBooks}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total de Usuarios</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        
        <div className="stat-card">
          <h3>Préstamos Activos</h3>
          <p className="stat-number">{stats.activeLoans}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total de Préstamos</h3>
          <p className="stat-number">{stats.totalLoans}</p>
        </div>
      </div>

      <div className="admin-actions">
        <div className="action-card">
          <h3>Gestión de Libros</h3>
          <p>Administra el catálogo de libros, agrega nuevos títulos o actualiza la información existente.</p>
          <a href="/catalogo" className="action-button">Ir al Catálogo</a>
        </div>

        <div className="action-card">
          <h3>Gestión de Usuarios</h3>
          <p>Administra los usuarios del sistema, sus roles y permisos.</p>
          <a href="/usuarios" className="action-button">Gestionar Usuarios</a>
        </div>

        <div className="action-card">
          <h3>Gestión de Préstamos</h3>
          <p>Visualiza y administra los préstamos activos y el historial de préstamos.</p>
          <a href="/prestamos" className="action-button">Ver Préstamos</a>
        </div>
      </div>
    </div>
  );
};

export default Admin; 