import React from 'react';

function Header() {
  return (
    <header className="main-header">
      {/* Título principal con enlace */}
      <h1 className="header-title">
        <a href="#" className="header-links">Pizza Delicia</a>
      </h1>

      {/* Menú de navegación */}
      <ul className="header-menu">
        {/* Enlace "Acerca de nosotros" */}
        <li><a href="#" className="header-links">Acerca de nosotros</a></li>
        
        {/* Enlace de "Carrito" modificado para destacar */}
        <li>
          <a 
            href="#" 
            className="header-links header-cart-link" // Clase adicional para estilos específicos del carrito
            aria-label="Ir al carrito de compras" // Etiqueta para accesibilidad
          >
            {/* Ícono de Carrito (usa un emoji o un componente de ícono real) */}
            <span className="cart-icon" role="img" aria-hidden="true">🛒</span> 
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;