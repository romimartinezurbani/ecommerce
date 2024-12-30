import React, { useContext } from "react";
import { CartContext } from "./../../context/CartContext";

const CartItem = ({ id, product, price, quantity }) => {
  const { updateQuantity, removeItem } = useContext(CartContext);

  // Función para eliminar una unidad del producto
  const handleRemoveOne = () => {
    const newQuantity = quantity - 1;
    updateQuantity(product, newQuantity);
  };

  // Función para eliminar todo el producto
  const handleRemoveAll = () => {
    removeItem(product);
  };

  return (
    <div className="cart-item">
      <p>Producto: {product}</p>
      <p>Precio: ${price}</p>
      <p>Cantidad: {quantity}</p>
      <p>Subtotal: ${price * quantity}</p>
      <button onClick={handleRemoveOne} disabled={quantity <= 1}>
        Eliminar uno
      </button>
      <button onClick={handleRemoveAll}>Eliminar todo</button>
    </div>
  );
};

export default CartItem;


