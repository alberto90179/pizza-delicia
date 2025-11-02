import React from "react";
import { Link } from "react-router-dom";
// Nota: Puedes reutilizar los componentes HeroSection, ComboSection, etc. aquí si los mueves a common/
// Por simplicidad, este componente define todo directamente.

function HomePage() {
  const promoSemana = {
    id: 99,
    title: "2 pizzas medianas de 2 ingredientes",
    description:
      "Llévate 2 pizzas medianas de 2 ingredientes a tan solo $180 pesos",
    image:
      "https://cdn7.kiwilimon.com/recetaimagen/41724/960x640/57505.jpg.jpg",
  };

  const comboSemana = {
    id: 100,
    title: "Combo para estas fiestas patrias",
    description:
      "2 pizzas mexicanas, 1 orden de nachos, salsa macha y un refresco de 2 L a solo $240 pesos",
    image:
      "https://img0.didiglobal.com/static/soda_public/img_9c79865e66d44bb79f9d2ac458688a3e.JPG4_3",
  };

  const comments = [
    {
      id: 1,
      user: "María López",
      comment:
        "Las pizzas están deliciosas y el servicio fue excelente. ¡Recomendadísimo!",
    },
    {
      id: 2,
      user: "Carlos Méndez",
      comment:
        "El combo de fiestas patrias estuvo genial, muy buena relación calidad-precio.",
    },
    {
      id: 3,
      user: "Lucía Torres",
      comment:
        "Llegó todo calientito y rápido, sin duda volveré a pedir.",
    },
    {
      id: 4,
      user: "Juan Pérez",
      comment:
        "Excelente atención al cliente, las pizzas con mucho sabor.",
    },
  ];

  return (
    <div className="home-page-container">
      {/* Sección Hero */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>La Pizza Delicia</h1>
          <p>Nos reinventamos para brindar una mejor experiencia</p>
          <Link to="/menu" className="btn btn-hero-menu">
            Ver Menú
          </Link>
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
              <img
                src={promoSemana.image}
                alt={promoSemana.title}
                loading="lazy"
              />
            </div>
          </div>

          <div className="promo-item promo-second">
            <div className="promo-image">
              <img
                src={comboSemana.image}
                alt={comboSemana.title}
                loading="lazy"
              />
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
            {comments.map((item) => (
              <div key={item.id} className="comment-card">
                <span className="comment-icon">👤</span>
                <h4>{item.user}</h4>
                <p>{item.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
