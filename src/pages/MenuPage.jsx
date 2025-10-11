import React from 'react';
import ProductCard from '../components/common/ProductCard';
import { menuData } from '../components/data/menuData';

// Se asume que este archivo ya está importando su CSS correctamente
// import './MenuPage.css'; 

function MenuPage() {
  const categories = Object.keys(menuData);

  return (
    <div className="menu-page-container page-padding">
      
      {categories.map((category) => (
        <section key={category} className="menu-category-section">
          
          <h2 className="menu-category-title">
            {category.toUpperCase()}
          </h2>
          
          <div className="menu-grid">
            
            {menuData[category].map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
            
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