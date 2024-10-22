import './NavBar.css'
import CartWidget from "../CartWidget/CartWidget"
import { Link, NavLink } from 'react-router-dom';


const NavBar = () => {

  return (
    <nav className='NavBar'>
      <Link to='/'>
      <h3>Cooperativa La Soberana</h3>

      </Link>
      <div className='Categories'>
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