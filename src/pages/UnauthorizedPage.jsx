// src/pages/UnauthorizedPage.jsx
import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-red-600">403 - No autorizado</h1>
      <p className="mt-4">No tienes permisos para acceder a esta página</p>
      <Link 
        to="/" 
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
};