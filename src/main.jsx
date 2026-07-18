// main.jsx
// Punto de entrada de la aplicación.
//
// Configura:
// 1. React Router.
// 2. UserContext para autenticación.
// 3. CartContext para el carrito global.
// 4. Los estilos generales del proyecto.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Contexto de autenticación del Hito 7.
import { UserProvider } from "./context/UserContext.jsx";

// Contexto del carrito desarrollado en el Hito 6.
import { CartProvider } from "./context/CartContext.jsx";

// Librerías visuales.
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Estilos propios.
import "./assets/css/styles.css";
import "./assets/css/register.css";
import "./assets/css/cart.css";

import App from "./App.jsx";

// En desarrollo local se usa la raíz "/".
// En producción se utiliza "/react_08_JWT"
const routerBasename = import.meta.env.PROD
    ? "/react_08_JWT"
    : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename={routerBasename}>
            {/* UserProvider controla el token global */}
            <UserProvider>
                {/* CartProvider controla el carrito global */}
                <CartProvider>
                    <App />
                </CartProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);