import './NavBar.css';
import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from 'react-router-dom';
import logo from '../CartWidget/assets/logo.png';

const NavBar = () => {
  return (
    <nav className='NavBar'>
      <Link to='/'>
        <div className="logo-container">
          <img src={logo} alt="Logo" className='logo' />
          <h3>Cooperativa La Soberana</h3>
        </div>
      </Link>

      <div className='Categories'>
        <NavLink to={`/About`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>¿Quiénes somos?</NavLink>
        
        <div className="dropdown">
          <NavLink to="#" className={({ isActive }) => isActive ? 'ActiveOption dropdown-btn' : 'Option dropdown-btn'}>
            Nuestros Productos
          </NavLink>
          <div className="dropdown-content">
            <NavLink to={`/category/Cerdo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Cerdo</NavLink>
            <NavLink to={`/category/Chorizos y Salamines`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Chorizos y Salamines</NavLink>
            <NavLink to={`/category/Huevos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Huevos</NavLink>
            <NavLink to={`/category/Lechon`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Lechon</NavLink>
            <NavLink to={`/category/Milanesas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Milanesas</NavLink>
            <NavLink to={`/category/Pollo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Pollo</NavLink>
            <NavLink to={`/category/Quesos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Quesos</NavLink>
          </div>
        </div>

        <NavLink to={`/category/Ofertas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Ofertas</NavLink>
        <NavLink to={`/ContactInfo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Contacto</NavLink>
      </div>
      
      <CartWidget />
    </nav>
  );
};

export default NavBar;

