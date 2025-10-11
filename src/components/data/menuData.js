export const menuData = {
  pizzas: [
    { 
      id: 1, 
      title: "Hawaiana", 
      description: "Una deliciosa combinación de nuestra salsa de tomate especial, queso mozzarella, jamón cocido y piña en trocitos", 
      // 💡 PRECIOS POR TAMAÑO AÑADIDOS
      sizes: {
        Chica: 140,
        Mediana: 210,
        Grande: 280,
        Familiar: 350,
        Mega: 430,
      },
      image: "https://tb-static.uber.com/prod/image-proc/processed_images/3eae4510f8478645a1e2da89598152fa/70aa2a4db7f990373ca9c376323e3dea.jpeg/", 
      large_image: "https://tb-static.uber.com/prod/image-proc/processed_images/3eae4510f8478645a1e2da89598152fa/70aa2a4db7f990373ca9c376323e3dea.jpeg" 
    },
    { 
      id: 2, 
      title: "Pepperoni", 
      description: "Una combinación irresistible de nuestra salsa de tomate especial, queso mozzarella y generosas rodajas de pepperoni.", 
      // 💡 PRECIOS POR TAMAÑO AÑADIDOS
      sizes: {
        Chica: 150,
        Mediana: 220,
        Grande: 290,
        Familiar: 360,
        Mega: 450,
      },
      image: "https://tb-static.uber.com/prod/image-proc/processed_images/e6dc01fb17c6be3af2060b147f708f85/70aa2a4db7f990373ca9c376323e3dea.jpeg", 
      large_image: "https://tb-static.uber.com/prod/image-proc/processed_images/e6dc01fb17c6be3af2060b147f708f85/70aa2a4db7f990373ca9c376323e3dea.jpeg" 
    },
    { 
      id: 3, 
      title: "Napolitana", 
      description: "Una pizza clásica y elegante, con nuestra salsa de tomate San Marzano, ajo, orégano y un toque de aceite de oliva extra virgen", 
      // 💡 PRECIOS POR TAMAÑO AÑADIDOS
      sizes: {
        Chica: 140,
        Mediana: 210,
        Grande: 280,
        Familiar: 350,
        Mega: 430,
      },
      image: "https://i0.wp.com/cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg?fit=1344,768&ssl=1", 
      large_image: "https://i0.wp.com/cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg?fit=1344,768&ssl=1" 
    },
  ],
  postres: [
    { id: 4, title: "Pay de zarzamora", description: "Una exquisita combinación de una base crujiente de galleta, un cremoso relleno de queso y una deliciosa cobertura de mermelada y zarzamoras frescas", price: 75, image: "https://http2.mlstatic.com/D_NQ_NP_791358-MLM81451345905_122024-O.webp", large_image: "https://http2.mlstatic.com/D_NQ_NP_791358-MLM81451345905_122024-O.webp" },
    { id: 5, title: "Flan Napolitano", description: "Un postre clásico, cremoso y con una textura aterciopelada, hecho con leches concentradas, queso crema y un delicado caramelo casero.", price: 50, image: "https://tb-static.uber.com/prod/image-proc/processed_images/1de8c5c0513f948fd5124c218f369abe/b4facf495c22df52f3ca635379ebe613.jpeg", large_image: "https://tb-static.uber.com/prod/image-proc/processed_images/1de8c5c0513f948fd5124c218f369abe/b4facf495c22df52f3ca635379ebe613.jpeg" },
    { id: 6, title: "Tiramisú", description: "Un clásico postre italiano con bizcochos de soletilla bañados en café, intercalados con una suave y sedosa crema de mascarpone. Espolvoreado con una capa de cacao puro en polvo, cada cucharada es un equilibrio perfecto entre lo dulce y lo amargo", price: 120, image: "https://www.gourmet.cl/wp-content/uploads/2016/09/Tiramisu-300x173.png", large_image: "https://www.gourmet.cl/wp-content/uploads/2016/09/Tiramisu-300x173.png" },
  ],
  bebidas: [
    { id: 7, title: "Refrescos 2 Lts.", description: "Coca cola, Fanta, Sprite, Fresca, 500ml", price: 45, image: "https://http2.mlstatic.com/D_NQ_NP_748905-MLA82552397067_022025-O.webp", large_image: "https://http2.mlstatic.com/D_NQ_NP_748905-MLA82552397067_022025-O.webp" },
    { id: 8, title: "Capuchino", description: "Un espresso intenso, leche vaporizada y una generosa capa de espuma de leche. Una combinación perfecta de sabor y textura que te deleitará en cada sorbo. Se puede espolvorear con cacao en polvo o canela.", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT738c8LZ5uk-6CBgD51CJHg63ioPPVGpTutVArs0-dPju7tGBQ", large_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT738c8LZ5uk-6CBgD51CJHg63ioPPVGpTutVArs0-dPju7tGBQ" },
    { id: 9, title: "Moka", description: "Una deliciosa combinación de espresso, jarabe de chocolate y leche vaporizada. Servido con una capa de crema batida y un toque de virutas de chocolate para un sabor indulgente.", price: 55, image: "https://img0.didiglobal.com/static/soda_public/img_2bcc4a6ba0289dbac782036ba869bb76.jpg", large_image: "https://img0.didiglobal.com/static/soda_public/img_2bcc4a6ba0289dbac782036ba869bb76.jpg" },
  ],
  complementos: [
    { id: 10, title: "Papas gajo", description: "Deliciosas papas en gajos, con un sazonador especial de paprika y especias. Crujientes por fuera y suaves por dentro. Puedes elegir entre acompañarlas con salsa de chipotle, tártara o cátsup", price: 45, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUopAS0iM1T_-JazT53XHjhHiQ_bgrqe2ae2Z5DPrET0DKuHpM", large_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUopAS0iM1T_-JazT53XHjhHiQ_bgrqe2ae2Z5DPrET0DKuHpM" },
    { id: 11, title: "Chimichurri", description: "Nuestra auténtica salsa chimichurri, preparada con una mezcla de perejil, ajo, orégano, ají molido, vinagre y aceite. El acompañamiento perfecto para realzar el sabor de cualquier pizza", price: 25, image: "https://http2.mlstatic.com/D_NQ_NP_623034-MLA91336455114_092025-O.webp", large_image: "https://http2.mlstatic.com/D_NQ_NP_623034-MLA91336455114_092025-O.webp" },
  ],
};

/**
 * Función de utilidad para encontrar un producto por ID en todas las categorías.
 */
export const findProductById = (id) => {
    const allProducts = Object.values(menuData).flat();
    return allProducts.find(p => p.id === parseInt(id));
};