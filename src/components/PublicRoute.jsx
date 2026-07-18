// PublicRoute.jsx
// Controla páginas públicas de autenticación.
//
// Login y Register solo deben estar disponibles cuando token es false.
// Si el usuario ya está autenticado, se redirige al Home.

import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../context/UserContext.jsx";

const PublicRoute = ({ children }) => {
    // Consumimos el token global.
    const { token } = useUser();

    // Si ya existe una sesión, Login y Register no deben mostrarse.
    if (token) {
        return <Navigate to="/" replace />;
    }

    // Si no hay sesión, se permite acceder a Login o Register.
    return children;
};

export default PublicRoute;