import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import ProductCard from "../components/common/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MenuPage() {
  // Estados para las categorías
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [extras, setExtras] = useState([]);

  // Llamadas a la API al montar el componente
  useEffect(() => {
    getPizzas();
    getDrinks();
    getDesserts();
    getExtras();
  }, []);

  const getPizzas = async () => {
    try {
      const res = await axios.get(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-pizzas"
      );
      setPizzas(res.data);
    } catch (error) {
      console.error("Error al obtener pizzas:", error);
    }
  };

  const getDrinks = async () => {
    try {
      const res = await axios.get(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-drinks"
      );
      setDrinks(res.data);
    } catch (error) {
      console.error("Error al obtener bebidas:", error);
    }
  };

  const getDesserts = async () => {
    try {
      const res = await axios.get(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-desserts"
      );
      setDesserts(res.data);
    } catch (error) {
      console.error("Error al obtener postres:", error);
    }
  };

  const getExtras = async () => {
    try {
      const res = await axios.get(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-extras"
      );
      setExtras(res.data);
    } catch (error) {
      console.error("Error al obtener complementos:", error);
    }
  };

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: false, // se escribe "infinite", no "infinity"
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="menu-page-container page-padding">
      <section className="menu-category-section">
        <h2 className="menu-category-title">PIZZAS</h2>
        <Slider {...settings}>
          {pizzas.map((pizza) => (
            <ProductCard key={pizza.id} product={pizza} category="pizza" />
          ))}
        </Slider>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">BEBIDAS</h2>
        <Slider {...settings}>
          {drinks.map((drink) => (
            <ProductCard key={drink.id} product={drink} category="drink" />
          ))}
        </Slider>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">POSTRES</h2>
        <Slider {...settings}>
          {desserts.map((dessert) => (
            <ProductCard key={dessert.id} product={dessert} category="dessert" />
          ))}
        </Slider>
      </section>

      <section className="menu-category-section">
        <h2 className="menu-category-title">COMPLEMENTOS</h2>
        <Slider {...settings}>
          {extras.map((extra) => (
            <ProductCard key={extra.id} product={extra} category="extra" />
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default MenuPage;
