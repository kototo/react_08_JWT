// Home.jsx
// Página principal.
// Consume la API para obtener las pizzas.
// En el Hito 6 también consume Cart Context para agregar productos al carrito.

import React, { useEffect, useState } from "react";

import Header from "../components/Header.jsx";
import CardPizza from "../components/CardPizza.jsx";

import { useCart } from "../context/CartContext.jsx";

const Home = () => {
    // Endpoint que entrega el listado completo de pizzas.
    const urlPizzas =
        "https://desafiolatam.sinapsolabs.cl/react_04_backend/api/pizzas";

    // Estado local para guardar las pizzas traídas desde la API.
    const [pizzasApi, setPizzasApi] = useState([]);

    // Estado para controlar carga.
    const [cargando, setCargando] = useState(true);

    // Estado para controlar errores.
    const [error, setError] = useState("");

    // Consumimos la función global para agregar productos al carrito.
    const { agregarAlCarrito } = useCart();

    // Consumimos la API al montar el componente.
    useEffect(() => {
        const obtenerPizzas = async () => {
            try {
                const respuesta = await fetch(urlPizzas);

                if (!respuesta.ok) {
                    throw new Error("No se pudo obtener el listado de pizzas.");
                }

                const data = await respuesta.json();

                setPizzasApi(data);
            } catch (error) {
                setError("Error al cargar las pizzas desde la API.");
            } finally {
                setCargando(false);
            }
        };

        obtenerPizzas();
    }, []);

    return (
        <main className="main-content">
            <Header />

            <section className="container pizza-section">
                {cargando && (
                    <p className="text-center mt-4">
                        Cargando pizzas desde la API...
                    </p>
                )}

                {error !== "" && (
                    <div className="alert alert-danger mt-4" role="alert">
                        {error}
                    </div>
                )}

                {!cargando && error === "" && (
                    <div className="cards-container">
                        {pizzasApi.map((pizza) => (
                            // Cada CardPizza recibe el identificador utilizado
                            // para construir la ruta dinámica /pizza/:id.

                            <CardPizza
                                key={pizza.id}
                                id={pizza.id}
                                name={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                img={pizza.img}
                                onAgregar={() => agregarAlCarrito(pizza)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;