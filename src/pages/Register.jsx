import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      await userService.createUser({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        rol: 'cliente' // Por defecto, los usuarios se registran como clientes
      });
      navigate('/login');
    } catch (err) {
      setError('Error al registrar el usuario. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-background">
      <div className="register-card-modern">
        <div className="register-logo">
          <span role="img" aria-label="logo">⚡</span>
        </div>
        <div className="register-title">Crear una cuenta</div>
        {error && <div className="register-error">{error}</div>}
        <form className="register-form-modern" onSubmit={handleSubmit} autoComplete="off">
          <div className="register-textbox">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className="register-textbox">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="register-textbox">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder=" "
              autoComplete="new-password"
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="register-textbox">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              placeholder=" "
              autoComplete="new-password"
            />
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          </div>
          <button 
            type="submit" 
            className="register-btn-modern"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
          <button
            type="button"
            className="login-home-btn"
            onClick={() => navigate('/')}
            style={{ marginTop: '10px' }}
          >
            Volver al Home
          </button>
        </form>
        <div className="register-footer">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register; 