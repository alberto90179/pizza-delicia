import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      {/* Título principal con enlace a la Home Page (/) */}
      <h1 className="header-title">
        <Link to="/" className="header-links header-link-logo">La Pizza Delicia</Link>
      </h1>

      {/* Menú de navegación */}
      <ul className="header-menu">
        {/* Enlace "Menú" */}
        <li><Link to="/menu" className="header-links">MENÚ</Link></li>
        
        {/* Enlace "Acerca de Nosotros" (Anteriormente "Acerca de nosotros") */}
        <li><Link to="/conocenos" className="header-links">ACERCA DE NOSOSTROS</Link></li>
        
        {/* Enlace de "Carrito" */}
        <li>
          <Link 
            to="/carrito" 
            className="header-links header-cart-link"
            aria-label="Ir al carrito de compras"
          >
            <span className="cart-icon" role="img" aria-hidden="true">🛒</span> 
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;