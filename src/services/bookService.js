import api from './api';

export const bookService = {
  // Obtener todos los libros
  getAllBooks: async () => {
    const response = await api.get('/libros');
    return response.data;
  },

  // Obtener un libro por ID
  getBook: async (id) => {
    const response = await api.get(`/libros/${id}`);
    return response.data;
  },

  // Crear un nuevo libro (solo admin)
  createBook: async (bookData) => {
    const response = await api.post('/libros', bookData);
    return response.data;
  },

  // Actualizar un libro (solo admin)
  updateBook: async (id, bookData) => {
    const response = await api.put(`/libros/${id}`, bookData);
    return response.data;
  },

  // Eliminar un libro (solo admin)
  deleteBook: async (id) => {
    const response = await api.delete(`/libros/${id}`);
    return response.data;
  },

  // Buscar libros
  async searchBooks(query) {
    const response = await api.get(`/books/search?q=${query}`);
    return response.data;
  }
}; 
