import { Link } from 'react-router-dom';
import './Unauthorized.css';

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <h1>Acceso No Autorizado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/" className="back-button">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Unauthorized; 