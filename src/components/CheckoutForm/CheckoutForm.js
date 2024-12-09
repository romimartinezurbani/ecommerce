import './CheckoutForm.css';
import { useState } from 'react';

const CheckoutForm = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = (event) => {
    event.preventDefault();

    if (!name || !phone || !adress) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const userData = { name, phone, adress };
      console.log("Datos del formulario:", userData); // Verifica los datos aquí
      onConfirm(userData);
    };

  return (
    <div className="Container">
      <form onSubmit={handleConfirm} className="Form">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label className="Label">
          Nombre
          <input
            className="Input"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label className="Label">
          Teléfono
          <input
            className="Input"
            type="text"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </label>
        <label className="Label">
          Dirección
          <input
            className="Input"
            type="text"
            value={adress}
            onChange={({ target }) => setAdress(target.value)}
          />
        </label>
        <div className="Label">
          <button type="submit" className="Button">
            Crear Orden
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
