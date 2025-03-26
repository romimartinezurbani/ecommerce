import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";

export const exportOrders = async () => {
  const db = getFirestore();
  const ordersCollection = collection(db, "orders");

  try {
    const snapshot = await getDocs(ordersCollection);

    // Procesar los pedidos para aplanar datos complejos
    const orders = snapshot.docs.flatMap(doc => {
      const data = doc.data();

      const buyer = data.buyer
        ? {
            name: data.buyer.name || "N/A",
            address: data.buyer.address || "N/A",
            phone: data.buyer.phone || "N/A",
          }
        : { name: "N/A", address: "N/A", phone: "N/A" };

      const date = data.date ? data.date.toDate().toLocaleString() : "N/A";

      // Si el pedido tiene múltiples productos, generar una fila por producto
      if (Array.isArray(data.items)) {
        return data.items.map((item, index) => ({
          id: doc.id,                // ID del pedido
          buyerName: buyer.name,     // Nombre del comprador
          buyerAddress: buyer.address, // Dirección del comprador
          buyerPhone: buyer.phone,   // Teléfono del comprador
          date,                      // Fecha del pedido
          productId: item.id || `Producto ${index + 1}`, // ID del producto
          quantity: item.quantity || 0,                 // Cantidad
          price: item.price || 0,                       // Precio del producto
          total: data.total || 0                        // Total del pedido
        }));
      }

      // Si no hay productos, crear una fila vacía
      return {
        id: doc.id,
        buyerName: buyer.name,
        buyerAddress: buyer.address,
        buyerPhone: buyer.phone,
        date,
        productId: "N/A",
        quantity: 0,
        price: 0,
        total: data.total || 0,
      };
    });

    console.log("Pedidos procesados:", orders);

    // Convertir los datos procesados a un formato adecuado para Excel
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

    // Crear y descargar el archivo Excel
    XLSX.writeFile(workbook, "pedidos.xlsx");
    console.log("Archivo Excel exportado correctamente.");
  } catch (error) {
    console.error("Error al exportar pedidos:", error);
  }
};
