import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS

// Importaciones desde la nueva ubicación modular
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Importa las páginas desde la carpeta 'pages'
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OthersDetailPage from "./pages/OthersDetailPage";

import "./App.css"; // Estilos globales

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content-wrapper">
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/conocenos" element={<AboutPage />} />
          <Route path="/producto/pizza/:id" element={<ProductDetailPage />} />
          <Route path="/producto/:cat/:id" element={<OthersDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="page-padding">404: Página no encontrada</h1>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
