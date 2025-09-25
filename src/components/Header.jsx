import React from 'react';

function Header() {
  return (
    <header className="main-header">
      <h1 className="header-title">
        <a href="#" className="header-links">Pizza Delicia</a>
      </h1>
      <ul className="header-menu">
        <li><a href="#" className="header-links">Acerca de nosotros</a></li>
        <li><a href="#" className="header-links">carrito</a></li>
      </ul>
    </header>
  );
}

export default Header;