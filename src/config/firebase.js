// Importación de funciones necesarias
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  addDoc, 
  collection, 
  getDoc, 
  doc 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importamos Auth

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfKMqUrn_8FdwDS6RJ875i2goUxmNMrrs",
  authDomain: "ecommerce-7929f.firebaseapp.com",
  projectId: "ecommerce-7929f",
  storageBucket: "ecommerce-7929f.appspot.com",
  messagingSenderId: "820872052955",
  appId: "1:820872052955:web:e8718349682c1b7f26ccfe",
  measurementId: "G-8B9GZD7KVM"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Función para verificar si el usuario es admin
const isAdmin = async (uid) => {
  if (!uid) return false;

  try {
    const userRef = doc(db, "users", uid); // Referencia al documento del usuario
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && userSnap.data().role === "admin") {
      return true; // El usuario tiene rol admin
    }
    return false;
  } catch (error) {
    console.error("Error verificando el rol del usuario:", error);
    return false;
  }
};

// Exportamos todas las instancias
export { app, db, storage, auth, addDoc, collection, isAdmin };



