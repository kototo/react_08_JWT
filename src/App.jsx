// App.jsx
// Componente principal.
//
// En el Hito 7:
// 1. La ruta de Pizza pasa a ser dinámica mediante :id.
// 2. Profile se convierte en una ruta protegida.
// 3. Login y Register se bloquean cuando token es true.
// 4. Se mantiene el carrito flotante desarrollado anteriormente.

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Componentes para controlar rutas públicas y privadas.
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

// Páginas.
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
    // Controla la apertura y cierre visual del carrito flotante.
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    return (
        <>
            {/* Navbar puede abrir el carrito flotante */}
            <Navbar abrirCarrito={() => setMostrarCarrito(true)} />

            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<Home />} />

                {/*
                    Login solo está disponible cuando token es false.
                    Si token es true, PublicRoute redirige al Home.
                */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/* Register utiliza la misma protección pública */}
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Ruta del carrito conservada desde los hitos anteriores */}
                <Route path="/cart" element={<Cart />} />

                {/*
                    Ruta dinámica de pizzas.
                    :id podrá ser p001, p002, p003, etc.
                */}
                <Route path="/pizza/:id" element={<Pizza />} />

                {/*
                    Profile requiere token true.
                    Si token es false, ProtectedRoute redirige a /login.
                */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Página 404 explícita */}
                <Route path="/404" element={<NotFound />} />

                {/* Cualquier ruta inexistente redirige a 404 */}
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>

            {/*
                Carrito flotante:
                se mantiene por estética y usabilidad.

                El comensal puede revisar el pedido, aumentar o eliminar
                productos y luego cerrar el flotante para continuar comprando.
            */}
            {mostrarCarrito && (
                <div className="cart-overlay">
                    <div className="cart-modal">
                        <button
                            type="button"
                            className="cart-close"
                            onClick={() => setMostrarCarrito(false)}
                            aria-label="Cerrar carrito"
                        >
                            ×
                        </button>

                        <Cart />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default App;