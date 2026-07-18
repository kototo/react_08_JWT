// ProtectedRoute.jsx
// Componente encargado de proteger páginas privadas.
//
// Si existe token, muestra la página solicitada.
// Si no existe token, redirige hacia /login.

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useUser } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
    // Obtenemos el token desde UserContext.
    const { token } = useUser();

    // useLocation permite conocer qué ruta intentaba visitar el usuario.
    const location = useLocation();

    // Si no está autenticado, se redirige a Login.
    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ desde: location.pathname }}
            />
        );
    }

    // Si está autenticado, se muestra la página protegida.
    return children;
};

export default ProtectedRoute;