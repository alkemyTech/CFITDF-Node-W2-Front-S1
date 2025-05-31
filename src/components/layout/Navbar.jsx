// src/components/layout/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#333',
      padding: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Biblioteca App
        </Link>
      </div>
      
      <div>
        {user ? (
          <>
            {/* Opciones para usuarios autenticados */}
            <span style={{ marginRight: '1rem' }}>
              Bienvenido, {user.email} ({user.role})
            </span>
            
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  marginRight: '1rem' 
                }}
              >
                Panel Admin
              </Link>
            )}
            
            <Link 
              to="/books" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                marginRight: '1rem' 
              }}
            >
              Libros
            </Link>
            
            <button 
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            style={{ 
              color: 'white', 
              textDecoration: 'none' 
            }}
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};