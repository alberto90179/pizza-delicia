  import React from 'react';
  import ContactForm from '../components/form/ContactForm'; // Importa el formulario

  function AboutPage() {
    return (
      <div className="about-page-container page-padding">
        <section className="conocenos-section">
          <div className="conocenos-text">
            <h1>Conócenos</h1>
            <p className="large-text">
              Tenemos muchos años deleitando paladares
            </p>
            <p>
              Somos una empresa familiar dedicada a la preparación de pizzas artesanales, respetando las recetas de origen de Italia, más de 10 años y una gran cartera de clientes nos respaldan.
            </p>
            <p>
              Nos ubicamos en Zapopan, Jal en el mero corazón de la ciudad, para que no tengas problema en visitarnos.
            </p>
            <p>
              Ven y visítanos o pide tu pizza a través de este sitio web, verás que es muy fácil.
            </p>
          </div>
          <div className="conocenos-image">
            {/* Imagen de ejemplo de la fachada */}
            <img src="https://mariamexicana.net/wp-content/uploads/2023/06/480%C2%B0-Pizza-Lounge-300x300.jpg" alt="Fachada de La Pizza Delicia" />
          </div>
        </section>

        <section className="contact-section">
          <h2>Déjanos tu comentario</h2>
          <ContactForm />
        </section>

        <section className="events-section">
          <h2>Reservaciones para eventos al número telefónico 3336658545</h2>
        </section>
      </div>
    );
  }

  export default AboutPage;