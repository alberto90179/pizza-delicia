import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id, name, description, image_link, prices, size, price } = product;

  // 💡 Lógica para determinar el precio a mostrar en la tarjeta
  let displayPrice;
  if (prices) {
    // Si es una pizza, toma el precio más bajo (el valor del primer tamaño, que asumimos es Chica)
    const firstSizePrice = Object.values(prices)[0];
    displayPrice = `Desde $${firstSizePrice.price} MXN`;
  } else {
    // Si es otro producto (postre, bebida), usa el precio simple
    displayPrice = `$${price} MXN`;
  }

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-link">
        <div className="product-card-image">
          <img src={product.image_link} alt={name} />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-description">{product.description}</p>
          <p className="product-card-price">{displayPrice}</p>{" "}
          {/* Usa el precio calculado */}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
