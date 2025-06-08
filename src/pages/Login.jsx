import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { MdFlashOn } from 'react-icons/md';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await authService.login(formData.email, formData.password);
      login(data);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="main-centered">
        <div className="login-card-modern">
          <div className="login-logo">
            <MdFlashOn size={48} />
          </div>
          <h2 className="login-title">Ingresar al sistema</h2>
          {error && <div className="login-error">{error}</div>}
          <form className="login-form-modern" onSubmit={handleSubmit} autoComplete="off">
            <div className="login-textbox">
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="login-textbox">
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <button type="submit" className="login-btn-modern" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>
          <button className="login-home-btn" onClick={() => navigate('/')}>
            Volver al Home
          </button>
          <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>
          <p className="login-footer">
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 