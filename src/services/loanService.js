import api from './api';

export const loanService = {
  // Obtener todos los préstamos (admin ve todos, cliente ve solo los suyos)
  getAllLoans: async () => {
    const response = await api.get('/loans');
    return response.data;
  },

  // Obtener un préstamo por ID
  getLoan: async (id) => {
    const response = await api.get(`/loans/${id}`);
    return response.data;
  },

  // Crear un nuevo préstamo
  createLoan: async (loanData) => {
    const response = await api.post('/loans', loanData);
    return response.data;
  },

  // Devolver un libro (finalizar préstamo)
  returnBook: async (id) => {
    const response = await api.put(`/loans/${id}/return`);
    return response.data;
  },

  // Obtener préstamos activos del usuario actual
  getActiveLoans: async () => {
    const response = await api.get('/loans/active');
    return response.data;
  },

  // Obtener historial de préstamos del usuario actual
  getLoanHistory: async () => {
    const response = await api.get('/loans/historial');
    return response.data;
  }
}; 