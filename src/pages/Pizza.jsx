// Pizza.jsx
// Página de detalle dinámico de una pizza.
//
// En el Hito 7:
// 1. useParams obtiene el id desde la URL.
// 2. El endpoint se construye dinámicamente.
// 3. Cada cambio de id provoca una nueva petición.
// 4. La pizza obtenida puede agregarse al carrito global.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { formatoMoneda } from "../utils/formatoMoneda.js";
import { useCart } from "../context/CartContext.jsx";

const Pizza = () => {
    // Obtiene el parámetro dinámico definido en App.jsx:
    // <Route path="/pizza/:id" ... />
    //
    // Ejemplo:
    // /pizza/p001 → id será "p001"
    // /pizza/p004 → id será "p004"
    const { id } = useParams();

    // URL base del backend.
    const urlBasePizzas =
        "https://desafiolatam.sinapsolabs.cl/react_04_backend/api/pizzas";

    // Estado que almacena la pizza obtenida.
    const [pizza, setPizza] = useState(null);

    // Estado para mostrar la carga.
    const [cargando, setCargando] = useState(true);

    // Estado para controlar errores.
    const [error, setError] = useState("");

    // Función global para agregar al carrito.
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        const obtenerPizza = async () => {
            // Reiniciamos los estados cada vez que cambia el id.
            setCargando(true);
            setError("");
            setPizza(null);

            try {
                // Construimos el endpoint utilizando el parámetro dinámico.
                const respuesta = await fetch(
                    `${urlBasePizzas}/${id}`
                );

                // Si la pizza no existe o el servidor responde con error,
                // se muestra un mensaje controlado.
                if (!respuesta.ok) {
                    throw new Error(
                        `No se pudo obtener la pizza con id ${id}.`
                    );
                }

                const data = await respuesta.json();

                // Guardamos la pizza obtenida.
                setPizza(data);
            } catch (errorPeticion) {
                console.error(errorPeticion);

                setError(
                    "Error al cargar la información de la pizza."
                );
            } finally {
                setCargando(false);
            }
        };

        // Solo se consume la API si existe un id en la URL.
        if (id) {
            obtenerPizza();
        }
    }, [id]);

    if (cargando) {
        return (
            <main className="main-content">
                <section className="container pizza-section">
                    <p className="text-center mt-4">
                        Cargando pizza...
                    </p>
                </section>
            </main>
        );
    }

    if (error !== "") {
        return (
            <main className="main-content">
                <section className="container pizza-section">
                    <div
                        className="alert alert-danger mt-4"
                        role="alert"
                    >
                        {error}
                    </div>
                </section>
            </main>
        );
    }

    if (!pizza) {
        return (
            <main className="main-content">
                <section className="container pizza-section">
                    <div
                        className="alert alert-warning mt-4"
                        role="alert"
                    >
                        No se encontró información de la pizza.
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="main-content">
            <section className="container pizza-section">
                <div className="cards-container">
                    {/* Reutilizamos los estilos existentes de CardPizza */}
                    <article className="card pizza-card">
                        <img
                            src={pizza.img}
                            className="card-img-top pizza-img"
                            alt={`Pizza ${pizza.name}`}
                        />

                        <div className="card-body pizza-card-body">
                            <h2 className="pizza-title">
                                Pizza {pizza.name}
                            </h2>

                            <hr />

                            <p className="card-text">
                                {pizza.desc}
                            </p>

                            <hr />

                            <div className="ingredients-box">
                                <p className="ingredients-title">
                                    Ingredientes:
                                </p>

                                <ul className="ingredients-list">
                                    {pizza.ingredients.map(
                                        (ingrediente, index) => (
                                            <li key={index}>
                                                <i className="fa-solid fa-pizza-slice me-1"></i>
                                                {ingrediente}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <hr />

                            <p className="pizza-price">
                                Precio: ${formatoMoneda(pizza.price)}
                            </p>

                            <div className="pizza-buttons">
                                <button
                                    className="btn btn-dark btn-sm"
                                    type="button"
                                    onClick={() => agregarAlCarrito(pizza)}
                                >
                                    Añadir
                                    <i className="fa-solid fa-cart-shopping ms-1"></i>
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Pizza;