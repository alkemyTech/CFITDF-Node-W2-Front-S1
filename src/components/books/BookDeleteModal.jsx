// src/components/books/BookDeleteModal.jsx
export const BookDeleteModal = ({ book, onConfirm, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '400px'
      }}>
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de eliminar el libro "{book?.title}"?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose}>
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            style={{ background: 'red', color: 'white' }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};