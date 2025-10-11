import React from 'react';
import { Link } from 'react-router-dom';

function SuggestionCard({ product }) {
  
  // 1. Caso especial: Placeholder para "Ver más opciones del menú"
  // Si el objeto 'product' está vacío o no tiene título, renderiza el placeholder.
  if (!product || !product.title) {
    return (
        // El enlace lleva a la página de Menú
        <Link to="/menu" className="suggestion-card placeholder-card">
            <div className="placeholder-icon">
                {/* Usamos un span para el signo más (+) */}
                <span className="plus-sign">+</span>
            </div>
            <p className="placeholder-text">Ver más opciones del menú</p>
        </Link>
    );
  }

  // 2. Caso estándar: Producto real
  const { title, description, price, image, id } = product;

  return (
    // El enlace lleva al detalle del producto sugerido
    <Link to={`/producto/${id}`} className="suggestion-card">
      <div className="suggestion-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="suggestion-card-content">
        <h4 className="suggestion-card-title">{title}</h4>
        {/* Usamos la descripción corta del producto */}
        <p className="suggestion-card-description">{description}</p> 
        <p className="suggestion-card-price">${price} MXN</p>
      </div>
    </Link>
  );
}

export default SuggestionCard;