import axios from "axios";

export var { pizzas, bebidas, postres, extras } = [];

pizzas = axios.get(
  "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-pizzas"
);
bebidas = axios.get(
  "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-drinks"
);
postres = axios.get(
  "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-desserts"
);
extras = axios.get(
  "https://service-pizzadelicia-v1.gulliferwd.com/api/menu-extras"
);
