import React from "react";
import { Link } from "react-router-dom";

function SuggestionCard({ product }) {
  // 1. Caso especial: Placeholder para "Ver más opciones del menú"
  if (!product || !product.title) {
    return (
      <div style={{ width: "473px" }}>
        <Link
          to="/menu"
          className="suggestion-card placeholder-card"
          style={{
            textDecoration: "none",
            color: "black",
            display: "block",
          }}
        >
          <div
            className="placeholder-icon text-center"
            style={{
              height: "275px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <span className="plus-sign fs-1" style={{ color: "#6c757d" }}>
              +
            </span>
          </div>
          <p
            className="placeholder-text mt-3 text-center"
            style={{ fontSize: "1.5rem", color: "#6c757d" }}
          >
            Ver más opciones del menú
          </p>
        </Link>
      </div>
    );
  }

  // 2. Caso estándar: Producto real
  const { title, description, price, image, id, category } = product;

  // Verificación adicional: si no existe category, evitar error
  const categoryPath = category || "pizza"; // Por defecto 'pizza'

  return (
    <div style={{ width: "473px" }}>
      <Link
        to={`/producto/${categoryPath}/${id}`}
        className="suggestion-card"
        style={{
          textDecoration: "none",
          color: "black",
          display: "block",
        }}
      >
        <div className="suggestion-card-image">
          <img
            src={image}
            alt={title}
            width="473"
            height="275"
            className="rounded"
            style={{
              objectFit: "cover",
              display: "block",
              width: "100%",
              height: "275px",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/473x275?text=Imagen+no+disponible";
            }}
          />
        </div>
        <div className="suggestion-card-content" style={{ padding: "15px 0" }}>
          <h4
            className="suggestion-card-title"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            {title}
          </h4>
          <p
            className="suggestion-card-description"
            style={{
              width: "100%",
              color: "#6c757d",
              marginBottom: "10px",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
          <p
            className="suggestion-card-price"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#000",
              margin: 0,
            }}
          >
            ${price}.00 MXN
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SuggestionCard;
