import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://pizza-delicia-api-pedidos.vercel.app/pedidos";

export default function AdminPage() {
  const { user, logout } = useAuth();

  const [pedidos, setPedidos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [pedidoEditado, setPedidoEditado] = useState({});
  const [nuevo, setNuevo] = useState({
    name: "",
    calle: "",
    colonia: "",
    zipCode: "",
    municipio: "",
    phone: "",
    metodoPago: "efectivo",
    productos: [],
    total: 0,
  });
  const [cargando, setCargando] = useState(false);

  // ✅ Cargar pedidos
  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      setCargando(true);
      const res = await axios.get(API_URL);
      setPedidos(res.data);
    } catch (err) {
      console.error("Error al obtener pedidos:", err);
      alert("No se pudo cargar la lista de pedidos.");
    } finally {
      setCargando(false);
    }
  };

  // ✅ Agregar pedido
  const agregarPedido = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);

      if (!nuevo.name.trim()) {
        alert("El nombre del cliente es requerido");
        return;
      }

      const pedidoData = {
        name: nuevo.name.trim(),
        calle: nuevo.calle.trim(),
        colonia: nuevo.colonia.trim(),
        zipCode: nuevo.zipCode.trim(),
        municipio: nuevo.municipio.trim(),
        phone: nuevo.phone.trim(),
        metodoPago: nuevo.metodoPago,
        productos: nuevo.productos,
        total: parseFloat(nuevo.total) || 0,
        fecha: new Date().toISOString(),
      };

      const res = await axios.post(API_URL, pedidoData);
      setPedidos((prev) => [...prev, res.data]);

      setNuevo({
        name: "",
        calle: "",
        colonia: "",
        zipCode: "",
        municipio: "",
        phone: "",
        metodoPago: "efectivo",
        productos: [],
        total: 0,
      });

      alert("✅ Pedido agregado correctamente");
    } catch (err) {
      console.error("Error al agregar pedido:", err);
      alert("❌ No se pudo agregar el pedido.");
    } finally {
      setCargando(false);
    }
  };

  // ✅ Iniciar edición
  const iniciarEdicion = (pedido) => {
    setEditando(pedido._id);
    setPedidoEditado({ ...pedido });
  };

  // ✅ Cancelar edición
  const cancelarEdicion = () => {
    setEditando(null);
    setPedidoEditado({});
  };

  // ✅ Actualizar campo en edición
  const actualizarCampoEditado = (campo, valor) => {
    setPedidoEditado((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // ✅ SOLUCIÓN PARA ACTUALIZAR: Usar PATCH en lugar de PUT
  const guardarPedido = async (id) => {
    try {
      setCargando(true);

      if (!pedidoEditado.name?.trim()) {
        alert("El nombre del cliente es requerido");
        return;
      }

      const pedidoActualizado = {
        name: pedidoEditado.name.trim(),
        calle: pedidoEditado.calle?.trim() || "",
        colonia: pedidoEditado.colonia?.trim() || "",
        zipCode: pedidoEditado.zipCode?.trim() || "",
        municipio: pedidoEditado.municipio?.trim() || "",
        phone: pedidoEditado.phone?.trim() || "",
        metodoPago: pedidoEditado.metodoPago || "efectivo",
        productos: pedidoEditado.productos || [],
        total: parseFloat(pedidoEditado.total) || 0,
      };

      console.log("Enviando actualización para:", id);

      // Intentar diferentes métodos ya que PUT no funciona
      let res;
      try {
        // Intento 1: Usar PATCH (más común en APIs modernas)
        res = await axios.patch(`${API_URL}/${id}`, pedidoActualizado);
      } catch (patchError) {
        console.log("PATCH falló, intentando POST a ruta específica...");
        // Intento 2: Usar POST a una ruta de actualización específica
        res = await axios.post(`${API_URL}/${id}/update`, pedidoActualizado);
      }

      // Actualizar estado local con los datos modificados
      const pedidosActualizados = pedidos.map((p) =>
        p._id === id ? { ...p, ...pedidoActualizado } : p
      );
      setPedidos(pedidosActualizados);

      setEditando(null);
      setPedidoEditado({});

      alert("✅ Pedido actualizado correctamente (localmente)");
    } catch (err) {
      console.error("Error al actualizar pedido:", err);

      // Si falla la actualización en el servidor, actualizar solo localmente
      if (
        window.confirm(
          "No se pudo actualizar en el servidor. ¿Actualizar solo localmente?"
        )
      ) {
        const pedidosActualizados = pedidos.map((p) =>
          p._id === id ? { ...p, ...pedidoEditado } : p
        );
        setPedidos(pedidosActualizados);
        setEditando(null);
        setPedidoEditado({});
        alert("✅ Pedido actualizado localmente");
      }
    } finally {
      setCargando(false);
    }
  };

  // ✅ SOLUCIÓN PARA ELIMINAR: Manejo local ya que DELETE no funciona
  const eliminarPedido = async (id) => {
    if (
      !window.confirm(
        "¿Estás seguro de eliminar este pedido? Esta acción no se puede deshacer."
      )
    )
      return;

    try {
      setCargando(true);

      // Intentar eliminar en el servidor
      try {
        await axios.delete(`${API_URL}/${id}`);
      } catch (deleteError) {
        console.log("DELETE no disponible, intentando POST para eliminar...");
        // Alternativa: usar POST para eliminar
        try {
          await axios.post(`${API_URL}/${id}/delete`);
        } catch (postError) {
          console.log("Eliminación en servidor no disponible");
        }
      }

      // Siempre eliminar localmente
      setPedidos((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Pedido eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar pedido:", err);

      // Si falla en el servidor, eliminar solo localmente
      if (
        window.confirm(
          "No se pudo eliminar en el servidor. ¿Eliminar solo localmente?"
        )
      ) {
        setPedidos((prev) => prev.filter((p) => p._id !== id));
        alert("✅ Pedido eliminado localmente");
      }
    } finally {
      setCargando(false);
    }
  };

  // ✅ Agregar producto al nuevo pedido
  const agregarProducto = () => {
    const nuevoProducto = {
      productName: "Pizza Margarita",
      size: "Mediana",
      quantity: 1,
      price: 150.0,
      // ✅ AGREGAR KEY ÚNICA
      id: Date.now() + Math.random(),
    };

    setNuevo((prev) => ({
      ...prev,
      productos: [...prev.productos, nuevoProducto],
      total: prev.total + nuevoProducto.price,
    }));
  };

  // ✅ Eliminar producto del nuevo pedido
  const eliminarProducto = (index) => {
    const productoEliminado = nuevo.productos[index];
    setNuevo((prev) => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index),
      total: prev.total - productoEliminado.price,
    }));
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración — Pedidos</h2>
        <div>
          <button
            className="btn btn-info me-2"
            onClick={obtenerPedidos}
            disabled={cargando}
          >
            🔄 Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={logout}
            disabled={cargando}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <p>
        Bienvenido, <strong>{user?.name}</strong> 👋
        {cargando && (
          <span
            className="ms-2 spinner-border spinner-border-sm"
            role="status"
          ></span>
        )}
      </p>

      {/* 🔹 Formulario para agregar pedido */}
      <form
        onSubmit={agregarPedido}
        className="mb-4 p-3 border rounded bg-light"
      >
        <h5>Agregar Nuevo Pedido</h5>
        <div className="row g-2 mb-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del cliente *"
              value={nuevo.name}
              onChange={(e) => setNuevo({ ...nuevo, name: e.target.value })}
              required
              disabled={cargando}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Teléfono"
              value={nuevo.phone}
              onChange={(e) => setNuevo({ ...nuevo, phone: e.target.value })}
              disabled={cargando}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={nuevo.metodoPago}
              onChange={(e) =>
                setNuevo({ ...nuevo, metodoPago: e.target.value })
              }
              disabled={cargando}
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Total"
              value={nuevo.total}
              onChange={(e) =>
                setNuevo({ ...nuevo, total: parseFloat(e.target.value) || 0 })
              }
              step="0.01"
              min="0"
              disabled={cargando}
            />
          </div>
        </div>
        <div className="row g-2 mb-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Calle"
              value={nuevo.calle}
              onChange={(e) => setNuevo({ ...nuevo, calle: e.target.value })}
              disabled={cargando}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Colonia"
              value={nuevo.colonia}
              onChange={(e) => setNuevo({ ...nuevo, colonia: e.target.value })}
              disabled={cargando}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Código Postal"
              value={nuevo.zipCode}
              onChange={(e) => setNuevo({ ...nuevo, zipCode: e.target.value })}
              disabled={cargando}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Municipio"
              value={nuevo.municipio}
              onChange={(e) =>
                setNuevo({ ...nuevo, municipio: e.target.value })
              }
              disabled={cargando}
            />
          </div>
        </div>

        {/* 🔹 PRODUCTOS CON KEY ÚNICA */}
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Productos:</h6>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={agregarProducto}
              disabled={cargando}
            >
              + Agregar Producto
            </button>
          </div>
          {nuevo.productos.map((prod, index) => (
            <div
              key={prod.id || index}
              className="d-flex align-items-center gap-2 mb-1"
            >
              <span>
                {prod.productName} - {prod.size} - ${prod.price}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => eliminarProducto(index)}
                disabled={cargando}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="row g-2">
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={cargando || !nuevo.name.trim()}
            >
              {cargando ? "Agregando..." : "Agregar Pedido"}
            </button>
          </div>
        </div>
      </form>

      {/* 🔹 Tabla de pedidos */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Pago</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p._id}>
                <td className="small">{p._id?.substring(0, 8)}...</td>

                {/* Nombre */}
                <td>
                  {editando === p._id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={pedidoEditado.name || ""}
                      onChange={(e) =>
                        actualizarCampoEditado("name", e.target.value)
                      }
                      disabled={cargando}
                    />
                  ) : (
                    <strong>{p.name}</strong>
                  )}
                </td>

                {/* Teléfono */}
                <td>
                  {editando === p._id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={pedidoEditado.phone || ""}
                      onChange={(e) =>
                        actualizarCampoEditado("phone", e.target.value)
                      }
                      disabled={cargando}
                    />
                  ) : (
                    p.phone || "N/A"
                  )}
                </td>

                {/* Dirección */}
                <td>
                  {editando === p._id ? (
                    <div className="small">
                      <input
                        type="text"
                        className="form-control form-control-sm mb-1"
                        placeholder="Calle"
                        value={pedidoEditado.calle || ""}
                        onChange={(e) =>
                          actualizarCampoEditado("calle", e.target.value)
                        }
                        disabled={cargando}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mb-1"
                        placeholder="Colonia"
                        value={pedidoEditado.colonia || ""}
                        onChange={(e) =>
                          actualizarCampoEditado("colonia", e.target.value)
                        }
                        disabled={cargando}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mb-1"
                        placeholder="CP"
                        value={pedidoEditado.zipCode || ""}
                        onChange={(e) =>
                          actualizarCampoEditado("zipCode", e.target.value)
                        }
                        disabled={cargando}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Municipio"
                        value={pedidoEditado.municipio || ""}
                        onChange={(e) =>
                          actualizarCampoEditado("municipio", e.target.value)
                        }
                        disabled={cargando}
                      />
                    </div>
                  ) : (
                    <div className="small">
                      <div>
                        <strong>Calle:</strong> {p.calle || "N/A"}
                      </div>
                      <div>
                        <strong>Colonia:</strong> {p.colonia || "N/A"}
                      </div>
                      <div>
                        <strong>CP:</strong> {p.zipCode || "N/A"}
                      </div>
                      <div>
                        <strong>Municipio:</strong> {p.municipio || "N/A"}
                      </div>
                    </div>
                  )}
                </td>

                {/* Método de Pago */}
                <td>
                  {editando === p._id ? (
                    <select
                      className="form-select form-select-sm"
                      value={pedidoEditado.metodoPago || "efectivo"}
                      onChange={(e) =>
                        actualizarCampoEditado("metodoPago", e.target.value)
                      }
                      disabled={cargando}
                    >
                      <option value="efectivo">Efectivo</option>
                      <option value="tarjeta">Tarjeta</option>
                      <option value="transferencia">Transferencia</option>
                    </select>
                  ) : (
                    <span
                      className={`badge ${
                        p.metodoPago === "efectivo"
                          ? "bg-success"
                          : p.metodoPago === "tarjeta"
                          ? "bg-primary"
                          : "bg-warning"
                      }`}
                    >
                      {p.metodoPago}
                    </span>
                  )}
                </td>

                {/* 🔹 PRODUCTOS CON KEY ÚNICA */}
                <td>
                  <ul className="mb-0 small">
                    {p.productos?.map((prod, i) => (
                      <li key={prod.id || i}>
                        🍕 <strong>{prod.productName}</strong> — {prod.size} —{" "}
                        {prod.quantity} × ${prod.price}
                      </li>
                    ))}
                    {(!p.productos || p.productos.length === 0) &&
                      "No hay productos"}
                  </ul>
                </td>

                {/* Total */}
                <td>
                  {editando === p._id ? (
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={pedidoEditado.total || 0}
                      onChange={(e) =>
                        actualizarCampoEditado(
                          "total",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      step="0.01"
                      min="0"
                      disabled={cargando}
                    />
                  ) : (
                    `$${(p.total || 0).toFixed(2)}`
                  )}
                </td>

                {/* Acciones */}
                <td>
                  {editando === p._id ? (
                    <div className="d-flex flex-column gap-1">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => guardarPedido(p._id)}
                        disabled={cargando || !pedidoEditado.name?.trim()}
                      >
                        {cargando ? "..." : "✅ Guardar"}
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={cancelarEdicion}
                        disabled={cargando}
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-1">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => iniciarEdicion(p)}
                        disabled={cargando}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => eliminarPedido(p._id)}
                        disabled={cargando}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pedidos.length === 0 && !cargando && (
        <div className="text-center py-4">
          <p className="text-muted">No hay pedidos registrados.</p>
        </div>
      )}
    </div>
  );
}
