import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { id, title, description, image, price, sizes } = product;

  // 💡 Lógica para determinar el precio a mostrar en la tarjeta
  let displayPrice;
  if (sizes) {
    // Si es una pizza, toma el precio más bajo (el valor del primer tamaño, que asumimos es Chica)
    const firstSizePrice = Object.values(sizes)[0];
    displayPrice = `Desde $${firstSizePrice} MXN`;
  } else {
    // Si es otro producto (postre, bebida), usa el precio simple
    displayPrice = `$${price} MXN`;
  }

  return (
    <div className="product-card">
      <Link to={`/producto/${id}`} className="product-link">
        <div className="product-card-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{title}</h3>
          <p className="product-card-description">{description}</p>
          <p className="product-card-price">{displayPrice}</p> {/* Usa el precio calculado */}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;