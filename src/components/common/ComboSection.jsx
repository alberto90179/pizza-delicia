import React, { useState } from 'react';
import ComboCard from './ComboCard';

function ComboSection() {
  const [cartItems, setCartItems] = useState([]);

  const combos = [
    {
      id: 1,
      title: '2 pizzas medianas de 2 ingredientes',
      description: 'Llévate 2 pizzas medianas de 2 ingredientes',
      image: 'https://cdn7.kiwilimon.com/recetaimagen/41724/960x640/57505.jpg.jpg',
      alt: 'Combo 2 pizzas medianas',
      reverse: false,
      price: 180,
      includes: ['2 pizzas medianas', '2 ingredientes cada una']
    },
    {
      id: 2,
      title: 'Para estas fiestas patrias',
      description: '2 pizzas mexicanas, 1 orden de nachos, salsa macha y un refresco de 2 lts',
      image: 'https://web.didiglobal.com/_next/image/?url=https%3A%2F%2Fimg0.didiglobal.com%2Fstatic%2Fsoda_public%2Fimg_9c79865e66d44bb79f9d2ac458688a3e.JPG4_3&w=3840&q=75',
      alt: 'Combo fiestas patrias',
      reverse: true,
      price: 240,
      includes: ['2 pizzas mexicanas', '1 orden de nachos', 'Salsa macha', 'Refresco 2L']
    },
  ];

  const addToCart = (combo) => {
    const newItem = {
      id: combo.id,
      name: combo.title,
      price: combo.price,
      quantity: 1,
      image: combo.image
    };

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === combo.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === combo.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, newItem];
    });

    alert(`¡${combo.title} agregado al carrito!`);
  };

  const removeFromCart = (comboId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== comboId));
  };

  const updateQuantity = (comboId, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === comboId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const saveToLocalStorage = () => {
    const cartToSave = cartItems.map(item => ({
      productId: item.id,
      productName: item.name,
      size: "Combo",
      quantity: item.quantity,
      price: item.price,
      image: item.image
    }));

    const existingCart = JSON.parse(localStorage.getItem("pizzaDeliciaCart") || "[]");
    const updatedCart = [...existingCart, ...cartToSave];
    localStorage.setItem("pizzaDeliciaCart", JSON.stringify(updatedCart));
    
    alert('Combos agregados al carrito principal');
    setCartItems([]);
  };

  return (
    <section className="combo-section">
      <div className="combo-container container">
        <h2 className="combo-section-title text-center mb-5">
          Combos Especiales
        </h2>
        
        {/* Sección de Combos */}
        <div className="combos-grid mb-5">
          {combos.map((combo) => (
            <ComboCard 
              key={combo.id} 
              {...combo}
              onAddToCart={() => addToCart(combo)}
            />
          ))}
        </div>

        {/* Carrito de Combos */}
        {cartItems.length > 0 && (
          <div className="combo-cart-section p-4 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <h3 className="text-center mb-4">Tu Pedido de Combos</h3>
            
            {/* Lista de items en el carrito */}
            <div className="cart-items mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item d-flex justify-content-between align-items-center p-3 border-bottom">
                  <div className="item-info d-flex align-items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      width="60"
                      height="60"
                      className="rounded me-3"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-0 text-muted">${item.price}.00 MXN c/u</p>
                    </div>
                  </div>
                  
                  <div className="item-controls d-flex align-items-center">
                    <div className="quantity-controls me-3">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="price-info text-end me-3">
                      <div className="fw-bold">${(item.price * item.quantity)}.00 MXN</div>
                    </div>
                    
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total y botón de confirmación */}
            <div className="cart-total d-flex justify-content-between align-items-center p-3 border-top">
              <h5 className="mb-0">Total a pagar:</h5>
              <h4 className="mb-0 text-primary">${total}.00 MXN</h4>
            </div>
            
            <div className="text-center mt-3">
              <button 
                className="btn btn-primary btn-lg"
                onClick={saveToLocalStorage}
              >
                Confirmar Combos y Agregar al Carrito Principal
              </button>
              <p className="text-muted mt-2 small">
                Los combos se agregarán a tu carrito de compras principal
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ComboSection;