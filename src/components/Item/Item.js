import { Link } from 'react-router-dom';
import './Item.css';
import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


const storage = getStorage();

const Item = ({ id, product, price, imageName, stock, descripcion }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storageRef = ref(storage, `images/${imageName}`);
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error al obtener la URL de descarga:', error);
      });
  }, [imageName]);
  return (
    <article className="CardItem">
      <header className="Header">
        <h2>{product}</h2>
      </header>
      <picture>
        <img src={imageUrl} alt={product} className="ItemImg" />
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