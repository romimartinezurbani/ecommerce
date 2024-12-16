import { createContext, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../config/firebase"; // Importa tu configuración de Firebase

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  confirmPurchase: () => {}, // Nueva función para confirmar la compra
  totalPrice: () => 0,
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const db = getFirestore(app); // Instancia de Firestore

  console.log(cart);

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Función para calcular la cantidad total de productos en el carrito
  const calculateTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Agregar un producto al carrito
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      console.error("El producto ya fue agregado");
    }
  };

  // Remover un producto del carrito
  const removeItem = (itemId) => {
    const cartUpdated = cart.filter((prod) => prod.id !== itemId);
    setCart(cartUpdated);
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (itemId) => {
    return cart.some((prod) => prod.id === itemId);
  };

  // **Función para confirmar la compra y actualizar el stock en Firestore**
  const confirmPurchase = async () => {
    try {
      // Recorremos los productos en el carrito para actualizar el stock
      const updatePromises = cart.map(async (item) => {
        const productRef = doc(db, "products", item.id); // Ruta al producto en Firestore
        await updateDoc(productRef, {
          stock: item.stock - item.quantity, // Resta la cantidad comprada al stock actual
        });
      });

      await Promise.all(updatePromises); // Espera a que todas las actualizaciones se completen

      console.log("Stock actualizado correctamente");
      alert("Compra confirmada y stock actualizado");
      clearCart(); // Limpia el carrito después de confirmar la compra
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      alert("Error al confirmar la compra. Por favor, inténtalo de nuevo.");
    }
  };

  // Proveer los valores y funciones al resto de la app
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        confirmPurchase, // Nueva función expuesta al resto de la app
        calculateTotalQuantity,
        totalPrice: calculateTotalPrice,
        totalQuantity: calculateTotalQuantity(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

