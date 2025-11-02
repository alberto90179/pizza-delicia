import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SuggestionCard from "../components/common/SuggestionCard";
import { menuData } from "../components/data/menuData";
import axios from "axios";

function OthersDetailPage() {
  // 1. Obtener parámetros
  const { id, cat } = useParams();
  
  // 2. Estados (hooks primero)
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Efecto para cargar el producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let endpoint = "";
        switch (cat) {
          case "drink":
            endpoint = `https://service-pizzadelicia-v1.gulliferwd.com/api/drink/${id}`;
            break;
          case "dessert":
            endpoint = `https://service-pizzadelicia-v1.gulliferwd.com/api/dessert/${id}`;
            break;
          case "extra":
            endpoint = `https://service-pizzadelicia-v1.gulliferwd.com/api/extra/${id}`;
            break;
          default:
            throw new Error("Categoría no válida");
        }

        const res = await axios.get(endpoint);
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    if (id && cat) {
      fetchProduct();
    }
  }, [id, cat]);

  // 4. Función para guardar en localStorage
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

  // 5. Manejar agregar al carrito
  const handleAddToCart = () => {
    if (!product.id) {
      alert("Producto no disponible");
      return;
    }

    const itemDetails = {
      productId: product.id,
      productName: product.name || product.title,
      size: "Unidad",
      quantity: quantity,
      price: product.price || 0,
      image: product.image_link || product.image,
    };

    saveToLocalStorage(itemDetails);

    alert(
      `¡${itemDetails.productName} agregado al carrito!`
    );
    setQuantity(1);
  };

  // 6. Sugerencias
  const suggestions = [
    menuData.complementos?.find((c) => c.title === "Papas gajo"),
    menuData.postres?.find((p) => p.title === "Flan Napolitano"),
    menuData.complementos?.find((c) => c.title === "Chimichurri"),
  ].filter(Boolean);

  // 7. Retornos condicionales (después de todos los hooks)
  if (loading) {
    return <h1 className="page-padding">Cargando producto...</h1>;
  }

  if (error) {
    return <h1 className="page-padding">{error}</h1>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <h1 className="page-padding">Error 404: Producto no encontrado.</h1>;
  }

  // 8. Precio del producto
  const price = product.price || 0;

  return (
    <div className="product-detail-page-container page-padding">
      <div
        className="product-detail-main d-flex flex-row justify-content-evenly flex-wrap"
        style={{ marginBottom: "40px" }}
      >
        <div className="product-detail-image">
          <img
            className="rounded"
            src={product.image_link || product.image}
            alt={product.name || product.title}
            width="473"
            height="275"
            style={{ objectFit: "cover" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/473x275?text=Imagen+no+disponible";
            }}
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.name || product.title}</h1>
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

      {suggestions.length > 0 && (
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
      )}
    </div>
  );
}

export default OthersDetailPage;