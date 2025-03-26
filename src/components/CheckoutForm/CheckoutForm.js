import './CheckoutForm.css';
import { useState } from 'react';

const CheckoutForm = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [medioDePago, setMedioDePago] = useState('');
  const [error, setError] = useState('');
  const [observations, setObservations] = useState('');

  const handleConfirm = (event) => {
    event.preventDefault();

    if (!name || !phone || !adress || !deliveryTime || !medioDePago) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const userData = { 
      name, 
      phone, 
      adress, 
      deliveryTime, 
      medioDePago,
      observations,
    };

    console.log("Datos del formulario:", userData);
    onConfirm(userData);
  };

  return (
    <div className="Container">
      <form onSubmit={handleConfirm} className="Form">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p className="InfoText">
        TODOS LOS PRODUCTOS SON VENDIDOS POR PESO, POR LO CUAL, EL VALOR TOTAL ES ESTIMATIVO. EN CUANTO SE PREPARE EL PEDIDO, SE LE ENVIARA UN REMITO CON EL PESO Y MONTO EXACTO A PAGAR
        </p>
        
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
          Nombre y Apellido
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
    

        {/* Medio de Pago */}
        <label className="Label">
          Medio de Pago
          <select
            className="Input"
            value={medioDePago}
            onChange={({ target }) => setMedioDePago(target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </label>

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




