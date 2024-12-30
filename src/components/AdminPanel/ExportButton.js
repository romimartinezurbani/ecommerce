import React from "react";
import { isAdmin } from "../../utils/authUtils"
import { getAuth } from "firebase/auth";
import { exportOrders } from "../../utils/orderUtils"; // Función para exportar pedidos

const ExportButton = () => {
  const handleExport = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const isUserAdmin = await isAdmin(user.uid);
      if (isUserAdmin) {
        console.log("El usuario es administrador. Exportando pedidos...");
        await exportOrders(); // Llamada a la función de exportación
      } else {
        alert("No tienes permisos para exportar los pedidos.");
      }
    } else {
      alert("Debes iniciar sesión para exportar los pedidos.");
    }
  };

  return (
    <button onClick={handleExport} style={{ padding: "10px", background: "#752218", color: "white", border: "none", borderRadius: "5px" }}>
      Exportar Pedidos
    </button>
  );
};

export default ExportButton;
