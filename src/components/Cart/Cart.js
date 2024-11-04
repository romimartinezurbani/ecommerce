import './Cart.css'
import { useContext } from 'react'
import { CartContext } from './../../context/CartContext'
import { Link } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'

const Cart = () => {
    const { cart, clearCart, totalQuantity, total} = useContext(CartContext)


    if(totalQuantity === 0) {
        return (
            <div>
                <h1>No hay productos en el carrito</h1>
                <Link to="/" className='Option'>Productos</Link>
            </div>
        )
    }
    return(
        <div>
            { cart.map(p=> <CartItem key={p.id} {...p}/>) }
            <h3>TOTAL: ${total}</h3>
            <button onClick={() => clearCart()} className='Button'>Limpiar Carrito</button>
            <Link to='/terminar' className='Option'>Terminar Compra</Link>
        </div>
    )
}

export default Cart
