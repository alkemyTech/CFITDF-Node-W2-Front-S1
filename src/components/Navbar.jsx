import { Link } from 'react-router-dom'
import './Navbar.css'
import { MdLibraryBooks, MdAssignment, MdPeople, MdAdminPanelSettings } from 'react-icons/md';

function Navbar() {
  return (
    <nav className="navbar">
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
      </ul>
    </nav>
  )
}

export default Navbar 