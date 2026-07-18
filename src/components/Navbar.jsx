// Navbar.jsx
// Menú principal de navegación.
//
// Consume:
// 1. CartContext para mostrar el total real.
// 2. UserContext para mostrar las opciones según el token.
// 3. El método logout para cerrar la sesión simulada.

import React from "react";
import { Link } from "react-router-dom";

import { formatoMoneda } from "../utils/formatoMoneda.js";
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";

const Navbar = ({ abrirCarrito }) => {
    // Información global del carrito.
    const {
        totalCarrito,
        cantidadProductos,
    } = useCart();

    // Información global de autenticación.
    const {
        token,
        logout,
    } = useUser();

    return (
        <nav className="navbar-mamma">
            <div className="navbar-brand-area">
                <span className="navbar-title">
                    Pizzería Mamma Mía!
                </span>
            </div>

            <div className="navbar-actions">
                {/* Home siempre debe estar visible */}
                <Link
                    className="btn btn-outline-light btn-sm"
                    to="/"
                >
                    <i className="fa-solid fa-pizza-slice me-1"></i>
                    Home
                </Link>

                {/*
                    Navegación condicional según el token.
                    React se actualiza automáticamente cuando logout cambia el token.
                */}
                {token ? (
                    <>
                        {/* Usuario autenticado: se muestra Profile */}
                        <Link
                            className="btn btn-outline-light btn-sm"
                            to="/profile"
                        >
                            <i className="fa-solid fa-user me-1"></i>
                            Profile
                        </Link>

                        {/* Logout ejecuta el método del UserContext */}
                        <button
                            className="btn btn-outline-light btn-sm"
                            type="button"
                            onClick={logout}
                        >
                            <i className="fa-solid fa-right-from-bracket me-1"></i>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {/* Usuario sin sesión: se muestra Login */}
                        <Link
                            className="btn btn-outline-light btn-sm"
                            to="/login"
                        >
                            <i className="fa-solid fa-lock me-1"></i>
                            Login
                        </Link>

                        {/* Usuario sin sesión: se muestra Register */}
                        <Link
                            className="btn btn-outline-light btn-sm"
                            to="/register"
                        >
                            <i className="fa-solid fa-user-plus me-1"></i>
                            Register
                        </Link>
                    </>
                )}

                {/* Total siempre debe estar visible */}
                <button
                    className="btn btn-outline-info btn-sm"
                    type="button"
                    onClick={abrirCarrito}
                >
                    <i className="fa-solid fa-cart-shopping me-1"></i>

                    Total: ${formatoMoneda(totalCarrito)}

                    {cantidadProductos > 0 && (
                        <span className="ms-1">
                            ({cantidadProductos})
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;