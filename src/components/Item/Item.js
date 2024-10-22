import { Link } from 'react-router-dom'
import './Item.css'
import { useEffect } from 'react'

const Item = ({id, product, price, image, stock, descripcion}) => {

    useEffect (() => {
        console.log(image.props)
    
    },[])

    return (
        <article className="CardItem">
            <header className="Header">
                <h2> 
                    {product}
                </h2>
            </header>
            <picture>
                <img src={image.props.src} alt={product} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Precio: ${price}
                </p>
                <p className="Info">
                    Stock disponible: {stock}

                </p>
            </section>
            <footer className='ItemFooter'>
                <Link to={`/item/${id}`} className='Option'>Ver detalle</Link>
            </footer>

        </article>
    )
}

export default Item