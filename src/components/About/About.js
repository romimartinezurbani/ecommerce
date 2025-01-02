
import './About.css';
import nosotros from '../CartWidget/assets/nosotros.jpeg';


const About = () => {
  console.log("Componente About renderizado");
 


  return (
    <div className='contenedor container'>
      <h1>¿Quiénes somos?</h1>
      
      <img src={nosotros} alt="" className="nosotros" />
      
      <p>Somos un equipo de trabajo asociados a la cooperativa La soberana que surgió como una continuidad a un proyecto de vida que se fue construyendo con los jóvenes egresados de nuestra escuela Granja Siquem con la intención de organizar y brindar posibilidades laborales para producir, comercializar y distribuir productos alimenticios en base a los recursos de su entorno.  
      Promovemos la agroecología como modo de producción, el agregado de valor basado en la industrialización de nuestros cultivos, minimizando la utilización de conservantes, saborizantes, y otros químicos de uso habitual en la industria alimenticia.
      </p>
      <p>Visión:
      Somos un modelo cooperación y sostenibilidad en la alimentación, creando un sistema alimentario más justo y accesible para todos, mientras fomentamos la educación y la conciencia sobre la alimentación saludable y el consumo responsable entre nuestros miembros y la sociedad.
      </p>
    </div>
  )
}

export default About;
