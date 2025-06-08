import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookService } from '../services/bookService';
import BookForm from '../components/BookForm';
import './Catalogo.css';

const Catalogo = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este libro?')) {
      try {
        await bookService.deleteBook(id);
        loadBooks();
      } catch (err) {
        setError('Error al eliminar el libro');
      }
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedBook) {
        await bookService.updateBook(selectedBook.id, formData);
      } else {
        await bookService.createBook(formData);
      }
      setShowForm(false);
      loadBooks();
    } catch (err) {
      setError('Error al guardar el libro');
    }
  };

  const filteredBooks = books.filter(book => 
    book.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Cargando libros...</div>;
  }

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Libros</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="catalogo-header">
        <form className="search-form">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </form>
        
        {user?.rol === 'administrador' && (
          <button className="add-button" onClick={handleAdd}>
            Agregar Libro
          </button>
        )}
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.titulo}</h3>
            <p><strong>Autor:</strong> {book.autor}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Estado:</strong> {book.disponible ? 'Disponible' : 'Prestado'}</p>
            
            {user?.rol === 'administrador' && (
              <div className="admin-actions">
                <button 
                  className="edit-button"
                  onClick={() => handleEdit(book)}
                >
                  Editar
                </button>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(book.id)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="no-books">
          No se encontraron libros que coincidan con la búsqueda.
        </div>
      )}

      {showForm && (
        <BookForm
          book={selectedBook}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Catalogo; 