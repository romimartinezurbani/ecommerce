import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase"; 
import ExportButton from "../AdminPanel/ExportButton";

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const navigate = useNavigate();

  // Autenticación
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

  // Obtener productos de Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Manejar inicio de edición
  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const product = products.find((p) => p.id === productId);
    setEditedFields(product);
  };

  // Manejar cambios en los campos editados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (productId) => {
    try {
      // Filtrar campos válidos
      const validFields = Object.fromEntries(
        Object.entries(editedFields).filter(([_, value]) => value !== "" && value !== undefined)
      );
  
      console.log("Campos a actualizar:", validFields); // <-- Revisa qué datos estás enviando
  
      // Actualizar en Firestore
      const productDoc = doc(db, "products", productId);
      await updateDoc(productDoc, validFields);
  
      // Actualizar el estado local
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, ...validFields } : product
        )
      );
  
      setEditingProductId(null);
      alert("Producto actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };
  
  
  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user?.email}</p>
      <ExportButton />

      <h2>Listado de Productos</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedFields.name || ""}
                    onChange={handleChange}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    name="category"
                    value={editedFields.category || ""}
                    onChange={handleChange}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editedFields.price || ""}
                    onChange={handleChange}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="number"
                    name="stock"
                    value={editedFields.stock || ""}
                    onChange={handleChange}
                  />
                  
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editedFields.description || ""}
                    onChange={handleChange}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <>
                    <button onClick={() => handleSave(product.id)}>Guardar</button>
                    <button onClick={() => setEditingProductId(null)}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product.id)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

