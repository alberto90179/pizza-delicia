import React, { useState, useEffect } from "react";
import { findProductById } from "../components/data/menuData";
import axios from "axios";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [metodoPago, setMetodoPago] = useState("");
  const [cashCheck, setCashCheck] = useState(false);
  const [cardCheck, setCardCheck] = useState(false);

  // Estados para los datos del cliente
  const [nameInput, setNameInput] = useState("");
  const [calleInput, setCalleInput] = useState("");
  const [coloniaInput, setColoniaInput] = useState("");
  const [cpInput, setCpInput] = useState("");
  const [municipioInput, setMunicipioInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  // Función para obtener la fecha actual
  const getFecha = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para obtener la hora actual
  const getHora = () => {
    const currentTime = new Date();
    const hour = String(currentTime.getHours()).padStart(2, "0");
    const min = String(currentTime.getMinutes()).padStart(2, "0");
    return `${hour}:${min}`;
  };

  // Selección del método de pago
  const handleCheckCash = (e) => {
    const checked = e.target.checked;
    setCashCheck(checked);
    setCardCheck(false);
    setMetodoPago(checked ? "efectivo" : "");
  };

  const handleCheckCard = (e) => {
    const checked = e.target.checked;
    setCardCheck(checked);
    setCashCheck(false);
    setMetodoPago(checked ? "tarjeta" : "");
  };

  // Enviar pedido al backend
  const postPedido = async () => {
    if (!metodoPago) {
      alert("Por favor selecciona un método de pago antes de continuar.");
      return;
    }

    try {
      await axios.post("https://pizza-delicia-api-pedidos.vercel.app/pedidos", {
        name: nameInput,
        calle: calleInput,
        colonia: coloniaInput,
        zipCode: cpInput,
        municipio: municipioInput,
        phone: phoneInput,
        metodoPago: metodoPago,
        productos: cartItems,
        total: totalMx,
        date: getFecha(),
        time: getHora(),
      });

      alert("Pedido enviado correctamente.");
      localStorage.clear();
      setCartItems([]);
    } catch (e) {
      alert("Error al enviar el pedido: " + e);
    }
  };

  // Cargar carrito desde localStorage
  const loadCart = () => {
    const rawCart = JSON.parse(localStorage.getItem("pizzaDeliciaCart") || "[]");

    const enrichedItems = rawCart
      .map((item) => {
        const product = findProductById(item.productId);
        if (!product) return null;

        const price = item.price || product.price || 0;

        return {
          ...item,
          title: item.pizza || product.title,
          image: item.image || product.image,
          price: price,
          subtotal: price * item.quantity,
        };
      })
      .filter((item) => item !== null);

    setCartItems(enrichedItems);
  };

  const saveCartToStorage = (items) => {
    const simplifiedCart = items.map((item) => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
    }));
    localStorage.setItem("pizzaDeliciaCart", JSON.stringify(simplifiedCart));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cartItems];
    newCart[index].quantity += delta;

    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }

    newCart.forEach((item) => {
      item.subtotal = item.price * item.quantity;
    });

    setCartItems(newCart);
    saveCartToStorage(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    saveCartToStorage(newCart);
  };

  const totalMx = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="cart-page-container page-padding">
      <div className="cart-header d-flex flex-wrap justify-content-between">
        <h2>MIS PRODUCTOS SELECCIONADOS</h2>
        <h2 className="total-mxn">TOTAL MXN: ${totalMx}.00</h2>
      </div>

      <div className="cart-items-list d-flex justify-content-evenly flex-wrap">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío. ¡Añade algo delicioso!</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item" style={{ width: "473px" }}>
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
                width="473"
                height="275"
              />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>
                  {item.size && `${item.size.toUpperCase()}, `}
                  CANTIDAD: {item.quantity}
                </p>
                <p className="item-price-display">${item.subtotal} MXN</p>

                <div className="cart-controls">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="btn btn-secondary"
                    style={{ margin: "5px" }}
                  >
                    -
                  </button>
                  <span style={{ margin: "5px" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="btn btn-secondary"
                    style={{ margin: "5px" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="btn"
                    style={{ margin: "5px", backgroundColor: "grey" }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <hr />

      <section className="shipping-data-section" style={{ marginTop: "40px" }}>
        <h2>DATOS DE ENVÍO</h2>
        <div className="shipping-form-grid row">
          <div className="col-4">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control mb-5"
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Calle o avenida"
              className="form-control mb-5"
              onChange={(e) => setCalleInput(e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Colonia"
              className="form-control mb-5"
              onChange={(e) => setColoniaInput(e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Código postal"
              className="form-control mb-5"
              onChange={(e) => setCpInput(e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Delegación o municipio"
              className="form-control mb-5"
              onChange={(e) => setMunicipioInput(e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="tel"
              placeholder="Teléfono"
              className="form-control mb-5"
              onChange={(e) => setPhoneInput(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="payment-method-section">
        <h2>MÉTODO DE PAGO</h2>
        <div className="payment-options">
          <div className="payment-group payment-cash">
            <h3>
              <input
                type="checkbox"
                id="cash"
                className="form-check-input"
                checked={cashCheck}
                onChange={handleCheckCash}
              />{" "}
              Efectivo
            </h3>
          </div>

          <div className="payment-group payment-card">
            <h3>
              <input
                type="checkbox"
                id="card"
                className="form-check-input"
                checked={cardCheck}
                onChange={handleCheckCard}
              />{" "}
              Tarjeta débito/crédito
            </h3>

            <div className="card-form-grid row">
              <div className="col-4">
                <input
                  type="text"
                  placeholder="Nombre del titular"
                  className="form-control mb-5"
                  disabled={!cardCheck}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  placeholder="Número de tarjeta (16 dígitos)"
                  className="form-control mb-5"
                  disabled={!cardCheck}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  placeholder="mm/aa"
                  className="form-control mb-5"
                  disabled={!cardCheck}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  placeholder="CVV"
                  className="form-control mb-5"
                  disabled={!cardCheck}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <button className="btn btn-pay-order" onClick={postPedido}>
        Pagar ${totalMx}.00 MXN y ordenar
      </button>
    </div>
  );
}

export default CartPage;
