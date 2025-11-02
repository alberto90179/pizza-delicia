import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SuggestionCard from "../components/common/SuggestionCard";
import { menuData } from "../components/data/menuData";
import axios from "axios";

function ProductDetailPage() {
  // 1️⃣ Obtener parámetros desde la URL
  const { id } = useParams(); // Solo usamos el id

  // 2️⃣ Estados iniciales
  const [pizza, setPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 3️⃣ useEffect para cargar producto (sin advertencias)
  useEffect(() => {
    const getPizza = async () => {
      try {
        const res = await axios.get(
          `https://service-pizzadelicia-v1.gulliferwd.com/api/pizza/${id}`
        );
        setPizza(res.data);
      } catch (error) {
        console.error("Error al cargar la pizza:", error);
        setPizza(null);
      }
    };

    getPizza();
  }, [id]); // ✅ Solo depende del id

  // 4️⃣ Si no hay datos, mostrar mensaje
  if (!pizza) {
    return <h1 className="page-padding">Cargando producto...</h1>;
  }

  // 5️⃣ Lógica de precios
  const currentPrice =
    selectedSize?.price ?? pizza.price ?? 0;

  // 6️⃣ Guardar producto en localStorage
  const saveToLocalStorage = (item) => {
    const cart = JSON.parse(localStorage.getItem("pizzaDeliciaCart") || "[]");
    const existingIndex = cart.findIndex(
      (i) => i.productId === item.productId && i.size === item.size
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem("pizzaDeliciaCart", JSON.stringify(cart));
  };

  // 7️⃣ Agregar al carrito
  const handleAddToCart = () => {
    if (pizza.prices && !selectedSize) {
      alert("Por favor, selecciona un tamaño antes de agregar al carrito.");
      return;
    }

    const itemDetails = {
      productId: pizza.id,
      productName: pizza.pizza,
      size: selectedSize?.size || "Unidad",
      quantity,
      price: currentPrice,
      image: pizza.image || pizza.image_link,
    };

    saveToLocalStorage(itemDetails);
    alert(
      `¡${itemDetails.productName} (${itemDetails.size}) agregado al carrito!`
    );
    setQuantity(1);
  };

  // 8️⃣ Sugerencias
  const suggestions = [
    menuData.complementos.find((c) => c.title === "Papas gajo"),
    menuData.postres.find((p) => p.title === "Flan Napolitano"),
    menuData.complementos.find((c) => c.title === "Chimichurri"),
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
            src={pizza.image || pizza.image_link}
            alt={pizza.pizza}
            width="473"
            height="275"
          />
        </div>

        <div className="product-detail-info">
          <h1>{pizza.pizza}</h1>
          <p className="product-description fs-6">{pizza.description}</p>

          <p className="product-price-display fs-5">${currentPrice} MXN</p>

          {/* Opciones de Tamaño */}
          {pizza.prices && (
            <div className="size-options">
              {pizza.prices.map((sizeObj, index) => (
                <button
                  key={index}
                  className={`size-btn ${
                    selectedSize === sizeObj ? "active" : ""
                  } btn btn-add-cart`}
                  onClick={() => setSelectedSize(sizeObj)}
                  style={{ margin: "5px" }}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          )}

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

export default ProductDetailPage;
