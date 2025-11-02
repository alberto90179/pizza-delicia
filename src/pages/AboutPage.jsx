import React from "react";
import ContactForm from "../components/form/ContactForm"; // Importa el formulario

function AboutPage() {
  return (
    <div className="about-page-container page-padding">
      {/* Sección Conócenos */}
      <section className="conocenos-section">
        <div className="conocenos-text">
          <h1>Conócenos</h1>
          <p className="large-text">Tenemos muchos años deleitando paladares</p>
          <p>
            Somos una empresa familiar dedicada a la preparación de pizzas
            artesanales, respetando las recetas originales de Italia. Más de 10
            años de experiencia y una gran cartera de clientes nos respaldan.
          </p>
          <p>
            Nos ubicamos en Zapopan, Jalisco, en el corazón de la ciudad, para
            que puedas visitarnos con facilidad.
          </p>
          <p>
            Ven y visítanos o pide tu pizza directamente desde este sitio web.
            ¡Verás que es muy fácil!
          </p>
        </div>
        <div className="conocenos-image">
          <img
            src="https://mariamexicana.net/wp-content/uploads/2023/06/480%C2%B0-Pizza-Lounge-300x300.jpg"
            alt="Fachada de La Pizza Delicia"
            loading="lazy"
          />
        </div>
      </section>

      {/* Sección Contacto */}
      <section className="contact-section">
        <h2>Déjanos tu comentario</h2>
        <ContactForm />
      </section>

      {/* Sección Eventos */}
      <section className="events-section">
        <h2>Reservaciones para eventos</h2>
        <p className="event-phone">
          Llámanos al <strong>33 3665 8545</strong> para apartar tu fecha.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
