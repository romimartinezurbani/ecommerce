
import './ItemCount.css';
import {useState} from "react";


const  ItemCount = ({ stock, initial, onAdd }) => {

    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        console.log(quantity)
        console.log(stock)
        if (quantity < stock) {
            setQuantity(prevQuantity => prevQuantity+ 1);
        }
    }


    const decrement = () => {
        console.log(quantity)
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            
        }
    
    };

    return (
        <div className='Counter'>
            <div className='Controls'>
            <button type="button" className="btn" onClick={increment}>+</button>
              
                <h4 className='Number'>{quantity} </h4>
                <button type="button" className="btn" onClick={decrement}>-</button>
            </div>
            <div>
                <button type='Button'className='btnagregar' onClick={() => onAdd(quantity)} disabled={!stock}>
                    Agregar al carrito
                </button>
            </div>

        </div>
    );


}

export default ItemCount