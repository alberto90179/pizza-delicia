import React from 'react';

function Footer() {
  return (
    <footer className="footer-container">
      {/* Tarjeta 1: Redes Sociales */}
      <div className="footer-card footer-social">
        <p>Síguenos en redes sociales</p>
        <div className="social-icons">
          
          {/* Facebook */}
          <a href="https://www.facebook.com/LaPizzaDelicia" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" 
              alt="Facebook" 
              className="social-icon-img"
            />
          </a>
          
          {/* Instagram */}
          <a href="https://www.instagram.com/LaPizzaDelicia" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=nj0Uj45LGUYh&format=png&color=000000" 
              alt="Instagram" 
              className="social-icon-img"
            />
          </a>
          
          {/* YouTube */}
          <a href="https://www.youtube.com/@LaPizzaDelicia" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=p4rU35mvmXMQ&format=png&color=000000" 
              alt="YouTube" 
              className="social-icon-img"
            />
          </a>
        </div>
      </div>

      {/* Tarjeta 2: Información del Desarrollador */}
      <div className="footer-card footer-developer">
        Desarrollado por: <br /><br />
            &copy; Misael Villanueva Méndez <br />&copy; Alberto Amézquita Ayón
            <br />&copy; Fernando Córdova Mendoza
      </div>


      {/* Tarjeta 3: Ubicación y Contacto */}
      <div className="footer-card footer-location">
        <p>Ubícanos en:</p>
        <p>Av. Principal No. 123</p>
        <p>Colonia Centro, Zapopan, Jalisco, México</p>
        <p>Tel: 3336658545</p>
      </div>
    </footer>
  );
}

export default Footer;