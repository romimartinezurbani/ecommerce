import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({id, product, price, img, stock, descripcion}) => {

    return (
        <article className="CardItem">
            <header className="Header">
                <h2> 
                    {product}
                </h2>
            </header>
            <picture>
                <img src={img} alt={product} className="ItemImg"/>
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