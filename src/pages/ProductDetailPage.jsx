import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SuggestionCard from "../components/common/SuggestionCard";
import { findProductById, menuData } from "../components/data/menuData";

function ProductDetailPage() {
  // 1. Obtener ID y producto (Lógica previa a los hooks)
  const { id } = useParams();
  const product = findProductById(id);

  // 2. Cálculo del estado inicial (Debe hacerse antes de llamar a useState)
  // Usamos el operador ?. (optional chaining) para evitar errores si 'product' es null.
  const defaultSize = product?.sizes ? Object.keys(product.sizes)[0] : null;

  // 3. ✅ HOOKS LLAMADOS PRIMERO (Esta es la sección correcta)
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);

  // 4. RETORNO CONDICIONAL (Debe ir DESPUÉS de todos los hooks)
  if (!product) {
    return <h1 className="page-padding">Error 404: Producto no encontrado.</h1>;
  }

  // 5. LÓGICA DE PRECIOS Y CARRITO (Solo se ejecuta si el producto existe)
  let currentPrice;
  if (product.sizes) {
    currentPrice = product.sizes[selectedSize];
  } else {
    currentPrice = product.price;
  }

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

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert("Por favor, selecciona un tamaño antes de agregar al carrito.");
      return;
    }

    const itemDetails = {
      productId: product.id,
      size: selectedSize,
      quantity: quantity,
    };

    saveToLocalStorage(itemDetails);

    alert(
      `¡${product.title} (${selectedSize || "Unidad"}) agregado al carrito!`
    );
    setQuantity(1);
  };

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
            src={product.large_image}
            alt={product.title}
            width="473"
            height="275"
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-description fs-6">{product.description}</p>

          <p className="product-price-display fs-5">${currentPrice} MXN</p>

          {/* Opciones de Tamaño */}
          {product.sizes && (
            <div className="size-options">
              {Object.keys(product.sizes).map((sizeName) => (
                <button
                  key={sizeName}
                  className={`size-btn ${
                    selectedSize === sizeName ? "active" : ""
                  } btn btn-add-cart`}
                  onClick={() => setSelectedSize(sizeName)}
                  style={{ margin: "5px" }}
                >
                  {sizeName}
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
