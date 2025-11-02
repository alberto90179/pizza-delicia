import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario (e.g., llamar a una API)
    alert("Comentario enviado (simulado). Gracias por tu mensaje.");
    // Limpieza del formulario
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      mensaje: "",
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Grupo de campos en línea: Nombre y Apellido */}
      <div className="form-group-inline">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo completo: Correo electrónico */}
      <div className="form-group-full">
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo completo: Mensaje (Textarea) */}
      <div className="form-group-full">
        <textarea
          name="mensaje"
          placeholder="Escribe tu pregunta o mensaje"
          rows="5"
          value={formData.mensaje}
          onChange={handleChange}
          required
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
