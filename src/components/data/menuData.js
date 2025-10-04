export const menuData = {
  pizzas: [
    { id: 1, title: "Hawaiana", description: "Descripción del primer producto", price: 120, image: "https://via.placeholder.com/300x200.png?text=Hawaiana", large_image: "https://via.placeholder.com/600x450.png?text=Pizza+Hawaiana+Grande" },
    { id: 2, title: "Pepperoni", description: "Descripción del segundo producto", price: 150, image: "https://via.placeholder.com/300x200.png?text=Pepperoni", large_image: "https://via.placeholder.com/600x450.png?text=Pizza+Pepperoni+Grande" },
    { id: 3, title: "Napolitana", description: "Salsa de tomate, albahaca, queso mozzarella y aceite de oliva", price: 140, image: "https://via.placeholder.com/300x200.png?text=Napolitana", large_image: "https://via.placeholder.com/600x450.png?text=Pizza+Napolitana+Grande" },
  ],
  postres: [
    { id: 4, title: "Pay de zarzamora", description: "Descripción del primer producto", price: 75, image: "https://via.placeholder.com/300x200.png?text=Pay+Zarzamora", large_image: "https://via.placeholder.com/600x450.png?text=Pay+Zarzamora+Grande" },
    { id: 5, title: "Flan Napolitano", description: "Descripción del segundo producto", price: 50, image: "https://via.placeholder.com/300x200.png?text=Flan", large_image: "https://via.placeholder.com/600x450.png?text=Flan+Grande" },
    { id: 6, title: "Tiramisú", description: "Descripción del tercer producto", price: 120, image: "https://via.placeholder.com/300x200.png?text=Tiramisu", large_image: "https://via.placeholder.com/600x450.png?text=Tiramisu+Grande" },
  ],
  bebidas: [
    { id: 7, title: "Refrescos 2 Lts.", description: "Coca cola, Fanta, Sprite, Fresca, 2 Lts.", price: 45, image: "https://via.placeholder.com/300x200.png?text=Bebidas", large_image: "https://via.placeholder.com/600x450.png?text=Refrescos+Grande" },
    { id: 8, title: "Capuchino", description: "Descripción del segundo producto", price: 60, image: "https://via.placeholder.com/300x200.png?text=Capuchino", large_image: "https://via.placeholder.com/600x450.png?text=Capuchino+Grande" },
    { id: 9, title: "Moka", description: "Descripción del tercer producto", price: 55, image: "https://via.placeholder.com/300x200.png?text=Moka", large_image: "https://via.placeholder.com/600x450.png?text=Moka+Grande" },
  ],
  complementos: [
    { id: 10, title: "Papas gajo", description: "Descripción del primer producto", price: 45, image: "https://via.placeholder.com/300x200.png?text=Papas+Gajo", large_image: "https://via.placeholder.com/600x450.png?text=Papas+Gajo+Grande" },
    { id: 11, title: "Chimichurri", description: "Descripción del tercer producto", price: 25, image: "https://via.placeholder.com/300x200.png?text=Chimichurri", large_image: "https://via.placeholder.com/600x450.png?text=Chimichurri+Grande" },
  ],
};

export const findProductById = (id) => {
    const allProducts = Object.values(menuData).flat();
    return allProducts.find(p => p.id === parseInt(id));
};