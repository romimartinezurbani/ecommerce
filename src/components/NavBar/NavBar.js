import './NavBar.css';
import React from 'react';
import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from 'react-router-dom';
import logo from '../CartWidget/assets/logo.png';

const NavBar = () => {

  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDropdown = () => {

    setIsOpen(!isOpen)

  }



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
            <NavLink to={`/category/Cerdo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Cerdo</NavLink>
            <NavLink to={`/category/Chorizos y Salamines`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Chorizos y Salamines</NavLink>
            <NavLink to={`/category/Huevos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Huevos</NavLink>
            <NavLink to={`/category/Lechon`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Lechon</NavLink>
            <NavLink to={`/category/Milanesas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Milanesas</NavLink>
            <NavLink to={`/category/Pollo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Pollo</NavLink>
            <NavLink to={`/category/Quesos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Quesos</NavLink>
          </div>
        </div>

        <NavLink to={`/category/Ofertas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Ofertas</NavLink>
        <NavLink to={`/ContactInfo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Contacto</NavLink>
        <NavLink to={`/AdminPanel`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Administración</NavLink>
      </div>
      
      <div className='container-burguer-cart'>
        <div className='Categories-responsive burguer-menu'>

          <button onClick={toggleDropdown}>
          <i className="fa-solid fa-bars"></i>
          </button>

          {
            isOpen && 
            <div className='dropdown-burguer'>
            <NavLink to={`/About`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>¿Quiénes somos?</NavLink>
          
            <div className="dropdown">
              <NavLink to="#" className={({ isActive }) => isActive ? 'ActiveOption dropdown-btn' : 'Option dropdown-btn'}>
                Nuestros Productos
              </NavLink>
              <div className="dropdown-content">
                <NavLink to={`/category/Cerdo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Cerdo</NavLink>
                <NavLink to={`/category/Chorizos y Salamines`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Chorizos y Salamines</NavLink>
                <NavLink to={`/category/Huevos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Huevos</NavLink>
                <NavLink to={`/category/Lechon`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Lechon</NavLink>
                <NavLink to={`/category/Milanesas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Milanesas</NavLink>
                <NavLink to={`/category/Pollo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Pollo</NavLink>
                <NavLink to={`/category/Quesos`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option option-dropdown'}>Quesos</NavLink>
              </div>
            </div>
    
            <NavLink to={`/category/Ofertas`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Ofertas</NavLink>
            <NavLink to={`/ContactInfo`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Contacto</NavLink>
            <NavLink to={`/AdminPanel`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Administración</NavLink>
            </div>
          }
  
        </div>

        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;

