import './CheckoutForm.css'
import { useState } from 'react'
import { addDoc, collection, query, where, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { CartContext } from '../../context/CartContext'

const CheckoutForm = ({ onConfirm }) => {
    const [ name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [adress, setAdress] = useState('')

    const handleConfirm = (event) => {
        event.preventDefault()

        const userData ={
            name, phone, adress
        }
        onConfirm(userData)
    }

    return (
        <div className='Container'>
            <form onSubmit={handleConfirm} className='Form'>
            <label className='Label'>
                Nombre
                <input 
                className='Input'
                type='text'
                value={name}
                onChange={({ target}) => setName(target.value)}
                />    
            </label> 
            <label className='Label'>
                Telefono
                <input 
                className='Input'
                type='text'
                value={phone}
                onChange={({ target}) => setPhone(target.value)}
                />    
            </label> 
            <label className='Label'>
                Direccion
                <input 
                className='Input'
                type='text'
                value={adress}
                onChange={({ target}) => setAdress(target.value)}
                />    
            </label> 
            <div className='Label'>
                <button type='submit' className='Button'>Crear Orden</button>
            </div>

            </form>
              

        </div>

    )
}


export default CheckoutForm
