
import './ItemCount.css';
import {useState} from "react";


const  ItemCount = ({ stock, Initial, onAdd }) => {

    const [quantity, setQuantity] = useState(Initial);

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    }


    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            
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
                <button type='Button'className='btnagregar' onclick={() => onAdd(quantity)} disabled={!stock}>
                    Agregar al carrito
                </button>
            </div>

        </div>
    );


}

export default ItemCount