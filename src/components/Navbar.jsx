// Navbar.jsx
// Menú principal.
//
// Consume:
// 1. CartContext para mostrar el total del carrito.
// 2. UserContext para conocer si existe un JWT.
// 3. logout para cerrar la sesión real.

import React from "react";
import { Link } from "react-router-dom";

import { formatoMoneda } from "../utils/formatoMoneda.js";
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";

const Navbar = ({ abrirCarrito }) => {
    const {
        totalCarrito,
        cantidadProductos,
    } = useCart();

    // token ahora contiene un JWT real o una cadena vacía.
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
                {/* Home siempre visible */}
                <Link
                    className="btn btn-outline-light btn-sm"
                    to="/"
                >
                    <i className="fa-solid fa-pizza-slice me-1"></i>
                    Home
                </Link>

                {/* Si existe JWT, mostramos Profile y Logout */}
                {token ? (
                    <>
                        <Link
                            className="btn btn-outline-light btn-sm"
                            to="/profile"
                        >
                            <i className="fa-solid fa-user me-1"></i>
                            Profile
                        </Link>

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
                        <Link
                            className="btn btn-outline-light btn-sm"
                            to="/login"
                        >
                            <i className="fa-solid fa-lock me-1"></i>
                            Login
                        </Link>

                        <Link
                            className="btn btn-outline-light btn-sm"
                            to="/register"
                        >
                            <i className="fa-solid fa-user-plus me-1"></i>
                            Register
                        </Link>
                    </>
                )}

                {/* Total siempre visible */}
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