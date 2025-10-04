import React from 'react';

function ComboCard({ title, description, image, alt, reverse }) {
  if (reverse) {
    return (
      <>
        <div className="card">
          <div className="desc-combo">
            <p className="combo-title">{title}</p>
            <br />
            <p>{description}</p>
            <button className="main-button">Ordenar</button>
          </div>
          <div className="img-combo">
            <img src={image} alt={alt} width="400" height="250" />
          </div>
        </div>
        <hr />
      </>
    );
  } else {
    return (
      <>
        <div className="card">
          <div className="img-combo">
            <img src={image} alt={alt} width="400" height="250" />
          </div>
          <div className="desc-combo">
            <p className="combo-title">{title}</p>
            <br />
            <p>{description}</p>
            <button className="main-button">Ordenar</button>
          </div>
        </div>
        <hr />
      </>
    );
  }
}

export default ComboCard;