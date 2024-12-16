import { db, doc, updateDoc } from "../../config/firebase";

const updateStock = async (productId, newStock) => {
  const productRef = doc(db, "products", productId); // Referencia al producto en Firestore

  try {
    await updateDoc(productRef, { stock: newStock }); // Actualiza solo el campo 'stock'
    console.log(`Stock del producto ${productId} actualizado a ${newStock}.`);
  } catch (error) {
    console.error(
      `Error al actualizar el stock del producto ${productId}:`,
      error
    );
  }
};

