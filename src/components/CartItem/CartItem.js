import './CartItem.css'
import React from 'react';
import { useContext } from 'react';
import { CartContext } from './../../context/CartContext';

const CartItem = ({ id, product, price, quantity }) => {
  
  const { removeItem } = useContext(CartContext);

  return (
    <div className="cart-item">
      <p>Producto: {product}</p>
      <p>Precio: ${price}</p>
      <p>Cantidad: {quantity}</p>
      <p>Subtotal: ${price * quantity}</p>
      <button onClick={() => removeItem(product)}>Eliminar</button>
    </div>
  );
};

export default CartItem;
