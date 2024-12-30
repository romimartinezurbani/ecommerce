import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExportButton from '../AdminPanel/ExportButton';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    console.log("Usuario actual:", auth.currentUser);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // Redirigir al login si no hay usuario
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user?.email}</p>
      <ExportButton/>
    </div>
  );
};

export default AdminPanel;


