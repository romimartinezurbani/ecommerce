import './ItemDetail.css'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

const ItemDetail = ({id, products, img, category, descripcion, price, stock}) => {
    const [quantityAdded, setQuantityAdded] = useState(0)
    const { addItem } = useContext(CartContext)
    const [count, setCount] = useState(1)
  
    const handleDecrement = () => {
      if (count > 1) {
        setCount(count - 1)
      }
    }
  
    const handleIncrement = () => {
      if (count < stock) {
        setCount(count + 1)
      }
    }
    const handleOnAdd = () => {
        setQuantityAdded(count)
        const item = { id, products, price }
        addItem(item, count)
      }
    
      return (
        <article className='CardItem'>
          <header className='Header'>
            <h2 className='ItemHeader'> {products} </h2>
          </header>
          <picture>
            <img src={img} alt={products} className='ItemImg'/>
          </picture>
          <section>
            <p className='Info'> Descripcion: {descripcion} </p>
            <p className='Info'> Precio: ${price} </p>
          </section>
          <footer className='ItemFooter'>
            { quantityAdded > 0 ? (
              <Link to='/cart' className='Option'>Terminar Compra</Link>
            ) : (
                <div>
                <div className="contador">
              <button onClick={handleDecrement}>-</button>
              <span>{count}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
            <button onClick={handleOnAdd} className='Option'>Agregar al carrito</button>
          </div>
        ) 
        }
      </footer>
    </article>
  )
}

export default ItemDetail

                
      