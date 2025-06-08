import './Home.css'
import { Link } from 'react-router-dom';
import { MdLibraryBooks, MdAssignment, MdPeople } from 'react-icons/md';

function Home() {
  return (
    <div className="home">
      <h1>Sistema de Gestión de Biblioteca</h1>
      <div className="features">
        <Link to="/catalogo" className="feature-card">
          <MdLibraryBooks size={48} style={{ marginBottom: '10px' }} />
          <h2>Catálogo</h2>
          <p>Explora nuestra colección de libros</p>
        </Link>
        <Link to="/prestamos" className="feature-card">
          <MdAssignment size={48} style={{ marginBottom: '10px' }} />
          <h2>Préstamos</h2>
          <p>Gestiona tus préstamos de libros</p>
        </Link>
        <Link to="/usuarios" className="feature-card">
          <MdPeople size={48} style={{ marginBottom: '10px' }} />
          <h2>Usuarios</h2>
          <p>Accede a tu perfil de usuario</p>
        </Link>
      </div>
    </div>
  )
}

export default Home 