import huevos from './components/CartWidget/assets/huevos.png'
import pollo from './components/CartWidget/assets/pollo.png'
import milanesas from './components/CartWidget/assets/milanesas.png'
import quesosardopim from './components/CartWidget/assets/Queso Sardo con pimienta.jpg'
import quesocremoso from './components/CartWidget/assets/Queso Cremoso.jpeg'


const products = [
    {
        id: "1",
        product: "Huevos",
        price: 4500,
        image: <img src={huevos} alt="" /> ,
        category: "Huevos",
        stock: 25,
        descripcion: "Maple de Huevos"
    },

    { id: "2", product: "Pollo", price: 3000, image: <img src={pollo} alt=""/>,category: "Pollo",stock: 30, descripcion: "Pollo entero" },
    { id: "3", product: "Milanesas de cerdo", price: 5500, image: <img src={milanesas} alt=""/>, category: "Cerdo",stock: 20, descripcion: "Milanesas de cerdo" },
    { id: "4", product: "Sardo con pimienta", price: 10000, image: <img src={quesosardopim} alt=""/>, category: "Quesos",stock: 20, descripcion: "Queso Sardo con pimienta" },
    { id: "5", product: "Cremoso", price: 7000, image: <img src={quesocremoso} alt=""/>, category: "Quesos",stock: 20, descripcion: "Queso Cremoso" },

]

export const getProducts = () => {
    return new Promise ((resolve) => {
        setTimeout (() => {
            resolve (products)
        }, 500)
    })
}

export const getProductsById = (productId) => {
    return new Promise ((resolve) => {
        setTimeout (() => {
            resolve (products.find(prod => prod.id === productId))       
    }, 500)
})
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = products.filter(prod => prod.category === categoryId);
        resolve(filteredProducts);
      }, 500);
    });
  };
  


