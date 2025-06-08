import { useEffect, useState } from 'react';
import BookService from '../../services/book-service'; // Importa el servicio

const BookList = () => {
    const [books, setBooks] = useState([]);

    // Carga inicial de libros
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await BookService.getAll(); // Usa el servicio
                setBooks(response.data);
            } catch (error) {
                console.error('Error al cargar libros:', error);
                alert('Error al cargar libros'); // Feedback al usuario
            }
        };
        fetchBooks();
    }, []);

    // Eliminar libro
    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este libro permanentemente?')) return;
        
        try {
            await BookService.delete(id); // Usa el servicio
            setBooks(books.filter(book => book.id !== id));
            alert('Libro eliminado');
        } catch (error) {
            console.error('Error al eliminar libro:', error);
            alert('No se pudo eliminar el libro');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Listado de Libros</h2>
            {books.length === 0 ? (
                <p>No hay libros disponibles</p>
            ) : (
                books.map((book) => (
                    <div 
                        key={book.id} 
                        style={{ 
                            border: '1px solid #ddd', 
                            padding: '10px', 
                            marginBottom: '10px',
                            borderRadius: '4px'
                        }}
                    >
                        <h3>{book.title}</h3>
                        <p>Autor: {book.author}</p>
                        <p>ISBN: {book.isbn || 'N/A'}</p>
                        <button 
                            onClick={() => handleDelete(book.id)}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookList;