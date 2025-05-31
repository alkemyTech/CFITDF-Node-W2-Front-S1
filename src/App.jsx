// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BooksPage } from './pages/BooksPage';
import { ProtectedRoute } from './routes/ProtectedRoute';

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/books"
        element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <BooksPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};