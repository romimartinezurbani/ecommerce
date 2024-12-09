import './Cart.css';
import { useContext } from 'react';
import { CartContext } from './../../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

const Cart = () => {
    const { cart, clearCart, totalQuantity, totalPrice } = useContext(CartContext);

    if (totalQuantity === 0) {
        return (
            <section className="empty-cart">
                <h1>No hay productos en el carrito</h1>
                <Link to="/" className="Option">Volver a Productos</Link>
            </section>
        );
    }

    return (
        <section className="cart-container">
            <h1>Tu Carrito</h1>
            <div className="cart-items">
                {cart.map((product) => (
                    <CartItem 
                        key={product.id}
                        product={product.id}
                        price={product.price}
                        quantity={product.quantity}
                        subtotal={product.price * product.quantity}
                    />
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ${typeof totalPrice === 'function' ? totalPrice() : totalPrice}</h3>
                <button onClick={clearCart} className="Button">Limpiar Carrito</button>
                <Link to="/terminar" className="Option">Terminar Compra</Link>
            </div>
        </section>
    );
};

export default Cart;

