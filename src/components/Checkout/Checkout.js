import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../config/firebase";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOrder = async (buyerData) => {
    setLoading(true);

    // Construir la orden
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

    console.log("Creando orden:", order);

    try {
      // Guardar la orden en Firestore
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Orden guardada con ID:", docRef.id);
      setOrderId(docRef.id);

      // Actualizar el stock en Firestore para cada producto del carrito
      const updateStockPromises = cart.map(async (item) => {
        const productRef = doc(db, "products", item.id); // Ruta al producto

        try {
          // Obtener el producto de Firestore
          const productSnap = await getDoc(productRef);
          if (!productSnap.exists()) {
            console.error(`Producto con ID ${item.id} no encontrado.`);
            throw new Error(`Producto con ID ${item.id} no encontrado.`);
          }

          const currentStock = Number(productSnap.data().stock); // Asegurarse de que el stock es un número
          const quantityPurchased = Number(item.quantity);

          if (isNaN(currentStock) || isNaN(quantityPurchased)) {
            console.error(
              `Valores inválidos detectados: stock=${currentStock}, cantidad=${quantityPurchased}`
            );
            throw new Error("Valores inválidos en la actualización del stock.");
          }

          if (currentStock >= quantityPurchased) {
            const newStock = currentStock - quantityPurchased;

            await updateDoc(productRef, {
              stock: newStock,
            });

            console.log(`Stock actualizado para producto ${item.id}`);
          } else {
            console.error(
              `Stock insuficiente para producto ${item.id}. Stock actual: ${currentStock}`
            );
            alert(
              `El producto "${item.id}" no tiene suficiente stock. Stock disponible: ${currentStock}`
            );
          }
        } catch (error) {
          console.error(
            `Error al actualizar el stock del producto ${item.id}:`,
            error
          );
        }
      });

      await Promise.all(updateStockPromises); // Asegurarnos de que todas las actualizaciones de stock se completen
      clearCart(); // Limpiar el carrito después de confirmar la compra
    } catch (error) {
      console.error("Error al guardar la orden o actualizar el stock:", error);
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
        <p>
          Tu número de orden es: <strong>{orderId}</strong> <br />
          Ante cualquier duda o consulta, puedes comunicarte a nuestro WhatsApp{" "}
          <strong>3584118192</strong>
        </p>
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




