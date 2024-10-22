import huevos from './components/CartWidget/assets/huevos.png'
import pollo from './components/CartWidget/assets/pollo.png'
import milanesas from './components/CartWidget/assets/milanesas.png'


const products = [
    {
        id: "1",
        product: "Huevos",
        price: 4500,
        image: <img src={huevos} alt="" /> ,
        category: "Huevos",
        stock: "25 maples",
        descripcion: "Maple de Huevos"
    },

    { id: "2", product: "Pollo", price: "3000 el kilo", image: <img src={pollo} alt=""/>,category: "Pollo",stock: "30 kilos", descripcion: "Pollo entero" },
    { id: "3", product: "Milanesas", price: "5500 el kilo", image: <img src={milanesas} alt=""/>, category: "Cerdo",stock: "20 kilos", descripcion: "Milanesas de cerdo" },


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
  


