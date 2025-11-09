import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

// 🔹 Contexto y ruta protegida
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// 🔹 Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// 🔹 Páginas públicas
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OthersDetailPage from "./pages/OthersDetailPage";

// 🔹 Páginas de autenticación y administración
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import PortalPage from "./pages/PortalPage";
import AdminProductosPage from "./pages/AdminProductosPage";
import ManagePizzaPage from "./pages/ManagePizzaPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="main-content-wrapper">
          <Routes>
            {/* 🔹 Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/conocenos" element={<AboutPage />} />
            <Route path="/producto/pizza/:id" element={<ProductDetailPage />} />
            <Route path="/producto/:cat/:id" element={<OthersDetailPage />} />
            <Route path="/carrito" element={<CartPage />} />

            {/* 🔹 Rutas de autenticación */}
            <Route path="/login" element={<LoginPage />} />

            {/* 🔹 Ruta protegida (solo acceso con login) */}
            <Route
              path="/admin/pedidos"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/portal"
              element={
                <ProtectedRoute>
                  <PortalPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/manage-menu/pizza"
              element={
                <ProtectedRoute>
                  <ManagePizzaPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/manage-menu"
              element={
                <ProtectedRoute>
                  <AdminProductosPage />
                </ProtectedRoute>
              }
            />

            {/* 🔹 Página 404 */}
            <Route
              path="*"
              element={
                <h1 className="page-padding text-center mt-5">
                  404 - Página no encontrada
                </h1>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
