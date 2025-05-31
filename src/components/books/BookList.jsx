import { useState, useEffect } from 'react';
import api from '../services/api';

export const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error al cargar libros:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error al eliminar libro:', error);
    }
  };

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => handleDelete(book.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};