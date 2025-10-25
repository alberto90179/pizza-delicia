import React, { useState, useEffect } from "react";
import { findProductById } from "../components/data/menuData";
import axios from "axios";

function CartPage() {
  // Estado para almacenar los ítems enriquecidos del carrito
  const [cartItems, setCartItems] = useState([]);
  const [cashCheck, setCashCheck] = useState(false);
  const [cardCheck, setCardCheck] = useState(false);
  const [metodoPago, setMetodoPAgo] = useState("");
  const [enabledInput, setEnabledInput] = useState("disabled"); //en desarrollo

  //estados para los datos del cliente

  const [nameInput, setNameInput] = useState("");
  const [calleInput, setCalleInput] = useState("");
  const [coloniaInput, setColoniaInput] = useState("");
  const [cpInput, setCpInput] = useState("");
  const [municipioInput, setMunicipioInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  //Funcion para insertar en la base de datos un pedido

  const postPedido = async () => {
    try {
      const response = await axios.post(
        "https://pizza-delicia-api-pedidos.vercel.app/pedidos",
        {
          name: nameInput,
          calle: calleInput,
          colonia: coloniaInput,
          zipCode: cpInput,
          municipio: municipioInput,
          phone: phoneInput,
          metodoPago: metodoPago,
          productos: cartItems,
          total: totalMx,
        }
      );
      alert("Pedido enviado", response.data);
      localStorage.clear();
      setCartItems([]);
    } catch (e) {
      alert(e);
    }
  };

  //detecta el checkbox y si está seleccionado asigna la cadena "efectivo"
  const handleCheckCash = (e) => {
    setCashCheck(e.target.checked);
    setMetodoPAgo(e.target.value);
  };

  //detecta el checkbox y si está seleccionado habilita los campos para los datos de la tarjeta
  //EN DESARROLLO
  const handleEnabledInput = (e) => {
    setCardCheck(e.target.checked);
    setEnabledInput("");
  };

  // ----------------------------------------------------
  // 💡 LÓGICA DE CARGA Y GUARDADO DEL CARRITO
  // ----------------------------------------------------

  // Función para obtener y enriquecer los datos del carrito desde LocalStorage
  const loadCart = () => {
    const rawCart = JSON.parse(
      localStorage.getItem("pizzaDeliciaCart") || "[]"
    );

    const enrichedItems = rawCart
      .map((item) => {
        const product = findProductById(item.productId);
        if (!product) return null;

        // Determinar el precio unitario
        const itemPriceUnit = item.prices
          ? item.prices[item].price
          : item.price;

        return {
          ...item,
          title: item.pizza,
          image: item.image,
          price: itemPriceUnit,
          subtotal: itemPriceUnit * item.quantity,
        };
      })
      .filter((item) => item !== null);

    setCartItems(enrichedItems);
  };

  // Función para guardar el estado del carrito en LocalStorage
  const saveCartToStorage = (items) => {
    // Guardamos solo los datos mínimos (productId, size, quantity)
    const simplifiedCart = items.map((item) => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
    }));
    localStorage.setItem("pizzaDeliciaCart", JSON.stringify(simplifiedCart));
  };

  // Cargar el carrito al montar el componente
  useEffect(() => {
    loadCart();
  }, []);

  // ----------------------------------------------------
  // 💡 LÓGICA DE MODIFICACIÓN DE CANTIDAD
  // ----------------------------------------------------

  const updateQuantity = (index, delta) => {
    const newCart = [...cartItems];
    newCart[index].quantity += delta;

    if (newCart[index].quantity <= 0) {
      // Eliminar el ítem si la cantidad es 0 o menos
      newCart.splice(index, 1);
    }

    // Recalcular el subtotal para el render
    newCart.forEach((item) => {
      item.subtotal = item.price * item.quantity;
    });

    setCartItems(newCart);
    saveCartToStorage(newCart);
  };

  // Función para eliminar un ítem directamente
  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    saveCartToStorage(newCart);
  };

  // ----------------------------------------------------
  // 💡 RENDERIZADO
  // ----------------------------------------------------

  const totalMx = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="cart-page-container page-padding">
      {/* Encabezado del Carrito y Total */}
      <div className="cart-header d-flex flex-wrap justify-content-between">
        <h2>MIS PRODUCTOS SELECCIONADOS</h2>
        <h2 className="total-mxn">TOTAL MXN: ${totalMx}.00</h2>
      </div>

      {/* Lista de Productos en el Carrito */}
      <div className="cart-items-list d-flex justify-content-evenly flex-wrap">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío. ¡Añade algo delicioso!</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item" style={{ width: "473" }}>
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

                {/* Controles de Cantidad y Eliminación */}
                <div className="cart-controls">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="btn-quantity-control btn btn-secondary"
                    style={{ margin: "5px" }}
                  >
                    -
                  </button>
                  <span className="current-quantity" style={{ margin: "5px" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="btn-quantity-control btn btn-secondary"
                    style={{ margin: "5px" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="btn-remove-item btn"
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

      {/* Resto de las secciones (Envío y Pago) se mantienen estáticas */}
      {/* Sección Datos de Envío */}
      <section className="shipping-data-section" style={{ marginTop: "40px" }}>
        <h2>DATOS DE ENVÍO</h2>
        <div className="shipping-form-grid row">
          <div className="col-4">
            <input
              type="text"
              placeholder="Nombre"
              className="input-half form-control mb-5"
              id="nombre"
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Calle o avenida"
              className="input-half form-control mb-5"
              onChange={(e) => {
                setCalleInput(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Colonia"
              className="input-half form-control mb-5"
              onChange={(e) => {
                setColoniaInput(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              placeholder="Código postal"
              className="input-half form-control mb-5"
              onChange={(e) => {
                setCpInput(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              defaultValue="Delegación o municipio"
              className="input-half form-control mb-5"
              onChange={(e) => {
                setMunicipioInput(e.target.value);
              }}
            />
          </div>
          <div className="col-4">
            <input
              type="tel"
              placeholder="Teléfono"
              defaultValue="3336394550"
              className="input-half form-control mb-5"
              onChange={(e) => {
                setPhoneInput(e.target.value);
              }}
            />
          </div>
        </div>
      </section>

      {/* Sección Método de Pago */}
      <section className="payment-method-section">
        <h2>MÉTODO DE PAGO</h2>
        <div className="payment-options">
          <div className="payment-group payment-cash">
            <h3>
              <span>
                <input
                  type="checkbox"
                  id="cash"
                  className="form-check-input"
                  value="efectivo"
                  checked={cashCheck}
                  onChange={handleCheckCash}
                />
              </span>{" "}
              Efectivo {cashCheck ? metodoPago : "desmarcado"}
            </h3>
          </div>
          <div className="payment-group payment-card">
            <h3>
              <span>
                <input
                  type="checkbox"
                  id="card"
                  className="form-check-input mb-5"
                  value="tarjeta"
                  onChange={handleEnabledInput}
                  disabled
                />
              </span>{" "}
              Tarjeta débito/crédito
            </h3>

            <div className="card-form-grid row">
              <div className="col-4">
                <input
                  type="text"
                  placeholder="Nombre del titular"
                  className="input-full form-control mb-5"
                  disabled
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  placeholder="Número de tarjeta (16 dígitos)"
                  className="input-full form-control mb-5"
                  disabled
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  placeholder="mm/aa"
                  className="input-quarter form-control mb-5"
                  disabled
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  placeholder="3 dígitos (CVV)"
                  className="input-quarter form-control mb-5"
                  disabled
                />
              </div>
              <div className="col-4">
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  className="input-full form-control mb-5"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón de Pago Final */}
      <button className="btn btn-pay-order" onClick={(e) => postPedido()}>
        Pagar ${totalMx}.00 MXN y ordenar
      </button>
    </div>
  );
}

export default CartPage;
