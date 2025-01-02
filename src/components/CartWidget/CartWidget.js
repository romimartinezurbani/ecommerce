import './CartWidget.css';
import cart from './assets/carrito.png';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <div className="CartWidget">
      <Link to='/cart'>
        <i class="fa-solid fa-cart-shopping"></i>
        <span>{totalQuantity}</span>
      </Link>
    </div>
  );
};

export default CartWidget;
