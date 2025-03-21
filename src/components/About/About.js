import './About.css';
import nosotros from '../CartWidget/assets/nosotros.jpeg';

const About = () => {
  console.log("Componente About renderizado");

  return (

    <div className='contenedor container'>

    <div className="contenedor">
      <h1><b>¿Quiénes somos?</b></h1>
      <img src={nosotros} alt="Nosotros" className="nosotros" />

      <div className="dynamic-box">
        <p>
          Somos un equipo de trabajo asociados a la cooperativa La soberana que surgió como una continuidad a un proyecto de vida que se fue construyendo con los jóvenes egresados de nuestra escuela Granja Siquem con la intención de organizar y brindar posibilidades laborales para producir, comercializar y distribuir productos alimenticios en base a los recursos de su entorno.
        </p>
      </div>

      <div className="dynamic-box"> 
        <p>
          <b>¿Sabías que nuestra escuela-hogar funciona hace más de 30 años?</b>
        </p>
      </div>

      <div className="dynamic-box">
        <p>
          Con la intención de organizar y brindar posibilidades laborales que integren tantos años de aprendizaje y disfrute de las tareas de campo decidimos aventurarnos en este emprendimiento.
        </p>
      </div>

      <div className="dynamic-box">
        <p>
          <b>¿Cómo se relaciona Siquem y La Soberana?</b>
          Hay un lazo invisible que se sostiene en la comunidad, atraviesa y enriquece cada proyecto.
          
        </p>
      </div>
      <div className="dynamic-box">
        <p>Gracias por ser parte, por acompañarnos. Otra economía es posible!!</p>
      </div>  


    </div>
    </div>
  );
};

export default About;


