import './ItemList.css';
import Item from '../Item/Item';

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="CardList"> {/* Cambié ListGroup a CardList */}
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ItemList;
