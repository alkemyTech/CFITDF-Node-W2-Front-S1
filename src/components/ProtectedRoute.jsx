import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRole &&
    !(
      (requiredRole === "administrador" &&
        (user.id_rol === 1 ||
          user.rol === "administrador" ||
          user.nombre_rol === "administrador")) ||
      (requiredRole === "cliente" &&
        (user.id_rol === 2 ||
          user.rol === "cliente" ||
          user.nombre_rol === "cliente"))
    )
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute; 