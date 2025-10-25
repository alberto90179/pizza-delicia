import React from "react";
import ProductCard from "../components/common/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  //Lógica del carrusel

  const settings = {
    dots: true,
    infinity: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="menu-page-container page-padding">
      <section className="menu-category-section">
        <h2 className="menu-category-title">PIZZAS</h2>

        <Slider {...settings}>
          {pizzas.map((pizza) => (
            <ProductCard key={pizza.id} product={pizza} category={"pizza"} />
          ))}
        </Slider>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">BEBIDAS</h2>

        <Slider {...settings}>
          {drinks.map((drink) => (
            <ProductCard key={drink.id} product={drink} category={"drink"} />
          ))}
        </Slider>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">POSTRES</h2>

        <Slider {...settings}>
          {desserts.map((dessert) => (
            <ProductCard
              key={dessert.id}
              product={dessert}
              category={"dessert"}
            />
          ))}
        </Slider>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">COMPLEMENTOS</h2>

        <Slider {...settings}>
          {extras.map((extra) => (
            <ProductCard key={extra.id} product={extra} category={"extra"} />
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default MenuPage;
