import { useState } from 'react';

const BookForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    author: initialData.author || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert('Todos los campos son obligatorios');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Título"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Autor"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default BookForm;