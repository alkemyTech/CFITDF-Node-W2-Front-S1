import api from './api';

const BookService = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post('/books', bookData),
  update: (id, bookData) => api.put(`/books/${id}`, bookData),
  delete: (id) => api.delete(`/books/${id}`),
  search: (query) => api.get('/books/search', { params: { q: query } }), // Ejemplo de endpoint adicional
};

export default BookService;
