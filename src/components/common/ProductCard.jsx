import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { id, title, description, price, image } = product;

  return (
    <div className="product-card">
      <Link to={`/producto/${id}`} className="product-link">
        <div className="product-card-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{title}</h3>
          <p className="product-card-description">{description}</p>
          <p className="product-card-price">${price} MXN</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;