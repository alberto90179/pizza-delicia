import React from "react";
import { Link } from "react-router-dom";

function SuggestionCard({ product }) {
  // 1. Caso especial: Placeholder para "Ver más opciones del menú"
  // Si el objeto 'product' está vacío o no tiene título, renderiza el placeholder.
  if (!product || !product.title) {
    return (
      // El enlace lleva a la página de Menú
      <Link
        to="/menu"
        className="suggestion-card placeholder-card"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="placeholder-icon text-center">
          {/* Usamos un span para el signo más (+) */}
          <span className="plus-sign fs-2 ">+</span>
        </div>
        <p className="placeholder-text fs-2">Ver más opciones del menú</p>
      </Link>
    );
  }

  // 2. Caso estándar: Producto real
  const { title, description, price, image, id } = product;

  return (
    // El enlace lleva al detalle del producto sugerido
    <div style={{ width: "473px" }}>
      <Link
        to={`/producto/${id}`}
        className="suggestion-card"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="suggestion-card-image">
          <img
            src={image}
            alt={title}
            width="473"
            height="275"
            className="rounded"
          />
        </div>
        <div className="suggestion-card-content">
          <h4 className="suggestion-card-title" style={{ marginTop: "10px" }}>
            {title}
          </h4>
          {/* Usamos la descripción corta del producto */}
          <p className="suggestion-card-description" style={{ width: "80%" }}>
            {description}
          </p>
          <p className="suggestion-card-price fs-4">${price} MXN</p>
        </div>
      </Link>
    </div>
  );
}

export default SuggestionCard;
