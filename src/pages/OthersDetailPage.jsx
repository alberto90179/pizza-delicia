import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SuggestionCard from "../components/common/SuggestionCard";
import { menuData } from "../components/data/menuData";
import axios from "axios";

function OthersDetailPage() {
  // 1. Obtener ID y producto (Lógica previa a los hooks)
  const { id } = useParams(); //recibe el id desde la url
  const { cat } = useParams(); // recibe la categoria del producto

  //request al servidor por producto carga los estados iniciales solo de pizzas
  const [product, setProduct] = useState({});

  //evalua la categoria e inicia el estado de la variable correspondiente
  useEffect(() => {
    switch (cat) {
      case "drink":
        getDrink();
        break;
      case "dessert":
        getDessert();
        break;
      case "extra":
        getExtra();
        break;
    }
  }, []);

  const getDrink = async () => {
    const res = await axios.get(
      `https://service-pizzadelicia-v1.gulliferwd.com/api/drink/${id}`
    );
    setProduct(res.data);
  };

  const getDessert = async () => {
    const res = await axios.get(
      `https://service-pizzadelicia-v1.gulliferwd.com/api/dessert/${id}`
    );
    setProduct(res.data);
  };

  const getExtra = async () => {
    const res = await axios.get(
      `https://service-pizzadelicia-v1.gulliferwd.com/api/extra/${id}`
    );
    setProduct(res.data);
  };

  // 2. Cálculo del estado inicial (Debe hacerse antes de llamar a useState)
  // Usamos el operador ?. (optional chaining) para evitar errores si 'product' es null.

  // 3. ✅ HOOKS LLAMADOS PRIMERO (Esta es la sección correcta)
  const [quantity, setQuantity] = useState(1);

  // 4. RETORNO CONDICIONAL (Debe ir DESPUÉS de todos los hooks)
  if (!product) {
    return <h1 className="page-padding">Error 404: Producto no encontrado.</h1>;
  }

  // 5. LÓGICA DE PRECIOS Y CARRITO (Solo se ejecuta si el producto existe)
  let price = 0;
  if (product.price != null) {
    price = product.price;
  } else {
    price = "";
  }

  const saveToLocalStorage = (item) => {
    const cart = JSON.parse(localStorage.getItem("pizzaDeliciaCart") || "[]");

    const existingIndex = cart.findIndex(
      (i) => i.productName === item.productName
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem("pizzaDeliciaCart", JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    let itemDetails = {
      productId: product.id,
      productName: product.name,
      size: "n/a",
      quantity: quantity,
      price: product.price,
      image: product.image_link,
    };

    saveToLocalStorage(itemDetails);

    alert(
      `¡${itemDetails.productId} (${
        itemDetails.size || "Unidad"
      }) agregado al carrito!`
    );
    setQuantity(1);
  };

  //aun no se establece la logica para productos aleatorios
  const suggestions = [
    menuData.complementos.find((c) => c.title === "Papas gajo"),
    menuData.postres.find((p) => p.title === "Flan Napolitano"),
    menuData.complementos.find((c) => c.title === "Chimichurri"),
    { title: null },
  ].filter(Boolean);

  return (
    <div className="product-detail-page-container page-padding">
      <div
        className="product-detail-main d-flex flex-row justify-content-evenly flex-wrap"
        style={{ marginBottom: "40px" }}
      >
        <div className="product-detail-image">
          <img
            className="rounded"
            src={product.image_link}
            alt={product.name}
            width="473"
            height="275"
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-description fs-6">{product.description}</p>

          <p className="product-price-display fs-5">${price} MXN</p>

          {/* Input de Cantidad */}
          <div
            className="quantity-input-container"
            style={{ marginBottom: "20px" }}
          >
            <label>Cantidad:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              style={{ width: "80px", padding: "5px", marginLeft: "10px" }}
            />
          </div>

          <button
            className="btn btn-add-cart"
            onClick={handleAddToCart}
            style={{ width: "100%" }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <section className="suggestions-section">
        <h2 style={{ marginBottom: "10px" }}>
          Sugerencias para agregar a tu pedido
        </h2>
        <div className="suggestions-grid d-flex justify-content-evenly flex-wrap">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard key={index} product={suggestion} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default OthersDetailPage;
