import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { db, addDoc, collection } from "../../config/firebase";
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const Checkout = () => {
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOrder = async (buyerData) => {
    setLoading(true);
  
    const order = {
      buyer: buyerData,
      items: cart.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice(),
      date: new Date(),
    };
  
    console.log("Creando orden:", order); // Verifica que la orden se construya correctamente.
    console.log("Datos del carrito:", cart);
    console.log("Datos del comprador:", buyerData);
    console.log("Total calculado:", totalPrice());

  
    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Orden guardada con ID:", docRef.id); // Verifica si se guarda correctamente en Firebase.
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al guardar la orden:", error); // Detecta si ocurre un error en Firebase.
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <h2>Procesando tu pedido...</h2>;
  }

  if (orderId) {
    return (
      <div>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  if (cart.length === 0) {
    return <h2>No tienes productos en el carrito.</h2>;
  }

  return (
    <div>
      <h2>Finalizar Compra</h2>
      <CheckoutForm onConfirm={handleOrder} />
    </div>
  );
};

export default Checkout;



