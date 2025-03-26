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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const product = products.find((p) => p.id === productId);
    setEditedFields(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (productId) => {
    try {
      const processedFields = { ...editedFields };

      if (processedFields.price) {
        processedFields.price = Number(processedFields.price);
        if (isNaN(processedFields.price) || processedFields.price < 0) {
          alert("El precio debe ser un número válido mayor o igual a 0.");
          return;
        }
      }

      if (processedFields.stock) {
        processedFields.stock = Number(processedFields.stock);
        if (isNaN(processedFields.stock) || processedFields.stock < 0) {
          alert("El stock debe ser un número válido mayor o igual a 0.");
          return;
        }
      }

      const productDoc = doc(db, "products", productId);
      await updateDoc(productDoc, processedFields);

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, ...processedFields } : product
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
        <p className="mb-6">Bienvenido, {user?.email}</p>
        <ExportButton />

        <h2 className="text-2xl font-semibold mt-6 mb-4">Listado de Productos</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Descripción</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input type="text" name="name" value={editedFields.name || ""} onChange={handleChange} className="border p-1 rounded" />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input type="text" name="category" value={editedFields.category || ""} onChange={handleChange} className="border p-1 rounded" />
                    ) : (
                      product.category
                    )}
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input type="number" name="price" value={editedFields.price || ""} onChange={handleChange} className="border p-1 rounded" />
                    ) : (
                      <span>${product.price}</span>
                    )}
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input type="number" name="stock" value={editedFields.stock || ""} onChange={handleChange} className="border p-1 rounded" />
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <input type="text" name="description" value={editedFields.description || ""} onChange={handleChange} className="border p-1 rounded" />
                    ) : (
                      product.description
                    )}
                  </td>
                  <td className="p-3">
                    {editingProductId === product.id ? (
                      <>
                        <button onClick={() => handleSave(product.id)} className="mr-2 bg-green-500 text-white px-3 py-1 rounded">Guardar</button>
                        <button onClick={() => setEditingProductId(null)} className="bg-red-500 text-white px-3 py-1 rounded">Cancelar</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(product.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Editar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

