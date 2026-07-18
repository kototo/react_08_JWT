// Cart.jsx
// Página/componente del carrito.
//
// El carrito se administra globalmente mediante Cart Context.
// En el Hito 7 también consume User Context para conocer
// el estado simulado de autenticación del usuario.
//
// Visualmente se mantiene como tarjeta reutilizable:
// 1. Puede mostrarse en la ruta /cart.
// 2. Puede mostrarse dentro del carrito flotante.
// 3. El comensal puede cerrarlo y continuar agregando productos.

import React from "react";

// Función utilizada para mostrar los precios con separador de miles.
import { formatoMoneda } from "../utils/formatoMoneda.js";

// Context global del carrito.
import { useCart } from "../context/CartContext.jsx";

// Context global del usuario.
// Se utiliza para consultar el token simulado.
import { useUser } from "../context/UserContext.jsx";

const Cart = () => {
    // Consumimos el estado global y las funciones del carrito.
    const {
        carrito,
        totalCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
    } = useCart();

    // Consumimos el token desde UserContext.
    //
    // Cuando token es true:
    // el usuario puede presionar el botón Pagar.
    //
    // Cuando token es false:
    // el botón Pagar queda deshabilitado.
    const { token } = useUser();

    // Función auxiliar para mostrar el nombre
    // de la pizza
    const capitalizarNombre = (nombre) => {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    };

    return (
        <main className="cart-page">
            <section className="cart-container">
                <h2 className="cart-title">
                    Detalles del pedido:
                </h2>

                {/*
                    Decisión de diseño:

                    El carrito se mantiene como tarjeta flotante o tarjeta central.

                    No se separa visualmente en una hoja independiente porque
                    esto permite que el comensal revise su pedido, cierre el
                    carrito y continúe agregando productos desde Home o desde
                    la página de detalle de una pizza.
                */}

                {/* Si no existen productos, mostramos un mensaje informativo */}
                {carrito.length === 0 ? (
                    <div className="text-center">
                        <p>El carrito está vacío.</p>

                        <p className="text-muted">
                            Agrega una pizza desde el Home para comenzar tu pedido.
                        </p>
                    </div>
                ) : (
                    <>
                        {/*
                            Recorremos todos los productos almacenados
                            en el Cart Context.
                        */}
                        {carrito.map((pizza) => (
                            <div
                                className="cart-item"
                                key={pizza.id}
                            >
                                {/* Imagen y nombre de la pizza */}
                                <div className="cart-product">
                                    <img
                                        src={pizza.img}
                                        alt={`Pizza ${pizza.name}`}
                                        className="cart-img"
                                    />

                                    <span className="cart-name">
                                        {capitalizarNombre(pizza.name)}
                                    </span>
                                </div>

                                {/* Precio unitario de la pizza */}
                                <span className="cart-price">
                                    ${formatoMoneda(pizza.price)}
                                </span>

                                {/* Controles para modificar el carrito */}
                                <div className="cart-actions">
                                    {/*
                                        Disminuye la cantidad.

                                        Si la cantidad llega a cero,
                                        CartContext elimina el producto.
                                    */}
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm cart-btn"
                                        onClick={() =>
                                            disminuirCantidad(pizza.id)
                                        }
                                        aria-label={`Disminuir cantidad de ${pizza.name}`}
                                    >
                                        -
                                    </button>

                                    {/* Cantidad actual del producto */}
                                    <span className="cart-count">
                                        {pizza.count}
                                    </span>

                                    {/* Aumenta la cantidad */}
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm cart-btn"
                                        onClick={() =>
                                            aumentarCantidad(pizza.id)
                                        }
                                        aria-label={`Aumentar cantidad de ${pizza.name}`}
                                    >
                                        +
                                    </button>

                                    {/* Elimina completamente el producto */}
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm cart-btn"
                                        onClick={() =>
                                            eliminarDelCarrito(pizza.id)
                                        }
                                        aria-label={`Eliminar ${pizza.name} del carrito`}
                                        title="Eliminar producto"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/*
                            El total proviene directamente de CartContext.

                            Por esta razón debe mostrar exactamente el mismo
                            valor que aparece en el Navbar.
                        */}
                        <h2 className="cart-total">
                            Total: ${formatoMoneda(totalCarrito)}
                        </h2>

                        <div className="d-flex gap-2 justify-content-center flex-wrap">
                            {/*
                                Requerimiento del Hito 7:

                                El botón Pagar queda deshabilitado
                                cuando el token es false.
                            */}
                            <button
                                type="button"
                                className="btn btn-dark"
                                disabled={!token}
                                title={
                                    token
                                        ? "Continuar con el pago"
                                        : "Debes iniciar sesión para pagar"
                                }
                            >
                                Pagar
                            </button>

                            {/* Elimina todos los productos del carrito */}
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={limpiarCarrito}
                            >
                                Vaciar carrito
                            </button>
                        </div>

                        {/*
                            Mensaje adicional cuando el usuario
                            no tiene una sesión activa.
                        */}
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