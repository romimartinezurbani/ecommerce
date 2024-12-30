import { getFirestore, doc, getDoc } from "firebase/firestore";

// Función para verificar si un usuario es admin
export const isAdmin = async (uid) => {
  const db = getFirestore();
  const userRef = doc(db, "users", uid); // Referencia al documento del usuario
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.role === "admin"; // Devuelve true si el rol es 'admin'
  }

  return false; // Devuelve false si el documento no existe o no tiene rol 'admin'
};
