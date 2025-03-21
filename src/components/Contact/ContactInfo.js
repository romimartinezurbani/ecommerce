import React from "react";
import './ContactInfo.css';
import instagramIcon from '../Assets/instagram.png';
import facebookIcon from '../Assets/facebook.png';
import whatsappIcon from '../Assets/whatsapp.png';

const ContactInfo = () => {

    return (
        
    <div className="contact-info container">
      <h2>Contacto</h2>
      <div className="contact-details">
        <p>Dirección: RUTA NACIONAL N°8, KM 594, ZONA RURAL RIO CUARTO, CORDOBA, ARGENTINA</p>
        <p>Teléfono: +54 9 3584 11-8192</p>
        <p>Correo: lasoberanacoop@gmail.com</p>
      </div>

      <h3>Encontranos en redes sociales</h3>
      <div className="social-links">
        <a href="https://www.instagram.com/lasoberanacoop/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="icon" />
        </a>
        <a href="https://www.facebook.com/lasoberana.coop/" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" className="icon" />
        </a>
        <a href="https://wa.me/5493584118192" target="_blank" rel="noopener noreferrer">
          <img src={whatsappIcon} alt="WhatsApp" className="icon" />
        </a>
      </div>
    </div>
   
  );
};

export default ContactInfo;

