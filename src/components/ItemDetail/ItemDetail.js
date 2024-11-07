import './ItemDetail.css'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../../config/firebase'

const storage = getStorage(app)

const ItemDetail = ({id, products, imgName, category, descripcion, price, stock}) => {
  const [quantityAdded, setQuantityAdded] = useState(0)
  const { addItem } = useContext(CartContext)
  const [count, setCount] = useState(1)
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const imgRef = ref(storage, `images/${imgName}`)
    getDownloadURL(imgRef)
      .then((url) => {
        setImgUrl(url)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [imgName])

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
        <h2 className='ItemHeader'>{products}</h2>
      </header>
      <picture>
        <img src={imgUrl} alt={products} className='ItemImg'/>
      </picture>
      <section>
        <p className='Info'> Descripcion: {descripcion} </p>
        <p className='Info'> Precio: ${price} </p>
      </section>
      <footer className='ItemFooter'>
        {quantityAdded > 0 ? (
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
)}
</footer>
</article>
)
}

export default ItemDetail



                
      