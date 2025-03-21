import './ItemDetail.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useFirebaseImage } from '../../hooks/useFirebaseImage'; // Hook reutilizable para imágenes

const ItemDetail = ({ id, products, imageName, category, descripcion, price, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useContext(CartContext);
  const [count, setCount] = useState(1);
  const imgUrl = useFirebaseImage(imageName); // Utiliza el hook para obtener la URL

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleOnAdd = () => {
    if (stock === 0) return; // Evitar agregar si no hay stock
    setQuantityAdded(count);
    const item = { id, products, price };
    addItem(item, count);
  };

  return (
    <article className="CardItem">
      <header className="Header">
        <h2 className="ItemHeader">{products}</h2>
      </header>
      <picture>
        {imgUrl ? (
          <img src={imgUrl} alt={products} className="ItemImg" />
        ) : (
          <p>Cargando imagen...</p>
        )}
      </picture>
      <section>
        <p className="Info">Descripción: {descripcion}</p>
        <p className="Info">Precio: ${price}</p>
        {stock === 0 && <p className="NoStock">Sin stock disponible</p>} {/* Mensaje de sin stock */}
      </section>
      <footer className="ItemFooter">
        {quantityAdded > 0 ? (
          <Link to="/cart" className="Option">
            Terminar Compra
          </Link>
        ) : (
          <div>
            <div className="contador">
              <button onClick={handleDecrement} disabled={count <= 1}>
                -
              </button>
              <span className='count'>{count}</span>
              <button onClick={handleIncrement} disabled={count >= stock}>
                +
              </button>
            </div>
            <button 
              onClick={handleOnAdd} 
              className="Option" 
              disabled={stock === 0} // Deshabilitar si no hay stock
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </footer>
    </article>
  );
};

export default ItemDetail;




                
      