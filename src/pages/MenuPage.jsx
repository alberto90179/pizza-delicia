import React from "react";
import ProductCard from "../components/common/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

// Se asume que este archivo ya está importando su CSS correctamente
// import './MenuPage.css';

function MenuPage() {
  //se realiza la request al servidor al iniciar el componente
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    getPizzas();
    getDrinks();
    getDesserts();
    getExtras();
  }, []);

  const getPizzas = async () => {
    const res = await axios.get(
      "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-pizzas"
    );
    setPizzas(res.data);
  };

  const getDrinks = async () => {
    const res = await axios.get(
      "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-drinks"
    );
    setDrinks(res.data);
  };

  const getDesserts = async () => {
    const res = await axios.get(
      "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-desserts"
    );
    setDesserts(res.data);
  };
  const getExtras = async () => {
    const res = await axios.get(
      "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-extras"
    );
    setExtras(res.data);
  };

  return (
    <div className="menu-page-container page-padding">
      <section className="menu-category-section">
        <h2 className="menu-category-title">PIZZAS</h2>

        <div className="menu-grid">
          {pizzas.map((pizza) => (
            <ProductCard key={pizza.id} product={pizza} />
          ))}

          <div className="category-navigation-arrow">▶</div>
        </div>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">BEBIDAS</h2>

        <div className="menu-grid">
          {drinks.map((drink) => (
            <ProductCard key={drink.id} product={drink} />
          ))}

          <div className="category-navigation-arrow">▶</div>
        </div>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">POSTRES</h2>

        <div className="menu-grid">
          {desserts.map((dessert) => (
            <ProductCard key={dessert.id} product={dessert} />
          ))}

          <div className="category-navigation-arrow">▶</div>
        </div>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">COMPLEMENTOS</h2>

        <div className="menu-grid">
          {extras.map((extra) => (
            <ProductCard key={extra.id} product={extra} />
          ))}

          <div className="category-navigation-arrow">▶</div>
        </div>
      </section>
    </div>
  );
}

export default MenuPage;
