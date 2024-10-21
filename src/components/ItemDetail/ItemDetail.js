import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'


const ItemDetail = ({id, products, img, category, descripcion, price, stock}) => {
    const [quantityAdded, setQuantityAdded] = useState(0)

    const { addItem } = useContext(CartContext)

    const handleOnAdd =(quantity) => {
        setQuantityAdded(quantity)

        const item = {
            id, products, price
        }

        addItem(item, quantity)
    }



    return (
        <article className='CardItem'> 
            <header className='Header'>
                <h2 className='ItemHeader'>
                    {products}
                </h2>
            </header>
            <picture>
                <img src={img} alt={products} className='ItemImg'/>
            </picture>
            <section>
                <p className='Info'>
                    Descripcion: {descripcion}
                </p>
                <p className='Info'>
                    Precio: ${price}
                </p>
            </section>
            <footer className='ItemFooter'>
                {
                    quantityAdded > 0 ? (
                        <Link to='/cart' className='Option'>Terminar Compra</Link>
                    ) : (
                        <ItemCount initial={1} stock={stock} onAdd={handleOnAdd}/>
                    )
                }
            </footer>
        </article>
    )
}

export default ItemDetail