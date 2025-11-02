import React from 'react';

function ComboCard({ title, description, image, alt, reverse, price, includes, onAddToCart }) {
  return (
    <div className={`combo-card mb-5 ${reverse ? 'flex-row-reverse' : ''}`}>
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={image}
            alt={alt}
            className="img-fluid rounded"
            style={{ height: '300px', width: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="col-md-6">
          <div className="combo-info p-4">
            <h3 className="combo-title mb-3">{title}</h3>
            
            <p className="combo-description text-muted mb-3">
              {description}
            </p>
            
            {includes && (
              <ul className="combo-includes mb-3">
                {includes.map((item, index) => (
                  <li key={index} className="text-muted">✓ {item}</li>
                ))}
              </ul>
            )}
            
            <div className="combo-price-section mb-3">
              <h4 className="combo-price text-primary mb-2">
                ${price}.00 MXN
              </h4>
              <p className="text-success fw-bold small">
                ¡Precio especial de combo!
              </p>
            </div>
            
            <button 
              className="btn btn-add-cart btn-lg w-100"
              onClick={onAddToCart}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '12px 24px'
              }}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComboCard;