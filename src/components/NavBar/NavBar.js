import CartWidget from "../CartWidget/CartWidget"



const NavBar = () => {

  return (
    
    <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/assets/logols.png" alt="" width="250" height="240" class="d-inline-block align-text-top" />
          COOPERATIVA LA SOBERANA
      </a>
    </div>
  
      

    <button type="button" class="btn btn-outline-secondary">Nuestros Productos</button>
    <button type="button" class="btn btn-outline-secondary">Ofertas de la semana</button>
    
    
      
      <CartWidget/>

    </nav>
  );
}

export default NavBar;