import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://pizza-delicia-api-pedidos.vercel.app/pedidos";

export default function AdminPage() {
  const { user, logout } = useAuth();

  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", precio: "", descripcion: "" });
  const [editando, setEditando] = useState(null);

  // ✅ Cargar productos al montar
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      alert("No se pudo cargar la lista de productos.");
    }
  };

  // ✅ Agregar producto
  const agregarProducto = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, nuevo);
      setProductos([...productos, res.data]);
      setNuevo({ nombre: "", precio: "", descripcion: "" });
    } catch (err) {
      console.error("Error al agregar producto:", err);
      alert("No se pudo agregar el producto.");
    }
  };

  // ✅ Actualizar producto
  const actualizarProducto = async (id, actualizado) => {
    try {
      await axios.put(`${API_URL}/${id}`, actualizado);
      setProductos(
        productos.map((p) => (p.id === id ? actualizado : p))
      );
      setEditando(null);
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      alert("No se pudo actualizar el producto.");
    }
  };

  // ✅ Eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <button className="btn btn-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <p>Bienvenido, <strong>{user?.name}</strong> 👋</p>

      {/* 🔹 Formulario para agregar producto */}
      <form onSubmit={agregarProducto} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={nuevo.precio}
              onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={nuevo.descripcion}
              onChange={(e) =>
                setNuevo({ ...nuevo, descripcion: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              Agregar
            </button>
          </div>
        </div>
      </form>

      {/* 🔹 Tabla de productos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {editando === p.id ? (
                  <input
                    type="text"
                    defaultValue={p.nombre}
                    onChange={(e) => (p.nombre = e.target.value)}
                  />
                ) : (
                  p.nombre
                )}
              </td>
              <td>
                {editando === p.id ? (
                  <input
                    type="number"
                    defaultValue={p.precio}
                    onChange={(e) => (p.precio = e.target.value)}
                  />
                ) : (
                  `$${p.precio}`
                )}
              </td>
              <td>
                {editando === p.id ? (
                  <input
                    type="text"
                    defaultValue={p.descripcion}
                    onChange={(e) => (p.descripcion = e.target.value)}
                  />
                ) : (
                  p.descripcion
                )}
              </td>
              <td>
                {editando === p.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => actualizarProducto(p.id, p)}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setEditando(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditando(p.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
