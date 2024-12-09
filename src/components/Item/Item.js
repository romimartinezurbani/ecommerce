
import { Link } from 'react-router-dom';
import { useFirebaseImage } from '../../hooks/useFirebaseImage';

const Item = ({ id, product, price, imageName, stock, descripcion }) => {
  const imgUrl = useFirebaseImage(imageName); // Utiliza el hook reutilizable

  return (
    <article className="CardItem">
      <header className="Header">
        <h2>{product}</h2>
      </header>
      <picture>
        {imgUrl ? (
          <img src={imgUrl} alt={product} className="ItemImg" />
        ) : (
          <p>Cargando imagen...</p>
        )}
      </picture>
      <section>
        <p className="Info">Precio: ${price}</p>
        <p className="Info">Stock disponible: {stock}</p>
      </section>
      <footer className="ItemFooter">
        <Link to={`/item/${id}`} className="Option">
          Ver detalle
        </Link>
      </footer>
    </article>
  );
};

export default Item;

