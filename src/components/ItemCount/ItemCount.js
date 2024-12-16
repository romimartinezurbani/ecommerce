import './ItemCount.css';
import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="Counter">
      <div className="Controls">
        <button 
          type="button" 
          className="btn" 
          onClick={increment} 
          disabled={quantity >= stock || stock === 0} // Deshabilitar si stock es 0
        >
          +
        </button>
        <h4 className="Number">{quantity}</h4>
        <button 
          type="button" 
          className="btn" 
          onClick={decrement} 
          disabled={quantity <= 1}
        >
          -
        </button>
      </div>
      <div>
        <button 
          type="button" 
          className="btnagregar" 
          onClick={() => onAdd(quantity)} 
          disabled={stock === 0} // Deshabilitar si stock es 0
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemCount;
