import './NavBar.css'
import CartWidget from "../CartWidget/CartWidget"
import { Link, NavLink } from 'react-router-dom';
import logo from '../CartWidget/assets/logo.png'


const NavBar = () => {

  return (
    

    <nav className='NavBar'>
      <Link to='/'>
      <div>
      <img src={logo} alt="" 
      className='logo'/>
      <h3>Cooperativa La Soberana</h3>
      
      </div>

      </Link>
      
      <div className='Categories'>
        <NavLink to={`/About`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>¿Quienes somos?</NavLink>
        <NavLink to={`/category/Quesos`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Quesos</NavLink>
        <NavLink to={`/category/Huevos`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Huevos</NavLink>
        <NavLink to={`/category/Pollo`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Pollo</NavLink>
        <NavLink to={`/category/Cerdo`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Cerdo</NavLink>
        <NavLink to={`/category/Otros`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Otros</NavLink>
      </div>
      <CartWidget/>

    </nav>
  );
}

export default NavBar;