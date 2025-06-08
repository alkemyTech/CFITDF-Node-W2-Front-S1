import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BookService from '../services/book-service.js';
import BookForm from '../components/books/BookForm';
import BookList from '../components/books/BookList';

export const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Cargar libros al iniciar
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const response = await BookService.getAll();
        setBooks(response.data);
      } catch (err) {
        setError('Error al cargar libros');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);

  // Manejar creación/actualización
  const handleSave = async (bookData) => {
    try {
      if (selectedBook) {
        // Actualizar
        const updatedBook = await BookService.update(selectedBook.id, bookData);
        setBooks(books.map(b => b.id === updatedBook.data.id ? updatedBook.data : b));
      } else {
        // Crear
        const newBook = await BookService.create(bookData);
        setBooks([...books, newBook.data]);
      }
      setSelectedBook(null);
    } catch (err) {
      setError(selectedBook ? 'Error al actualizar' : 'Error al crear');
      console.error(err);
    }
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este libro permanentemente?')) return;
    try {
      await BookService.delete(id);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError('Error al eliminar');
      console.error(err);
    }
  };

  if (!user || !['admin', 'editor'].includes(user.role)) {
    navigate('/unauthorized');
    return null;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>{selectedBook ? 'Editar Libro' : 'Gestión de Libros'}</h1>
      
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {error}
          <button onClick={() => setError('')} style={{ marginLeft: '10px' }}>×</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Formulario */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h2>{selectedBook ? 'Editar' : 'Agregar'} Libro</h2>
          <BookForm 
            onSubmit={handleSave} 
            initialData={selectedBook} 
            onCancel={() => setSelectedBook(null)}
          />
        </div>

        {/* Listado */}
        <div>
          <h2>Listado de Libros ({books.length})</h2>
          {isLoading ? (
            <p>Cargando libros...</p>
          ) : (
            <BookList 
              books={books} 
              onEdit={setSelectedBook} 
              onDelete={handleDelete} 
              canEdit={user.role === 'admin' || user.role === 'editor'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
