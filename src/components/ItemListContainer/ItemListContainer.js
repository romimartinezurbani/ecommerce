import { useState, useEffect } from "react";
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);  // Inicializar como un arreglo vacío
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();  // Obtenemos el categoryId desde la URL
    
    // Asegúrate de que categoryId tiene el valor correcto
    useEffect(() => {
        console.log("URL actual:", window.location.pathname);
        console.log("Category ID:", categoryId);  // Verifica el valor del categoryId en la URL


        setLoading(true);

        // Si hay categoryId, filtramos por categoría, si no, obtenemos todos los productos
        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))  // Filtro por categoría
            : collection(db, 'products');  // Sin filtro, obtenemos todos los productos

        // Realizamos la consulta a Firestore
        getDocs(collectionRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);  // Actualizamos el estado con los productos obtenidos
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);  // Dependencia de categoryId para que se ejecute cuando cambie

    // Si la consulta está en proceso de carga, mostramos "Cargando..."
    if (loading) {
        return <p>Loading...</p>;
    }

    // Si no hay productos, mostramos el mensaje de "No hay productos disponibles"
    if (products.length === 0) {
        return <p>No hay productos disponibles en esta categoría.</p>;
    }

    // Si hay productos, los mostramos usando ItemList
    return (
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products} />  {/* Pasamos los productos al componente ItemList */}
        </div>
    );
};

export default ItemListContainer;

