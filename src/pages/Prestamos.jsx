import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { loanService } from '../services/loanService';
import './Prestamos.css';

const Prestamos = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('activos');

  useEffect(() => {
    loadLoans();
  }, [activeTab]);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const data = activeTab === 'activos' 
        ? await loanService.getActiveLoans()
        : await loanService.getLoanHistory();
      setLoans(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los préstamos');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (id) => {
    if (window.confirm('¿Está seguro de que desea devolver este libro?')) {
      try {
        await loanService.returnBook(id);
        loadLoans();
      } catch (err) {
        setError('Error al devolver el libro');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando préstamos...</div>;
  }

  return (
    <div className="prestamos-container">
      <h1>Gestión de Préstamos</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'activos' ? 'active' : ''}`}
          onClick={() => setActiveTab('activos')}
        >
          Préstamos Activos
        </button>
        <button 
          className={`tab ${activeTab === 'historial' ? 'active' : ''}`}
          onClick={() => setActiveTab('historial')}
        >
          Historial
        </button>
      </div>

      <div className="loans-grid">
        {loans.map(loan => (
          <div key={loan.id} className="loan-card">
            <h3>{loan.libro.titulo}</h3>
            <p><strong>Autor:</strong> {loan.libro.autor}</p>
            <p><strong>ISBN:</strong> {loan.libro.isbn}</p>
            <p className="date">
              <strong>Fecha de préstamo:</strong> {new Date(loan.fechaPrestamo).toLocaleDateString()}
            </p>
            {loan.fechaDevolucion && (
              <p className="date">
                <strong>Fecha de devolución:</strong> {new Date(loan.fechaDevolucion).toLocaleDateString()}
              </p>
            )}
            
            {activeTab === 'activos' && (
              <div className="loan-actions">
                <button 
                  className="return-button"
                  onClick={() => handleReturn(loan.id)}
                >
                  Devolver Libro
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {loans.length === 0 && (
        <div className="no-loans">
          {activeTab === 'activos' 
            ? 'No tiene préstamos activos en este momento.'
            : 'No hay historial de préstamos.'}
        </div>
      )}
    </div>
  );
};

export default Prestamos; 