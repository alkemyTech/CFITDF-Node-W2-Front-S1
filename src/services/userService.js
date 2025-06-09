import api from './api';

export const userService = {
  // Obtener todos los usuarios (solo admin)
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Obtener un usuario por ID
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Crear un nuevo usuario (solo admin)
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Actualizar un usuario
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Eliminar un usuario (solo admin)
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Obtener el perfil del usuario actual
  getCurrentUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
}; 