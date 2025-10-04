import React from 'react';
import { Link } from 'react-router-dom';
// Nota: Puedes reutilizar los componentes HeroSection, ComboSection, etc. aquí si los mueves a common/
// Por simplicidad, he dejado el código de la Home Page directamente en el Page Component.

function HomePage() {
  const promoSemana = {
    id: 99,
    title: "2 pizzas medianas de 2 ingredientes",
    description: "Llévate 2 pizzas medianas de 2 ingredientes a tan solo $180 pesos",
    image: "https://cdn7.kiwilimon.com/recetaimagen/41724/960x640/57505.jpg.jpg",
  };
  
  const comboSemana = {
    id: 100,
    title: "Combo de la Para estas fiestas patrias",
    description: "2 pizzas mexicanas, 1 orden de nachos, salsa macha y un refresco de 2 lts a solo $240 pesos",
    image: "https://web.didiglobal.com/_next/image/?url=https%3A%2F%2Fimg0.didiglobal.com%2Fstatic%2Fsoda_public%2Fimg_9c79865e66d44bb79f9d2ac458688a3e.JPG4_3&w=3840&q=75",
  };

  return (
    <div className="home-page-container">
      {/* Sección Hero */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>La Pizza Delicia</h1>
          <p>Nos reinventamos para brindar una mejor experiencia</p>
          <Link to="/menu" className="btn btn-hero-menu">Menú</Link>
        </div>
      </div>

      <div className="home-content page-padding">
        {/* Promociones y Combos */}
        <section className="promotions-section">
          <div className="promo-item promo-first">
            <div className="promo-description">
              <h2>{promoSemana.title}</h2>
              <p>{promoSemana.description}</p>
              <button className="btn btn-secondary">Ordenar</button>
            </div>
            <div className="promo-image">
              <img src={promoSemana.image} alt={promoSemana.title} />
            </div>
          </div>

          <div className="promo-item promo-second">
            <div className="promo-image">
              <img src={comboSemana.image} alt={comboSemana.title} />
            </div>
            <div className="promo-description">
              <h2>{comboSemana.title}</h2>
              <p>{comboSemana.description}</p>
              <button className="btn btn-secondary">Ordenar</button>
            </div>
          </div>
        </section>

        {/* Comentarios Destacados */}
        <section className="comments-section">
          <h2>Comentarios destacados</h2>
          <div className="comments-grid">
            {["Nombre de usuario #1", "Nombre de usuario #2", "Nombre de usuario #3", "Nombre de usuario #4"].map((user, index) => (
              <div key={index} className="comment-card">
                <span className="comment-icon">👤</span>
                <h4>{user}</h4>
                <p>Cuerpo del comentario</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;