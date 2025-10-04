    import React from 'react';
import ProductCard from '../components/common/ProductCard';
import { menuData } from '../components/data/menuData'; // Importa la estructura de datos

function MenuPage() {
  // Obtiene los nombres de las categorías (pizzas, postres, etc.)
  const categories = Object.keys(menuData);

  return (
    // Aplica el padding global
    <div className="menu-page-container page-padding">
      
      {categories.map((category) => (
        <section key={category} className="menu-category-section">
          
          {/* Título de la Categoría */}
          <h2 className="menu-category-title">
            {/* Muestra el nombre de la categoría en mayúsculas (PIZZAS, POSTRES, etc.) */}
            {category.toUpperCase()}
          </h2>
          
          {/* Contenedor de la cuadrícula de productos */}
          <div className="menu-grid">
            
            {/* Itera sobre los productos dentro de la categoría actual */}
            {menuData[category].map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
            
            {/* Flecha de navegación, solo visualmente como en el wireframe */}
            <div className="category-navigation-arrow">
                ▶
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default MenuPage;