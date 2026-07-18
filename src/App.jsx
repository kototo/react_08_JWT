// App.jsx
// Componente principal de la aplicación.
//
// En el Hito 8:
// 1. Se mantiene la ruta dinámica de pizzas mediante :id.
// 2. Profile continúa siendo una ruta protegida.
// 3. Login y Register se bloquean cuando existe un token JWT.
// 4. El token ahora se obtiene mediante autenticación real con el backend.
// 5. Se mantiene el carrito flotante y la ruta /cart.
// 6. Cart.jsx realizará el checkout autenticado mediante JWT.

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Componentes encargados de proteger las rutas
// según la existencia o ausencia del token JWT.
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

// Páginas principales.
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
    // Controla únicamente la presentación visual del carrito flotante.
    //
    // El contenido del carrito continúa administrándose desde CartContext.
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    return (
        <>
            {/*
                Navbar consume UserContext para mostrar:
                - Profile y Logout cuando existe un JWT.
                - Login y Register cuando no existe un JWT.

                También recibe la función para abrir el carrito flotante.
            */}
            <Navbar abrirCarrito={() => setMostrarCarrito(true)} />

            <Routes>
                {/* Ruta pública principal */}
                <Route path="/" element={<Home />} />

                {/*
                    Login solo puede mostrarse cuando no existe token JWT.

                    Si el usuario ya está autenticado,
                    PublicRoute lo redirige al Home.
                */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/*
                    Register también está disponible únicamente
                    cuando no existe una sesión autenticada.
                */}
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/*
                    Cart continúa disponible como ruta.

                    Además, el mismo componente se reutiliza
                    dentro del carrito flotante.
                */}
                <Route path="/cart" element={<Cart />} />

                {/*
                    Ruta dinámica de detalle.

                    useParams obtiene el valor de :id dentro de Pizza.jsx.

                    Ejemplos:
                    /pizza/p001
                    /pizza/p002
                    /pizza/p003
                */}
                <Route path="/pizza/:id" element={<Pizza />} />

                {/*
                    Profile requiere un token JWT.

                    Si no existe token, ProtectedRoute
                    redirige al usuario hacia /login.
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

                {/* Cualquier ruta inexistente redirige a /404 */}
                <Route
                    path="*"
                    element={<Navigate to="/404" replace />}
                />
            </Routes>

            {/*
                Carrito flotante.

                Se mantiene por decisión estética y de usabilidad:
                el comensal puede revisar su pedido, modificar cantidades,
                realizar el checkout y cerrar el carrito para continuar
                agregando productos sin abandonar el catálogo.
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