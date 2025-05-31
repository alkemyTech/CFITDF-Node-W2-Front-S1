// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = "admin"; // Reemplaza con tu contexto de autenticación real
  return allowedRoles.includes(userRole) ? children : <Navigate to="/login" />;
};