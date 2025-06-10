import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import './Usuarios.css';

const Usuarios = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    id_rol: 2 // Por defecto cliente
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      dni: user.dni || '',
      nombres: user.nombres || '',
      apellidos: user.apellidos || '',
      email: user.email || '',
      password: '',
      id_rol: user.id_rol || 2
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setFormData({
      dni: '',
      nombres: '',
      apellidos: '',
      email: '',
      password: '',
      id_rol: 2
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser && selectedUser.id) {
        await userService.updateUser(selectedUser.id, formData);
      } else if (selectedUser && selectedUser._id) {
        await userService.updateUser(selectedUser._id, formData);
      } else {
        await userService.createUser(formData);
      }
      setShowForm(false);
      loadUsers();
    } catch (err) {
      setError('Error al guardar el usuario');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dni' || name === 'id_rol' ? Number(value) : value
    }));
  };

  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="usuarios-header">
        <button className="add-button" onClick={handleAdd}>
          Agregar Usuario
        </button>
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id || user._id} className="user-card">
            <h3>{user.nombre}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.id_rol === 1 ? 'Administrador' : 'Cliente'}</p>
            <div className="user-actions">
              <button 
                className="edit-button"
                onClick={() => handleEdit(user)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input
                  type="number"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                  min="1000000"
                  placeholder="DNI (mínimo 7 dígitos)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombres">Nombre</label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  placeholder="Nombre completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellido</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                  placeholder="Apellido(s)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!selectedUser}
                  minLength="6"
                  placeholder="Contraseña (mínimo 6 caracteres)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_rol">Rol</label>
                <select
                  id="id_rol"
                  name="id_rol"
                  value={formData.id_rol}
                  onChange={handleChange}
                  required
                >
                  <option value={2}>Cliente</option>
                  <option value={1}>Administrador</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  {selectedUser ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios; 