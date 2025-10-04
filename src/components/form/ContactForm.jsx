import React from 'react';

function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario (e.g., llamar a una API)
    alert("Comentario enviado (simulado). Gracias por tu mensaje.");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      
      {/* Grupo de campos en línea: Nombre y Apellido */}
      <div className="form-group-inline">
        <input type="text" placeholder="Nombre" required />
        <input type="text" placeholder="Apellido" required />
      </div>
      
      {/* Campo completo: Correo electrónico */}
      <div className="form-group-full">
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          required 
          // El placeholder del wireframe es un poco largo, lo ajustamos:
          defaultValue="correo electronico@dominiooficiodejane.net"
        />
      </div>
      
      {/* Campo completo: Mensaje (Textarea) */}
      <div className="form-group-full">
        <textarea 
          placeholder="Tu mensaje" 
          rows="5" 
          required
          // Placeholder del wireframe
          defaultValue="Escribe tu pregunta o mensaje"
        ></textarea>
      </div>
      
      {/* Botón de Enviar */}
      <button type="submit" className="btn btn-primary form-submit-btn">
        Enviar
      </button>
    </form>
  );
}

export default ContactForm;