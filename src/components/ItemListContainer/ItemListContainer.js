import { useState, useEffect } from "react"
import ItemList from '../ItemList/ItemList' 
import {Form, useParams} from 'react-router-dom'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase' 

const ItemListContainer = ({greeting}) => {

    const [products, setProducts] = useState([{id:"", price: 0, product: "", stock: 0}])
    const [loading, setLoading] = useState(true)

    const { categoryId} = useParams()

    useEffect(() => {
        console.log(db)
        setLoading(true)

        const collectionRef = categoryId 
        ? query(collection(db, 'products'), where('category', '==', categoryId))
        :collection(db, 'products')

        getDocs(collectionRef)
        .then(response => {
            const productsAdapted = response.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data }
            })
            setProducts(productsAdapted)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        console.log(products)

    }, [products])
    

    return (
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer