import api from './api';

export const userService = {
  // Obtener todos los usuarios (solo admin)
  getAllUsers: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  // Obtener un usuario por ID
  getUser: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Crear un nuevo usuario (solo admin)
  createUser: async (userData) => {
    const response = await api.post('/usuarios', userData);
    return response.data;
  },

  // Actualizar un usuario
  updateUser: async (id, userData) => {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
  },

  // Eliminar un usuario (solo admin)
  deleteUser: async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },

  // Obtener el perfil del usuario actual
  getCurrentUser: async () => {
    const response = await api.get('/usuarios/me');
    return response.data;
  }
}; 