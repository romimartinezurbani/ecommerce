import { createContext, useState } from "react";
import Item from "../components/Item/Item";

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  total: 0,
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log(cart)

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  const addItem = (item, quantity) => {
    if (!isInCart((item.id))) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      console.error("El producto ya fue agregado");
    }
  };

  const removeItem = (itemId) => {
    const cartUpdated = cart.filter((prod) => (prod.id) !== itemId);
    setCart(cartUpdated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some(prod => prod.id !== itemId);
  };
  return (
    <CartContext.Provider
      value={{cart, addItem, removeItem, clearCart,
        total: calculateTotal(),
        totalQuantity: calculateTotalQuantity(),
      }}>
      
      {children}
    </CartContext.Provider>
  );
};

export default CartContext
