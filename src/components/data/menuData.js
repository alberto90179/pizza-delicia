export const menuData = {
  pizzas: [
    { id: 1, title: "Hawaiana", description: "Descripción del primer producto", price: 120, image: "https://tb-static.uber.com/prod/image-proc/processed_images/3eae4510f8478645a1e2da89598152fa/70aa2a4db7f990373ca9c376323e3dea.jpeg/", large_image: "https://tb-static.uber.com/prod/image-proc/processed_images/3eae4510f8478645a1e2da89598152fa/70aa2a4db7f990373ca9c376323e3dea.jpeg" },
    { id: 2, title: "Pepperoni", description: "Descripción del segundo producto", price: 150, image: "https://tb-static.uber.com/prod/image-proc/processed_images/e6dc01fb17c6be3af2060b147f708f85/70aa2a4db7f990373ca9c376323e3dea.jpeg", large_image: "https://tb-static.uber.com/prod/image-proc/processed_images/e6dc01fb17c6be3af2060b147f708f85/70aa2a4db7f990373ca9c376323e3dea.jpeg" },
    { id: 3, title: "Napolitana", description: "Salsa de tomate, albahaca, queso mozzarella y aceite de oliva", price: 140, image: "https://i0.wp.com/cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg?fit=1344,768&ssl=1", large_image: "https://i0.wp.com/cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg?fit=1344,768&ssl=1" },
  ],
  postres: [
    { id: 4, title: "Pay de zarzamora", description: "Descripción del primer producto", price: 75, image: "https://http2.mlstatic.com/D_NQ_NP_791358-MLM81451345905_122024-O.webp", large_image: "https://http2.mlstatic.com/D_NQ_NP_791358-MLM81451345905_122024-O.webp" },
    { id: 5, title: "Flan Napolitano", description: "Descripción del segundo producto", price: 50, image: "https://tb-static.uber.com/prod/image-proc/processed_images/1de8c5c0513f948fd5124c218f369abe/b4facf495c22df52f3ca635379ebe613.jpeg", large_image: "https://tb-static.uber.com/prod/image-proc/processed_images/1de8c5c0513f948fd5124c218f369abe/b4facf495c22df52f3ca635379ebe613.jpeg" },
    { id: 6, title: "Tiramisú", description: "Descripción del tercer producto", price: 120, image: "https://www.gourmet.cl/wp-content/uploads/2016/09/Tiramisu-300x173.png", large_image: "https://www.gourmet.cl/wp-content/uploads/2016/09/Tiramisu-300x173.png" },
  ],
  bebidas: [
    { id: 7, title: "Refrescos 2 Lts.", description: "Coca cola, Fanta, Sprite, Fresca, 2 Lts.", price: 45, image: "https://http2.mlstatic.com/D_NQ_NP_748905-MLA82552397067_022025-O.webp", large_image: "https://http2.mlstatic.com/D_NQ_NP_748905-MLA82552397067_022025-O.webp" },
    { id: 8, title: "Capuchino", description: "Descripción del segundo producto", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT738c8LZ5uk-6CBgD51CJHg63ioPPVGpTutVArs0-dPju7tGBQ", large_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT738c8LZ5uk-6CBgD51CJHg63ioPPVGpTutVArs0-dPju7tGBQ" },
    { id: 9, title: "Moka", description: "Descripción del tercer producto", price: 55, image: "https://img0.didiglobal.com/static/soda_public/img_2bcc4a6ba0289dbac782036ba869bb76.jpg", large_image: "https://img0.didiglobal.com/static/soda_public/img_2bcc4a6ba0289dbac782036ba869bb76.jpg" },
  ],
  complementos: [
    { id: 10, title: "Papas gajo", description: "Descripción del primer producto", price: 45, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUopAS0iM1T_-JazT53XHjhHiQ_bgrqe2ae2Z5DPrET0DKuHpM", large_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUopAS0iM1T_-JazT53XHjhHiQ_bgrqe2ae2Z5DPrET0DKuHpM" },
    { id: 11, title: "Flan Napolitano", description: "Descripción del tercer producto", price: 25, image: "https://http2.mlstatic.com/D_NQ_NP_623034-MLA91336455114_092025-O.webp", large_image: "https://http2.mlstatic.com/D_NQ_NP_623034-MLA91336455114_092025-O.webp" },
  ],
};

export const findProductById = (id) => {
    const allProducts = Object.values(menuData).flat();
    return allProducts.find(p => p.id === parseInt(id));
};