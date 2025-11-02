import axios from "axios";

// Opción 1: Usando variables separadas con async/await
export let pizzas = [];
export let bebidas = [];
export let postres = [];
export let extras = [];

export const loadMenuData = async () => {
  try {
    const [pizzasResponse, bebidasResponse, postresResponse, extrasResponse] = await Promise.all([
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-pizzas"),
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-drinks"),
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-desserts"),
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-extras")
    ]);

    pizzas = pizzasResponse.data;
    bebidas = bebidasResponse.data;
    postres = postresResponse.data;
    extras = extrasResponse.data;

    return { pizzas, bebidas, postres, extras };
  } catch (error) {
    console.error("Error loading menu data:", error);
    throw error;
  }
};

// Opción 2: Usando un objeto único (alternativa más limpia)
export const menuData = {
  pizzas: [],
  bebidas: [],
  postres: [],
  extras: []
};

export const loadMenuDataAlternative = async () => {
  try {
    const [pizzasResponse, bebidasResponse, postresResponse, extrasResponse] = await Promise.all([
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-pizzas"),
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-drinks"),
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-desserts"),
      axios.get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-extras")
    ]);

    menuData.pizzas = pizzasResponse.data;
    menuData.bebidas = bebidasResponse.data;
    menuData.postres = postresResponse.data;
    menuData.extras = extrasResponse.data;

    return menuData;
  } catch (error) {
    console.error("Error loading menu data:", error);
    throw error;
  }
};