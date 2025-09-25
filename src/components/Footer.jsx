import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <hr />
      <footer className="footer-container">
        <div className="footer-card">
          <p>Siguenos en redes sociales</p>
          <br /><br />
          <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="facebook" /><img src="https://img.icons8.com/?size=100&id=nj0Uj45LGUYh&format=png&color=000000" alt="instagram" /><img
            src="https://img.icons8.com/?size=100&id=p4rU35mvmXMQ&format=png&color=000000"
            alt="youtube"
          />
        </div>
        <div className="footer-card">
          <p>
            Desarrollado por: <br /><br />
            &copy; Misael Villanueva Méndez <br />&copy; Alberto Amézquita Ayón
            <br />&copy; Fernando Córdova Mendoza
          </p>
        </div>
        <div className="footer-card"><p>Ubícanos en:</p></div>
      </footer>
    </div>
  );
}

export default Footer;