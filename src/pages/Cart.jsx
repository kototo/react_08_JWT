// Cart.jsx
// Página y componente flotante del carrito.
//
// En el Hito 8:
// 1. Mantiene el carrito global mediante CartContext.
// 2. Consume el JWT desde UserContext.
// 3. Envía el carrito al backend mediante POST /api/checkouts.
// 4. Muestra mensajes de éxito o error.
// 5. Continúa funcionando como carrito flotante y como ruta /cart.

import React, { useState } from "react";

import { formatoMoneda } from "../utils/formatoMoneda.js";
import { API_ENDPOINTS } from "../config/api.js";

import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";

const Cart = () => {
    const {
        carrito,
        totalCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
    } = useCart();

    // Token real del usuario autenticado.
    const {
        token,
        logout,
    } = useUser();

    // Estados propios de la operación de checkout.
    const [procesandoCompra, setProcesandoCompra] =
        useState(false);

    const [mensajeCompra, setMensajeCompra] =
        useState("");

    const [errorCompra, setErrorCompra] =
        useState("");

    const capitalizarNombre = (nombre) => {
        return nombre.charAt(0).toUpperCase() +
            nombre.slice(1);
    };

    // Envía el carrito al backend.
    const realizarCompra = async () => {
        setMensajeCompra("");
        setErrorCompra("");

        if (!token) {
            setErrorCompra(
                "Debes iniciar sesión para realizar el pago."
            );

            return;
        }

        if (carrito.length === 0) {
            setErrorCompra(
                "No puedes pagar un carrito vacío."
            );

            return;
        }

        setProcesandoCompra(true);

        try {
            const respuesta = await fetch(
                API_ENDPOINTS.checkouts,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                        // El JWT se envía según el estándar Bearer.
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        cart: carrito,
                    }),
                }
            );

            const data = await respuesta
                .json()
                .catch(() => ({}));

            // Si el JWT expiró o no es válido,
            // eliminamos la sesión local.
            if (respuesta.status === 401) {
                logout();

                throw new Error(
                    "La sesión expiró. Debes iniciar sesión nuevamente."
                );
            }

            if (!respuesta.ok) {
                throw new Error(
                    data?.error ||
                    data?.message ||
                    "No fue posible realizar la compra."
                );
            }

            // Mensaje requerido por el Hito 8.
            setMensajeCompra(
                data?.message ||
                data?.mensaje ||
                "Compra realizada correctamente."
            );

            // Después de una compra exitosa,
            // vaciamos el carrito global.
            limpiarCarrito();
        } catch (error) {
            setErrorCompra(
                error.message ||
                "Ocurrió un error al procesar la compra."
            );
        } finally {
            setProcesandoCompra(false);
        }
    };

    return (
        <main className="cart-page">
            <section className="cart-container">
                <h2 className="cart-title">
                    Detalles del pedido:
                </h2>

                {/* El mensaje queda visible aunque el carrito se vacíe */}
                {mensajeCompra !== "" && (
                    <div
                        className="alert alert-success"
                        role="alert"
                    >
                        {mensajeCompra}
                    </div>
                )}

                {errorCompra !== "" && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {errorCompra}
                    </div>
                )}

                {carrito.length === 0 ? (
                    <div className="text-center">
                        <p>El carrito está vacío.</p>

                        <p className="text-muted">
                            Agrega una pizza desde el Home
                            para comenzar tu pedido.
                        </p>
                    </div>
                ) : (
                    <>
                        {carrito.map((pizza) => (
                            <div
                                className="cart-item"
                                key={pizza.id}
                            >
                                <div className="cart-product">
                                    <img
                                        src={pizza.img}
                                        alt={`Pizza ${pizza.name}`}
                                        className="cart-img"
                                    />

                                    <span className="cart-name">
                                        {capitalizarNombre(
                                            pizza.name
                                        )}
                                    </span>
                                </div>

                                <span className="cart-price">
                                    ${formatoMoneda(
                                    pizza.price
                                )}
                                </span>

                                <div className="cart-actions">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm cart-btn"
                                        onClick={() =>
                                            disminuirCantidad(
                                                pizza.id
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span className="cart-count">
                                        {pizza.count}
                                    </span>

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm cart-btn"
                                        onClick={() =>
                                            aumentarCantidad(
                                                pizza.id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm cart-btn"
                                        onClick={() =>
                                            eliminarDelCarrito(
                                                pizza.id
                                            )
                                        }
                                        title="Eliminar producto"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <h2 className="cart-total">
                            Total: ${formatoMoneda(totalCarrito)}
                        </h2>

                        <div className="d-flex gap-2 justify-content-center flex-wrap">
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={realizarCompra}
                                disabled={
                                    !token ||
                                    procesandoCompra ||
                                    carrito.length === 0
                                }
                            >
                                {procesandoCompra
                                    ? "Procesando..."
                                    : "Pagar"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => {
                                    setMensajeCompra("");
                                    setErrorCompra("");
                                    limpiarCarrito();
                                }}
                            >
                                Vaciar carrito
                            </button>
                        </div>

                        {!token && (
                            <p className="text-danger text-center mt-3 mb-0">
                                Debes iniciar sesión para realizar el pago.
                            </p>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default Cart;