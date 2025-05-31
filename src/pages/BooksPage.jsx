// src/pages/BooksPage.jsx
import { useState } from "react";
import { BookList } from "../components/books/BookList";
import { BookForm } from "../components/books/BookForm";

export const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  return (
    <div>
      <h1>Gestión de Libros</h1>
      <BookForm 
        onAddBook={handleAddBook} 
        onUpdateBook={handleUpdateBook} 
        selectedBook={selectedBook}
      />
      <BookList 
        books={books} 
        onSelectBook={setSelectedBook} 
      />
    </div>
  );
};