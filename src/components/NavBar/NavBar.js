import CartWidget from "../CartWidget/CartWidget"
const NavBar = () => {

  return (
    <nav>
      <h3>COOPERATIVA LA SOBERANA</h3>

      <div>

      <button>Productos</button>
      <button>Ofertas de la semana</button>

      </div>
      <CartWidget/>

    </nav>
  );
}

export default NavBar;