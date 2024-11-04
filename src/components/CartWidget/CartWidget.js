import cart from './assets/carrito.png'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext)

    return (
    <div>
        <Link to='/cart' className='CartWitget'>
        <img src={cart} alt="" width="25" height="24
        "/>
        {totalQuantity}

        </Link>


    </div>
    )

}
export default CartWidget