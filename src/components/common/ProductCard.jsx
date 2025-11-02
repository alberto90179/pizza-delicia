import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


const ProductCard = ({ id, name, description, image, price, category }) => {
  const [cat, setCat] = useState("");

  // ✅ Solo se actualiza cuando cambia la categoría
  useEffect(() => {
    setCat(category);
  }, [category]);

  return (
    <div className="card shadow-sm border-0 mb-3 product-card">
      <img
        src={image || "https://via.placeholder.com/250x180?text=Pizza+Delicia"}
        className="card-img-top"
        alt={name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-primary">{name}</h5>
        <p className="card-text text-muted">{description}</p>
        <p className="fw-bold mb-1">Categoría: <span className="text-secondary">{cat}</span></p>
        <p className="fw-bold">💲{price}</p>

        {/* Botones simulados para CRUD */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-sm btn-outline-success">Editar</button>
          <button className="btn btn-sm btn-outline-danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

// Validación de props
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  category: PropTypes.string.isRequired,
};

export default ProductCard;
