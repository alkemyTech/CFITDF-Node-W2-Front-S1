// src/pages/DashboardPage.jsx
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Rol actual: <strong>{user?.role}</strong></p>
      <p>Email: <strong>{user?.email}</strong></p>
    </div>
  );
};