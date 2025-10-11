import React, { useState, useEffect } from 'react';
import { findProductById } from '../components/data/menuData';

function CartPage() {
    // Estado para almacenar los ítems enriquecidos del carrito
    const [cartItems, setCartItems] = useState([]);

    // ----------------------------------------------------
    // 💡 LÓGICA DE CARGA Y GUARDADO DEL CARRITO
    // ----------------------------------------------------

    // Función para obtener y enriquecer los datos del carrito desde LocalStorage
    const loadCart = () => {
        const rawCart = JSON.parse(localStorage.getItem('pizzaDeliciaCart') || '[]');
        
        const enrichedItems = rawCart.map(item => {
            const product = findProductById(item.productId);
            if (!product) return null;

            // Determinar el precio unitario
            const itemPriceUnit = item.size 
                ? product.sizes[item.size] 
                : product.price;
            
            return {
                ...item,
                title: product.title,
                image: product.image,
                price: itemPriceUnit,
                subtotal: itemPriceUnit * item.quantity,
            };
        }).filter(item => item !== null);
        
        setCartItems(enrichedItems);
    };

    // Función para guardar el estado del carrito en LocalStorage
    const saveCartToStorage = (items) => {
        // Guardamos solo los datos mínimos (productId, size, quantity)
        const simplifiedCart = items.map(item => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
        }));
        localStorage.setItem('pizzaDeliciaCart', JSON.stringify(simplifiedCart));
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
        newCart.forEach(item => {
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
            <div className="cart-header">
                <h2>MIS PRODUCTOS SELECCIONADOS</h2>
                <h2 className="total-mxn">TOTAL MXN: ${totalMx}.00</h2>
            </div>

            {/* Lista de Productos en el Carrito */}
            <div className="cart-items-list">
                {cartItems.length === 0 ? (
                    <p>Tu carrito está vacío. ¡Añade algo delicioso!</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="item-details">
                                <h4>{item.title}</h4>
                                <p>
                                    {item.size && `${item.size.toUpperCase()}, `}
                                    CANTIDAD: {item.quantity}
                                </p>
                                <p className="item-price-display">${item.price} MXN</p>
                                
                                {/* Controles de Cantidad y Eliminación */}
                                <div className="cart-controls">
                                    <button 
                                        onClick={() => updateQuantity(index, -1)}
                                        className="btn-quantity-control"
                                    >
                                        -
                                    </button>
                                    <span className="current-quantity">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(index, 1)}
                                        className="btn-quantity-control"
                                    >
                                        +
                                    </button>
                                    <button 
                                        onClick={() => removeItem(index)}
                                        className="btn-remove-item"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Resto de las secciones (Envío y Pago) se mantienen estáticas */}
            {/* Sección Datos de Envío */}
            <section className="shipping-data-section">
                <h2>DATOS DE ENVÍO</h2>
                <div className="shipping-form-grid">
                    <input type="text" placeholder="Nombre" className="input-half" />
                    <input type="text" placeholder="Calle o avenida" className="input-half" />
                    <input type="text" placeholder="Colonia" className="input-half" />
                    <input type="text" placeholder="Código postal" className="input-half" />
                    <input type="text" defaultValue="Delegación o municipio" readOnly className="input-half" />
                    <input type="tel" placeholder="Teléfono" defaultValue="3336394550" readOnly className="input-half" />
                </div>
            </section>

            {/* Sección Método de Pago */}
            <section className="payment-method-section">
                <h2>MÉTODO DE PAGO</h2>
                <div className="payment-options">
                    <div className="payment-group payment-cash">
                        <h3>Efectivo</h3>
                    </div>
                    <div className="payment-group payment-card">
                        <h3>Tarjeta débito/crédito</h3>
                        <div className="card-form-grid">
                            <input type="text" placeholder="Nombre del titular" className="input-full" />
                            <input type="text" placeholder="Número de tarjeta (16 dígitos)" className="input-full" />
                            <input type="text" placeholder="mm/aa" className="input-quarter" />
                            <input type="text" placeholder="3 dígitos (CVV)" className="input-quarter" />
                            <input type="email" placeholder="ejemplo@gmail.com" className="input-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Botón de Pago Final */}
            <button className="btn btn-pay-order">Pagar ${totalMx}.00 MXN y ordenar</button>
            
        </div>
    );
}

export default CartPage;