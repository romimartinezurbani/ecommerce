import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { CartProvider } from './context/CartContext'
import About from './components/About/About'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import ContactInfo from './components/Contact/ContactInfo'
import AdminPanel from './components/AdminPanel/AdminPanel'
import Login from './components/Login/login'


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <CartProvider>
        <NavBar />
        
        <Routes>
          <Route path='/about' element={<About/>}/>
          <Route path='/' element={<ItemListContainer/>}/>
          <Route path='/category/:categoryId' element={<ItemListContainer/>}/>
          <Route path='/item/:itemId' element={<ItemDetailContainer/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/terminar' element={<Checkout/>}/>
          <Route path='/contactInfo' element={<ContactInfo/>}/>
          <Route path='/adminPanel' element={<AdminPanel/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
        </Routes>
        </CartProvider>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
