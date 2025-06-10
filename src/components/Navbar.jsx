import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { MdLibraryBooks, MdAssignment, MdPeople, MdAdminPanelSettings, MdLogout, MdMenu, MdClose } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <nav className="navbar">
      <button className="navbar-hamburger" onClick={() => setSidebarOpen(true)}>
        <MdMenu size={28} />
      </button>
      <ul className="navbar-menu">
        <li>
          <Link to="/catalogo">
            <MdLibraryBooks size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Catálogo
          </Link>
        </li>
        <li>
          <Link to="/prestamos">
            <MdAssignment size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Préstamos
          </Link>
        </li>
        <li>
          <Link to="/usuarios">
            <MdPeople size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Usuarios
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <MdAdminPanelSettings size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Admin
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
              <MdLogout size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Logout
            </button>
          </li>
        )}
      </ul>
      {/* Sidebar para móviles */}
      <div className={`navbar-sidebar ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar}>
        <div className="navbar-sidebar-content" onClick={e => e.stopPropagation()}>
          <button className="sidebar-close" onClick={closeSidebar}>
            <MdClose size={28} />
          </button>
          <ul>
            <li>
              <Link to="/catalogo" onClick={closeSidebar}>
                <MdLibraryBooks size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/prestamos" onClick={closeSidebar}>
                <MdAssignment size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Préstamos
              </Link>
            </li>
            <li>
              <Link to="/usuarios" onClick={closeSidebar}>
                <MdPeople size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={closeSidebar}>
                <MdAdminPanelSettings size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Admin
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <button className="logout-btn" onClick={() => { handleLogout(); closeSidebar(); }} title="Cerrar sesión">
                  <MdLogout size={20} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 