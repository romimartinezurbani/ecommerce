import './CheckoutForm.css';
import { useState } from 'react';

const CheckoutForm = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [needsFractions, setNeedsFractions] = useState(false); // Nuevo estado para las fracciones
  const [fractions, setFractions] = useState([
    { type: '1/4 Horma', quantity: 0 },
    { type: '1/2 Horma', quantity: 0 },
    { type: 'Horma Entera', quantity: 0 },
    { type: 'Otra Fracción', quantity: '' },
  ]);
  const [error, setError] = useState('');
  const [observations, setObservations] = useState('');

  const handleFractionChange = (index, value) => {
    const updatedFractions = [...fractions];
    updatedFractions[index].quantity = value;
    setFractions(updatedFractions);
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    if (!name || !phone || !adress || !deliveryTime) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación adicional para fracciones solo si está activada
    if (needsFractions) {
      const hasValidFractions = fractions.some(
        (fraction) => fraction.quantity > 0 || (fraction.type === 'Otra Fracción' && fraction.quantity !== '')
      );

      if (!hasValidFractions) {
        setError('Por favor, ingresa al menos una fracción válida.');
        return;
      }
    }

    const userData = { 
      name, 
      phone, 
      adress, 
      deliveryTime, 
      fractions: needsFractions ? fractions : null // Incluye fracciones solo si están activadas
    };

    console.log("Datos del formulario:", userData);
    onConfirm(userData);
  };

  return (
    <div className="Container">
      <form onSubmit={handleConfirm} className="Form">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <p className="InfoText">
          Por favor, complete todos los campos del formulario.<br />
          Recuerde incluir un horario de entrega conveniente para usted.<br />
          🌱 Teniendo en cuenta que los pedidos se toman con 24 hs de anticipación.<br />
          🌱 Envíos en Banda Norte y Las Higueras miércoles por la mañana y viernes por la tarde.<br />
          🌱 Río Cuarto (centro y alrededores) miércoles por la tarde y viernes por la mañana.<br />
          🌱 Recuerden enviar el comprobante de transferencia antes o al momento de recibir los productos para evitar los recargos por demora.
        </p>

        {/* Campos básicos */}
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
        <label className="Label">
          Horario de Entrega
          <input
            className="Input"
            type="text"
            placeholder="Ej: 10:00 AM - 2:00 PM"
            value={deliveryTime}
            onChange={({ target }) => setDeliveryTime(target.value)}
          />
        </label>

        {/* Nuevo selector para fracciones */}
        <div className="Label">
          <label>
            <input
              type="checkbox"
              checked={needsFractions}
              onChange={() => setNeedsFractions(!needsFractions)}
            />
            ¿Quieres especificar fracciones? (Solo en el caso de Quesos)
          </label>
        </div>

        {/* Sección de fracciones (opcional) */}
        {needsFractions && (
          <div className="FractionsSection">
            <h4>Especifica las fracciones:</h4>
            {fractions.map((fraction, index) => (
              <div key={fraction.type} className="FractionRow">
                <label>
                  {fraction.type}
                  <input
                    type={fraction.type === 'Otra Fracción' ? 'text' : 'number'}
                    className="Input"
                    placeholder={fraction.type === 'Otra Fracción' ? "Especificar..." : "Cantidad"}
                    value={fraction.quantity}
                    onChange={(e) => handleFractionChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        )}

         {/* Campo de Observaciones */}
         <label className="Label">
          Observaciones (opcional)
          <textarea
            className="Input"
            placeholder="Ingrese cualquier aclaración o comentario extra..."
            value={observations}
            onChange={({ target }) => setObservations(target.value)}
          ></textarea>
        </label>

        {/* Botón de enviar */}
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



