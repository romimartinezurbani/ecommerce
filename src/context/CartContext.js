import { createContext, useState } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { app } from "../config/firebase"; 

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  confirmPurchase: () => {},
  updateQuantity: () => {}, // Actualizar cantidad del producto
  totalPrice: () => 0,
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const db = getFirestore(app); // Instancia de Firestore

  // Calcula el precio total
  const calculateTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Calcula la cantidad total de productos
  const calculateTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Agrega un producto al carrito
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      setCart((prev) =>
        prev.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        )
      );
    }
  };

  // Elimina un producto completo del carrito
  const removeItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    console.log("Actualizando cantidad de:", itemId, "a:", newQuantity);
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(newQuantity, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    console.log("Carrito actualizado:", cart);
  };
  

  // Limpia el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Verifica si un producto está en el carrito
  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  const confirmPurchase = async () => {
    console.log("Carrito al confirmar compra:", cart);
    try {
      const updatePromises = cart.map(async (item) => {
        const productRef = doc(db, 'products', item.id); // Asegúrate de que la colección y el ID coincidan
        console.log("Referencia del producto:", productRef.path); // Ruta completa del documento
    
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock;
          console.log(`Stock actual: ${currentStock}, Cantidad comprada: ${item.quantity}`);
    
          if (currentStock >= item.quantity) {
            // Actualiza el stock
            await updateDoc(productRef, {
              stock: currentStock - item.quantity,
            });
            console.log(`Stock actualizado para producto: ${item.id}`);
          } else {
            console.error(`Producto ${item.id}: Stock insuficiente. Stock disponible: ${currentStock}`);
            alert(`Stock insuficiente para el producto: ${item.id}`);
          }
        } else {
          console.error(`Producto con ID ${item.id} no encontrado en Firestore.`);
          alert(`Producto no encontrado: ${item.id}`);
        }
      });
    
      await Promise.all(updatePromises);
      alert("Compra confirmada y stock actualizado.");
      clearCart();
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      alert("Error al confirmar la compra. Por favor, inténtalo de nuevo.");
    }
  };
  
  

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity, // Función para actualizar cantidad
        clearCart,
        confirmPurchase,
        totalPrice: calculateTotalPrice,
        totalQuantity: calculateTotalQuantity(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;




