// NotFound.jsx
// Página 404 solicitada en el Hito 5.
// Se muestra cuando la ruta no existe y contiene un enlace para volver al Home.

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="main-content">
            <section className="container pizza-section">
                <div className="card p-5 text-center">
                    <h1 className="display-4">404</h1>

                    <h2>Página no encontrada</h2>

                    <p className="mt-3">
                        La ruta que intentas visitar no existe en Pizzería Mamma Mía.
                    </p>

                    <div className="mt-3">
                        <Link to="/" className="btn btn-dark">
                            Volver al Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFound;